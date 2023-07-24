const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const getPatient = require("../middleware/getPatient");
const handleEditPatient = require("../middleware/handleEditPatient");

const db = require("../db");
const { body, param } = require("express-validator");
const { validate } = require("../helpers");

const router = express.Router();

router.get("/all", isLoggedIn, (req, res) => {
  const patients = db.getPatients();
  res.send(JSON.stringify(patients));
});

router.get(
  "/:id",
  isLoggedIn,
  validate([param("id").isNumeric({ no_symbols: true })]),
  getPatient,
  (req, res) => res.send(JSON.stringify(res.locals.patient))
);

router.get(
  "/details/:id",
  isLoggedIn,
  validate([param("id").isNumeric({ no_symbols: true })]),
  getPatient,
  (req, res) => res.send(JSON.stringify(res.locals.patient.details || null))
);

router.post(
  "/details/:id?",
  isLoggedIn,
  validate([
    param("id").optional().isNumeric({ no_symbols: true }),
    body("firstName").isString(),
    body("lastName").isString(),
    body("gender").isIn(["male", "female"]),
    body("birthDate").isString(),
    body("address").isString(),
    body("personalNumericCode").isString(),
    body("idSeriesAndNumber").isString(),
    body("typeOfInsurance").isString(),
    body("statusOfTheInsured").isString(),
    body("typeOfAdmission").isString(),
    body("specialization").isString(),
    body("roomNo").isString(),
  ]),
  (req, res) =>
    handleEditPatient(req, res, "details", {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
      address: req.body.address,
      personalNumericCode: req.body.personalNumericCode,
      idSeriesAndNumber: req.body.idSeriesAndNumber,
      typeOfInsurance: req.body.typeOfInsurance,
      statusOfTheInsured: req.body.statusOfTheInsured,
      typeOfAdmission: req.body.typeOfAdmission,
      specialization: req.body.specialization,
      roomNo: req.body.roomNo,
    })
);

router.get(
  "/diagnosis/:id",
  isLoggedIn,
  validate([param("id").isNumeric({ no_symbols: true })]),
  getPatient,
  (req, res) => res.send(JSON.stringify(res.locals.patient.diagnosis || null))
);

router.post(
  "/diagnosis/:id?",
  isLoggedIn,
  validate([
    param("id").optional().isNumeric({ no_symbols: true }),
    body("initial").isString(),
    body("last72Hours").isString(),
    body("final").isString(),
  ]),
  (req, res) =>
    handleEditPatient(req, res, "diagnosis", {
      initial: req.body.initial,
      last72Hours: req.body.last72Hours,
      final: req.body.final,
    })
);

router.get(
  "/surgery/:id",
  isLoggedIn,
  validate([param("id").isNumeric({ no_symbols: true })]),
  getPatient,
  (req, res) => res.send(JSON.stringify(res.locals.patient.surgery || null))
);

router.post(
  "/surgery/:id?",
  isLoggedIn,
  validate([
    param("id").optional().isNumeric({ no_symbols: true }),
    body("teamOfMedics").isString(),
    body("details").isString(),
    body("date").isString(),
  ]),
  (req, res) =>
    handleEditPatient(req, res, "surgery", {
      teamOfMedics: req.body.teamOfMedics,
      details: req.body.details,
      date: req.body.date,
    })
);

router.get(
  "/history/:id",
  isLoggedIn,
  validate([param("id").isNumeric({ no_symbols: true })]),
  getPatient,
  (req, res) => res.send(JSON.stringify(res.locals.patient.history || null))
);

router.post(
  "/history/:id?",
  isLoggedIn,
  validate([
    param("id").optional().isNumeric({ no_symbols: true }),
    body("heredoCollateralAntecedents").isString(),
    body("livingAndWorkingConditions").isString(),
    body("behaviors").isString(),
    body("backgroundMedication").isString(),
    body("historyOfDisease").isString(),
    body("generalClinicalExamination").isString(),
  ]),
  (req, res) =>
    handleEditPatient(req, res, "history", {
      heredoCollateralAntecedents: req.body.heredoCollateralAntecedents,
      livingAndWorkingConditions: req.body.livingAndWorkingConditions,
      behaviors: req.body.behaviors,
      backgroundMedication: req.body.backgroundMedication,
      historyOfDisease: req.body.historyOfDisease,
      generalClinicalExamination: req.body.generalClinicalExamination,
    })
);

router.get(
  "/evolution-and-treatment/:id",
  isLoggedIn,
  validate([param("id").isNumeric({ no_symbols: true })]),
  getPatient,
  (req, res) =>
    res.send(JSON.stringify(res.locals.patient.evolutionAndTreatment || null))
);

router.post(
  "/evolution-and-treatment/:id?",
  isLoggedIn,
  validate([
    param("id").optional().isNumeric({ no_symbols: true }),
    body("*.from").isString(),
    body("*.to").isString(),
    body("*.notes").isString(),
  ]),
  (req, res) =>
    handleEditPatient(
      req,
      res,
      "evolutionAndTreatment",
      req.body.map((ev) => ({
        from: ev.from,
        to: ev.to,
        notes: ev.notes,
      }))
    )
);

module.exports = router;

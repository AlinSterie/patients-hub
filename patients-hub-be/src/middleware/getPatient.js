const db = require("../db");
const { sendErrorMessage } = require("../helpers");

function getPatient(req, res, next) {
  const patient = db
    .getPatients()
    .find((p) => p.id.toString() === req.params.id);
  if (!patient) return sendErrorMessage(res, 400, "patient_id_not_found");

  res.locals.patient = patient;
  next();
}

module.exports = getPatient;

const express = require("express");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const isLoggedIn = require("../middleware/isLoggedIn");

const cfg = require("../config");
const db = require("../db");
const { validate, sendErrorMessage } = require("../helpers");

const router = express.Router();
const getTokenExp = (ageInMins = cfg.tokenMaxAgeMins) =>
  Math.floor(Date.now() / 1000) + ageInMins * 60;

router.get("/", isLoggedIn, (req, res) => {
  const users = db.getUsers();
  const user = users.find((u) => u.id === res.locals.user.id);

  if (!user) {
    return sendErrorMessage(res, 400, "user_not_found");
  }

  res.send(
    JSON.stringify({
      id: user.id,
      email: user.email,
      function: user.function,
      speciality: user.speciality,
    })
  );
});

router.post(
  "/register",
  validate([
    body("name")
      .isString()
      .matches(/^[A-Za-z -]+$/),
    body("email").isEmail(),
    body("password")
      .isString()
      .isLength({ min: 8, max: 40 })
      .withMessage("min_8_max_40"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("passwords_not_matching");
      return true;
    }),
    body("function").isIn(["medic", "resident", "administrative"]),
    body("speciality").isIn([
      "anesthesiology",
      "cardiology",
      "dermathology",
      "gastroenterology",
      "pediatrics",
      "internal-medicine",
      "neurology",
      "oncology",
      "plastic-surgery",
      "general-surgery",
    ]),
  ]),
  (req, res) => {
    const users = db.getUsers();
    const { email, password } = req.body;

    if (users.find((u) => u.email === email)) {
      return sendErrorMessage(res, 400, "email_already_registered");
    }

    const id = users.length + 1;
    const exp = getTokenExp();
    const payload = { type: "AUTH", id, email, exp };
    const authToken = jwt.sign(payload, cfg.jwtSecret);
    res.cookie("authToken", authToken, cfg.authCookieSettings);

    users.push({
      id,
      name: req.body.name,
      email,
      password,
      function: req.body.function,
      speciality: req.body.speciality,
    });
    db.saveUsers(users);
    res.status(200).end();
  }
);

router.post(
  "/login",
  validate([body("email").isEmail(), body("password").isString()]),
  (req, res) => {
    const users = db.getUsers();
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);

    if (!user || password !== user.password) {
      return sendErrorMessage(res, 400, "wrong_email_or_password");
    }

    const exp = getTokenExp();
    const payload = { type: "AUTH", id: user.id, email, exp };
    const authToken = jwt.sign(payload, cfg.jwtSecret);
    res.cookie("authToken", authToken, cfg.authCookieSettings);

    res.status(200).end();
  }
);

router.post(
  "/forgot-password",
  validate([body("email").isEmail()]),
  (req, res) => {
    const users = db.getUsers();
    const { email } = req.body;
    const user = users.find((u) => u.email === email);

    if (!user) {
      return sendErrorMessage(res, 400, "email_not_found");
    }

    const exp = getTokenExp(15);
    const payload = { type: "RESET_PWD", email, exp };
    const token = jwt.sign(payload, cfg.jwtSecret);

    res.send(JSON.stringify({ resetToken: token }));
  }
);

router.post(
  "/reset-password",
  validate([
    body("newPassword")
      .isString()
      .isLength({ min: 8, max: 40 })
      .withMessage("min_8_max_40"),
    body("confirmNewPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error("passwords_not_matching");
      return true;
    }),
  ]),
  (req, res) => {
    const users = db.getUsers();
    const { resetToken, newPassword } = req.body;

    let email = null;

    try {
      const payload = jwt.verify(resetToken, cfg.jwtSecret);
      if (payload.type !== "RESET_PWD") throw new Error();
      email = payload.email;
    } catch (error) {
      return sendErrorMessage(res, 400, "invalid_reset_token");
    }

    const user = users.find((u) => u.email === email);
    if (!user) return sendErrorMessage(res, 400, "email_not_found");

    user.password = newPassword;
    db.saveUsers(users);

    res.status(200).end();
  }
);

module.exports = router;

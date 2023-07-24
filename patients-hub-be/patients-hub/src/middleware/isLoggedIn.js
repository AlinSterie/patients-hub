const jwt = require("jsonwebtoken");
const cfg = require("../config");
const { sendErrorMessage } = require("../helpers");

function isLoggedIn(req, res, next) {
  try {
    const payload = jwt.verify(req.cookies.authToken, cfg.jwtSecret);

    if (payload.type !== "AUTH") {
      throw new Error();
    }

    res.locals.user = { id: payload.id, email: payload.email };
  } catch (error) {
    return sendErrorMessage(res, 403, "unauthenticated");
  }

  next();
}

module.exports = isLoggedIn;

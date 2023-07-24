const { validationResult } = require("express-validator");

const customValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return { param: error.param, error: error.msg };
  },
});

module.exports.validate = function (checks) {
  return [
    ...checks,
    (req, res, next) => {
      const errors = customValidationResult(req);

      if (!errors.isEmpty()) {
        const { param, error: errorMessage } = errors.array()[0];
        return res.status(400).json({
          param,
          error: errorMessage.replace(/ /g, "_").toLowerCase(),
        });
      }

      next();
    },
  ];
};

module.exports.sendErrorMessage = function (res, statusCode, errorMessage) {
  return res
    .status(statusCode)
    .send(JSON.stringify({ param: "general", error: errorMessage }));
};

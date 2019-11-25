const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .normalizeEmail()
      .trim()
      .withMessage("Your email is looking funky..."),
    body("password")
      .isLength({ min: 10 })
      .withMessage("The minimum length is 10 characters, dummy."),
    body("firstName")
      .exists()
      .trim()
      .escape()
      .withMessage("Give us your first name damnit.")
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  validate
};

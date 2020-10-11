const { validationResult, check } = require("express-validator");

const signUpValidator = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid username.")
    .isLength({ max: 50 })
    .withMessage("Username must not be more than 50 characters long."),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email.")
    .isLength({ max: 100 })
    .withMessage("Email address must not be more than 100 characters long."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name.")
    .isLength({ max: 50 })
    .withMessage("First name must not be more than 50 characters long."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name.")
    .isLength({ max: 50 })
    .withMessage("Last name must not be more than 50 characters long."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid password.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*").'
    )
    .isLength({ min: 8 })
    .withMessage("Password must not be less than 8 characters long."),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password.");
      }
      return true;
    }),
];

const loginValidator = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid username.")
    .isLength({ max: 50 })
    .withMessage("Username must not be more than 50 characters long."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid password.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*").'
    )
    .isLength({ min: 8 })
    .withMessage("Password must not be less than 8 characters long."),
];

const storyValidator = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title.")
    .isLength({ max: 100 })
    .withMessage("Titles must not be more than 100 characters long."),
  check("subtitle")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a subtitle.")
    .isLength({ max: 200 })
    .withMessage("Subtitles must not be more than 200 characters long."),
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Please add content to your story."),
  check("userId")
    .exists({ checkFalsy: true })
    .withMessage("Only valid users can create stories.")
];

const responseValidator = [
  check("content")
    .exists({checkFalsy: true })
    .withMessage("Please provide a response."),
]

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = new Error("Bad Request");
    err.status = 400;
    err.title = "Bad Request";
    err.errors = errors;

    console.log(`Errors:  ${errors}`)

    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
  signUpValidator,
  loginValidator,
  storyValidator,
  responseValidator,
};

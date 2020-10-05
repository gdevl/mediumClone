const { validationResult, check} = require('express-validator');

const signUpValidator = [
    check("username")
        .exists({checkFalsy: true})
        .withMessage("Please provide a valid username."),
    check("email")
        .exists({checkFalsy: true})
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("firstName")
        .exists({checkFalsy: true})
        .withMessage("Please provide a first name."),
    check("lastName")
        .exists({checkFalsy: true})
        .withMessage("Please provide a last name."),
    check("password")
        .exists({checkFalsy: true})
        .withMessage("Please provide a valid password.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        // .isLength({ max: 50 })
        // .withMessage('Confirm Password must not be more than 50 characters long')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new Error('Confirm Password does not match Password');
            }
            return true;
        }),
]


const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = new Error("Bad Request");
        err.status = 400;
        err.title = "Bad Request";
        err.errors = errors;
        return next(err);
    }
    next();
}


module.exports = {
    handleValidationErrors,
    signUpValidator,
}

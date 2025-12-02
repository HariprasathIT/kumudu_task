import { body, validationResult } from "express-validator";

export const validateRegister = [
  // NAME validation
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 4 }).withMessage("Name must be at least 4 characters long")
    .matches(/^[A-Za-z\s]+$/).withMessage("Name should contain only letters and spaces"),

  // EMAIL validation
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),

  // PASSWORD validation (strong password)
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[\W_]/).withMessage("Password must contain at least one special character"),

  // COMMON VALIDATION HANDLER
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  }
];

export const validateLogin = [
  // EMAIL validation
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),

  // PASSWORD validation
  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  }
];

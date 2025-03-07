import { check } from "express-validator";

const signupValidationRules = [
  check("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .bail()
    .isLength({ min: 3 }).withMessage("Name too short"),
  
  check("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .bail()
    .isEmail().withMessage("Invalid email format"),
  
  check("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .bail()
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
];

export default signupValidationRules;

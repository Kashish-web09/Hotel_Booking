import { body } from "express-validator";

export const registerRules=[
        body('name').trim().notEmpty().withMessage("Name is required"),
    body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email id"),
    body('password').notEmpty().withMessage('Password is required').isLength({min:8,max:18}).withMessage("Password must be at least 8 characters loon"),

];

export const loginRule=[
            body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email id"),
    body('password').notEmpty().withMessage('Password is required')

];

export const forgotPassRules=[
                body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email id"),

];

export const resetPassRules=[
            body('password').notEmpty().withMessage('Password is required')

];
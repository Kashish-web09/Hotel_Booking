import { body } from "express-validator";


export const userRegisterRules=[
    body('name').trim().notEmpty().withMessage("Name is required"),
    body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email id"),
    body('phoneNo').notEmpty().withMessage("Mobile no is required").isMobilePhone("en-IN").withMessage("Enter a valid mobile number"),
    body('password').notEmpty().withMessage('Password is required').isLength({min:8,max:18}).withMessage("Password must be at least 8 characters loon"),
    body('role').notEmpty().withMessage("Please select a role")
]


export const userLoginRules=[
        body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email id"),
    body('password').notEmpty().withMessage('Password is required')

]


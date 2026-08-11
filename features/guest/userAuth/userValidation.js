import { body } from "express-validator";


export const userRegisterRules=[
    body('name').trim().notEmpty().withMessage("Name is required"),
    body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email id"),
    body('phoneNo').notEmpty().withMessage("Mobile no is required").isMobilePhone("en-IN").withMessage("Enter a valid mobile number"),
    body('password').notEmpty().withMessage('Password is required').isLength({min:8,max:18}).withMessage("Password must be at least 8 characters long"),
    body('role').notEmpty().withMessage("Please select a role"),
    body('confirmPassword').notEmpty().withMessage("Re-enter the password").custom((value,{req})=>{
    if(value!==req.body.password){
        throw new Error('Password do not match')
    }
    return true
})

]


export const userLoginRules=[
        body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email id"),
    body('password').notEmpty().withMessage('Password is required'),
]

export const forgotPassRules=[
            body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter a valid email id"),

]
export const resetPassrules=[
        body('password').notEmpty().withMessage('Password is required').isLength({min:8,max:18}).withMessage("Password must be at least 8 characters long")

]
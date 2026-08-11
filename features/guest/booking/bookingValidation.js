import { body } from "express-validator";


export const bookingrule=[
    body('checkIn').notEmpty().withMessage('Enter the check-in date').isISO8601().withMessage("Enter a valid check-in ddate"),
    body('checkOut').notEmpty().withMessage('Enter the check-in date').isISO8601().withMessage("Enter a valid check-out date"),
    body('guests').notEmpty().withMessage("Enter a valid number")
]
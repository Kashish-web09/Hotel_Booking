import { body } from "express-validator";

export const travelRules=[
    body("category")
        .notEmpty()
        .withMessage("Select a category type")
        .isIn([
            "Heritage cuisine trails",
            "Hill stations and mountains",
            "Cities and cafes"
        ])
        .withMessage("Invalid bed type"),
body('country').notEmpty().withMessage('Country name is required'),
body('city').notEmpty().withMessage('City name is required'),


]

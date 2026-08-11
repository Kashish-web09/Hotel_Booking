import { body } from "express-validator";

export const roomrules = [


    body("roomNumber")
        .trim()
        .notEmpty()
        .withMessage("Room number is required"),

    body("roomType")
        .notEmpty()
        .withMessage("Select a room type")
        .isIn([
            "Single",
            "Double",
            "Twin",
            "Deluxe",
            "Suite",
            "Family",
            "Executive"
        ])
        .withMessage("Invalid room type"),

    body("floor")
        .notEmpty()
        .withMessage("Floor number is required")
        .isInt()
        .withMessage("Floor must be a number"),

    body("maxGuests")
        .notEmpty()
        .withMessage("Maximum guests is required")
        .isInt({ min: 1 })
        .withMessage("Maximum guests must be at least 1"),

    body("bedType")
        .notEmpty()
        .withMessage("Select a bed type")
        .isIn([
            "Single",
            "Double",
            "Queen",
            "King",
            "Twin"
        ])
        .withMessage("Invalid bed type"),

    body("bedCount")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Bed count must be at least 1"),

    body("pricePerNight")
        .notEmpty()
        .withMessage("Price per night is required")
        .isFloat({ min: 0 })
        .withMessage("Price must be 0 or greater"),

    body("size")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Room size must be 0 or greater"),

    body("description")
        .optional()
        .trim(),

    body("status")
        .optional()
        .isIn([
            "Available",
            "Maintenance",
            "Cleaning"
        ])
        .withMessage("Invalid room status"),

    body("isSmokingAllowed")
        .optional()
        .isBoolean()
        .withMessage("Invalid smoking permission"),

    body("hasBalcony")
        .optional()
        .isBoolean()
        .withMessage("Invalid balcony value"),

    body("hasAC")
        .optional()
        .isBoolean()
        .withMessage("Invalid AC value")
];

export const updateRoomrules = [

    body("roomNumber")
        .trim()
        .notEmpty()
        .withMessage("Room number is required"),

    body("roomType")
        .notEmpty()
        .withMessage("Select a room type")
        .isIn([
            "Single",
            "Double",
            "Twin",
            "Deluxe",
            "Suite",
            "Family",
            "Executive"
        ])
        .withMessage("Invalid room type"),

    body("floor")
        .notEmpty()
        .withMessage("Floor number is required")
        .isInt()
        .withMessage("Floor must be a number"),

    body("maxGuests")
        .notEmpty()
        .withMessage("Maximum guests is required")
        .isInt({ min: 1 })
        .withMessage("Maximum guests must be at least 1"),

    body("bedType")
        .notEmpty()
        .withMessage("Select a bed type")
        .isIn([
            "Single",
            "Double",
            "Queen",
            "King",
            "Twin"
        ])
        .withMessage("Invalid bed type"),

    body("bedCount")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Bed count must be at least 1"),

    body("pricePerNight")
        .notEmpty()
        .withMessage("Price per night is required")
        .isFloat({ min: 0 })
        .withMessage("Price must be 0 or greater"),

    body("size")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Room size must be 0 or greater"),

    body("description")
        .optional()
        .trim(),

    body("status")
        .optional()
        .isIn([
            "Available",
            "Maintenance",
            "Cleaning"
        ])
        .withMessage("Invalid room status"),

    body("isSmokingAllowed")
        .optional()
        .isBoolean()
        .withMessage("Invalid smoking permission"),

    body("hasBalcony")
        .optional()
        .isBoolean()
        .withMessage("Invalid balcony value"),

    body("hasAC")
        .optional()
        .isBoolean()
        .withMessage("Invalid AC value")
];
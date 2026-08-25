import { body } from "express-validator";

export const feedbackRule = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email"),

    body("phoneNo")
        .trim()
        .notEmpty()
        .withMessage("Mobile number is required")
        .matches(/^\d{10}$/)
        .withMessage("Enter a valid 10-digit mobile number"),

    body("messageType")
        .notEmpty()
        .withMessage("Message type is required")
        .isIn(["Inquiry", "Complaint", "Feedback"])
        .withMessage("Invalid message type"),

    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ min: 10, max: 180 })
        .withMessage("Message must be between 10 and 180 characters")
];
import { body } from "express-validator";

export const hotelrules = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Hotel name is required"),

    body("desc")
        .trim()
        .notEmpty()
        .withMessage("Hotel description is required"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Hotel address is required"),

    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required"),

    body("state")
        .trim()
        .notEmpty()
        .withMessage("State is required"),

    body("country")
        .trim()
        .notEmpty()
        .withMessage("Country is required"),

    body("pincode")
        .trim()
        .notEmpty()
        .withMessage("Pincode is required"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Mobile number is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Enter a valid email address"),

    body("checkInTime")
        .trim()
        .notEmpty()
        .withMessage("Check-in time is required"),

    body("checkOutTime")
        .trim()
        .notEmpty()
        .withMessage("Check-out time is required"),

];
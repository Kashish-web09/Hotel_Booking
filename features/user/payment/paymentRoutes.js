import express from "express";
import paymentController from "./paymentController.js";
import { authorize } from "../../../middleware/adminMiddleware.js";
const paymentRoutes = express.Router();

const paymentsController = new paymentController();


// ==========================================
// GUEST ROUTES
// ==========================================

// GET PAYMENT PAGE
paymentRoutes.get("/",authorize("Guest"), (req, res, next) => {
    paymentsController.getPaymentPage(req, res, next);
});


// CREATE PAYMENT + BOOKING
paymentRoutes.post("/", authorize("Guest"),(req, res, next) => {
    paymentsController.createPayment(req, res, next);
});


// GUEST CANCEL + REFUND
paymentRoutes.post("/refund",authorize("Guest"), (req, res, next) => {
    paymentsController.paymentRefund(req, res, next);
});


// ==========================================
// ADMIN ROUTES
// ==========================================

// GET ALL PAYMENTS
paymentRoutes.get("/admin",authorize("Admin"), (req, res, next) => {
    paymentsController.getAllPayments(req, res, next);
});


// SEARCH PAYMENT
paymentRoutes.get("/admin/search",authorize("Admin"), (req, res, next) => {
    paymentsController.searchPayment(req, res, next);
});


// UPDATE PAYMENT STATUS
paymentRoutes.post("/admin/update",authorize("Admin"), (req, res, next) => {
    paymentsController.updatePayment(req, res, next);
});


// ADMIN REFUND
paymentRoutes.post("/admin/refund",authorize("Admin"), (req, res, next) => {
    paymentsController.refundPayment(req, res, next);
});


export default paymentRoutes;
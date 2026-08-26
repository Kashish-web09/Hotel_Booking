import mongoose from "mongoose";
import { paymentSchema } from "./paymentScehma.js";

const paymentModel = mongoose.model("payment", paymentSchema);

export default class paymentRepo {
    // ==========================================
    // CREATE PAYMENT
    // ==========================================

    async createPayment(paymentData) {
        const payment = new paymentModel(paymentData);
        return await payment.save();
    }

    // ==========================================
    // GET PAYMENT BY ID
    // ==========================================

    async getPaymentById(paymentId) {
        return await paymentModel.findById(paymentId);
    }

    // ==========================================
    // GET PAYMENT BY BOOKING ID
    // ==========================================

    async getPaymentByBookingId(bookingId) {
        return await paymentModel.findOne({
            bookingId
        });
    }

    // ==========================================
    // GET ALL PAYMENTS FOR ADMIN
    // ==========================================

    async getAllPayments(adminId) {
        const payments = await paymentModel
            .find({
                adminId
            })
            .sort({
                createdAt: -1
            });

        return payments;
    }

    // ==========================================
    // GET ALL PAYMENTS FOR GUEST
    // ==========================================

    async getUserPayments(userId) {
        return await paymentModel
            .find({
                userId
            })
            .populate("bookingId")
            .sort({
                createdAt: -1
            });
    }

    // ==========================================
    // UPDATE PAYMENT STATUS
    // ==========================================

    async updatePaymentStatus(bookingId, status) {
        return await paymentModel.findOneAndUpdate(
            {
                bookingId
            },
            {
                status
            },
            {
                new: true
            }
        );
    }

    // ==========================================
    // REFUND PAYMENT
    // ==========================================

    async refundPayment(paymentId) {
        return await paymentModel.findByIdAndUpdate(
            paymentId,
            {
                status: "Refunded"
            },
            {
                new: true
            }
        );
    }

    // ==========================================
    // SEARCH PAYMENT
    // ==========================================

    async searchPayment(bookingId, adminId) {
        return await paymentModel.find({
            bookingId,
            adminId
        });
    }
}
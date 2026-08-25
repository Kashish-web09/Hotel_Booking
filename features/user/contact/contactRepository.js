import mongoose from "mongoose";
import applicationError from "../../../errorFile/applicationLevelError.js";
import { feedbackSchema } from "./contactSchema.js";

const feedbackModel =
    mongoose.models.feedback ||
    mongoose.model("feedback", feedbackSchema);


export default class feedbackRepo {

    // =========================
    // CREATE FEEDBACK
    // =========================
async createFeedback(data) {
    try {


        const newFeedback = new feedbackModel(data);

        await newFeedback.save();


        return newFeedback;

    } catch (err) {


        
        throw new applicationError(
            err.message,
            500
        );
    }
}


    // =========================
    // GET FEEDBACK
    // userId exists -> Guest
    // userId missing -> Admin
    // =========================
    async getAllFeedback(userId = null) {
        try {

            let filter = {};

            if (userId) {
                filter.userId = userId;
            }

            return await feedbackModel
                .find(filter)
                .sort({ createdAt: -1 });

        } catch (err) {

            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }


    // =========================
    // UPDATE STATUS
    // =========================
    async updateStatus(feedbackId, status) {
        try {

            return await feedbackModel.findOneAndUpdate(
                { _id: feedbackId },
                {
                    $set: {
                        status: status
                    }
                },
                {
                    returnDocument: "after"
                }
            );

        } catch (err) {

            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }


    // =========================
    // GET SINGLE FEEDBACK
    // =========================
    async getFeedbackByID(id) {
        try {

            return await feedbackModel.findById(id);

        } catch (err) {

            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }


    // =========================
    // FILTER FEEDBACK
    // ADMIN
    // =========================
    async filterFeedback(
        email,
        status,
        messageType
    ) {

        try {

            let filter = {};

            if (email) {
                filter.email = {
                    $regex: email,
                    $options: "i"
                };
            }

            if (status) {
                filter.status = status;
            }

            if (messageType) {
                filter.messageType = messageType;
            }

            return await feedbackModel
                .find(filter)
                .sort({ createdAt: -1 });

        } catch (err) {

            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }
}
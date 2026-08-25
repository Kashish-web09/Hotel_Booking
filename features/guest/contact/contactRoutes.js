import express from 'express';
import feedbackController from '../../guest/contact/contactController.js';
import validator from '../../../middleware/commonValidation.js';
import { feedbackRule } from './contactValidation.js';

const feedbackRoutes = express.Router();

const feedbacksController = new feedbackController();


// ==========================================
// GET FEEDBACK PAGE
// Admin -> feedback
// Guest -> feedback
// ==========================================
feedbackRoutes.get('/', (req, res, next) => {

    feedbacksController.getFeedbackPage(req, res, next);

});


// ==========================================
// GET CONTACT / FEEDBACK FORM
// ==========================================
feedbackRoutes.get('/contact', (req, res, next) => {

    feedbacksController.feedbackPage(req, res, next);

});


// ==========================================
// CREATE FEEDBACK
// ==========================================
feedbackRoutes.post(
    '/',
    validator(feedbackRule),
    (req, res, next) => {

        feedbacksController.feedback(req, res, next);

    }
);


// ==========================================
// ADMIN - FILTER FEEDBACK
// ==========================================
feedbackRoutes.get('/filter', (req, res, next) => {

    feedbacksController.filterFeedback(req, res, next);

});


// ==========================================
// ADMIN - UPDATE STATUS
// ==========================================
feedbackRoutes.post('/update-status/:id', (req, res, next) => {

    feedbacksController.updateStatus(req, res, next);

});


// ==========================================
// ADMIN - FEEDBACK DETAILS
// ==========================================
feedbackRoutes.get('/:id', (req, res, next) => {

    feedbacksController.getFeedbackDetails(req, res, next);

});


export default feedbackRoutes;
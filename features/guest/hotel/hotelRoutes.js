import express from 'express';

import hotelController from './hotelController.js';
import { authorize } from '../../../middleware/adminMiddleware.js';
import validator from '../../../middleware/commonValidation.js';
import { upload } from '../../../middleware/fileUploadMiddleware.js';
import { hotelrules } from './hotelValidation.js';

const hotelRoute = express.Router();

const hotelsController = new hotelController();


// =========================
// HOTEL LIST
// =========================

hotelRoute.get('/', (req, res, next) => {
    hotelsController.getAllHotels(req, res, next);
});


// =========================
// SEARCH
// =========================

hotelRoute.get('/search', (req, res, next) => {
    hotelsController.filterHotel(req, res, next);
});


// =========================
// ADMIN ADD HOTEL
// IMPORTANT: BEFORE /:id
// =========================

hotelRoute.get(
    '/add',
    authorize("Admin"),
    (req, res, next) => {
        hotelsController.addHotelPage(req, res, next);
    }
);

hotelRoute.post(
    '/add',
    authorize("Admin"),
    upload.single('hotelImage'),
    validator(hotelrules),
    (req, res, next) => {
        hotelsController.addHotel(req, res, next);
    }
);


// =========================
// ADMIN UPDATE HOTEL
// =========================

hotelRoute.get(
    '/update/:id',
    authorize("Admin"),
    (req, res, next) => {
        hotelsController.updateHotelPage(req, res, next);
    }
);

hotelRoute.post(
    '/update/:id',
    authorize("Admin"),
    upload.single('hotelImage'),
    validator(hotelrules),
    (req, res, next) => {
        hotelsController.updateHotel(req, res, next);
    }
);


// =========================
// HOTEL DETAILS
// MUST COME AFTER /add
// AND /update
// =========================

hotelRoute.get('/:id', (req, res, next) => {
    hotelsController.hotelDetailsPage(req, res, next);
});


// =========================
// DELETE HOTEL
// =========================

hotelRoute.post(
    '/:id',
    authorize("Admin"),
    (req, res, next) => {
        hotelsController.removeHotel(req, res, next);
    }
);


export default hotelRoute;
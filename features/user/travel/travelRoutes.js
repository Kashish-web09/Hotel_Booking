import express from 'express';
import travelController from './travelController.js';
import { upload } from '../../../middleware/fileUploadMiddleware.js';
import validator from '../../../middleware/commonValidation.js'
import { travelRules } from './travelValidation.js';
import { authorize } from '../../../middleware/adminMiddleware.js';
const travelRoutes=express.Router();

const travelsController=new travelController();

travelRoutes.get('/',authorize("Admin"),(req,res,next)=>{
    travelsController.getAll(req,res,next)
})
travelRoutes.get('/add',authorize("Admin"),upload.single('image'),(req,res,next)=>{
    travelsController.addPage(req,res,next)
})
travelRoutes.post('/add',authorize("Admin"),upload.single('image'),validator(travelRules),(req,res,next)=>{
    travelsController.add(req,res,next)
})
travelRoutes.get('/update/:id',authorize("Admin"),upload.single('image'),(req,res,next)=>{
    travelsController.updateDestinationPage(req,res,next)
})

travelRoutes.post('/update/:id',authorize("Admin"),upload.single('image'),validator(travelRules),(req,res,next)=>{
    travelsController.updateDestination(req,res,next)
})
travelRoutes.post('/delete/:id',authorize("Admin"),(req,res,next)=>{
    travelsController.deleteDestination(req,res,next)
})

export default travelRoutes;
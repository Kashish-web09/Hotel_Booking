import travelRepo from "./travelRepository.js";
import logger from '../../../middleware/loggerMiddleware.js'


export default class travelController{
    constructor(){
        this.travelRepo=new travelRepo();
    }
    async getAll(req,res,next){
        try {
            const destination=await this.travelRepo.getAll();
            
            return res.render('travel',{
                title:"Destination Page",
                destination,
                errors:[],
                oldData:{}
            })
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
    async addPage(req,res,next){
        try {
            return res.render('addDestination',{
                title:"Add Travel Destination Page",
                errors:[],
                oldData:{}
            })
        } catch (err) {
                     logger.error(err.message);
            next(err)
   
        }
    }
async add(req, res, next) {
    try {

        if (req.validationErrors) {
            return res.status(400).render("addDestination", {
                title: "Add Travel Destination Page",
                errors: req.validationErrors,
                oldData: req.body
            });
        }

        const {
            category,
            country,
            city,
            isActive
        } = req.body;

        const image = req.file
            ? req.file.filename
            : "default.png";

        const newDestination = {
            category,
            country,
            city,
            image,
            isActive
        };

        await this.travelRepo.addDestination(newDestination);

        logger.info("Destination added successfully!");

        return res.redirect("/api/travel");

    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}
async updateDestinationPage(req,res,next){
            try {
                const {id}=req.params;
                const destination=await this.travelRepo.getById(id);
            return res.render('updateDestination',{
                title:"Update Travel Destination Page",
                destination,
                errors:[],
                oldData:req.body
            })
        } catch (err) {
                     logger.error(err.message);
            next(err)
   
        }

}

async updateDestination(req, res, next) {
    try {

        const { id } = req.params;

        if (req.validationErrors) {

            const destination =
                await this.travelRepo.getById(id);

            return res.status(400).render(
                "updateDestination",
                {
                    title: "Update Travel Destination Page",
                    destination,
                    errors: req.validationErrors,
                    oldData: req.body
                }
            );
        }

        const {
            category,
            isActive
        } = req.body;

        const image = req.file
            ? req.file.filename
            : undefined;

        await this.travelRepo.updateDestination(
            id,
            category,
            image,
            isActive
        );

        logger.info(
            `Destination updated successfully ${id}!`
        );

        return res.redirect("/api/travel");

    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}
    async deleteDestination(req,res,next){
        try {
const {id}=req.params;
 await this.travelRepo.deleteDestination(id);
logger.info(`Destination deleted successfully ${id}!`)
    return res.redirect('/api/travel')

        } catch (err) {
                       logger.error(err.message);
            next(err)
   
        }
    }
}

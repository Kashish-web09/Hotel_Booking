import hotelRepo from "./hotelRepository.js";
import logger from '../../../middleware/loggerMiddleware.js'

export default class hotelController{
    constructor(){
        this.hotelRepo=new hotelRepo();
    }
    async getAllHotels(req,res,next){
        try {
            const hotels=await this.hotelRepo.getAllHotels();
            return res.render('guest/hotel',{
                title:"Hotel List Page",
                hotels,
                errors:[],
                oldData:{}
            })
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
async hotelDetailsPage(req,res,next){
    try {
        
    } catch (err) {
        
    }
}

    async filterHotel(req,res,next){
        try {
            const {city,name}=req.query;
            const hotels=await this.hotelRepo.filterHotel(city,name);
                        return res.render('guest/hotel',{
                title:"Hotel List Page",
                hotels,
                errors:[],
                oldData:{}
            })

        } catch (err) {
                        logger.error(err.message);
            next(err)

        }
    }
}
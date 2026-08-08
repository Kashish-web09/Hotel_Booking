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
async hotelDetailsPage(req, res, next) {
    try {
        const { id } = req.params;
        const hotel = await this.hotelRepo.getHotelDetailsById(id);
        if (!hotel) {

            return res.status(404).render("guest/hotelDetails", {
                title: "Hotel Not Found",
                message: "Hotel not found"
            });
        }

        return res.render("guest/hotelDetails", {
            title: `${hotel.name} Details`,
            hotel:hotel,
            errors: [],
            oldData: {}
        });

    } catch (err) {
            logger.error(err.message);
        next(err);
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
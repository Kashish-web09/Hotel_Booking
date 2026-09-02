import hotelRepo from "./hotelRepository.js";
import logger from '../../../middleware/loggerMiddleware.js'

export default class hotelController{
    constructor(){
        this.hotelRepo=new hotelRepo();
    }
async getAllHotels(req, res, next) {
    try {

        if (req.role === "Admin") {

            const hotels =
                await this.hotelRepo.getHotelsByUser(req.userId);

            return res.render("adminHotel", {
                title: "Hotel Page",
                hotels,
                errors: [],
                oldData: {}
            });
        }

        const hotels =
            await this.hotelRepo.getAllHotels();

        return res.render("hotel", {
            title: "Hotel List Page",
            hotels,
            errors: [],
            oldData: {}
        });

    } catch (err) {

        logger.error(err.message);
        next(err);

    }
}
async hotelDetailsPage(req, res, next) {
    try {
        const { id } = req.params;
        const hotel = await this.hotelRepo.getHotelDetailsById(id);
        if (!hotel) {

            return res.status(404).render("hotelDetails", {
                title: "Hotel Not Found",
                message: "Hotel not found"
            });
        }

        return res.render("hotelDetails", {
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
                        return res.render('hotel',{
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
    // admin side fucntion

    async addHotelPage(req,res,next){
        try {
            return res.render('addHotel',{
                title:"Add Hotel Page",
                errors:[],
                oldData:{}
            })
        } catch (err) {
                        logger.error(err.message);
                next(err)
    
        }
    }
        async addHotel(req,res,next){
            try {
                if(req.validationErrors){
                    return res.render('addHotel',{
                        title:"Add Hotel Page",
                        errors:req.validationErrors,
                        oldData:req.body
                    })
                }
                const {
                    name,
desc,
                    address,
                    city,
                    state,
                    country,
                    pincode,
                    phone,
                    email,
                    checkInTime,
                    checkOutTime,
                    status
                }=req.body;
    //             const location=`${city}, ${state}, ${country}`;
    //             console.log("Generating AI description...");
    // console.log("Hotel:", name);
    // console.log("Location:", location);
    // const desc=await generateHotelDescription({
    //     hotelName:name,
    //     location
    // });
    // console.log("AI DESCRIPTION:", desc);
                const image=req.file ? req.file.filename :"default.png";
    
                const existingHotel=await this.hotelRepo.findHotel(name,city);
    
                if(existingHotel){
                        logger.warn(`Hotel ${name} already exists in ${city}`);
    
        return res.render("addHotel", {
            title: "Add Hotel Page",
            errors: ["Hotel already exists in this city"],
            oldData: req.body
        });
    
                }
    
                const newHotel={
                    name,desc,address,city,state,
                    country,pincode,
                    phone,email,hotelImage:image,
                    checkInTime,checkOutTime,status,
                    createdBy:req.userId
                };
                await this.hotelRepo.createHotel(newHotel);
                                logger.info(`Hotel ${name} in ${city} created scucessfully `)
         return res.redirect('/api/hotel')
    
            } catch (err) {
                            logger.error(err.message);
                next(err)
    
            }
        }
    async removeHotel(req, res, next) {
        try {
    
            const { id } = req.params;
    
            // Check hotel exists
            const hotel = await this.hotelRepo.getHotelById(id);
    
            if (!hotel) {
                logger.warn(`Hotel not found ${id}`);
                return res.redirect("/api/hotel");
            }
    
            // Delete all rooms of this hotel
            // await this.roomRepo.deleteRoomsByHotelId(id);
    
            // Delete hotel
            await this.hotelRepo.removeHotel(id);
    
            logger.info(`Hotel and all its rooms deleted successfully ${id}`);
    
            return res.redirect("/api/hotel");
    
        } catch (err) {
    
            logger.error(err.message);
            next(err);
    
        }
    }
    async updateHotelPage(req, res, next) {
        try {
            const { id } = req.params;
    
    
            const hotel = await this.hotelRepo.getHotelById(id);
    
            return res.render('updateHotel', {
                title: "Update Hotel Data",
                hotel,
                errors: [],
                oldData: req.body
            });
    
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }
    async updateHotel(req, res, next) {
        try {
    
            const { id } = req.params;
    
    
            const {
                name,
                desc,
                address,
                phone,
                email,
                checkInTime,
                checkOutTime,
                status
            } = req.body;
            const data = {
                name,
                desc,
                address,
                phone,
                email,
                checkInTime,
                checkOutTime,
                status
            };
    
            if (req.file) {
                data.image = req.file.filename;
            }
    
            await this.hotelRepo.updateHotelById(id, data);
    
            res.redirect('/api/hotel');
    
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }
}
import hotelrepo from "./hotelRepository.js";
import logger from '../../../middleware/loggerMiddleware.js'
import adminUserRepo from "../adminAuth/adminRepository.js";
import roomRepo from "../rooms/roomsRepository.js";
export default class hotelController{
    constructor(){
        this.hotelrepo=new hotelrepo();
        this.adminUserRepo=new adminUserRepo();
        this.roomRepo=new roomRepo();
    }

    async getAllHotels(req,res,next){
        try {
     const hotels=await this.hotelrepo.getAllHotel();
     return res.render('admin/hotel',{
        title:"Hotel Page",
        hotels,
        errors:[],
        oldData:{}
     })       
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
async addHotelPage(req,res,next){
    try {
        return res.render('admin/addHotel',{
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
                return res.render('admin/addHotel',{
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

            const image=req.file ? req.file.filename :"default.png";
            const adminUser=await this.adminUserRepo.findUserById(req.adminId);
            const existingHotel=await this.hotelrepo.findHotel(name,city);
            if(existingHotel){
                    logger.warn(`Hotel ${name} already exists in ${city}`);

    return res.render("admin/addHotel", {
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
                createdBy:adminUser._id
            };
            await this.hotelrepo.createHotel(newHotel);
                            logger.info(`Hotel ${name} in ${city} created scucessfully `)
     return res.redirect('/api/admin/hotel')

        } catch (err) {
                        logger.error(err.message);
            next(err)

        }
    }
async removeHotel(req, res, next) {
    try {

        const { id } = req.params;

        // Check hotel exists
        const hotel = await this.hotelrepo.getOneHotel(id);

        if (!hotel) {
            logger.warn(`Hotel not found ${id}`);
            return res.redirect("/api/admin/hotel");
        }

        // Delete all rooms of this hotel
        await this.roomRepo.deleteRoomsByHotelId(id);

        // Delete hotel
        await this.hotelrepo.removeHotel(id);

        logger.info(`Hotel and all its rooms deleted successfully ${id}`);

        return res.redirect("/api/admin/hotel");

    } catch (err) {

        logger.error(err.message);
        next(err);

    }
}
async updateHotelPage(req, res, next) {
    try {
        const { id } = req.params;


        const hotel = await this.hotelrepo.getOneHotel(id);

        return res.render('admin/updateHotel', {
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

        await this.hotelrepo.updateHotelById(id, data);

        res.redirect('/api/admin/hotel');

    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}
}
import logger from "../../../middleware/loggerMiddleware.js";
import hotelrepo from "../hotel/hotelRepository.js";
import roomRepo from "./roomsRepository.js";


export default class roomController{
    constructor(){
        this.roomRepo=new roomRepo();
        this.hotelrepo=new hotelrepo();
    }
    async getAllRooms(req,res,next){
try {
    const rooms=await this.roomRepo.getAllRooms();
    return res.render('admin/room',{
    title:"Rooms page",
    rooms,
    errors:[],
    oldData:{}
})
} catch (err) {
    logger.error(err.message)
    next(err)
}
    }
    
    async addRoomPage(req,res,next){
try {
const hotels=await this.hotelrepo.getAllHotel();
    return res.render('admin/addRoom',{
        title:"Add Room Page",
        hotels,
        errors:[],
        oldData:req.body
    })
} catch (err) {
        logger.error(err.message)
    next(err)

}
    }
async addRoom(req, res, next) {
    try {
        const {
            hotelId,
            roomNumber,
            roomType,
            floor,
            maxGuests,
            bedType,
            bedCount,
            pricePerNight,
            size,
            amenities,
            status,
            description,
            isSmokingAllowed,
            hasBalcony,
            hasAC
        } = req.body;
        const image=req.file ? req.file.filename:'default.png'
        const roomData = {
            hotelId,
            roomNumber,
            roomType,
            floor,
            maxGuests,
            bedType,
            bedCount,
            pricePerNight,
            size,
            amenities,
            images:[image],
            status,
            description,
            isSmokingAllowed:isSmokingAllowed==="false",
            hasBalcony:hasBalcony==="true",
            hasAC:hasAC==="true"
        };

        await this.roomRepo.addRoom(roomData);
logger.info(`Room added successfully!`)
        return res.redirect("/api/admin/rooms");

    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}   
 async editPage(req,res,next){
try{
     const {id}=req.params;
     
     const room=await this.roomRepo.getRoomById(id);
     if(!room){
        logger.warn("Room not found")
        return res.status(404).send("Room not found!")
     }
    return res.render('admin/editRoom',{
    title:"Edit Room Page",
    room,
    errors:[],
    oldData:{}
})
}catch(err){
    logger.error(err.message);
    next(err)
}
    }

    async edit(req,res,next){
        try {
            const data=req.body;
            const {id}=req.params
            const result=await this.roomRepo.updadeRoom(id,data);

            logger.info(`Room update successfully ${id}`)

            return res.redirect('/api/admin/rooms')
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
    async filterRoom(req,res,next){
try {
    
    const {hotelId,status,roomType,roomNumber}=req.query;

    const rooms=await this.roomRepo.filterRoom(hotelId,status,roomType,roomNumber);
    return res.render('admin/room',{
        title:"Rooms Page",
        rooms,
        errors:[],
        oldData:{}
    })
} catch (err) {
                logger.error(err.message);
        next(err);

}
    }
    async deleteRoom(req,res,next){
try {
    const {id}=req.params;
    const result=await this.roomRepo.deleteRoom(id);
    if(!result){
logger.warn(`Room not found on this ${id}`)
        return res.status(404).send("Room not found")
    }
    logger.info(`Room deleted successfully ${id}`)
    return res.redirect('/api/admin/rooms')
} catch (err) {
            logger.error(err.message);
        next(err);

}
    }
}
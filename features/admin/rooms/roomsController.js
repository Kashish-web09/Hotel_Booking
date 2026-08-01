import logger from "../../../middleware/loggerMiddleware.js";
import roomRepo from "./roomsRepository.js";

export default class roomController{
    constructor(){
        this.roomRepo=new roomRepo();
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
    return res.render('admin/addRoom',{
        title:"Add Room Page",
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

    }
    async filterRoom(req,res,next){

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
    async getRoomByHotel(req,res,next){

    }
    async roomNumberExists(req,res,next){

    }
    async updateRoomStatus(req,res,next){

    }
}
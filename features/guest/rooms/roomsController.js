import roomRepo from "./roomsRepository.js";
import logger from '../../../middleware/loggerMiddleware.js'


export default class roomController{
    constructor(){
        this.roomRepo=new roomRepo()
    }
    async getAllRoom(req,res,next){
        try {
            const rooms=await this.roomRepo.getAll();
            return res.render('guest/room',{
                title:"Room Page",
                rooms,
                errors:[],
                oldData:{}
            })
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
    async searchRoom(req,res,next){
        try {
            const {guests,roomType}=req.query;
            const rooms=await this.roomRepo.searchRoom(guests,roomType);

            return res.render('guest/room',{
                title:"Room Page",
                rooms,
                errors:[],
                oldData:req.query
            })

        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
    async roomDetailsPage(req,res,next){
        try {
            const {id}=req.params
            const room=await this.roomRepo.getRoomById(id);
             if (!room) {
            return res.status(404).render("guest/roomDetails", {
                title: "Room Not Found",
                room: null,
                errors: [],
                oldData: {}
            });
        }
            return res.render('guest/roomDetails',{
                title:`${room.roomType} Room`,
                room,
                errors:[],
                oldData:{}
            })
        } catch (err) {
                        logger.error(err.message);
            next(err)

        }
    }
}
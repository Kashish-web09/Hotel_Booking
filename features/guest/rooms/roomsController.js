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
}
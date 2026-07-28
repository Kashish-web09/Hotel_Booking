import { validationResult } from "express-validator";

export const validator=(rules,view)=>{
    return async (req,res,next)=>{
        await Promise.all(rules.map(r=>r.run(req)));
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render(view,{
                errors:errors.array(),
                oldData:req.body
            })
        }
        next();
    }

}
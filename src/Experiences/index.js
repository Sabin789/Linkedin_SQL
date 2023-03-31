import  Express  from "express";
import createHttpError from "http-errors";
import experience from "./model.js"

const ExperienceRouter=Express.Router()


ExperienceRouter.post("/User/:UserId/Experience", async(req,res,next)=>{
    try {
        const {ExperienceId}= await experience.create({
            role:req.body.role,
            company:req.body.company,
            area:req.body.area,
            description:req.body.description,
            image:req.body.image,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            userId:req.params.UserId

        })
        res.status(201).send({ExperienceId})
    } catch (error) {
        next(error)
    }
})

ExperienceRouter.get("/User/:UserId/Experience", async(req,res,next)=>{
    try {
        const Experiences= await experience.findAndCountAll({
           where:{
            userId:req.params.UserId
           }
        })
        res.send(Experiences)
    } catch (error) {
        next(error)
    }
})

ExperienceRouter.get("/User/:UserId/Experience/:ExperienceId", async(req,res,next)=>{
    try {
        const Experience=await experience.findByPk(req.params.ExperienceId)
        if(Experience){
        res.send(Experience)
        }else{
            next(createHttpError(404,`Expereince with id: ${req.params.ExperienceId} does not exist`))

        }
    } catch (error) {
        next(err)
    }
})

ExperienceRouter.put("/User/:UserId/Experience/:ExperienceId", async(req,res,next)=>{
    try {
        const [numberOfUpdatedRows,updatedRecords]=await experience.update(req.body,{where:{ExperienceId:req.params.ExperienceId},returning:true})
        if(numberOfUpdatedRows===1){
            res.send(updatedRecords[0])
        }else{
            next(createHttpError(404,`Experience with id: ${req.params.ExperienceId} does not exist`))
        }
    } catch (error) {
        next(err)
    }
})

ExperienceRouter.delete("/User/:UserId/Experience/:ExperienceId", async(req,res,next)=>{
    try {
        const numberOfDeletedRows= await experience.destroy({where:{ExperienceId:req.params.ExperienceId}})
        if(numberOfDeletedRows===1){
            res.status(204).send()
        }else{
            next(createHttpError(404,`Experience with id: ${req.params.ExperienceId} does not exist`))
        }
    } catch (error) {
        next(err)
    }
})


export default ExperienceRouter
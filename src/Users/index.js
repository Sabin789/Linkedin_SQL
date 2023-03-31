import  Express  from "express";
import createHttpError from "http-errors";
import { Model } from "sequelize";
import comment from "../Comments/model.js";
import experience from "../Experiences/model.js";
import post from "../Posts/model.js";
import user from "./model.js"

const UserRouter=Express.Router()

UserRouter.post("/User", async(req,res,next)=>{
    try {
        const {UserId}= await user.create(req.body)
        res.status(201).send({UserId})
    } catch (error) {
        next(error)
    }
})

UserRouter.get("/User", async(req,res,next)=>{
    try {
        const Users= await user.findAndCountAll({
            include:[{model:experience,attributes:["role","company"]},
                     {model:post,attributes:["text","image"]},
                     {model:comment,attributes:["comment","postId"]}]
            
        })
        res.send(Users)
    } catch (error) {
        next(error)
    }
})

UserRouter.get("/User/:UserId", async(req,res,next)=>{
    try {
        const oneUser=await user.findByPk(req.params.UserId)
        if(oneUser){
        res.send(oneUser)
        }else{
            next(createHttpError(404,`User with id: ${req.params.UserId} does not exist`))

        }
    } catch (error) {
        next(err)
    }
})

UserRouter.put("/User/:UserId", async(req,res,next)=>{
    try {
        const [numberOfUpdatedRows,updatedRecords]=await user.update(req.body,{where:{UserId:req.params.UserId},returning:true})
        if(numberOfUpdatedRows===1){
            res.send(updatedRecords[0])
        }else{
            next(createHttpError(404,`User with id: ${req.params.UserId} does not exist`))
        }
    } catch (error) {
        next(err)
    }
})

UserRouter.delete("/User/:UserId", async(req,res,next)=>{
    try {
        const numberOfDeletedRows= await user.destroy({where:{UserId:req.params.UserId}})
        if(numberOfDeletedRows===1){
            res.status(204).send()
        }else{
            next(createHttpError(404,`User with id: ${req.params.UserId} does not exist`))
        }
    } catch (error) {
        next(err)
    }
})


export default UserRouter
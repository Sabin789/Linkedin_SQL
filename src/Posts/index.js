import  Express  from "express";
import createHttpError from "http-errors";
import comment from "../Comments/model.js";
import user from "../Users/model.js";
import post from "./model.js"

const PostRouter=Express.Router()


PostRouter.post("/User/:UserId/Post", async(req,res,next)=>{
    try {
        const {PostId}= await post.create({
            text:req.body.text,
            image:req.body.image,
            userId:req.params.UserId
        })
        res.status(201).send({PostId})
    } catch (error) {
        next(error)
    }
})

PostRouter.get("/User/:UserId/Post", async(req,res,next)=>{
    try {
        const Users= await post.findAndCountAll({
            include:[{model:user,attributes:["name","surname","image"]},
                      {model:comment,attributes:["comment","userId"]}],
            where:{
                userId:req.params.UserId
            }
        })
        res.send(Users)
    } catch (error) {
        next(error)
    }
})

PostRouter.get("/User/:UserId/Post/:PostId", async(req,res,next)=>{
    try {
        const Post=await post.findByPk(req.params.PostId)
        if(Post){
        res.send(Post)
        }else{
            next(createHttpError(404,`Post with id: ${req.params.PostId} does not exist`))

        }
    } catch (error) {
        next(err)
    }
})

PostRouter.put("/User/:UserId/Post/:PostId", async(req,res,next)=>{
    try {
        const [numberOfUpdatedRows,updatedRecords]=await post.update(req.body,{where:{PostId:req.params.PostId},returning:true})
        if(numberOfUpdatedRows===1){
            res.send(updatedRecords[0])
        }else{
            next(createHttpError(404,`Post with id: ${req.params.PostId} does not exist`))
        }
    } catch (error) {
        next(err)
    }
})

PostRouter.delete("/User/:UserId/Post/:PostId", async(req,res,next)=>{
    try {
        const numberOfDeletedRows= await post.destroy({where:{PostId:req.params.PostId}})
        if(numberOfDeletedRows===1){
            res.status(204).send()
        }else{
            next(createHttpError(404,`Post with id: ${req.params.PostId} does not exist`))
        }
    } catch (error) {
        next(err)
    }
})



export default PostRouter
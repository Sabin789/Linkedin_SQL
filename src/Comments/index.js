import  Express  from "express";
import createHttpError from "http-errors";
import post from "../Posts/model.js";
import user from "../Users/model.js";
import comment from "./model.js";


const CommentRouter=Express.Router()

CommentRouter.post("/Post/:postId/comments", async(req,res,next)=>{
    try {
        const {CommentId}= await comment.create({
            comment:req.body.comment,
            userId:req.body.userId,
            postId:req.params.postId
        })
        res.status(201).send({CommentId})
    } catch (error) {
        next(error)
    }
})

CommentRouter.get("/Post/:PostId/comments", async(req,res,next)=>{
    try {
        const Comments= await comment.findAndCountAll({
            include:[{model:user,attributes:["name","surname","image"]},
                    {model:post,attributes:["text","PostId","userId"]}
                    ],
            where:{
                postId:req.params.PostId
            }
        })
        res.send(Comments)
    } catch (error) {
        next(error)
    }
})

CommentRouter.get("/Post/:PostId/comments/:commentId", async(req,res,next)=>{
    try {
        const Comment=await comment.findByPk(req.params.commentId)
        if(Comment){
        res.send(Comment)
        }else{
            next(createHttpError(404,`Comment with id: ${req.params.commentId} does not exist`))

        }
    } catch (error) {
        next(err)
    }
})

CommentRouter.put("/Post/:PostId/comments/:commentId", async(req,res,next)=>{
    try {
        const [numberOfUpdatedRows,updatedRecords]=await comment.update(req.body,{where:{CommentId:req.params.commentId},returning:true})
        if(numberOfUpdatedRows===1){
            res.send(updatedRecords[0])
        }else{
            next(createHttpError(404,`Comment with id: ${req.params.commentId} does not exist`))
        }
    } catch (error) {
        next(err)
    }
})

CommentRouter.delete("/Post/:PostId/comments/:commentId", async(req,res,next)=>{
    try {
        const numberOfDeletedRows= await comment.destroy({where:{CommentId:req.params.commentId}})
        if(numberOfDeletedRows===1){
            res.status(204).send()
        }else{
            next(createHttpError(404,`Comment with id: ${req.params.commentId} does not exist`))
        }
    } catch (error) {
        next(err)
    }
})

export default CommentRouter
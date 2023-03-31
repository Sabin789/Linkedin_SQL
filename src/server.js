import  Express  from "express";
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import { pgConnect } from "./db.js";
import { badRequestHandler,notFoundErrorHandler,genericErrorHandler } from "./errorHandlers.js";
import UserRouter from "./Users/index.js";
import ExperienceRouter from "./Experiences/index.js";
import PostRouter from "./Posts/index.js";
import CommentRouter from "./Comments/index.js";



const port=process.env.PORT || 3001

const server=Express()

server.use(cors())
server.use(Express.json())

server.use("/linkedin",UserRouter)
server.use("/linkedin",ExperienceRouter)
server.use("/linkedin",PostRouter)
server.use("/linkedin",CommentRouter)


server.use(badRequestHandler)
server.use(notFoundErrorHandler)
server.use(genericErrorHandler)


await pgConnect()


server.listen(port,()=>{
    console.table(listEndpoints(server))
  console.log(`Server is running on port ${port}`)
})
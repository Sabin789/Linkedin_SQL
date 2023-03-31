import  sequelize  from "../db.js";
import { DataTypes } from "sequelize";

const comment=sequelize.define("comment",{
    comment:{
        type:DataTypes.STRING(200)
    },
    CommentId:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    }
})

export default comment
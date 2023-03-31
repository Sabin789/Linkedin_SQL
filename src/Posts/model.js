import  sequelize  from "../db.js";
import { DataTypes } from "sequelize";
import comment from "../Comments/model.js";

const post=sequelize.define("post",{
    PostId:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    text:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    image:{
        type:DataTypes.STRING(255),
        allowNull:true
    }
})

post.hasMany(comment,{foreignKey:{name:"postId",allowNull:false}})
comment.belongsTo(post,{foreignKey:{name:"postId",allowNull:false}})

export default post
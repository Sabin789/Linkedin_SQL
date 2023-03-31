import  sequelize  from "../db.js";
import { DataTypes } from "sequelize";
import experience from "../Experiences/model.js";
import post from "../Posts/model.js";
import comment from "../Comments/model.js";

const user= sequelize.define("user",{
    name:{
        type:DataTypes.STRING(50),
        allowNull: false
    },
    UserId:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    surname:{
        type:DataTypes.STRING(50),
        allowNull: false
    },
    email:{
        type:DataTypes.STRING(50),
        allowNull: false
    },
    bio:{
        type:DataTypes.STRING(255),
        allowNull: false
    },
    title:{
        type:DataTypes.STRING(50),
        allowNull: false
    },
    area:{
        type:DataTypes.STRING(50),
        allowNull: false
    },
    image:{
        type:DataTypes.STRING(255),
        allowNull: true
    },
})

user.hasMany(experience,{foreignKey:{name:"userId",allowNull:false}})
experience.belongsTo(user,{foreignKey:{name:"userId",allowNull:false}})

user.hasMany(post,{foreignKey:{name:"userId",allowNull:false}})
post.belongsTo(user,{foreignKey:{name:"userId",allowNull:false}})

user.hasMany(comment,{foreignKey:{name:"userId",allowNull:false}})
comment.belongsTo(user,{foreignKey:{name:"userId",allowNull:false}})

export default user
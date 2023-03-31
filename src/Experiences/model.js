import  sequelize  from "../db.js";
import { DataTypes } from "sequelize";

const experience=sequelize.define("experience",{
    ExperienceId:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    role:{
        type:DataTypes.STRING(100),
        allowNull: false
    },
    company:{
        type:DataTypes.STRING(100),
        allowNull: false
    },
    startDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    endDate:{
        type:DataTypes.DATE || null,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING(255),
        allowNull: false
    },
    
    area:{
        type:DataTypes.STRING(50),
        allowNull: false
    },
    image:{
        type:DataTypes.STRING(255),
        allowNull: true
    }
})


export default experience
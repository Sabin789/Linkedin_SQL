import { Sequelize } from "sequelize";

const {PG_DB,PG_USER,PG_PASSWORD,PG_PORT,PG_HOST}=process.env

const sequelize= new Sequelize(PG_DB,PG_USER,PG_PASSWORD,{
    host:PG_HOST,
    port:PG_PORT,
    dialect:"postgres"
})


export const pgConnect=async()=>{
 try {
    await sequelize.authenticate()
    console.log("successfully connected")
    await sequelize.sync({alter:true})
 } catch (error) {
    console.log(error)
    process.exit(1)
 }
}

export default sequelize
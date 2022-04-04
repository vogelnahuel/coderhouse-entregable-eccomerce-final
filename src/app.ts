import Server from "./models/server";
import * as DotEnv from "dotenv";
import "./constants/log4jsConfig";
import 'reflect-metadata'
import { DataSource } from "typeorm";
import mongoose from "mongoose";
import mongoDB from "./constants/mongoUrl";
export const AppDataSource = new DataSource({
  type: "mysql",
  port:3306,
  host: "brdgiivvhujleqo6nc4k-mysql.services.clever-cloud.com",
  username: "u4y7zlutps5zufph",
  password: "fIeuBOXquhu7mSRk1OtR",
  database: "brdgiivvhujleqo6nc4k",
  synchronize: true,
  logging: true,
  entities:["dist/js/src/dao/mysql/entities/*.js"]
})


try {

  if(process.env.DATABASE==="mongo"){
     mongoose.connect(mongoDB).then(()=>{
      console.log("BASE DE DATOS CONECTADA MONGODB")
     })
     .catch((error) => console.log(error))
  }
  else{
     AppDataSource.initialize().then(()=>{
       console.log("BASE DE DATOS CONECTADA MYSQL")
     })
     .catch((error) => console.log(error))
  }
 
 
  

  DotEnv.config();

  // Pool de conexiones a la DB

  const server: Server = new Server();

  server.listen();
} catch (error) {
  console.error(error);
}

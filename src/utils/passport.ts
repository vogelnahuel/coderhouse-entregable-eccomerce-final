import passport from "passport";
const localStrategy = require("passport-local").Strategy;
import mongoose from "mongoose";
import brcypt from 'bcrypt';
import log4js from 'log4js';
import userModel from "../models/schemas/userSchema";
const loggerFile = log4js.getLogger('archivo')
import { Request } from "express";
import { User } from '../interfaces/usersInterfaces';
import { CartDao } from "../dao/cartDao";

passport.use(
  "login",
  new localStrategy({ usernameField: "email" },async (email:string, password:string, done:Function) => {

    const res =await userModel.findOne({email})
   if(!res){
    loggerFile.error("el usuario no existe");
    return done("el usuario no existe")
   }
   else{
     
        const compare = await brcypt.compare(password,res.password)
      if(!compare){
        loggerFile.error("las contraseñas no son iguales");
        return done("las contraseñas no son iguales");
      }

      return done(null, res);
      }

  })
);

passport.use(
  "signup",
  new localStrategy(
    { usernameField: "email" , passReqToCallback: true},
    
    async (req:Request, email:string, password:string, done:Function) => {
   
     const res:User = await  userModel.findOne({ email })
  
     if(res){
        loggerFile.warn("el usuario ya existe");
       return done( 'el usuario ya existe' )
     }
 
      
      const  passwordHash:string=await brcypt.hash(password, 10);
 
      const newUser:User = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        email,
        password:passwordHash,
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        phone: req.body.phone,
        avatar: req.body.avatar,
      };

     const resCreate:User = await userModel.create(newUser);


      await CartDao.addCarrito(resCreate._id);

     return done(null,resCreate);
    }
  )
);
passport.serializeUser(function(user:any, done:Function) {
  done(null, user);
});

passport.deserializeUser(function(user:any, done:Function) {
  done(null, user);
});


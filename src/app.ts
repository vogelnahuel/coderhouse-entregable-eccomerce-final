
import Server from './models/server'

import * as DotEnv from "dotenv";

import mongoose from 'mongoose';
import mongoDB from './constants/mongoUrl';

import './constants/log4jsConfig'


try {
    DotEnv.config();

    // Pool de conexiones a la DB
    mongoose.connect(mongoDB);
    const server: Server = new Server();

    server.listen();

} catch (error) {
    console.error( error )
}

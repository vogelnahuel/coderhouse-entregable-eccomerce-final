
import log4js from 'log4js';
import moment from 'moment';
import path from 'path';
const date = moment().format("YYYY-MM-DD");

log4js.configure({
    appenders:{
        miLoggerConsole :{type:'console'},
        miLoggerFile:{type:'File',filename:`${path.join(__dirname,`../../../src/logs/${date}.log`)}`}
    },
    categories:{
        default:{
            appenders:['miLoggerConsole'],
            level:'trace'
        },
        consola:{
            appenders:['miLoggerConsole'],
            level:'debug'
        },
        archivo:{
            appenders:['miLoggerFile'],
            level:'warn'
        },
        todos:{
            appenders:['miLoggerConsole','miLoggerFile'],
            level:'error'
        }
    }
})

export default log4js;
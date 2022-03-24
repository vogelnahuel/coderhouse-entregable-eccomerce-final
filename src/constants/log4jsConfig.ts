
import log4js from 'log4js';
log4js.configure({
    appenders:{
        miLoggerConsole :{type:'console'},
        miLoggerFile:{type:'File',filename:'info.log'}
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
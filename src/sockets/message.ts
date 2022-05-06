import { messageDao } from "../dao/mongo/menssageDao";

export const initSockets = (socketApp) => {

    socketApp.on("connection", async (socket) => {
      
        socket.on("getMenssage", async (obj) => {
    
          await messageDao.add(obj);
          const messagesList = await messageDao.getAllMenssages();
          socketApp.emit("mensajesList", messagesList);
        });
    
      })
}
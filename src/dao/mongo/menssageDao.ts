import moment from "moment";
import mongoose from "mongoose";
import messageModel from "../../models/schemas/mensajeSchema";
import { NotFound } from "../../utils/errorsClass";

 /**
 *  messageDao
 *  @brief hace peticiones a la tabla de message
 */
export class messageDao {

   /**
   *  @brief busca todos los mensajes
   *  @returns  un array de mensajes o error
   */
     public static async getAllMenssages():Promise<any> {
  
          const menssagesList = await messageModel
            .find({})
            .sort({ date: 1 });
          if (menssagesList.length == 0)
            throw new NotFound(
              "Todavia no hay menssages cargados en tu base de datos"
            );
          return menssagesList;
      }
      public static  async add(data: any) {
        const menssage = {
          _id: new mongoose.Types.ObjectId().toHexString(),
          message: data.message,
          email: data.email,
          name: data.name,
          date: `${moment().format("DD MM YYYY hh:mm")}`,
        };
    
        const addMenssage = await messageModel.create(menssage);
        if (!addMenssage) throw new NotFound("Error al crear el producto");
    
        return addMenssage;
      }
    

}
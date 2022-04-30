import mongoose from "mongoose";
/**
 *  messageSchema
 *  @brief esquema que se va a guardar en la base de datos
 */

const messageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: { type: String, required: true ,max: 100 },
    email: { type: String, required: true  },
    name: { type: String, required: true },
    date:  { type: String, required: true }
  });

let messageModel = mongoose.model("message", messageSchema);

export default messageModel;
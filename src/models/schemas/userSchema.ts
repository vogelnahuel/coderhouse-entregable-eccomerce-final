import mongoose from "mongoose";
/**
 *  userSchema
 *  @brief esquema que se va a guardar en la base de datos
 */
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: {
    type: String,
    required: true,
  },
});



let  userModel=mongoose.model("users", userSchema);

export default userModel;
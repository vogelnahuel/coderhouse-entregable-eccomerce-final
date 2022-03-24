import moment from "moment";
import mongoose from "mongoose";


const carritoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _idUser:{ type: mongoose.Schema.Types.ObjectId , required:true},
  products: { type: Array, required: true },
  timestamp: {
    type: String,
    required: true,
    default: moment().format("DD/MM/YYYY HH:mm:ss"),
  },
});

let cartModel = mongoose.model("carts", carritoSchema);

export default cartModel;
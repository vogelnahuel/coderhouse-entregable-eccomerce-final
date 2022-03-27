import mongoose from "mongoose";
import moment from "moment";
/**
 *  productsSchema
 *  @brief esquema que se va a guardar en la base de datos
 */
const productsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, max: 70 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  photo: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: {
    type: String,
    required: true,
    default: moment().format("DD/MM/YYYY HH:mm:ss"),
  },
});

let productModel = mongoose.model("products", productsSchema);

export default productModel;
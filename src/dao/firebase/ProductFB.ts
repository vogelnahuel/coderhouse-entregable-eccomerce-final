
import moment from "moment";
import admin from "firebase-admin";
import serviceAccount from "./firebaseConfig.json";

export class ProductsFB {
    query: admin.firestore.CollectionReference<admin.firestore.DocumentData>
    db: admin.firestore.Firestore
  constructor() {
    const cast = serviceAccount as admin.ServiceAccount;
    admin.initializeApp({
      credential: admin.credential.cert(cast)
    });
    this.db = admin.firestore();
    this.query = this.db.collection("productos")

  }

  async get(idParam) {
    try {
      if(idParam){
        const result = await this.getById(idParam);
        
        return result;
      }
      else{
        const querySnapshot = await this.query.get()
        let docs = querySnapshot.docs;
        if (docs.length == 0)
          throw {
            status: 404,
            msg: "Todavia no hay productos cargados en tu base de datos",
          };
  
        const response= docs.map((doc)=>({
          id:doc.id,
          nombre:doc.data().nombre ,
          precio:doc.data().precio ,
          stock:doc.data().stock  ,
          foto: doc.data().foto ,
          codigo:doc.data().codigo  ,
          descripcion:doc.data().descripcion  ,
          timestamp:doc.data().timestamp 
  
          }))
          return response;
      }
  
    } catch (error) {
      throw error;
    }
  }

  async getById(productId) {
    try {
         const docId = this.query.doc(productId)
         const getProduct = await docId.get();
       
      if (!getProduct)
        throw {
          status: 404,
          msg: "El producto solicitado no existe",
        };
      return getProduct.data();
    } catch (error) {
      throw error;
    }
  }

  async add(data) {
    try {
      const newProduct = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
        timestamp: `${moment().format("DD MM YYYY hh:mm")}`,
      };
      let doc= this.query.doc();
      await doc.create(newProduct)
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async delete(productId) {
    try {
     let doc= this.query.doc(productId)
     await doc.delete()
    } catch (error) {
      throw error;
    }
  }

  async update(productId, newData) {
    try {
      newData._id=productId
      let doc= this.query.doc(productId)
      let item = await doc.update(newData);
      return item;
    } catch (error) {
      throw error;
    }
  }
}

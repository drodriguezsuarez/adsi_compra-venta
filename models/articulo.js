import mongoose from "mongoose";

const articuloSchema=mongoose.Schema({
    categoria:{type:mongoose.Schema.Types.ObjectId, ref:'categoria', required:true},
    codigo:{type:String, required:true, maxlenght:64, unique:true},
    nombre:{type:String, required:true, maxlenght:80, unique:true},
    descripcion:{type:String, maxlenght:250},
    precioVenta:{type:Number, default:0},
    stock:{type:Number, default:0},
    estado:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
})

export default mongoose.model('articulo', articuloSchema)
import jwt from 'jsonwebtoken'
import { existeUsuarioById } from '../helpers/usuario.js';
import Usuario from '../models/usuario.js'

const generarJWT = (uid='') =>{
    return new Promise((resolve,reject)=>{
        // checkToken(id)
        const payload={uid}
        jwt.sign(payload  ,  process.env.SECRETPRIVATEKEY ,{
            expiresIn:'7d'
        },(err,token)=>{
            if(err){
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}

const validarJWT = async(req, res, next) =>{
    const token=req.header('token')
    if(! token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }
    try {
        const {uid}=jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const usuario = await Usuario.findById(uid)

        if(! usuario){
            return res.status(401).json({
                msg:'Token no es valido Usuario'
            })
        }

        if(usuario.estado===0){
            return res.status(401).json({
                msg:'Token no valido Estado'
            })
        }
        req.usuario=usuario

        next()

    } catch (error) {
        res.status(401).json({
            msg:'Token no valido Error'
        })
    }
}

async function checkToken(token) {
    let __id=null
    try {
        const {_id} = await jwt.decode(token)
        __id=_id
    } catch (error) {
        return false;
    }

    const existeUsuario=existeUsuarioById(__id)
}

export {generarJWT, validarJWT}
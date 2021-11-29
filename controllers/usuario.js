import Usuario from '../models/usuario.js'
import bcryptjs from 'bcryptjs'
import { generarJWT } from '../middlewares/validar-jwt.js';

const usuarioControllers = {
    
    userGet: async (req, res) => {
        const query=req.query.value
        const usuarios = await Usuario.find({
            $or:[
                {nombre: new RegExp(query,'i')},
                {nombre: new RegExp(query,'i')},
                {rol: new RegExp(query,'i')}
            ]
        });

        res.json({
            usuarios
        })
    },

    userGetById: async (req, res) => {
        const {id} = req.params
        const usuario=await Usuario.findById(id)

        res.json({
            usuario
        })
    },

    userPost: async (req, res) => {
        const {nombre,email,password,rol}=req.body;
        const usuario=Usuario({nombre,email,password,rol});

        const salt=bcryptjs.genSaltSync();
        usuario.password=bcryptjs.hashSync(password,salt) 

        usuario.save();

        res.json({
            usuario
        })
    },

    login:async(req,res) => {
        const {email,password}=req.body;
        const usuario=await Usuario.findOne({email})
        if( ! usuario){
            return res.json({
                msg:'Los datos de usuario son incorrectos email' 
            })
        }
        if(usuario.estado===0){
            return res.json({
                msg:'Usuario no encontrado'
            })
        }
        const validarPassword=bcryptjs.compareSync(password,usuario.password);
        if( ! validarPassword){
            return res.json({
                msg:'Los datos del usuario son incorrectos contaseña'
            })
        }
        const token = await generarJWT(usuario.id);
        generarJWT()

        res.json({
            usuario,
            token
        })
    },

    userPut: async (req, res) => {
        const {id}=req.params
        const {_id,createdAt,estado,__v,rol,password,...resto}=req.body

        if(password){
            const salt=bcryptjs.genSaltSync();
            resto.password=bcryptjs.hashSync(password,salt)
        }

        const usuario=await Usuario.findByIdAndUpdate(id, resto)
        res.json({
            usuario
        })
    },

    userPutActive: async (req, res) => {
        const {id}=req.params
        const usuario=await Usuario.findByIdAndUpdate(id,{estado:1})

        res.json({
            usuario
        })
    },

    userPutDisable: async (req, res) => {
        const {id}=req.params
        const usuario=await Usuario.findByIdAndUpdate(id,{estado:0})

        res.json({
            usuario
        })
    },

}

export default usuarioControllers

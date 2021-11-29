import Categoria from "../models/categoria.js"

const categoriasControllers = {

    categoriaGet: async (req, res) => {
        const value = req.query.value;
        const categoria = await Categoria
            .find({
                $or: [
                    { nombre: new RegExp(value, 'i') },
                    { descripcion: new RegExp(value, 'i') }
                ]
            })
            .sort({ 'createdAt': 1 })
        res.json({
            categoria
        })
    },

    categoriaGetById: async (req, res) => {
        const { id } = req.params;
        const categoria = await Categoria.findOne({ _id: id })
        res.json({
            categoria
        })
    },

    categoriaPost: async (req, res) => {
        const { nombre, descripcion } = req.body;
        const categoria = new Categoria({ nombre, descripcion });

        await categoria.save();

        res.json({
            categoria
        })
    },

    categoriaPut: async (req, res) => {
        const {id}=req.params
        const {_id,estado,createdAt,__v,...resto}=req.body

        const categoria=await Categoria.findByIdAndUpdate( id , resto);

        res.json({
            categoria
        })
    },
    
    categoryPutActive: async (req, res) => {
        const {id}=req.params;
        const categoryActive= await Categoria.findByIdAndUpdate(id,{estado:1})
        res.json({
            categoryActive
        })
    },

    categoryPutDisable: async (req, res) => {
        const {id}=req.params;
        const categoryDisable= await Categoria.findByIdAndUpdate(id,{estado:0})
        res.json({
            categoryDisable
        })
    },

    categoryDelete: async (req, res) => {
        const {id}=req.params;
        const category= await Categoria.findByIdAndDelete(id)

        res.json({
            category
        })
    }

}
export default categoriasControllers
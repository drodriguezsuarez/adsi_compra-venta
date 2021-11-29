import Articulo from '../models/articulo.js'

const articulosControllers = {
    
    articuloGet: async (req, res) =>{
        const articulos = await Articulo
            .find()
            .populate('categoria','nombre')
        res.json({
            articulos
        })
    },
    articuloGetById: async (req, res) =>{
        const {id} = req.params;
        const articulo = await Articulo.findOne({_id:id})
        res.json({
            articulo
        })
    },
    articuloPost: async (req, res) =>{
        const { codigo, categoria, nombre, descripcion, precioVenta, stock } = req.body;
        const articulo = new Articulo({ codigo, categoria, nombre, descripcion, precioVenta, stock});

        await articulo.save();

        res.json({
            articulo
        })
    },
    articuloPut: async (req, res) =>{
        const {id}=req.params
        const {_id,categoria,estado,createdAt,__v,...resto}=req.body
        const articulo = await Categoria.findByIdAndUpdate( id , resto);

        res.json({
            articulo
        }) 
    },
    articuloPutActive: async (req, res) =>{
        const {id} = req.params;
        const articuloActive = await Articulo.findByIdAndUpdate(id,{estado:1})
        res.json({
            articuloActive
        })
    },
    articuloPutDisable: async (req, res) =>{
        const {id} = req.params;
        const articuloDisable = await Articulo.findByIdAndUpdate(id,{estado:0})
        res.json({
            articuloDisable
        })
    },
    articuloDelete: async (req, res) =>{
        const {id} = req.params;
        const articulo = await Articulo.findByIdAndDelete(id)
        res.json({
            articulo
        })
    }

}
export default articulosControllers
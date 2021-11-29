import express from 'express'
import cors from 'cors';
import { dbConnection } from '../database/config.js';
import categoria  from '../routes/categoria.js';
import usuario from '../routes/usuario.js';
import articulo from '../routes/articulo.js';

class server{
    constructor(){
        this.port=process.env.PORT;
        // crear servidor
        this.app = express();
        // conectar la base de datos 
        this.conectarBD();
        // midlewares
        this.middlewares();
        // rutas o routes)
        this.routes();
    }

    routes(){
        this.app.use('/api/categoria',  categoria)
        this.app.use('/api/usuario',  usuario)
        this.app.use('/api/articulo',  articulo)
    }

    async conectarBD(){
        await dbConnection();
    }
    
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static('public'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
        
    }

}

export {server}
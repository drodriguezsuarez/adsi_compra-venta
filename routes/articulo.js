import { Router } from 'express';
import articulosControllers from '../controllers/articulo.js';

const router=Router();

router.get('/', articulosControllers.articuloGet);

router.get('/:id', articulosControllers.articuloGet);

router.post('/', articulosControllers.articuloPost);

router.put('/:id', articulosControllers.articuloPut );

router.put('/activar/:id', articulosControllers.articuloPutActive);

router.put('/desactivar/:id',  articulosControllers.articuloPutDisable);

router.delete('/:id', articulosControllers.articuloDelete);

export default router
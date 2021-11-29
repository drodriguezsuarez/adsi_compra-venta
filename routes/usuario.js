import {Router} from 'express'
import usuarioControllers from '../controllers/usuario.js';

const router=Router();

router.get('/',usuarioControllers.userGet);

router.get('/:id',usuarioControllers.userGetById);

router.post('/',usuarioControllers.userPost);

router.post('/login',usuarioControllers.login);

router.put('/:id',usuarioControllers.userPut);

router.put('/activar/:id',usuarioControllers.userPutActive);

router.put('/desactivar/:id',usuarioControllers.userPutDisable);

export default router;

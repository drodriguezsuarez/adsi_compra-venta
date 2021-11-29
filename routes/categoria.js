import {Router} from 'express';
import categoriasControllers from '../controllers/categoria.js';
import {check} from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeCategoriaById, existeCategoriaByNombre } from '../helpers/categoria.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarRoles } from '../middlewares/validar-rol.js';

const router=Router();

router.get('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    validarCampos
],categoriasControllers.categoriaGet);

router.get('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],categoriasControllers.categoriaGetById);

router.post('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('nombre','El nombre debe ser obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
],categoriasControllers.categoriaPost);

router.put('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
],categoriasControllers.categoriaPut);

router.put('/activar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],categoriasControllers.categoryPutActive);

router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],categoriasControllers.categoryPutDisable);

router.delete('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],categoriasControllers.categoryDelete);

export default router;
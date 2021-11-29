const validarRoles=(...roles) =>{
    return (req, res, next)=>{
        if ( ! (roles.includes(req.usuario.rol) || req.usuario.rol==='ADMIN_ROL'  ) ){
            return res.json({
                msg: `El servicio requiere un rol valido ${roles}`
            })
        }
        next();
    }
}   

export {validarRoles}
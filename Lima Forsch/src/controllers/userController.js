const UserModel = require('../models/UserModel');
usuario = new UserModel();

async function iniciar_sesion(req,res){
    obj = JSON.parse(JSON.stringify(req.body));
    datos = await usuario.findByName(obj.usuario);
    if(datos)
        res.send(datos);
    else
        res.render('login', {error:'Los datos no son correctos'});
}

async function listar_usuarios(req,res){
    datos = await usuario.getUsers(20);
    res.render('usercrud', {usuarios: datos});
}

async function crear_usuario(req,res){
    console.log(req.body);
    obj = JSON.parse(JSON.stringify(req.body));
    nuevoUsuario = {
        usuario: obj.nombre_registro,
        pass: obj.contrasena_registro,
        correo: obj.email_registro,
        nivel: obj.nivel_registro,
        estado: 1
    };
    console.log(obj);
    await usuario.agregar(nuevoUsuario);
    res.redirect('back');
}




module.exports = {
    iniciar_sesion, 
    crear_usuario, 
    listar_usuarios};


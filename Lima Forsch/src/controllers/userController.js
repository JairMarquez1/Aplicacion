const UserModel = require('../models/UserModel');
usuario = new UserModel();

async function iniciar_sesion(req,res){
    request = JSON.parse(JSON.stringify(req.body));
    datos = await usuario.findByName(request.usuario);
    if(datos)
        res.send(datos);
    else
        res.render('login', {error:'Los datos no son correctos'});
}

async function listar_usuarios(req,res){
    request = JSON.parse(JSON.stringify(req.body));
    datos = await usuario.getUsers(20);
    res.render('usercrud', {usuarios: datos});
}

async function crear_usuario(req,res){
    request = JSON.parse(JSON.stringify(req.body));
    const nuevoUsuario = {
        usuario: obj.usuario,
        pass: obj.contrasena,
        nivel: 1,
        estado: 1
    };
    await usuarios.agregar(nuevoUsuario);
    res.send(nuevoUsuario);
}




module.exports = {
    iniciar_sesion, 
    crear_usuario, 
    listar_usuarios};


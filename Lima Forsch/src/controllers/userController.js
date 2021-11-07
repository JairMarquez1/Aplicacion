const UserModel = require('../models/UserModel');
user = new UserModel();
error = false;

async function iniciar_sesion(req,res){
    obj = JSON.parse(JSON.stringify(req.body));
    datos = await user.findByName(obj.usuario);
    if(datos)
        res.send(datos);
    else
        res.render('login', {error:'Los datos no son correctos'});
}

async function cargar_crud(req,res){
    variables = JSON.parse(JSON.stringify(req.body));
    console.log('Variables:',variables);

    //Si se envió por POST un usuario para modificar, consulta sus datos y los envía para el formulario de modificación
    if (variables.modifyUser)
        result_modify = await user.findByName(variables.modifyUser);
    else
        result_modify = false;

    //Por defecto obtienen los datos de los últimos 20 usuarios para listarse en la tabla
    datos = await user.getUsers(20);

    //Se renderiza la plantilla con los datos obtenidos
    res.render('usercrud', {usuarios: datos, 
                            modifyUser:result_modify,
                            errorMsg: error});
    error = false;
}

async function crear_usuario(req,res){
    obj = JSON.parse(JSON.stringify(req.body));
    const {nombre_registro, contrasena_registro, email_registro, nivel_registro} = obj;
    nuevoUsuario = {
        usuario: nombre_registro,
        pass: contrasena_registro,
        correo: email_registro,
        nivel: nivel_registro,
        estado: 1
    };
    if(validarUsuario(nuevoUsuario)){
        await user.addUser(nuevoUsuario);
        error = false;
    }
    else
        error = 'No se pudo completar el registro';

    res.redirect('back');
}

async function modificar_usuario(req,res){
    obj = JSON.parse(JSON.stringify(req.body));

    //Se genera la contraseña nueva si es que se activó la casilla de cambiar contraseña"
    if (obj.pass_modify == '1'){
        newPass = 1234;
    }
    nuevoUsuario = {
        usuario: obj.nombre_modify,
        pass: newPass,
        correo: obj.email_modify,
        nivel: obj.nivel_modify,
        estado: 1
    };
    res.redirect('back');
}




function validarUsuario(datosUsuario){
    const {usuario, pass, correo, nivel, estado} = datosUsuario;
    console.log('us',usuario.length);
    if((usuario.length >= 3) && (pass.length >= 8) && (validateEmail(correo)) && (nivel > 0) && (nivel <= 3) && (estado == 1))
        return true;
    else
        return false;
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}




module.exports = {
    iniciar_sesion, 
    crear_usuario,
    modificar_usuario, 
    cargar_crud};


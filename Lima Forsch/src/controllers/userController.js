const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const 

user = new UserModel();
error = false;
variables = {};
datos = null;

async function iniciar_sesion(req, res) {
    obj = JSON.parse(JSON.stringify(req.body));
    const { usuario, contrasena } = obj;

    usuarioCap = firstCap(usuario);
    //Se busca el usuario en la base de datos
    datos = await user.findByName(usuarioCap);
    if (datos) {
        //Compara la contraseña con el hash almacenado
        if (bcrypt.compareSync(contrasena, datos.pass)) {
            if(datos.estado == 1){
                if(datos.usuario != 'Admin'){
                    req.session.usuario = datos.usuario;
                    req.session.rol = datos.nivel;
                    res.render('index', {usuario: datos.usuario});
                }
                else{
                    req.session.usuario = datos.usuario;
                    req.session.rol = 'admin';
                    res.redirect('/usercrud');
                }

            }
            else
                res.render('login', { errorMsg: 'La cuenta está inhabilitada' });
        }
        else
            res.render('login', { errorMsg: 'Los datos no son correctos' });
    }
    else
        res.render('login', { errorMsg: 'Los datos no son correctos' });
    datos = null;
}

function cerrar_sesion(req, res) {
    req.session.destroy(); 
    res.redirect('login');
}

async function cargar_crud(req, res) {
    if (req.session.rol == 'admin'){
        variables = JSON.parse(JSON.stringify(req.body));
        console.log('Variables:', variables);

        //Si se envió por POST un usuario para modificar, consulta sus datos y los envía para el formulario de modificación
        if (variables.modifyUser)
            result_modify = await user.findByName(variables.modifyUser);
        else
            result_modify = false;
        //Si se envió por POST un usuario para habilitar/deshabilitar, se ejecuta la respectiva acción
        if (variables.enableUser){
            await user.changeUserStatus(variables.enableUser);
            variables.enableUser = null;
        }

        //Por defecto obtienen los datos de los últimos 20 usuarios para listarse en la tabla
        if(datos == null){
            datos = await user.getUsers(20);
        }

        //Se renderiza la plantilla con los datos obtenidos
        res.render('usercrud', {
            usuarios: datos,
            modifyUser: result_modify,
            errorMsg: error
        });
        datos = null;
        error = false;
    }
    else
        res.redirect('login');

}

function cargar_registro(req, res){
    res.render('registroUsuario',{errorMsg: error});
}

async function crear_usuario(req, res) {
    obj = JSON.parse(JSON.stringify(req.body));
    const { nombre_registro, contrasena_registro, email_registro, nivel_registro } = obj;

    nombre_registroCap = firstCap(nombre_registro);
    //Se crea el objeto con los datos del nuevo usuario
    nuevoUsuario = {
        usuario: nombre_registroCap,
        pass: contrasena_registro,
        correo: email_registro,
        nivel: parseInt(nivel_registro),
        estado: 0
    };
    //Se validan los datos del nuevo usuario y actualiza la variable de error en caso de fallar
    var validacion = await validarUsuario(nuevoUsuario);
    if (validacion == "OK") {
        let hashPass = await bcrypt.hash(contrasena_registro, 8);
        nuevoUsuario.pass = hashPass;
        await user.addUser(nuevoUsuario);
        error = false;
    }
    else
        error = validacion;
    //Redigire a la página anterior
    res.redirect('back');
}

async function modificar_usuario(req, res) {
    obj = JSON.parse(JSON.stringify(req.body));
    const { email_modify, nivel_modify } = obj;
    //Se crea el objeto con los datos que se van a actualizar
    nuevosDatos = {
        correo: email_modify,
        nivel: parseInt(nivel_modify),
    };
    //Si se restableció la contraseña, se asigna una aleatoria y se añade al objeto
    if (obj.pass_modify == '1') {
        newPass = 1234;
        nuevosDatos.pass = newPass;
    }
    //Se actualiza el usuario en la base de datos
    user.updateUser(nuevosDatos, variables.modifyUser);
    //Redigire a la página anterior
    res.redirect('back');
}

async function buscar_usuario(req,res){
    obj = JSON.parse(JSON.stringify(req.body));
    console.log('obj', obj);
    const { string_search } = obj;
    string_searchCap = firstCap(string_search);
    datos = await user.findUsersBySubstring(string_searchCap);
    //Redigire a la página anterior
    res.send('back');
}



//Funciones auxiliares

async function validarUsuario(datosUsuario) {
    const { usuario, pass, correo, nivel, estado } = datosUsuario;
    if ((usuario.length >= 3) && (pass.length >= 4) && (validateEmail(correo)) && (nivel > 0) && (nivel <= 3) && (estado == 0)) {
        validacion_usuario = await user.findByName(usuario);
        validacion_correo = await user.findByEmail(correo);
        if (!validacion_usuario && !validacion_correo)
            return "OK";
        else if (validacion_usuario)
            return "El usuario ya está registrado";
        else
            return "El correo ya está registrado";
    }
    else
        return "Los datos no son válidos";
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function firstCap(str){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}



module.exports = {
    iniciar_sesion,
    cerrar_sesion,
    crear_usuario,
    modificar_usuario,
    buscar_usuario,
    cargar_crud,
    cargar_registro
};
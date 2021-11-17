const FileModel = require('../models/FileModel');
const UserModel = require('../models/UserModel');

fileM = new FileModel();
userM = new UserModel();

datos = null;

async function cargar_lista(req, res){
    console.log(req.session);
    console.log(typeof(req.session.rol));
    if (datos == null){
        datos = await fileM.findByLevel(req.session.rol, 10);
    }
    console.log(datos);

    res.render('index',{
        archivos: datos
    })

    datos = null;
}

async function subir_archivo(req,res){
    if (req.files){
        var d = new Date();
        var re = /(?:\.([^.]+))?$/;
        //Si el input es un solo elemento, se convierte en un arreglo con ese único elemento
        var input = req.files['input-file'];
            if (!Number.isInteger(input.length))
                input = [input];
        console.log(input);
        //Se consultan los datos del usuario mediante la variable de sesión
        var user = await userM.findByName(req.session.usuario);
        //Se procesa cada uno de los archivos contenidos en el input
        input.forEach(file => {
            //Se valida que el archivo no sea mayor a 16MB
            if (file.size < 16777216){
                var ext = re.exec(file.name)[1];
                //Se define la ruta que tendrá el archivo en el Storage 
                var newPath = 'userFiles/' + user.usuario + '/' + file.name;
                //Se crea el objeto para enviar a la BDD
                nuevoArchivo = {
                    fecha: d.getTime(),
                    nivel: user.nivel,
                    nombre: file.name,
                    propietario: user.usuario,
                    tamano: file.size,
                    tipo: file.mimetype,
                    extension: ext,
                    ubicacion: newPath
                }
                console.log('n',nuevoArchivo);
                //Se sube el archivo al Storage y a la base de datos
                fileM.uploadFile(file.data, user, nuevoArchivo);
            }
        });
    }
    else
        res.render('index',{errorMsg: 'Ocurrió un error'});


}



module.exports = {
    cargar_lista,
    subir_archivo,
}
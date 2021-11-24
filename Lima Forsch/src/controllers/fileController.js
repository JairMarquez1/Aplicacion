const FileModel = require('../models/FileModel');
const UserModel = require('../models/UserModel');
const bucket = require('../routes/connection').bucket;

fileM = new FileModel();
userM = new UserModel();

datos = null;
extensionesBPC = ['pdf','txt','doc','docx','xlsx'];

async function cargar_lista(req, res){
    console.log(req.session);
    if (datos == null){
        datos = await fileM.findByLevel(req.session.rol, 15);
        datos = datos.concat(await fileM.findByUser(req.session.usuario,10));
        dato = datos.filter((item, pos) => datos.indexOf(item) === pos)
    }

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
                    nombreLower: file.name.toLowerCase(),
                    propietario: user.usuario,
                    tamano: file.size,
                    tipo: file.mimetype,
                    extension: ext,
                    ubicacion: newPath
                }
                //Se sube el archivo al Storage y a la base de datos
                fileM.uploadFile(file.data, user, nuevoArchivo);
            }
        });
        res.redirect('index');
    }
    else
        res.render('index',{errorMsg: 'Ocurrió un error'});


}

async function buscar_archivo(req,res){
    obj = JSON.parse(JSON.stringify(req.body));
    console.log('obj', obj);
    const { string_search, tipo_busqueda } = obj;
    if (tipo_busqueda == 0){
        datos = await fileM.findFileBySubstring(string_search,req.session.usuario,req.session.rol);
        res.render('index', {
            archivos: datos
        });
    }
    else if (tipo_busqueda == 1){
        await busquedaContenido(req,res);
        res.render('index',{
            datosBusqueda : JSON.stringify(datos),
            string_search : string_search
        })
        datos = null;
    }
}


async function busquedaContenido(req,res){
    datos = await fileM.findByExtension(req.session.usuario,req.session.rol, extensionesBPC);
        direcciones = datos.map(function(doc){return doc.ubicacion});
        for (var i = 0; i < direcciones.length; i++){
            var url = await bucket.file(direcciones[i]).getSignedUrl({
                action: 'read',
                expires: '01-01-2022'
              });
            datos[i].ubicacion = url[0];
        }
}



module.exports = {
    cargar_lista,
    subir_archivo,
    buscar_archivo
}



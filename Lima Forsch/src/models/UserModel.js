const db = require('../routes/connection').db;
const FileModel = require('../models/FileModel');
fileM = new FileModel();


module.exports = class UserModel{

    async findByName(nombre){   //Consulta en la base de datos un usuario con el nombre indicado y retorna el registro
        const usersRef = db.collection('usuarios');
        const snapshot = await usersRef.where('usuario','==',nombre).get();
        if (snapshot.docs.length > 0)
            var doc = snapshot.docs[0].data();
        return doc;
    }

    async findByEmail(email){   //Consulta en la base de datos un usuario con el nombre indicado y retorna el registro
        const usersRef = db.collection('usuarios');
        const snapshot = await usersRef.where('correo','==',email).get();
        if (snapshot.docs.length > 0)
            var doc = snapshot.docs[0].data();
        return doc;
    }

    async findUsersBySubstring(str){
        const usersRef = db.collection('usuarios');
        //Busqueda por nombre
        const snapshot = await usersRef.where('usuario', '>=', str).where('usuario', '<=', str + '~').limit(20).get();
        var docs = snapshot.docs.map(doc => doc.data());
        return docs;
    }

    async getUsers(n){          //Retorna los últimos n registros en la colección de usuarios
        const usersRef = db.collection('usuarios');
        const snapshot = await usersRef.limit(n).get();
        var docs = snapshot.docs.map(doc => doc.data());
        return docs;
    }

    async addUser(nuevoUsuario){  //Agrega el usuario a la base de datos
        const usersRef = db.collection('usuarios');

        /*Obtiene el ultimo id creado 
        const snapshot = await usersRef.orderBy('userID', 'desc').limit(1).get();
        if (snapshot.docs.length > 0){
            var doc = snapshot.docs[0].data();
            //Se asigna el id del nuevo documento
            var id = doc.userID + 1;
        }
        else
            var id = 1;

        nuevoUsuario.userID = parseInt(id);
        id = id.toString();
        */
        usersRef.doc(nuevoUsuario.usuario).set(nuevoUsuario);
    }


    async updateUser(datos,id){  //Actualiza la información del usuario proporcionada mediante un JSON
        const datosAnterior = await this.findByName(id);
        const userRef = db.collection('usuarios').doc(id)
        await userRef.update(datos);

        //Triggers
        if (datos.nivel != datosAnterior.nivel)
            this.onUpdateLevel(id, datos.nivel);
        
    }

    async changeUserStatus(nombre){
        const snapshot = await db.collection('usuarios').where('usuario','==',nombre).get();
        var doc = snapshot.docs[0].data();
        const userRef = db.collection('usuarios').doc(nombre);
        if (doc.estado == 1)
            var nuevoEstado = 0;
        else
            var nuevoEstado = 1;
        await userRef.update({estado: nuevoEstado});
    }



    async onUpdateLevel(id, newLevel){
        const docs = await fileM.findByUser(id,200);
        docs.forEach(doc=> {
            var fileId = doc.propietario + doc.nombre + doc.fecha;
            fileM.updateLevel(fileId, newLevel);
        });

    }


}
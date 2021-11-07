const db = require('../routes/connection');

module.exports = class UserModel{

    async findByName(nombre){   //Consulta en la base de datos un usuario con el nombre indicado y retorna el registro
        const usersRef = db.collection('usuarios');
        const snapshot = await usersRef.where('usuario','==',nombre).get();
        if (snapshot.docs.length > 0)
            var doc = snapshot.docs[0].data();
        return doc;
    }

    async getUsers(n){          //Retorna los últimos n registros en la colección de usuarios
        const usersRef = db.collection('usuarios');
        const snapshot = await usersRef.limit(n).get();
        var docs = snapshot.docs.map(doc => doc.data());
        return docs;
    }

    async addUser(nuevoUsuario){
        const usersRef = db.collection('usuarios');
        //Obtiene el ultimo id creado 
        const snapshot = await usersRef.orderBy('userID', 'desc').limit(1).get();
        if (snapshot.docs.length > 0){
            var doc = snapshot.docs[0].data();
            console.log(doc);
        }
        //Se asigna el id del nuevo documento
        var id = doc.userID + 1;
        nuevoUsuario.userID = parseInt(id);
        //Se agrega a la base de datos
        db.collection('usuarios').doc(id.toString()).set(nuevoUsuario);
    }


    async updateUser(datos){


    }


}
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

    /*async agregar(nuevoUsuario){
        db.collection('usuarios').add(nuevoUsuario);
    }*/


}
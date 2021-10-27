const db = require('../routes/connection');

module.exports = class FileModel{

    async findByName(nombre){   //Consulta en la base de datos un archivo con el nombre indicado y retorna el registro
        const fileRef = db.collection('archivos');
        const snapshot = await fileRef.where('archivos','==',nombre).get();
        if (snapshot.docs.length > 0)
            var doc = snapshot.docs[0].data();
        return doc;
    }

    async getFile(file){
        const fileRef = db.collection('archivos');
        const snapshot = await fileRef.limit(file).get();
        var docs = snapshot.docs.map(doc => doc.data());

        return docs;
    }

    async agregar(nuevoArchivo){
        db.collection('archivos').add(nuevoArchivo);
    }
}
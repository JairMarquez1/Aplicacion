const db = require('../routes/connection').db;
const bucket = require('../routes/connection').bucket;

module.exports = class FileModel{

    async findByName(nombre){   //Consulta en la base de datos un archivo con el nombre indicado y retorna el registro
        const fileRef = db.collection('archivos');
        const snapshot = await fileRef.where('nombre','==',nombre).get();
        if (snapshot.docs.length > 0)
            var doc = snapshot.docs[0].data();
        return doc;
    }

    async findByUser(username, n){
        const fileRef = db.collection('archivos');
        const snapshot = await fileRef.where('propietario','==',username).limit(n).get();
        var docs = snapshot.docs.map(doc => doc.data());
        return docs;
    }

    async findFileBySubstring(str,usuario,level){
        const filesRef = db.collection('archivos');
        //Filtra por nombre de usuario
        const snapshot = await filesRef.where('nombreLower', '>=', str).where('nombreLower', '<=', str + '~').where('propietario', '==', usuario).get();
        var docs = snapshot.docs.map(doc => doc.data());
        //Filtra por nivel de usuario
        for (var i = 1; i < level; i++){
            var snapshot2 = await filesRef.where('nombreLower', '>=', str).where('nombreLower', '<=', str + '~').where('nivel', '==', i).get();
            var docs2 = snapshot2.docs.map(doc => doc.data());
            var docs = docs.concat(docs2);
        }
        return docs;
    }

    async findByLevel(level, n){
        const fileRef = db.collection('archivos');
        const snapshot = await fileRef.where('nivel','<',level).limit(n).get();
        var docs = snapshot.docs.map(doc => doc.data());
        return docs;
    }

    async getFile(file){
        const fileRef = db.collection('archivos');
        const snapshot = await fileRef.limit(file).get();
        var docs = snapshot.docs.map(doc => doc.data());

        return docs;
    }

    async findByExtension(usuario,level, extArray){
        const filesRef = db.collection('archivos');
        //Filtra por nombre de usuario
        const snapshot = await filesRef.where('propietario', '==', usuario).where('extension', 'in', extArray).get();
        var docs = snapshot.docs.map(doc => doc.data());
        //Filtra por nivel de usuario
        for (var i = 1; i < level; i++){
            var snapshot2 = await filesRef.where('nivel', '==', i).where('extension', 'in', extArray).get();
            var docs2 = snapshot2.docs.map(doc => doc.data());
            var docs = docs.concat(docs2);
        }
        return docs;
    }

    async agregar(nuevoArchivo){
        db.collection('archivos').add(nuevoArchivo);
    }

    async uploadFile(buffer, user, nuevoArchivo){  
        //Se sube el buffer (archivo binario) al Storage en la ruta definida
        let newPath = nuevoArchivo.ubicacion;
        bucket.file(newPath).createWriteStream().end(buffer);
        //Se crea el registro en la base de datos
        const fileRef = db.collection('archivos');
        let id = user.usuario + nuevoArchivo.nombre + nuevoArchivo.fecha
        await fileRef.doc(id).set(nuevoArchivo);
    }

    async updateLevel(id,newLevel){
        const fileRef = db.collection('archivos');
        await fileRef.doc(id).update({nivel:newLevel});
    }





    
}
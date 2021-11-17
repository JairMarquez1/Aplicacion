//Conexión base de datos
const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'limaforsch.appspot.com'
})
const db = admin.firestore();
const bucket = admin.storage().bucket();
//--------------------------

module.exports = {
    db,
    bucket
}


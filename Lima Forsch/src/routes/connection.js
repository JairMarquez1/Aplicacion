//Conexión base de datos
const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore();
//--------------------------

module.exports = db;


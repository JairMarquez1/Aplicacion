//Conexión base de datos
const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'limaforsch.appspot.com'
})
const db = admin.firestore();
const bucket = admin.storage().bucket();
bucket.setCorsConfiguration([
    {
      origin: ['http://localhost:3000'],
      responseHeader: ['Content-Type'],
      method: ['GET', 'HEAD', 'DELETE'],
      maxAgeSeconds: 3600,
    },
  ]);;
//--------------------------

module.exports = {
    db,
    bucket,
}


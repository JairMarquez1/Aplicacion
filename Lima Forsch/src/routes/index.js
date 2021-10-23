const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})


const db = admin.firestore();

router.get('/', (req,res) => {
    //console.log('Index works!');
    //res.send('received');
    res.render('index');
})

router.get('/login', (req,res) => {
    //console.log('Index works!');
    //res.send('received');
    res.render('login');
})

router.post('/iniciar-sesion', (req,res) => {
    console.log(req.body);
    res.send('received');
    const obj = JSON.parse(JSON.stringify(req.body));
    const nuevoUsuario = {
        usuario: obj.usuario,
        pass: obj.contrasena,
        nivel: 1,
        estado: 1
    };
    db.collection('usuarios').add(nuevoUsuario);
})


router.get('/usercrud', (req,res) => {
    listarUsuarios(res);
})

async function listarUsuarios(res){
    const usersRef = db.collection('usuarios');
    const snapshot = await usersRef.limit(10).get();
    var docs = snapshot.docs.map(doc => doc.data());
    res.render('usercrud', {usuarios: docs});
}


module.exports = router;
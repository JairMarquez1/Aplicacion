const { Router } = require('express');
const router = Router();
const db = require('../routes/connection');

const userController = require('../controllers/userController');
const fileController = require('../controllers/fileController');


router.get('/', (req,res) => {
    if (req.session.usuario)
        res.redirect('/index');
    else
        res.redirect('/login');
});

//Login---------------------------

router.get('/login', (req,res) => {if(notLogged(req,res)) res.render('login');});

router.post('/iniciar-sesion', userController.iniciar_sesion);

//Logout---------------------------

router.post('/logout', userController.cerrar_sesion);

//CRUD usuarios-------------------

router.get('/usercrud', userController.cargar_crud);

router.post('/usercrud', userController.cargar_crud);

router.get('/registro', (req,res) => {if(notLogged(req,res)) userController.cargar_registro(req,res);});

    //Acciones

router.post('/add-user', userController.crear_usuario);

router.post('/modify-user', userController.modificar_usuario);

router.post('/search-user', userController.buscar_usuario);


//Archivos------------------------

router.get('/index', (req,res) => {if(auth(req,res)) fileController.cargar_lista(req,res);});

router.get('/visualizar', (req,res) => {if(auth(req,res)) res.render('visualizar');});

router.get('/file-stats', (req,res) => {if(auth(req,res)) res.render('file-stats');});

router.get('/subir-archivo', (req,res) => {if(auth(req,res)) res.render('subirArchivo');});

    //Acciones

router.post('/upload', fileController.subir_archivo);

router.post('/search-file', fileController.buscar_archivo);

router.get('/prueba', (req,res) => {res.render('prueba')});


function auth(req,res){
    if (!req.session.usuario){
        res.redirect('/login');
        return false;
    }
    else{
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        return true;
    }
}

function notLogged(req,res){
    if (req.session.usuario){
        if(req.session.rol != 4)
            res.redirect('/index');
        else
            res.redirect('/usercrud');
        return false;
    }
    else{
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        return true;
    }
}

module.exports = router;
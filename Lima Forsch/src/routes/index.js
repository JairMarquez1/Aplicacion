const { Router } = require('express');
const router = Router();
const db = require('../routes/connection');

const userController = require('../controllers/userController');


router.get('/', (req,res) => {
    if (req.session.usuario){
        //console.log(req.session);
        res.redirect('/index');
    }
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

router.post('/add-user', userController.crear_usuario);

router.post('/modify-user', userController.modificar_usuario);

router.post('/search-user', userController.buscar_usuario);

router.get('/registro', (req,res) => {if(notLogged(req,res)) userController.cargar_registro(req,res);});

//Archivos------------------------

router.get('/index', (req,res) => {if(auth(req,res)) res.render('index');});

router.get('/visualizar', (req,res) => {if(auth(req,res)) res.render('visualizar');});

router.get('/file-stats', (req,res) => {if(auth(req,res)) res.render('file-stats');});

router.get('/subir-archivo', (req,res) => {if(auth(req,res)) res.render('subirArchivo');});


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
        if(req.session.rol != 'admin')
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
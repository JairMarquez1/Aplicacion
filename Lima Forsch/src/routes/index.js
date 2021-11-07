const { Router } = require('express');
const router = Router();
const db = require('../routes/connection');

const userController = require('../controllers/userController');


router.get('/', (req,res) => {res.render('index');});

//Login---------------------------

router.get('/login', (req,res) => {res.render('login');});

router.post('/iniciar-sesion', userController.iniciar_sesion);

//CRUD usuarios-------------------

router.get('/usercrud', userController.cargar_crud);

router.post('/usercrud', userController.cargar_crud);

router.get('/add-user', (req,res) => {res.render('add-user');});

router.post('/add-user', userController.crear_usuario);

router.post('/modify-user', userController.modificar_usuario);

//Archivos------------------------

router.get('/visualizar', (req,res) => {res.render('visualizar');});

router.get('/file-stats', (req,res) => {res.render('file-stats');});

router.get('/subir-archivo', (req,res) => {res.render('subirArchivo');});

router.get('/registro', (req,res) => {res.render('registroUsuario');});


module.exports = router;
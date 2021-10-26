const { Router } = require('express');
const router = Router();
const db = require('../routes/connection');

const userController = require('../controllers/userController');


router.get('/', (req,res) => {res.render('index');});

router.get('/login', (req,res) => {res.render('login');});

router.get('/usercrud', userController.listar_usuarios);

router.get('/add-user', (req,res) => {res.render('add-user');});

router.post('/iniciar-sesion', userController.iniciar_sesion);

router.get('/visualizar', (req,res) => {res.render('visualizar');});

router.get('/subir_archivo', (req,res) => {res.render('subirArchivo');});

module.exports = router;
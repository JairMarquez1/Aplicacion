const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'asd',
    resave: false,
    saveUninitialized: true
}))


//routes
app.use(require('./routes/index.js'));


//static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
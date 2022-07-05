const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: __dirname + '/views/'
}));
app.set('view engine', '.hbs');

//midlewares
app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use('/resources', express.static(path.resolve(__dirname, '../uploads')));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(session({
    secret: 'asd',
    resave: false,
    saveUninitialized: true
}))

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});


//routes
app.use(require('./routes/index.js'));


//static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

//User Model
const User = require('./models/Users');

//Product Model
const Product = require('./models/Products');

//Review
const Rev = require("./models/Rev");


const app = express();

// DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo 
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

//path
var path = require('path').join(__dirname, '/public');
app.use(express.static(path));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(express.urlencoded({ extended: true }));

//Express session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));

app.use(function(req, res, next) {
    res.locals.email = req.session.email;
    next();
  });
/*
//connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {

});*/

//routes
app.use('/', require('./routes/index.js'))
app.use('/register', require('./routes/users.js'))
app.use('/product', require('./routes/product.js'))
app.use('/login', require('./routes/login.js'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));
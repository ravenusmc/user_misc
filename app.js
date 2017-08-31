const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect('mongodb://localhost/user_misc');
let db = mongoose.connection;

//checking db connection
db.once('open', function(){
  console.log('Connected to mongo DB')
})

//Bringing in the user model
let User = require('./models/user');

const app = express();

//Setting up the view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Body parser needed for working with forms!!!
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Setting up public folder 
app.use(express.static(path.join(__dirname, 'public')));

//Express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express validation middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//This route will take the user to the home page.
app.get('/', function(req, res){
  let errors = null;
  res.render('index', {
    errors: errors
  });
}); 

//This route will log the user in. 
app.post('/', function(req, res){

  const username = req.body.username;
  const password = req.body.password;

  console.log(username);
  console.log(password);

});

//This route take the user to the sign up page. 
app.get('/sign_up', function(req, res){
  let errors = null;
  res.render('sign_up', {
    errors: errors
  });
})

app.post('/sign_up', function(req, res){

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();

  //Get the Errors 
  let errors = req.validationErrors();

  if (errors){
    res.render('/', {
      errors: errors
    });
  }else {
  let newUser = new User();

  newUser.name = req.body.name;
  newUser.username = req.body.username; 
  newUser.email = req.body.email;
  newUser.password = req.body.password;
  // newUser. = req.body.password2;

  newUser.save(function(err){
    if (err){
      console.log(err);
      return;
    }else {
      req.flash('success', 'User Added! You may now sign in!');
      res.redirect('/');
    }
    });
  }
});

//Code to start server
app.listen(3000, function(){
  console.log('Server Started, check port 3000');
});
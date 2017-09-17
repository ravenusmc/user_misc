const express = require('express');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt  = require('bcryptjs');
const config = require('./config/database');
const passport = require('passport');
const request = require('request');
const asteroid = require('./modules/asteroid');
const ctrlMain = require('./controllers/main');

mongoose.connect(config.database);
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

//passport config
require('./config/passport')(passport);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Global passport route
app.get('*', function(req,res,next){
  res.locals.user = req.user || null;
  next();
});


//This route will take the user to the landing page.
app.get('/', function(req, res){

  let errors = null;
  
  res.render('index', {
    errors: errors
  });
}); 

//This route will log the user in. 
app.post('/', function(req, res, next){

  //Using passport to have the user login.
  passport.authenticate('local', {
    successRedirect: 'home',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);

});

//This route take the user to the sign up page. 
app.get('/sign_up', function(req, res){
  let errors = null;
  res.render('sign_up', {
    errors: errors
  });
});

//This post route will take care of adding a new user to the database.
app.post('/sign_up', function(req, res){

  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password2', 'passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors){
    res.render('sign_up',{
      errors: errors
    });
  }else {

    let newUser = new User({

      name:name,
      email:email,
      username:username,
      password:password
    });
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash
        newUser.save(function(){
          if (err){
            console.log(err);
            return;
          }else{
            req.flash('Success', 'You are now registered! Log In!')
            res.redirect('/');
          }
        });
      });
    });
  }
});

//This will take the user to the home screen. 
app.get('/home', ensureAuthenticated,  ctrlMain.home);
//This will take the user to the image screen.
app.get('/image', ensureAuthenticated, ctrlMain.image);
//This will take the user to the asteroid page. 
app.get('/asteroid', ensureAuthenticated, ctrlMain.asteroid);

//This is code for the logout process
app.get('/logout', function(req, res){
  req.logout();
  req.flash('success', "You are logged out");
  res.redirect('/');
})

//Access control 
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();

  }else {
    req.flash('danger', 'Please login');
    res.redirect('/');
  }
}

module.exports = router;

//Code to start server
app.listen(3000, function(){
  console.log('Server Started, check port 3000');
});


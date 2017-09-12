const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt  = require('bcryptjs');
const config = require('./config/database');
const passport = require('passport');
const request = require('request');

const geoTest = require('./modules/test');
const asteroid = require('./modules/asteroid');

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


//This route will take the user to the home page.
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

// https://api.nasa.gov/planetary/earth/imagery?lon=-83.968060&lat=34.089791&date=2017-02-01&cloud_score=True&api_key=YVjqNFAtV4LbLUs9fXWTAYUW7YYkKwjALgTg3l0t

//This will take the user to the home screen. 
app.get('/home', ensureAuthenticated,  function(req,res){

  // value = geoTest.test();
  let errors = null;

  res.render('home', {
    errors: errors
  });
});

//This route will take the user to the image page 
app.get('/image', ensureAuthenticated, function(req, res){

  let errors = null;
  
  res.render('image', {
    errors: errors
  });
});

//This route will take the user to the astroid page
app.get('/asteroid', ensureAuthenticated, function(req, res){

  let errors = null;
  let totalBodies = "";

  let currentDate = asteroid.getDate();

  request("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + currentDate + "&end_date=" + currentDate + "&api_key=YVjqNFAtV4LbLUs9fXWTAYUW7YYkKwjALgTg3l0t", function(error, response, body){
    if (!error && response.statusCode == 200){

      //Parsing the data so that it may be read in JSON format. 
      let parsedData = JSON.parse(body);
      //Getting the total number of near Earth Asteroids on the specific day. 
      let totalBodies = parsedData.element_count;

      currentDate = asteroid.getDate();

      //Need to loop through the data to get the asteroids name and size and miss distance. 

      //This variable will hold the length of the json data.
      dataLength = parsedData.near_earth_objects[currentDate].length;
      let dataArray = [];

      //Creating a for loop to loop through the data. 
      for (var i = 0; i < dataLength; i++){

        //These couple of lines will get the asteroid data that I want 
        let size = parsedData.near_earth_objects[currentDate][i].estimated_diameter.meters.estimated_diameter_max;
        let rockName = parsedData.near_earth_objects[currentDate][i].name;
        let missDistance = parsedData.near_earth_objects[currentDate][i].close_approach_data[0].miss_distance.miles;
        let speed =  parsedData.near_earth_objects[currentDate][i].close_approach_data[0].relative_velocity.miles_per_hour;

        //The following code will bring the numbers down to 2 numbers past the decimal point. 
        size = asteroid.fixDecimal(size);

        //I am adding decimal points to my values. 
        size = asteroid.fixNumbers(size);
        missDistance = asteroid.fixNumbers(missDistance);
        speed = asteroid.fixNumbers(speed);

        //I then push all of the variables into an array of objects to hold the data. 
        dataArray.push({ rockSize: size, rockName: rockName, missDistance: missDistance, speed: speed });
      }

      //Rendering the page along with the data. 
      res.render('astroid', {
        errors: errors,
        bodies: totalBodies,
        dataArray: dataArray
      });
    }
  });

});

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

//Code to start server
app.listen(3000, function(){
  console.log('Server Started, check port 3000');
});


// SCRAP CODE 

  // let rightNow = new Date();
  // rightNow = rightNow.toISOString().slice(0,10);
  // rightNow = rightNow.split("-");
  // //Here I am taking the date, converting it to a Number, subtracting one 
  // //then turning it back into a string. 
  // newDay = (Number(rightNow[2]) - 3).toString();
  // //I combine 0 to the date because that is how the API has its data. 
  // newDay = '0' + newDay;
  // //I insert the modified date back into the array.
  // rightNow[2] = newDay;
  // //combine all the values back 
  // date = rightNow.join('-');

    //Getting the current date 
  //let currentDate = new Date();
  //Turning the current date into yyyy-mm-dd format
  //currentDate = currentDate.toISOString().slice(0,10);
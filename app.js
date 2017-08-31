const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/user_misc');
let db = mongoose.connection;

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

//This route will take the user to the home page.
app.get('/', function(req, res){
  res.render('index');
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
  res.render('sign_up');
})

app.post('/sign_up', function(req, res){
  const name = req.body.name;
  const username = req.body.username; 
  const email = req.body.email;
  const password = req.body.password;

  console.log(name);
  console.log(username);
  console.log(email);
  console.log(password);
})

//Code to start server
app.listen(3000, function(){
  console.log('Server Started, check port 3000');
});
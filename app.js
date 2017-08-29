const express = require('express');
const path = require('path');

const app = express();

//Setting up the view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Setting up public folder 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index');
}); 

//Code to start server
app.listen(3000, function(){
  console.log('Server Started, check port 3000');
});
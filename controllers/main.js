const request = require('request');
const asteroid = require('../modules/asteroid');

module.exports.image = function(req, res){

  let errors = null;
  
  res.render('image', {
    errors: errors
  });

};

module.exports.home = function(req, res){

  let errors = null;

  res.render('home', {
    errors: errors
  });

};

module.exports.asteroid = function(req,res){
    //Variables used within this function
  let errors = null;
  let totalBodies = ""; //This variable will display the total number of bodies on the page

  //This variable will hold the current date. 
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
        let url = parsedData.near_earth_objects[currentDate][i].nasa_jpl_url;
        //The following code will bring the numbers down to 2 numbers past the decimal point. 
        size = asteroid.fixDecimal(size);

        //I am adding decimal points to my values. 
        size = asteroid.fixNumbers(size);
        missDistance = asteroid.fixNumbers(missDistance);
        speed = asteroid.fixNumbers(speed);

        //I then push all of the variables into an array of objects to hold the data. 
        dataArray.push({ rockSize: size, rockName: rockName, missDistance: missDistance, speed: speed, url: url });
      }

      //Rendering the page along with the data. 
      res.render('astroid', {
        errors: errors,
        bodies: totalBodies,
        dataArray: dataArray,
        date: currentDate
      });
    }
  });
}
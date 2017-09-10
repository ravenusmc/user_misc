function test(){

  //Getting the current date 
  let currentDate = new Date();
  //Turning the current date into yyyy-mm-dd format
  currentDate = currentDate.toISOString().slice(0,10);

  //Setting up to get the API request
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + currentDate + "&end_date=" + currentDate + "&api_key=YVjqNFAtV4LbLUs9fXWTAYUW7YYkKwjALgTg3l0t", false);
  xhr.send();
  //Setting up a variable to hold the response
  let response = xhr.response
  //Setting up the response to be parsed by Javascript code. 
  let image = JSON.parse(response);

  console.log(image);

  //Here I place the image that is retrieved into the browswer. 
  // document.getElementById("dailyImage").setAttribute("src", image.url);
  // console.log(image.hdurl);
}

window.onload = function(){
  test();
}
//All of the code in the page will deal with the image page. 

function getImage(){
  //Setting up to get the API request
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.nasa.gov/planetary/apod?api_key=YVjqNFAtV4LbLUs9fXWTAYUW7YYkKwjALgTg3l0t", false);
  xhr.send();
  //Setting up a variable to hold the response
  let response = xhr.response
  //Setting up the response to be parsed by Javascript code. 
  let image = JSON.parse(response);

  //Here I place the image that is retrieved into the browswer. 
  document.getElementById("dailyImage").setAttribute("src", image.url);
  console.log(image.hdurl);
}

window.onload = function(){
  getImage();
}


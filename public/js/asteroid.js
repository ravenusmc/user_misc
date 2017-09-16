//This page will hold all of the JavaScript functions for the asteroid page. 

//Global Variables used throughout the project
var modal = document.getElementById('simpleModal');
var closeBtn = document.getElementsByClassName('closeBtn')[0];


//This function will change the background of the container along with 
//opening up the modal
function changeBackground(elm) {

  //Get model element
  var modal = document.getElementById('simpleModal');
  //get open modal button
  var modalBtn = document.getElementById(elm);
  //Close Button
  var closeBtn = document.getElementById('closeBtn');

  if (elm.style.backgroundColor === 'lightgreen') {
    elm.style.backgroundColor = 'yellow';
    openModal();
    asteroidData();
  }else if (elm.style.backgroundColor === 'yellow')  {
    elm.style.backgroundColor = 'lightgreen';
  }
}

//Event listener to close the modal. 
closeBtn.addEventListener('click', closeModal);

//This function opens the modal.
function openModal() {
  modal.style.display = 'block';
}

//This function closes the modal. 
function closeModal(){
  modal.style.display = 'none';
}

function asteroidData(){

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
  let parsedData = JSON.parse(response);

  dataLength = parsedData.near_earth_objects[currentDate].length;

  console.log(parsedData)
}





//Code the I used to test concepts. 

//let r_a = 0.3;
// "rgba(0,0,0, " + r_a + ")";
// (target.style.backgroundColor == "rgba(0,0,0, " + r_a + ")")

//let target = document.getElementById('single_div_0').className;

// onmouseover='changeColor();' 


// function changeColor(){
//   document.getElementById("single_div_0").setAttribute("style", "background-color: yellow;");
// }

// function changeColor(){
//   document.getElementById("single_div_1").setAttribute("style", "background-color: yellow;");
// }

//This function will toggle the colors from one color to another. 
// function colorSwitch(target) {
//   if (target.style.backgroundColor === 'lightgreen') {
//     target.style.backgroundColor = 'yellow'
//   }else if (target.style.backgroundColor === 'yellow')  {
//     target.style.backgroundColor = 'lightgreen';
//   }
// } 


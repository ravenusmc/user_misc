//This page will hold all of the JavaScript functions for the asteroid page. 

//This function will toggle the colors from one color to another. 
function colorSwitch(target) {
  if (target.style.backgroundColor === 'lightgreen') {
    target.style.backgroundColor = 'yellow'
  }else if (target.style.backgroundColor === 'yellow')  {
    target.style.backgroundColor = 'lightgreen';
  }
} 

function test(elm) {
 // var children = document.getElementById('parent_div').childNodes;
 // console.log(children[1].id);

 //debugger;

  if (elm.style.backgroundColor === 'lightgreen') {
    elm.style.backgroundColor = 'yellow'
  }else if (elm.style.backgroundColor === 'yellow')  {
    elm.style.backgroundColor = 'lightgreen';
  }

 //elm.style.backgroundColor = 'red';

 // id_array = [];

 //  for (var i = 0; i < dataLength; i++){
 //    var target = document.querySelector('#single_div_' + i).id;
 //    id_array.push(target);
 //  }

  //[1, 2, 3].includes(2);




 // onclick='test();'
}


//This function will be executed when the page loads and also has within it the event listener functions 
//For when a user clicks. 
function asteroidMain(){

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

  //test(dataLength);


  // document.getElementById("single_div_0").addEventListener('click', function(){
  //   let target = document.getElementById('single_div_0');
  //   colorSwitch(target);
  // });

  // document.getElementById("single_div_1").addEventListener('click', function(){
  //   let target = document.getElementById('single_div_1');
  //   colorSwitch(target);
  // });

  // document.getElementById("single_div_2").addEventListener('click', function(){
  //   document.getElementById("single_div_2").setAttribute("style", "background-color: yellow;");
  // });

  // document.getElementById("single_div_3").addEventListener('click', function(){
  //   document.getElementById("single_div_3").setAttribute("style", "background-color: yellow;");
  // });

  // document.getElementById("single_div_4").addEventListener('click', function(){
  //   document.getElementById("single_div_4").setAttribute("style", "background-color: yellow;");
  // });

  // document.getElementById("single_div_5").addEventListener('click', function(){
  //   document.getElementById("single_div_5").setAttribute("style", "background-color: yellow;");
  // });

  // document.getElementById("single_div_6").addEventListener('click', function(){
  //   document.getElementById("single_div_6").setAttribute("style", "background-color: yellow;");
  // });

  // document.getElementById("single_div_7").addEventListener('click', function(){
  //   document.getElementById("single_div_7").setAttribute("style", "background-color: yellow;");
  // });

  // document.getElementById("single_div_8").addEventListener('click', function(){
  //   document.getElementById("single_div_8").setAttribute("style", "background-color: yellow;");
  // });

  // document.getElementById("single_div_9").addEventListener('click', function(){
  //   document.getElementById("single_div_9").setAttribute("style", "background-color: yellow;");
  // });

  // document.getElementById("single_div_10").addEventListener('click', function(){
  //   document.getElementById("single_div_10").setAttribute("style", "background-color: yellow;");
  // });

}

window.onload = function(){
  asteroidMain();
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


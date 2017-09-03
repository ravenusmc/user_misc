

//Setting up global values for the page. 
let latValue = null;
let longValue = null;


//This function gets the latitude and longitude coordinates. 
function getValues(result) {
    latValue = result.geometry.location.lat();
    longValue = result.geometry.location.lng();

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.nasa.gov/planetary/earth/imagery?lon=" + longValue + "&lat=" + latValue + "&date=2017-02-01&cloud_score=True&api_key=YVjqNFAtV4LbLUs9fXWTAYUW7YYkKwjALgTg3l0t", false);
    xhr.send();
    let response = xhr.response
    let myData = JSON.parse(response);
   
}

//    2460 Chandler Grove Dr


function getLatitudeLongitude(callback, address) {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
}

var button = document.getElementById('btn');

button.addEventListener("click", function () {
    var address = document.getElementById('address').value;
    getLatitudeLongitude(getValues, address)
});

  //Need to get the user to enter the address in the form 

  //convert the address to lat longitude coordinates

  //take the coordinates and put them into the NASA API.




////// SCRAP CODE ////////

// function showResult(result) {
//     latValue = result.geometry.location.lat();
//     alert(latValue);
//     document.getElementById('latitude').value = result.geometry.location.lat();
//     document.getElementById('longitude').value = result.geometry.location.lng();

// }

 //let api = "https://api.nasa.gov/planetary/earth/imagery?lon=-83.968060&lat=34.089791&date=2017-02-01&cloud_score=True&api_key=YVjqNFAtV4LbLUs9fXWTAYUW7YYkKwjALgTg3l0t";
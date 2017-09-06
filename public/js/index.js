//Setting up global values for the page. 
let latValue = null;
let longValue = null;
let button = document.getElementById('btn');

//This function will get the JSON data from the NASA API using the lat and long coordinates
function getJSON(latValue, longValue){

    //Setting up to get the API request
    let xhr = new XMLHttpRequest();
    //This line will go out to the specific site that I'm requesting based on the longitude and latitude values
    xhr.open("GET", "https://api.nasa.gov/planetary/earth/imagery?lon=" + longValue + "&lat=" + latValue + "&date=2017-02-01&cloud_score=True&api_key=YVjqNFAtV4LbLUs9fXWTAYUW7YYkKwjALgTg3l0t", false);
    xhr.send();
    //Setting up a variable to hold the response
    let response = xhr.response
    //Setting up the response to be parsed by Javascript code. 
    let myData = JSON.parse(response);
    //returning the parsed data
    return myData
}

//This function gets the latitude and longitude coordinates. 
function getValues(result) {
    latValue = result.geometry.location.lat();
    longValue = result.geometry.location.lng();

    let data = getJSON(latValue, longValue);

    //Below line was used only for reference
    //console.log(data.url);

    //Here I place the image that is retrieved into the browswer. 
    document.getElementById("image").setAttribute("src", data.url);
}


//This function gets the lat and long coordinates from Google based on the address the user typed in. 
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

//This is an event listener which will fire once the user hits the orange submit button.
button.addEventListener("click", function () {
    var address = document.getElementById('address').value;
    getLatitudeLongitude(getValues, address)
});







//This function adds commas into really big numbers. 
module.exports = {
  fixNumbers: function(number){
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }, 
  fixDecimal: function(number){
    return number.toFixed(2);
  },
  getDate: function(){
    //Getting the current date-I know I did this above and repeating myself but the variable was 
    //not carrying through so I had to do this again-frustrating!
    let currentDate = new Date();
    //Turning the current date into yyyy-mm-dd format
    currentDate = currentDate.toISOString().slice(0,10);
    return currentDate;
  }
};


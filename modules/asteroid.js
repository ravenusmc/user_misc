//This function adds commas into really big numbers. 
module.exports = {
  fixNumbers: function(number){
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }, 
  fixDecimal: function(number){
    return number.toFixed(2);
  }
};

// module.exports = {
//   fixDecimal: function(number){
//     return number.toFixed(2);
//   }
// }



// module.exports = {
//   fixNumbers: function(number){
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }
// };
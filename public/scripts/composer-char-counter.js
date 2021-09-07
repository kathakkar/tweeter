$(document).ready(function() {
  let charcounter = 0;
  let max_limt = null;
  $('#tweet-text').on('keypress', function(event) {
    if(charcounter >= 140){
      charcounter = 0;
      max_limt = 140;
    }
    if (!max_limt) {
      charcounter ++;
    } else {
      $('#tweet-counter').css("color", "red");
      charcounter --;
    }
    $('#tweet-counter').text(charcounter);
  })
});
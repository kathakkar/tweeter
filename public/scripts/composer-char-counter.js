$(document).ready(function() {

  const limit = 140;
  $('#tweet-text').on('keypress', function(event) {  
    let charcounter = Number($('#tweet-counter').val());
    let max_limt = Number($('#max_limit').val());
    if(charcounter >= limit){
      charcounter = 0;
      max_limt = limit;
      $('#max_limit').val(max_limt);
      $('#tweet-counter').val(charcounter);
    
    } else if (max_limt === 140) {
      $('#tweet-counter').css("color", "red");
      charcounter --;
      $('#tweet-counter').text(charcounter);
      
    } else {
      charcounter ++;
      $('#tweet-counter').text(charcounter);
    }
  })
});
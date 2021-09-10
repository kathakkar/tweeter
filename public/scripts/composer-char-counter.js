$(document).ready(function() {
  const max_limit = 140;
  let resultCount = 0;

  // Characters count on keypress event
  $('#tweet-text').on('keypress', function(event) {  
    let $tweetTextLength = $('#tweet-text').val().length + 1;
    resultCount = max_limit - $tweetTextLength;
    if (resultCount >= 0){
      $('#tweet-counter').css("color", "#545149");
      $('#tweet-counter').text($tweetTextLength);
    } else {
      $('#tweet-counter').css("color", "red");
      $('#tweet-counter').text(resultCount);
    }
  })  
});
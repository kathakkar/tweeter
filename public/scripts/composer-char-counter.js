$(document).ready(function() {
  const max_limit = 140;
  let resultCount = 0;

  // Characters count on keypress event
  $('#tweet-text').on('keypress', function(event) {  
    let $tweetTextLength = $('#tweet-text').val().length + 1;
    resultCount = max_limit - $tweetTextLength;
    if (resultCount >= 0){
      $('#tweet-counter').addClass('counterGreyClass');
      $('#tweet-counter').text(resultCount);
    } else {
      $('#tweet-counter').removeClass('counterGreyClass');
      $('#tweet-counter').addClass('counterRedClass');
      $('#tweet-counter').text(resultCount);
    }
  });
  
  $('#tweet-text').on('keydown', function(event) {
    if (event.keyCode == 46 || event.keyCode == 8) 
    {
      if(Number($('#tweet-counter').val()) < max_limit){
        resultCount = Number($('#tweet-counter').val()) + 1;
        if (resultCount >= 0) {
          $('#tweet-counter').addClass('counterGreyClass');
          $('#tweet-counter').text(resultCount);
        } else {
          $('#tweet-counter').removeClass('counterGreyClass');
          $('#tweet-counter').addClass('counterRedClass');
          $('#tweet-counter').text(resultCount);
        }  
      }    
    }
  })
});
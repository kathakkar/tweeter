/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const loadTweets = function () {
    $.getJSON('/tweets/', function(tweetsJSON){
      renderTweets(tweetsJSON);
        }).fail(function(){
            console.log("An error has occurred.");
    });
  }
  loadTweets();

  const postData = function (obj) {
    $.post('/tweets/', obj, (response) => {
      console.log(response)
      loadTweets();
    })
  }

  const $form = $('#new-tweet form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const $tweet_val = $('#tweet-text').val();
    if($tweet_val.trim() === ""){
      $('#tweet_error_msg').empty();
      $('#tweet_error').show();
      $('#tweet_error_msg').append('Tweet content is empty, Please enter content and retweet.');
    } else if($tweet_val.length > 140){
      $('#tweet_error_msg').empty();
      $('#tweet_error').show();
      $('#tweet_error_msg').append('Tweet content length is too long, Please enter content < 140 characters.');
    } else {
      const serializedData = $(this).serialize(); 
      postData(serializedData);
      $('#tweet-text').val('');
      $('#tweet-counter').val(0);
      $("#max_limit").val(0);
      $('#tweet-counter').css("color", "#545149");
      $('#tweet_error_msg').empty();
      $('#tweet_error').hide();
    }
    
  });


const createTweetElement = function (obj) {
  let time_ago_count = timeago.format(obj["created_at"]);

  const $article = $('<article>').addClass('tweet');
  const $header = $('<header>');
  const $spanImg = $('<span>').attr('id','tweet_img').html(`<img src="${obj['user']['avatars']}">`);
  const $spanUserName = $('<span>').attr('id','tweet_username').text(obj['user']['name']);
  const $spanUserId = $('<span>').attr('id','tweet_user_id').text(obj['user']['handle']);

  $header.append($spanImg, $spanUserName, $spanUserId);

  const $main = $('<main>');
  const $b = $('<b>').text(obj['content']['text']);


  $main.append($b);

  const $footer = $('<footer>');
  const $spanTimeSpan = $('<span>').attr('id','tweet_timespan').text(time_ago_count);
  const $spanIcons = $('<span>').attr('id','tweet_icons').html('<i class="fas fa-flag"></i>&nbsp;&nbsp;<i class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i>');
  
  $footer.append($spanTimeSpan, $spanIcons);

  $article.append($header, $main, $footer);


  // let markUp = `<article class="tweet">
  //             <header>  
  //             <span id="tweet_img"><img src="${obj['user']['avatars']}"></span>
  //             <span id="tweet_username">${obj['user']['name']}</span>
  //             <span id="tweet_user_id"><b>${obj['user']['handle']}</b></span></header>
  //             <main><b>${obj['content']['text']}</b></main>
  //             <footer>
  //             <span id="tweet_timespan"><h6>${time_ago_count}</h6></Span>
  //             <span id="tweet_icons"><i class="fas fa-flag"></i>&nbsp;&nbsp;<i class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i></span>
  //             </footer></article>`;
  return $article;
}

const renderTweets = function (tweets) {
  $('#tweet-counter').val(0);
  $('#tweet-container').empty();
  for(let tweet in tweets){
    const $tweet = createTweetElement(tweets[tweet]);
    $('#tweet-container').prepend($tweet);
  }
}

});



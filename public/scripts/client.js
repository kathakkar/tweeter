/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// DOM Loads

$(document).ready(function() {

  //Tweets loads
  loadTweets();

  //Hide tweet form on DOM load
  $('#new-tweet').hide();

  
  //Form submit
  $('#tweet_form').on('submit', function(event) {
    event.preventDefault();
    const $tweet_val = $('#tweet-text').val();
    const errMsg = validateTweet($tweet_val);
    if(errMsg.trim() !== '') {
      $('#tweet_error_msg').empty();
      $('#tweet_error').show(500);
      $('#tweet_error_msg').append(errMsg);
    }
    else {
      const serializedData = $(this).serialize(); 
      postTweet(serializedData);
      resetVariables();
    }
  });

  // Hide and Show tweet form on composer button click
  $('.new_tweet_link  > .fa-angle-double-down').on('click',() => {
    $('#new-tweet').toggle(500);
    $('#tweet-text').focus();
  });

});

//Functions declarations

const toggleButton = function(){
  $('.fa-angle-double-down').toggle();
}

const loadTweets = function () {
  $.getJSON('/tweets/', function(tweetsJSON){
    renderTweets(tweetsJSON);
      }).fail(function(){
          console.log("An error has occurred.");
  });
}

const validateTweet = function (textValue) {
  let errMsg = '';
  if(textValue.trim() === ""){
    errMsg = "Tweet content is empty, Please enter content and retweet.";
  } else if(textValue.length > 140){
    errMsg = "Tweet content length is too long, Please enter content < 140 characters.";
  }
  return errMsg;
}

const resetVariables = function () {
  $('#tweet-text').val('');
  $('#tweet-counter').val(140);
  $("#max_limit").val(0);
  $('#tweet-counter').css("color", "#545149");
  $('#tweet_error_msg').empty();
  $('#tweet_error').hide();
} 

const postTweet = function (obj) {
  $.post('/tweets/', obj, (response) => {
    console.log(response)
    loadTweets();
  })
}

const renderTweets = function (tweets) {
  $('#tweet-counter').val(140);
  $('#tweet-container').empty();
  for(let tweet in tweets){
    const $tweet = createTweetElement(tweets[tweet]);
    $('#tweet-container').prepend($tweet);
  }
}


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
  const $spanTimeSpan = $('<span>').attr('id','tweet_timespan');
  const $h6 = $('<h6>').text(time_ago_count);

  $spanTimeSpan.append($h6);

  const $spanIcons = $('<span>').attr('id','tweet_icons').html('<i class="fas fa-flag"></i>&nbsp;&nbsp;<i class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i>');
  
  $footer.append($spanTimeSpan, $spanIcons);

  $article.append($header, $main, $footer);

  return $article;
}
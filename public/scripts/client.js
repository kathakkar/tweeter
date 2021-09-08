/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function (obj) {
  let time_ago_count = timeago.format(obj["created_at"]);
  let markUp = `<article class="tweet">
              <header>  
              <span id="tweet_img"><img src="${obj['user']['avatars']}"></span>
              <span id="tweet_username">${obj['user']['name']}</span>
              <span id="tweet_user_id"><b>${obj['user']['handle']}</b></span></header>
              <main><b>${obj['content']['text']}</b></main>
              <footer>
              <span id="tweet_timespan"><h6>${time_ago_count}</h6></Span>
              <span id="tweet_icons"><i class="fas fa-flag"></i>&nbsp;&nbsp;<i class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i></span>
              </footer></article>`;
  return markUp;
  
}

const renderTweets = function (tweets) {
  for(let tweet in tweets){
    const $tweet = createTweetElement(tweets[tweet]);
    $('#tweet-container').append($tweet);
  }

}

$(document).ready(function() {
  // $(form).on('submit',function (event){
  //   event.preventDefault();
  //   alert("in");
  // });
  $.getJSON("/tweets/", function(tweetsJSON){
    renderTweets(tweetsJSON);
    }).fail(function(){
        console.log("An error has occurred.");
    });
    // const $tweet = createTweetElement(tweetData);
    // $('#tweet-container').append($tweet); 
});



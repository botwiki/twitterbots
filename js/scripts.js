"use strict";

function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function showBots(){
  var botList = document.getElementById('bot-list');


  var request = new XMLHttpRequest();
  request.open('GET', 'https://botwiki.org/api/bot-list/?filter=twitterbots', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var bots = shuffle(JSON.parse(request.responseText));
      var random_bots = bots.slice(0, 4);

      var random_bots_html = '';

      for (var i = 0, j = random_bots.length; i < j; i++){
        var image_src = 'https://botwiki.org/content' + random_bots[i].replace('/bots/twitterbots/', '/bots/twitterbots/images/') + '.png';

        random_bots_html += '<li><a href="https://botwiki.org' + random_bots[i] + '">'
                          + '<img src="' + image_src + '" >'
                          + '</a></li>';
      }
      document.getElementById('bot-list').innerHTML = random_bots_html;
    }
  };

  request.send();  
}

ready(function(){
  showBots();
});

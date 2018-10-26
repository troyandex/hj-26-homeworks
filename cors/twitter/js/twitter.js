'use strict';

function randName() {
  return 'rn' + String( Math.random() ).slice(-6);
}

function showLoadData(data) {
  document.querySelector('[data-wallpaper]').src = data.wallpaper;
  document.querySelector('[data-username]').textContent = data.username;
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-pic]').src = data.pic;
  document.querySelector('[data-tweets]').value = data.tweets;
  document.querySelector('[data-followers]').value = data.followers;
  document.querySelector('[data-following]').value = data.following;
}

function loadData(url) {
  const callbackName = randName();
  return new Promise((done, fail) => {
    window[callbackName] = done;

    // const script = document.scripts[0].cloneNode();
    const script = document.createElement('script');
    script.src = `${url}?callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
  .then(showLoadData)
  .catch(err => console.log(err));
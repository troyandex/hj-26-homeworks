'use strict'
const content = document.getElementById('content');
const preloaderJS = document.getElementById('preloader');
const tabs = document.querySelectorAll('nav>a');

for (const tab of tabs) {
  tab.addEventListener('click', clickOnTab);
}

function clickOnTab(event) {
  event.preventDefault();
  Array.from(tabs).forEach( (tab) => tab.classList.remove('active') );
  this.classList.add('active');
  const requestHref = this.href;

  const xhr = new XMLHttpRequest();
  xhr.addEventListener('loadstart', onLoadStart);
  xhr.addEventListener('loadend', onLoadEnd);
  xhr.addEventListener('load', onLoad);

  xhr.open('GET', requestHref, true);
  xhr.send();
  
  function onLoad() {
    content.innerHTML = xhr.responseText;
  }

  function onLoadStart() {
    preloaderJS.classList.remove('hidden');
  }
  function onLoadEnd() {
    preloaderJS.classList.add('hidden');
  }
}
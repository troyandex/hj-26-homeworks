'use strict';
// global
const mainImg = document.getElementById('view');
const currentImg = document.getElementsByClassName('gallery-current')[0];
const imgLinks = document
  .getElementsByClassName('gallery-nav')[0]
  .getElementsByTagName('a');

// listener
for (const imgLink of imgLinks) {
  imgLink.addEventListener('click', setImg);
}

function setImg(event) {
  event.preventDefault();
  // remove current
  for (const imgLink of imgLinks) {
    imgLink.classList.remove('gallery-current');
  }
  // set current
  this.classList.add('gallery-current');
  mainImg.src = this.href;
}


'use strict';

const img = document.getElementById('currentPhoto');
const buttonPrev = document.getElementById('prevPhoto');
const buttonNext = document.getElementById('nextPhoto');

const links = [
  "i/breuer-building.jpg",
  "i/guggenheim-museum.jpg",
  "i/headquarters.jpg",
  "i/IAC.jpg",
  "i/new-museum.jpg"
];
let i = 0;

buttonPrev.onclick = function prevPhoto() {
  i = links.indexOf(img.src) - 1;
  if (i < 0) { i = links.length - 1 } // если первый элемент переходим к последнему
  img.src = links[i];
  console.log(links[i]);
};

buttonNext.onclick = function nextPhoto() {
  i = links.indexOf(img.src) + 1;
  if (i == links.length) { i = 0 } // если последний элемент переходим к первому
  img.src = links[i];
  console.log(links[i]);
};

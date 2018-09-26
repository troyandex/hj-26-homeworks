'use strict';

const img = document.getElementById('currentPhoto');
const buttonPrev = document.getElementById('prevPhoto');
const buttonNext = document.getElementById('nextPhoto');

const images = [
  "i/breuer-building.jpg",
  "i/guggenheim-museum.jpg",
  "i/headquarters.jpg",
  "i/IAC.jpg",
  "i/new-museum.jpg"
];
img.src = images[0]; // сразу ставим фото
let i = 0; // стартовый индекс первого изображения


function changeImg(index) {
	img.src = images[i];
}

buttonPrev.onclick = function prevPhoto() {
	i === 0 ? i = images.length - 1 : --i;
	changeImg(i);
};

buttonNext.onclick = function nextPhoto() {
  i == images.length - 1 ? i = 0 : ++i;
	changeImg(i);
};

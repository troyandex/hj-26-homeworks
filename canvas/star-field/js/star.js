'use strict';

const canvas = document.querySelector('canvas');
canvas.addEventListener('click', skyGenerator);
const ctx = canvas.getContext('2d');
skyGenerator();

function skyGenerator() {
	const width = canvas.width;
	const height = canvas.height;
	const starsAmount = randInt(200, 400);

	ctx.beginPath();
	ctx.fillStyle = '#000000';
	ctx.globalAlpha = 1;
	ctx.fillRect(0, 0, width, height);

	for (let i = 1; i <= starsAmount; i++) {
		ctx.beginPath();
		ctx.fillStyle = randColor();
		ctx.globalAlpha = rand(0.8, 1);
		const starRadius = rand(0, 1.1 / 2);
		const starX = rand(0, width);
		const starY = rand(0, height);
		ctx.arc(starX, starY, starRadius, 0, 2 * Math.PI);
		ctx.fill();
	}
}

function rand(min, max) {
	return min + ( (max - min) * Math.random() );
}

function randInt(min, max) {
  return Math.round(rand(min, max));
}

function randColor() {
  const r = rand(0, 3);
  if (r < 1) {
    return '#ffffff';
  } else if (r < 2) {
    return '#ffe9c4';
  } else {
    return '#d4fbff';
  }
}

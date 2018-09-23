'use strict';

const img = document.getElementById('slider');
const links = [
  "i/airmax-jump.png",
  "i/airmax-on-foot.png",
  "i/airmax-playground.png",
  "i/airmax-top-view.png",
  "i/airmax.png"
];
let step = 0;

setInterval(() => {
  img.src = links[step % (links.length - 1)];
  step += 1;
}, 5000); // шаг 5 секунд */
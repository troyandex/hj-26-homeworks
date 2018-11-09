'use strict';

const pupil = document.querySelector('.big-book__pupil');
const eye = document.querySelector('.big-book__eye');

// console.log(eye.offsetWidth);
// console.log(eye.getBoundingClientRect().left + pageXOffset, eye.getBoundingClientRect().top + pageYOffset);
// console.log(document.body.scrollWidth, document.body.scrollHeight);

let mouseX = 0;
let mouseY = 0;
const eyeX = (eye.getBoundingClientRect().left + eye.getBoundingClientRect().right) / 2 + pageXOffset;
const eyeY = (eye.getBoundingClientRect().top + eye.getBoundingClientRect().bottom) / 2 + pageYOffset;
const leftFromEye = eyeX;
const upFromEye = eyeY;
const rightFromEye = document.body.scrollWidth - eyeX;
const downFromEye = document.body.scrollHeight - eyeY;
// console.log(eyeX, eyeY);

document.addEventListener('mousemove', event => {
    mouseX = event.pageX;
    mouseY = event.pageY;
}); 

function tick() {
    const pupilX = mouseX < eyeX ? 30 * (mouseX - eyeX) / leftFromEye : 30 * (mouseX - eyeX) / rightFromEye;
    const pupilY = mouseY < eyeY ? 30 * (mouseY - eyeY) / upFromEye : 30 * (mouseY - eyeY) / downFromEye;
    const maxDelta = Math.max(Math.abs(pupilX), Math.abs(pupilY));
    const pupilSize = 3 - (maxDelta / 15);

    pupil.style.setProperty('--pupil-x', `${pupilX}px`);
    pupil.style.setProperty('--pupil-y', `${pupilY}px`);
    pupil.style.setProperty('--pupil-size', pupilSize);
    window.requestAnimationFrame(tick);
}

tick();
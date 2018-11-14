'use strict';

const leftEyePos = document.querySelector('.cat_position_for_left_eye');
const rightEyePos = document.querySelector('.cat_position_for_right_eye');
const leftEye = document.querySelector('.cat_eye_left');
const rightEye = document.querySelector('.cat_eye_right');
const sizeOfEyePos = leftEyePos.offsetWidth;
const sizeOfEye = leftEye.offsetWidth * 0.5;

function drag(x, y) {
   console.log('mousemove');
  const shiftX = x / document.documentElement.clientWidth;
  const shiftY = y / document.documentElement.clientHeight;

  function editEyePos(eye) {
    eye.style.left = ( (shiftX * sizeOfEyePos ) - sizeOfEye) + 'px';
    eye.style.top = ( (shiftY * sizeOfEyePos ) - sizeOfEye) + 'px';
  }
  editEyePos(leftEye);
  editEyePos(rightEye);
};

document.addEventListener('mousemove', event => drag(event.pageX, event.pageY));

function throttle(callback) {
  let isWaiting = false;
  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    }
  }
};


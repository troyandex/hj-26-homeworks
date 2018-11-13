'use strict';

const trash = document.getElementById('trash_bin');
let movedPiece = null;

document.addEventListener('mousedown', event => {
  if (event.target.classList.contains('logo')) {
    movedPiece = event.target;
  }
});

const drag = throttle((x, y) => {
  if (movedPiece) {
    x = x - (movedPiece.offsetWidth	 / 2); 
    y = y - (movedPiece.offsetHeight / 2);
    movedPiece.style.left = x + 'px';
    movedPiece.style.top = y + 'px';
    movedPiece.classList.add('moving');
  }
});

document.addEventListener('mouseup', event => {
  if (movedPiece) {
    if (event.target === trash) {
      movedPiece.style.display = 'none';
    }
    movedPiece.classList.remove('moving');
    movedPiece = null;
  }
});

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
  };
}

// возможно не правильно понял формулировку: "При захвате элемента курсор должен быть в центре этого элемента." - переметить курсор посредствам js нельзя. Решил сместить изобрежение при перетаскивании, так чтоб курсор был в центре.
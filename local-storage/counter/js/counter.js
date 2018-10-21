'use strict';

const counter = document.getElementById('counter');
const plusBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

function initCounter () {
	if (!localStorage.counter) {
    localStorage.counter = 0;
	}
	counter.textContent = localStorage.counter
}

plusBtn.addEventListener('click', () => {
  localStorage.counter++;
  initCounter();
});

decrementBtn.addEventListener('click', () => {
  localStorage.counter--;
  initCounter();
});

resetBtn.addEventListener('click', () => {
  localStorage.counter = 0;
  initCounter();
});

initCounter();
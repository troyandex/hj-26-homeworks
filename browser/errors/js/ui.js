'use strict';
function handleClick() {
  openMail();
}
const button = document.getElementById('open');
button.onclick = handleClick;


/* Мой вариант - работает но не по заданию:
const button = document.getElementById('open');
button.onclick = function handleClick() {
  openMail(); 
} */
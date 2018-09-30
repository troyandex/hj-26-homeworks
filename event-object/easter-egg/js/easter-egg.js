'use strict';
// global
const navTag = document.getElementsByTagName('nav')[0];
const secretTag = document.getElementsByClassName('secret')[0];
const enteredKeys = []; // масив для keylogger

function keylogger(event) {
  // сочетание клавиш для отображения меню:
  if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
    navTag.classList.toggle('visible');
  }

  // сочетание клавиш для отображения меню:
  // если нажата клавиша с символом (прим. ctrlKey = boolean )
  if (typeof event.code === 'string') {
    let enteredKey = event.code.replace('Key', '').toLowerCase();
    // console.log(enteredKey);
    enteredKeys.push(enteredKey);
  }

  if (enteredKeys.length === 9 && enteredKeys.join('') === 'ytnjkjubz') {
    // ytnjkjubz = нетология
    secretTag.classList.add('visible');
  } else if (enteredKeys.length >= 9) {
    enteredKeys.splice(0, 1); // убираем первый символ
  }
  // console.log(enteredKeys);
  // console.log('- check -');
}

document.addEventListener('keydown', keylogger);
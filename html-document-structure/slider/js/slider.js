'use strict';
// родитель <main class="slider">
const slider = document.querySelector('.slider');
let activeSlide = slider.getElementsByClassName('slide')[0];
activeSlide.classList.add('slide-current');

// кнопки навигации
const sliderNav = slider.querySelector('.slider-nav');
const prevButton = sliderNav.querySelector('[data-action=prev]');
prevButton.addEventListener('click', updateSlide);
// console.log(prevButton);
const nextButton = sliderNav.querySelector('[data-action=next]');
nextButton.addEventListener('click', updateSlide);
// console.log(nextButton);
const firstButton = sliderNav.querySelector('[data-action="first"]');
firstButton.addEventListener('click', updateSlide);
// console.log(firstButton);
const lastButton = sliderNav.querySelector('[data-action=last]');
lastButton.addEventListener('click', updateSlide);
// console.log(lastButton);
updateDisabledButton(); 
// updateDisabledButton2();

function updateSlide(event) {
  activeSlide.classList.remove('slide-current');
  console.log(`event.currentTarget = ${event.currentTarget}`);

  switch (event.currentTarget) {
    case prevButton:
      activeSlide = activeSlide.previousElementSibling;
      break;
    case nextButton:
      activeSlide = activeSlide.nextElementSibling;
      break;
    case firstButton:
      activeSlide = activeSlide.parentElement.firstElementChild;
      break;
    case lastButton:
      activeSlide = activeSlide.parentElement.lastElementChild;
      break;
  }
  activeSlide.classList.add('slide-current');
  console.log(`event.currentTarget = ${event.currentTarget}`);

  updateDisabledButton(); 
  // updateDisabledButton2();
}

// не понимаю почему не работает ".disabled"
// пример с лекции работате 
// https://codepen.io/solarrust/pen/PmbmjZ?editors=0010
function updateDisabledButton2 () {
  // проверяем слева
  prevButton.disabled = activeSlide.previousElementSibling ? false : true;
  firstButton.disabled = activeSlide.previousElementSibling ? false : true;
  // проверяем справа
  nextButton.disabled = activeSlide.nextElementSibling ? false : true;
  lastButton.disabled = activeSlide.nextElementSibling ? false : true;

  // даже если просто силой делать
  // prevButton.disabled = true;
}

// а через "classList" так работает:
// по сути логика одинаковая
function updateDisabledButton () {
  if (activeSlide.previousElementSibling) {
    prevButton.classList.remove('disabled');
    firstButton.classList.remove('disabled');
  } else {
    prevButton.classList.add('disabled');
      firstButton.classList.add('disabled');
  }

  if (activeSlide.nextElementSibling) {
    nextButton.classList.remove('disabled');
    lastButton.classList.remove('disabled');
  } else {
    nextButton.classList.add('disabled');
    lastButton.classList.add('disabled');
  }
}  
// но тогда дабовляется класс а не отключается кнопка
// то есть на нее можно нажать
// потерял нить
'use strict';
// родитель <main class="slider">
const slider = document.querySelector('.slider');
let activeSlide = slider.getElementsByClassName('slide')[0];
activeSlide.classList.add('slide-current');

// кнопки навигации
const sliderNav = slider.querySelector('.slider-nav');
const prevButton = sliderNav.querySelector('[data-action=prev]');
const nextButton = sliderNav.querySelector('[data-action=next]');
const firstButton = sliderNav.querySelector('[data-action="first"]');
const lastButton = sliderNav.querySelector('[data-action=last]');

Array.from(sliderNav.getElementsByTagName('a')).forEach(button => {
  button.addEventListener('click', updateSlide);
});

// первая проверка состяния кнопок:
updateDisabledButton(); 

// меняет слайд
function setActiveSlide(newSlide) {
  activeSlide.classList.remove('slide-current');
  activeSlide = newSlide;
  activeSlide.classList.add('slide-current');
  updateDisabledButton();
}

// основная функция выбор направления
function updateSlide() {
  // console.log(event.target);
  if (event.target.classList.contains('disabled')) {
    return;
  }

  switch (event.target) {
    case nextButton:
      setActiveSlide(activeSlide.nextElementSibling);
      break;
    case lastButton:
      setActiveSlide(activeSlide.parentElement.lastElementChild);
      break;
    case prevButton:
      setActiveSlide(activeSlide.previousElementSibling);
      break;
    case firstButton:
      setActiveSlide(activeSlide.parentElement.firstElementChild);
      break; 
  }
}

// отслеживаем и проставляем сласс 'disabled'
function updateDisabledButton() {
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
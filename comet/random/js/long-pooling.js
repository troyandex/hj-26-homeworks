'use strict';
const longPooling = document.querySelector('.long-pooling');

function longPoolingRequest() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', event => {
    const oldElement = longPooling.querySelector('.flip-it');

    if (event.target.status === 202) {
      const element = findElement(event.target.response, longPooling);
      selectElement(element, oldElement);

    } else {
      console.log(`Выбранным остается прежний элемент ${oldElement.innerText}, так как получен ответ от сервера: 
        ${event.target.status}: ${event.target.statusText}`);
    }

    longPoolingRequest();
  });

  xhr.addEventListener('error', event => {
    console.log('Произошла ошибка', event);
  });

  xhr.open("GET", 'https://neto-api.herokuapp.com/comet/long-pooling', true);
  xhr.send();
}

document.addEventListener('DOMContentLoaded', (event) => {
  longPoolingRequest();
});
'use strict';

// общие функции для частых, длинных опросов и веб-сокетов
function findElement(id, container) { //
  id = Number.parseInt(id);

  if (id < 1 || id > 10) return;

  return Array.from(container.querySelectorAll('div')).find(div => {
    if (Number.parseInt(div.innerText) === id) {
      return div;
    }
  });
}

function selectElement(element, oldElement) {
  if (oldElement) {
    oldElement.classList.remove('flip-it');
  }

  element.classList.add('flip-it');
}

// реализация для частых опросов
const pooling = document.querySelector('.pooling');

function poolingRequest() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', event => {
    const oldElement = pooling.querySelector('.flip-it');
    if (event.target.status === 200) {
      const element = findElement(event.target.response, pooling);
      selectElement(element, oldElement);

    } else {
      console.log(`Выбранным остается прежний элемент ${oldElement.innerText}, так как получен ответ от сервера: 
        ${event.target.status}: ${event.target.statusText}`);
    }
  });

  xhr.addEventListener('error', event => {
    console.log('Произошла ошибка', event);
  });

  xhr.open("GET", 'https://neto-api.herokuapp.com/comet/pooling', true);
  xhr.send();
}

let poolingTimer;

document.addEventListener('DOMContentLoaded', (event) => {
  poolingTimer = setInterval(poolingRequest, 5000); // запускаем функцию с определенной переодичностью
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    clearInterval(poolingTimer); // для остановки
    console.log('Обновление данных методом частых опросов было прервано');
  }
});
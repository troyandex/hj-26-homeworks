'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
const usersCounter = document.querySelector('.counter');
const errorsCounter = document.querySelector('output.errors');

window.addEventListener('beforeunload', () => {
  connection.close(1000, 'Пользователь вышел');
});

connection.addEventListener('message', (event) => {
  let data = JSON.parse(event.data);

  usersCounter.innerText = data.connections;
  errorsCounter.innerText = data.errors
});
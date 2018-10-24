'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

const chat = document.querySelector('.chat');
const chatStatus = chat.querySelector('.chat-status');
const messageSubmit = chat.querySelector('.message-submit');
const messageStatus = chat.querySelector('.message-status');
const messagesContent = chat.querySelector('.messages-content');
const messageBox = chat.querySelector('.message-box');
const messageInput = chat.querySelector('.message-input');
const message = chat.querySelector('.messages-templates').querySelectorAll('.message')[1];
const messagePersonal = chat.querySelector('.message-personal');
const loading = chat.querySelector('.loading');

console.log(message);
function currentTime() {
	let now = new Date().toLocaleTimeString().slice(0, 5);
	return now;
};

connection.addEventListener('open', () => {
  // статус рядом с аватаром
  chatStatus.textContent = chatStatus.dataset.online;
  // активируем кнопку
  messageSubmit.disabled = false;
  // клонируем текст
  const msg = messageStatus.cloneNode(true);
  msg.querySelector('.message-text').textContent = 'Пользователь появился в сети';
  messagesContent.appendChild(msg);
});

connection.addEventListener('message', () => {
	let msg = event.data;
	showMsg(msg);
});

function showMsg(msgText) {
	// если последний был "...", убираем 
  if (messagesContent.lastElementChild.classList.contains('loading')) {
    messagesContent.removeChild(messagesContent.lastElementChild);
  }

  let msg;
  if (msgText === '...') {
  	// пользователь печатает сообщение
    msg = loading.cloneNode(true);
  } else {
  	// получили текст
    msg = message.cloneNode(true);
    msg.querySelector('.message-text').textContent = msgText;
    msg.querySelector('.timestamp').textContent = currentTime();
  }
  // добавляем сообщение в диологовое окно 
  messagesContent.appendChild(msg);
};

messageBox.addEventListener('submit', event => {
  // убираем ссылку по умолчанию и отправляем сообщение
  event.preventDefault();
  connection.send(messageInput.value);

  // добавляем сообщение в диологовое окно
  const msg = messagePersonal.cloneNode(true);
  msg.querySelector('.message-text').textContent = messageInput.value;
  msg.querySelector('.timestamp').textContent = currentTime();
  messagesContent.appendChild(msg);

  // обнуляем поле ввода
  messageInput.value = '';
});

// закретие соедениения - для теста набрать в консоль `connection.close(1000);`
connection.addEventListener('close', event => {
  console.log('Вэбсокет соединение закрыто');
  console.log(event);
  chatStatus.textContent = chatStatus.dataset.offline;
  messageSubmit.disabled = true;

  const msg = messageStatus.cloneNode(true);
  msg.querySelector('.message-text').textContent = 'Пользователь не в сети';
  messagesContent.appendChild(msg);
});

// закрытие соедениения при закрытии вкладки - должно работать и без
window.addEventListener('beforeunload', () => {
	connection.close(1000, 'Window is closed');
});

// исправление стилей - вертикальная прокрутка 
document.querySelector('.messages').style.overflowY = 'auto';
messagesContent.style.height = '100%';
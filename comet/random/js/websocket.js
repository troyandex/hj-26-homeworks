'use strict';
const webSocket = document.querySelector('.websocket');

function webSocketRequest() {
  const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
  ws.addEventListener('message', event => {
    const oldElement = webSocket.querySelector('.flip-it');
    const element = findElement(event.data, webSocket);
    selectElement(element, oldElement);
  });

  ws.addEventListener('close', event => {
    webSocketRequest();
    console.log(`WebSocket соединение было закрыто (код закрытия: ${event.code}) и открыто повторно`);
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  webSocketRequest();
});
'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
showBubbles(connection);

document.querySelector('body').addEventListener('click', event => {
    const coords = {
        x: event.clientX,
        y: event.clientY
    };
    // console.log(coords);
    connection.send(JSON.stringify(coords));
    showBubbles(connection);
})
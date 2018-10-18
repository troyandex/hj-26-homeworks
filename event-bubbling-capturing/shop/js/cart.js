'use strict';

document.querySelector('.items-list').addEventListener('click', addToCartButtonFunction);

function addToCartButtonFunction(event) {
    if (!event.target.classList.contains('add-to-cart')) {
        return;
    }
    event.preventDefault();

    const title = event.target.dataset.title;
    const price = event.target.dataset.price;

    // находим выбранный товар
    const item = items // items = массив данных из loader.js
        .filter(item => ( (item.title === title) && (item.price === +price) ))
        .pop();

    // функция из loader.js
    addToCart(item);
}
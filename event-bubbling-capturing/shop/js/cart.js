'use strict';

document.querySelector('.items-list').addEventListener('click', addToCartButtonFunction);

function addToCartButtonFunction(event) {
  if (!event.target.classList.contains('add-to-cart')) {
    return;
  }
  event.preventDefault();

  addToCart({
    title: event.target.dataset.title,
    price: event.target.dataset.price
  });
}
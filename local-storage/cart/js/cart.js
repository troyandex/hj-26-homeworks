'use strict';

const xhrColors = new XMLHttpRequest();
xhrColors.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
xhrColors.send();
xhrColors.addEventListener('load', () => {
  checkRequestResponse(xhrColors, showColors);

  Array.from( document.querySelectorAll('#colorSwatch input') ).forEach(input => {
    input.addEventListener('change', (event) => {
      localStorage.setItem('colorChosen', event.currentTarget.value);
    });
  });
});

const xhrSizes = new XMLHttpRequest();
xhrSizes.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
xhrSizes.send();
xhrSizes.addEventListener('load', () => {
  checkRequestResponse(xhrSizes, showSizes);

  Array.from( document.querySelectorAll('#sizeSwatch input') ).forEach(input => {
    input.addEventListener('change', (event) => {
      localStorage.setItem('sizeChosen', event.currentTarget.value);
    });
  });
});

document.getElementById('AddToCartForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const xhrCart = new XMLHttpRequest();
  const fd = new FormData( document.getElementById('AddToCartForm') );
  fd.append('productId', document.getElementById('AddToCartForm').dataset.productId);

  xhrCart.addEventListener('load', () => {
  	checkRequestResponse(xhrCart, showCart);
  });
  xhrCart.open('POST', 'https://neto-api.herokuapp.com/cart');
  xhrCart.send(fd);
});


///////////////////////////////////////////////////////////////////////////////////
function showCart(cart) {
  console.log(cart);
  let cartHTML = '';
  let cost = 0;
  for (const item of cart) {
    cost += item.quantity * item.price;
    cartHTML += `
    <div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
      <div class="quick-cart-product-wrap">
        <img src=${item.pic} title=${item.title}>
        <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
      <span class="quick-cart-product-remove remove" data-id=${item.id}></span>
    </div>`;
  }
  cartHTML += `
  <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${cart.length === 0 ? '' : 'open'}">
      <span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">${cost}</span>
      </span>
  </a>`;
  document.querySelector('#quick-cart').innerHTML = cartHTML;

  // remove item from cart
  Array.from( document.querySelectorAll('.quick-cart-product-remove') ).forEach(removeButton => {
      removeButton.addEventListener('click', (event) => {
        console.log('remove');
        const xhrRemove = new XMLHttpRequest();
        const fd = new FormData();
        fd.append('productId', event.currentTarget.dataset.id);

        xhrRemove.addEventListener('load', () => {
        	checkRequestResponse(xhrRemove, showCart);
        });
        xhrRemove.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
        xhrRemove.send(fd);
      });
  });
}

///////////////////////////////////////////////////////////////////////////////////
function showColors(colors) {
  let colorsHTML = '';
  for (const color of colors) {
    colorsHTML += `
    <div data-value=${color.type} class="swatch-element color ${color.type} ${color.isAvailable ? 'available' : 'soldout'}">
      <div class="tooltip">${color.title}</div>
      <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value=${color.type} ${isChecked(color) ? 'checked' : ''} ${color.isAvailable ? '' : 'disabled'}>
      <label for="swatch-1-${color.type}" style="border-color: red;">
        <span style="background-color: ${color.code};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>`;
  }
  document.querySelector('#colorSwatch .header').outerHTML += colorsHTML;

  function isChecked(color) {
    if (!localStorage.colorChosen) {
      return color.isAvailable;
    }
    if (color.isAvailable && (localStorage.colorChosen === color.type)) {
      return true;
    }
    return false;
  }
}

///////////////////////////////////////////////////////////////////////////////////
function showSizes(sizes) {
  let sizesHTML = '';
  for (const size of sizes) {
    sizesHTML += `
    <div data-value=${size.type} class="swatch-element plain ${size.type} ${size.isAvailable ? 'available' : 'soldout'}">
        <input id="swatch-0-${size.type}" type="radio" name="size" value=${size.type} ${isChecked(size) ? 'checked' : ''} ${size.isAvailable ? '' : 'disabled'}>
      <label for="swatch-0-${size.type}">
        ${size.title}
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>`;
  }
  document.querySelector('#sizeSwatch .header').outerHTML += sizesHTML;

  function isChecked(size) {
    if (!localStorage.sizeChosen) {
      return size.isAvailable;
    }
    if (size.isAvailable && (localStorage.sizeChosen === size.type)) {
      return true;
    }
    return false;
  }
}

///////////////////////////////////////////////////////////////////////////////////
function checkRequestResponse(request, callback) {
  try {
    if (request.status < 200 || request.status >= 300) {
      throw new Error(request.statusText);
    }
    const response = JSON.parse(request.response);
    if (response.error) {
        throw new Error(response.message);
    } 
    callback(response);
  } catch (err) {
	  console.log(`Произошла ошибка ${err.name}: ${err.message}`);
  }
}
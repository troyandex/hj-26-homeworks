function getPriceFormatted(value) {
  return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
// выше исходный код

function init() {
	let buttons = document.querySelectorAll('.add');
	let cartCountNode = document.getElementById('cart-count');
	let cartTotalPriceNode = document.getElementById('cart-total-price');
	let cartCount = 0;
	let cartTotalPrice = 0;
	// console.log(buttons);

	function addItem() {
		// console.log('click');
	  cartCountNode.innerHTML = ++cartCount;
	  cartTotalPrice += Number(this.dataset.price);
	  cartTotalPriceNode.innerHTML = getPriceFormatted(cartTotalPrice);
	}

	for (const button of buttons) {
	  button.addEventListener('click', addItem);
	}	

}

document.addEventListener('DOMContentLoaded', init);

'use strict';

const dropdown = document.getElementsByClassName('wrapper-dropdown')[0];
// console.log(dropdown);

function toggleActiveClass() {
	dropdown.classList.toggle('active');
}

dropdown.onclick = toggleActiveClass;

/* 
// Альтернативный метод из лекции (сложнее для старых)
function toggleActiveClass() {
  const classNames = dropdown.className.split(' ');
	const index = classNames.indexOf('active');
	if (index === -1) {
		classNames.push('active');
	} else {
		classNames.splice(index, 1);
	}
	dropdown.className = classNames.join(' ');
}
*/


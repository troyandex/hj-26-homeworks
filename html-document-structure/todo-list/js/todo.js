'use strict';

const todoList = document.querySelector('.todo-list');
const doneList = todoList.querySelector('.done');
const undoneList = todoList.querySelector('.undone');

const labels = todoList.getElementsByTagName('label');
const labelsArr = Array.from(labels);
labelsArr.forEach(label => label.addEventListener('click', updateList));

function updateList() {
	const label = event.target;
	const input = label.querySelector('input');

	if (label.querySelector('input').checked) {
		console.log('-true-');
		undoneList.appendChild(label);
	} else {
		console.log('-false-');
		doneList.appendChild(label);
	}
}
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
		// 1 вариант = input.removeAtribute('checked');
		// 2 вариант = input.checked = false;
		undoneList.appendChild(label);
	} else {
		console.log('-false-');
		// 1 вариант = input.setAtribute('checked');
		// 2 вариант = input.checked = true;
		doneList.appendChild(label);
	}
}

// нужно доработать изменения checked (не получается добавить/убрать)
// или я не правильно понял?
// по идее работает и так
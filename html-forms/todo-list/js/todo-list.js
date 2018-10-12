'use strict';
const tasks = document.querySelectorAll('.list-block input');

function update() { // Ф - update выполненных задач
  let taskDoneAmount = 0;
  const taskLength = tasks.length;
  const listBlock = document.getElementsByClassName('list-block')[0];
  const listBlockOutput = document.querySelector('.list-block output');

  // считаем выполненные
  Array.from(tasks).forEach(task => {
    if (task.checked) {
      taskDoneAmount++;
    }
  });

	// сравниваем Done
	// CSS для ".complete h3" = зеленый
  if (taskDoneAmount === taskLength) {
    listBlock.classList.add('complete');
  } else {
    listBlock.classList.remove('complete');
  }
  // выводим результат
  listBlockOutput.value = `${taskDoneAmount} из ${taskLength}`;
}


// первый запуск
update(); 
// update по клику
Array.from(tasks).forEach(task => {
  task.addEventListener('click', update);
});
'use strict';

// генератор ссылок:
function getSoundsSrc(folder, soundId) {
  const soundNames = ['first', 'second', 'third', 'fourth', 'fifth'];
  const file = soundNames[soundId];
  
  return `sounds/${folder}/${file}.mp3`;
}

function playSound(event) {
  const buttons = document
  	.getElementsByClassName('set')[0]
  	.getElementsByTagName('li');

  const buttonId = Array.from(buttons).indexOf(event.target);
  const player = this.getElementsByTagName('audio')[0];

  player.src = getSoundsSrc(getSoundSet(event), buttonId);
  player.play();
}

// определяем необходимый набор звуков middle/lower/higher
function getSoundSet(event) {
  let selectedSoundSet = 'middle'; // по умолчанию

  if (event.shiftKey) {
    selectedSoundSet = 'lower';
  } else if (event.altKey) {
    selectedSoundSet = 'higher';
  }

  return selectedSoundSet;
}

const buttonsContainer = document.getElementsByClassName('set')[0];
const buttons = buttonsContainer.getElementsByTagName('li');

for (const button of buttons) {
  button.addEventListener('click', playSound);
}

// Интерфейс режима, в котором находится пианино 
// Меняем класс на теге <ul class="set <mark>middle</mark>">. 
function changePianoMode(event) {
	// убираем все
  buttonsContainer.classList.remove('middle', 'lower', 'higher');
  // добавляем необходимый
  buttonsContainer.classList.add(getSoundSet(event));
}

document.addEventListener('keydown', changePianoMode);
document.addEventListener('keyup', changePianoMode);
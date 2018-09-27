'use strict';

const buttons = document.getElementsByClassName('drum-kit__drum');

for (let button of buttons) {
  button.onclick = function() {
    let sound = this.getElementsByTagName('audio')[0];
    
    // останавливаем если уже звучит
    sound.pause();
    sound.currentTime = 0;
    // и запускаем
    sound.play();
  };
};


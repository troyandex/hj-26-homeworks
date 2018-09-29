'use strict';
// список песен:
let songs = [
  'mp3/LA Chill Tour.mp3',
  'mp3/LA Fusion Jam.mp3',
  'mp3/This is it band.mp3'
];
let songId = 0;

let player = document.getElementsByTagName('audio')[0];

// mediaplayer - для измения класса при проигровании (+/- 'play')
let mediaplayer = document.getElementsByClassName('mediaplayer')[0];

let playstate = document.getElementsByClassName('playstate')[0];
// по заданию - Play и  Pause вложены в кнопку "playstate"
let btnPlay = playstate.getElementsByClassName('fa fa-play')[0];
let btnPause = playstate.getElementsByClassName('fa fa-pause')[0];
// остальные кнопки:
let btnStop = document.getElementsByClassName('stop')[0];
let btnBack = document.getElementsByClassName('back')[0];
let btnNext = document.getElementsByClassName('next')[0];

function setTitle(songPath) {
  let songName = songPath.split('/').pop().replace('.mp3', '');
  document.getElementsByClassName('title')[0].title = songName;
}

function nextSong() {
  if (songId < songs.length - 1) {
    songId++
  } else {
    songId = 0;
  }

  setTitle(songs[songId]);
  return songs[songId];
}

function prevSong() {
  if (songId > 0) {
    songId--
  } else {
    songId = songs.length - 1;
  }

  setTitle(songs[songId]);
  return songs[songId];
}

function playSong() {
	if (player.paused) {
		player.play();
	} else {
		player.pause();
	}
	mediaplayer.classList.toggle('play');
};

function stopSong() {
  if (!player.paused) {
    player.pause();
  }
  // если play - убираем
	// по заданию почему-то: "останавливает воспроизведение
	// текущей песни, состояние кнопки не меняется"
  if(mediaplayer.classList.contains('play')) {
    mediaplayer.classList.remove('play');
  };
  // таймер на ноль  
  player.currentTime = 0;
}

function changeSong(direction) {
  stopSong();
  
  if (direction == 'back') {
    player.src = prevSong();
  } else if  (direction == 'next') {
    player.src = nextSong();
  } else {
  	throw new Err ('Ошибка выбора следующей песни!');
  }
}

playstate.onclick = () => {
	playSong();
}

btnStop.onclick = () => {
	stopSong();
}

btnBack.onclick = () => {
	changeSong('back');
}

btnNext.onclick = () => {
	changeSong('next');
}

// если песня кончилась - останавливаем и выбираем след. трек
player.onended = () => {
		stopSong();
		changeSong('next');
}

/* Альтернативный вариант на конец песни - тоже работает
player.ontimeupdate = function() {
	if (player.ended) {
		stopSong();
		changeSong('next');
	}
} */
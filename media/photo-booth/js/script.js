
const app = document.querySelector('.app');
const list = document.querySelector('.list');
const controls = document.querySelector('.app .controls');

const videoOutput = document.createElement('video');
useStream(); // первый запуск веб-камерой

// поток с веб-камеры
function useStream() {
  // запрашиваем поток
  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then((stream) => {
      videoOutput.autoplay = true;
      app.insertBefore(videoOutput, controls);

      const takePhotoBtn = document.querySelector('#take-photo');

      // встраиваем поток в видеотег
      videoOutput.src = URL.createObjectURL(stream); 

      // когда видеотег готов...
      videoOutput.addEventListener('canplay', (evt) => {
				controls.classList.add('visible');
        takePhotoBtn.addEventListener('click', (e) => {
          playSound();
          takePicture();
        });
      });
    })
    .catch((err) => {
      const errorOutput = document.querySelector('#error-message');
      errorOutput.innerText = `Ошибка: ${err.name}: ${err.message} \n ${err.stack}`;
      errorOutput.classList.add('visible');
    });
}

/**
 * Делает снимок с камеры
 */
function takePicture() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // проверяем его размеры
  canvas.width = videoOutput.videoWidth;
  canvas.height = videoOutput.videoHeight;

  // копируем текущий кадр видеотега в canvas
  ctx.drawImage(videoOutput, 0, 0);

  // обновляем картинку на странице
  canvas.toBlob(blob => createImage(blob, list));
}

// звук камеры
function playSound(soundUrl = './audio/click.mp3') {
  let player = document.querySelector('audio');
  if (!player) {
    // если нет элемента audio, добавляем в конец app
    player = document.createElement('audio');
    document.querySelector('.app').appendChild(player);
  }

  player.src = soundUrl;
  player.play();
}

// Список фотографий
function createImage(blob, container) {

  function disableButton(button) {
    button.parentNode.removeChild(button);
  }

  const imageUrl = URL.createObjectURL(blob);

  const imageContainerHTML =
    `
      <figure>
        <img src="${imageUrl}">
        <figcaption>
          <a href="${imageUrl}" download="snapshot.png" target="_blank">
            <i class="material-icons">file_download</i>
          </a>
          <a><i class="material-icons">file_upload</i></a>
          <a><i class="material-icons">delete</i></a>
        </figcaption>
      </figure>
    `;

  container.insertAdjacentHTML('afterBegin', imageContainerHTML);

  const newImage = container.querySelector('figure:first-child');
  const downloadBtn = newImage.querySelector('a:nth-child(1)');
  downloadBtn.addEventListener('click', event => {
    disableButton(event.target.parentNode); // убираем кнопку
  });

  const uploadBtn = newImage.querySelector('a:nth-child(2)');
  uploadBtn.addEventListener('click', event => {
    disableButton(event.target.parentNode); // убираем кнопку
    const uploadImgRqst = new XMLHttpRequest();

    uploadImgRqst.addEventListener('loadend', (evnt) => {
      console.log(`Ответ сервера: ${uploadImgRqst.responseText}`);
    });

    uploadImgRqst.addEventListener('loadstart', (evnt) => {
      console.log(`Начата отправка данных`);
    });

    uploadImgRqst.open('POST', 'https://neto-api.herokuapp.com/photo-booth', true);

    const formData = new FormData();
    formData.append('image', blob);

    uploadImgRqst.send(formData);
  });

  const deleteBtn = newImage.querySelector('a:nth-child(3)');
  deleteBtn.addEventListener('click', event => {
    const image = event.target.parentNode.parentNode.parentNode;
    image.parentNode.removeChild(image);
    console.log(event.target.parentNode);
  });
}
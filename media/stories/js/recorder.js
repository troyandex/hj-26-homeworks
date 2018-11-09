'use strict';

// исходный код:
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

/* исходный рекордер
function record(app) {
  return new Promise((done, fail) => {
    app.mode = 'preparing';
    setTimeout(() => {
      fail('Не удалось записать видео');
    }, app.limit);
  });
}
*/

// измененная функция:
function record(app) {
  app.mode = 'preparing';

  return new Promise((done, fail) => {

    navigator.mediaDevices
      .getUserMedia(app.config)
      .then((stream) => {
        // встраиваем поток в видеотег
        app.preview.src = URL.createObjectURL(stream); 
        app.mode = 'recording';

        let recorder = new MediaRecorder(stream);
        let chunks = []; // промежуточный массив для записываемого видео

        recorder.addEventListener('dataavailable', (e) => chunks.push(e.data));
        recorder.addEventListener('stop', (e) => {
          const recorded = new Blob(chunks, {'type': recorder.mimeType}); // склеиваем записаное видео
          chunks = null; // избегаем утечки памяти

          // очищаем поток и рекордер
          app.preview.srcObject = null;
          stream.getTracks().forEach(track => track.stop());
          recorder = stream = null;

          createThumbnail(recorded)
            .then(frame => {
              app.mode = 'sending';
              done({video: recorded, frame: frame});
            });
        });

        recorder.start(1000); // начинаем запись

        setTimeout(() => {
          recorder.stop(); // останавливаем запись через переданное количество времени
        }, app.limit);

      })

      .catch((err) => {
        fail(`Не удалось записать видео, ошибка: ${err.name}: ${err.message} \n ${err.stack}`);
      });

  });
}
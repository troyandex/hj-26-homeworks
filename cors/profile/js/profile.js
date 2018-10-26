'use strict';

const profileUrl = 'https://neto-api.herokuapp.com/profile/me';
const container = document.querySelector('.content');

function getProfileTechsUrl(userId = 1) {
  return `https://neto-api.herokuapp.com/profile/${userId}/technologies`;
}

function updateProfile(profile) {
  container.querySelector('[data-name]').innerText = profile.name; // имя пользователя
  container.querySelector('[data-description]').innerText = profile.description; // описание пользователя
  container.querySelector('[data-pic]').src = profile.pic; // аватар пользователя
  container.querySelector('[data-position]').innerText = profile.position; // специализация

  loadData(getProfileTechsUrl(profile.id), updateProfileTechs);
  container.style.display = 'initial';
}

function updateProfileTechs(profileTechs) {
  // обновляет список технологий в профиле
  if (Array.isArray(profileTechs)) {
    let techs = '';

    profileTechs.forEach(tech => {
      techs += `<span class="devicons devicons-${tech}"></span>`;
    });

    container.querySelector('[data-technologies]').innerHTML = techs;
  }
}

function loadData(url, urlHandler) {
  const functionName = randName();

  if (typeof urlHandler === 'function') {
    return new Promise((done, fail) => {
      window[functionName] = urlHandler;

      const script = document.createElement('script');
      script.src = `${url}?jsonp=${functionName}`;
      console.log(script.src); 
      document.body.appendChild(script);
    });
  }
}

function randName() {
  // возвращает случайное неиспользуемое имя функции
  function generator() {
    return 'func' + Math.round(Math.random() * 10000);
  }

  let funcName;
  while (!funcName || window[funcName]) {
    funcName = generator();
  }

  return funcName;
}

loadData(profileUrl, updateProfile);
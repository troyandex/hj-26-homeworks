'use strict';

const formSignIn = document.querySelector('form.sign-in-htm');
const formSignUp = document.querySelector('form.sign-up-htm');

/////////////////////////////////////////////////////////////////////////
formSignIn.addEventListener('submit', test);
formSignUp.addEventListener('submit', test);

function test(event) {
	event.preventDefault();
	// console.log('event');
  // console.log(event);
  const selectForm = (event.target === formSignIn) ? formSignIn : formSignUp;

  const request = new XMLHttpRequest();
  const formData = new FormData(selectForm);
  let fd = {};
  for (const [key, value] of formData) {
    fd[key] = value;
  }
  // console.log('fd');
  // console.log(fd);

  request.addEventListener('load', () => {
    checkServerAnswer(selectForm, request);
  });

	let host = (selectForm === formSignIn) ? 
		'https://neto-api.herokuapp.com/signin' : 'https://neto-api.herokuapp.com/signup';

  // console.log('host');
  // console.log(host);
  request.open('POST', host);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(fd));
} 
/////////////////////////////////////////////////////////////////////////
function checkServerAnswer(selectForm, request) {
	// console.log(selectForm);
  try {
    if (request.status < 200 || request.status >= 300) {
      throw new Error(request.statusText);
    }
    // console.log('resp1');
    // console.log(request.response);
    const resp = JSON.parse(request.response);

    if (resp.error) {
      selectForm.querySelector('.error-message').value = resp.message;
      console.log('resp');
      console.log(resp);
      throw new Error(resp.message);
    }
    // console.log('resp2');
    // console.log(resp);
    if (selectForm === formSignIn) {
      selectForm.querySelector('.error-message').value = `Пользователь ${resp.name} успешно авторизован`;
    } else {
      selectForm.querySelector('.error-message').value = `Пользователь ${resp.name} успешно зарегистрирован`;
    }
      
  } catch (err) {
    console.log('Произошла ошибка:' + err);
  }
}
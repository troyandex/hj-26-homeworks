'use strict'
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', onLoad);
xhr.addEventListener("error", onError);
xhr.open('GET', 'https://neto-api.herokuapp.com/book/');
xhr.send();

const content = document.querySelector('#content')
content.innerHTML ='';

function onLoad() {
  if (xhr.status !== 200) {
    console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
  } else {
    const books = JSON.parse(xhr.responseText);
    let bookNew;
    let index;
    for (const book of books) {
      content.appendChild(document.createElement('li'));
      bookNew = document.querySelectorAll('#content > li'); 
      index = books.indexOf(book); 
      bookNew[index].innerHTML =`<img src="${book.cover.small}">`;  
      bookNew[index].dataset.title = book.title;  
      bookNew[index].dataset.author = book.author.name; 
      bookNew[index].dataset.info = book.info; 
      bookNew[index].dataset.price = book.price; 
    }
  }
}

function onError() {
  console.log("Ошибка закгрузки");
}
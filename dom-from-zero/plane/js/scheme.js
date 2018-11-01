'use strict';
const planeSelector = document.querySelector('#acSelect');
const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
const btnSetEmpty = document.querySelector('#btnSetEmpty');
const seatMapTitle = document.querySelector('#seatMapTitle');
const seatMapDiv = document.querySelector('#seatMapDiv');
const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult');
const totalHalf = document.querySelector('#totalHalf');

document.addEventListener('DOMContentLoaded', updateSelectedPlane);
planeSelector.addEventListener('change', updateSelectedPlane);
btnSeatMap.addEventListener('click', updateScheme);
btnSetFull.addEventListener('click', fillSeats);
btnSetEmpty.addEventListener('click',fillSeats );


function updateScheme(event) {
  // при нажатии Показать схему
  event.preventDefault();

  fetch(`https://neto-api.herokuapp.com/plane/${planeSelector.value}`)
    .then(res => res.json())
    .then(data => {
      totalPax.innerText = data.passengers;
      btnSetFull.disabled = false;
      btnSetEmpty.disabled = false;
      totalAdult.innerText = 0;
      totalHalf.innerText = 0;
      console.log(data);
      showSeatMap(data);

      document.querySelectorAll('div.seat').forEach(seat => {
        seat.addEventListener('click', clickOnSeat);
      })
    });
}

function fillSeats(event) {
  event.preventDefault();
  // очищает или заполняет сиденья
  const seats = document.querySelectorAll('div.seat');

  if (event.target === btnSetEmpty) {
    // когда нажали Очистить
    seats.forEach(seat => {
      seat.classList.remove('adult');
      seat.classList.remove('half');
    });

    totalAdult.innerText = 0;
    totalHalf.innerText = 0;

  } else if (event.target === btnSetFull) {
    // когда нажали Заполнить
    let className;

    if (event.altKey) {
      className = 'half';
      totalAdult.innerText = 0;
      totalHalf.innerText = totalPax.innerText;
    } else {
      className = 'adult';
      totalAdult.innerText = totalPax.innerText;
      totalHalf.innerText = 0;
    }

    seats.forEach(seat => {
      seat.classList.remove('half');
      seat.classList.remove('adult');
      seat.classList.add(className);
    });
  }
}

function updateSelectedPlane() {
  // обновление элементов при выборе самолета в селекторе
  const selectedPlane = planeSelector.querySelector(`[value="${planeSelector.value}"]`);
  seatMapTitle.innerText = `Airbus ${selectedPlane.innerText}`;
  btnSetFull.disabled = true;
  btnSetEmpty.disabled = true;
  seatMapDiv.innerText = '';
  seatMapDiv.appendChild(browserJSEngine({ tag: 'h3', cls: 'text-center', content: 'Нажмите «Показать схему»' }));
}

function clickOnSeat(event) {
  // при нажатии на сиденье
  const target = (event.target.classList.contains('seat')) ? event.target : event.target.parentNode;

  if (target.classList.contains('adult')) {
    target.classList.remove('adult');
    totalAdult.innerText--;

  } else if (target.classList.contains('half')) {
    target.classList.remove('half');
    totalHalf.innerText--;

  } else if (event.altKey) {
    target.classList.add('half');
    totalHalf.innerText++;

  } else {
    target.classList.add('adult');
    totalAdult.innerText++;
  }
}

function showSeatMap(seatMap) {
  // отображает план самолета
  const seats = document.createDocumentFragment();

  for (let i = 0; i < seatMap.scheme.length; i++) {
    let row1, row2;

    switch (seatMap.scheme[i]) {
      case 4:
        row1 = [''].concat(seatMap['letters4'].slice(0, 2));
        row2 = seatMap['letters4'].slice(2, 4).concat(['']);
        break;
      case 6:
        row1 = seatMap['letters6'].slice(0, 3);
        row2 = seatMap['letters6'].slice(3, 6);

        break;
      default:
        row1 = ['', '', ''];
        row2 = row1;
    }

    const row = {
      rowNum: i,
      row1: row1,
      row2: row2
    };

    seats.appendChild(browserJSEngine(createSeatRowMapTemplate(row)));
  }

  seatMapDiv.innerText = '';
  seatMapDiv.appendChild(seats);
}

function createSeatRowMapTemplate(seatRowMap) {
  // возвращает шаблон ряда с сиденьями в виде JS-объекта
  return {
    tag: 'div',
    cls: ['row', 'seating-row', 'text-center'],
    content: [
      {
        tag: 'div', cls: ['col-xs-1', 'row-number'], content: [ { tag: 'h2', content: seatRowMap.rowNum } ]
      },
      {
        tag: 'div', cls: 'col-xs-5',
        content: seatRowMap.row1.reduce((arr, seat) => {
          console.log(arr, seat);
          arr.push((seat) ?
            { tag: 'div', cls: ['col-xs-4', 'seat'], content: [ { tag: 'span', cls: 'seat-label', content: seat } ] } :
            { tag: 'div', cls: ['col-xs-4', 'no-seat'] }
          );

          return arr;
        }, [])
      },
      {
        tag: 'div', cls: 'col-xs-5',
        content: seatRowMap.row2.reduce((arr, seat) => {
          arr.push((seat) ?
            { tag: 'div', cls: ['col-xs-4', 'seat'], content: [ { tag: 'span', cls: 'seat-label', content: seat } ] } :
            { tag: 'div', cls: ['col-xs-4', 'no-seat'] }
          );

          return arr;
        }, [])
      }
    ]
  };
}

function browserJSEngine(block) { // движок из лекции
  if (block === undefined || block === null || block === false) {
    return document.createTextNode('');
  }
  if (typeof block === 'string' || typeof block === 'number' || block === true) {
      return document.createTextNode(block);
  }
  if (Array.isArray(block)) {
    return block.reduce((f, el) => {
      f.appendChild(browserJSEngine(el));
      return f;
    }, document.createDocumentFragment())
  }
  const element = document.createElement(block.tag);

  element.classList.add(...[].concat(block.cls || []));

  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key]);
    });
  }

  element.appendChild(browserJSEngine(block.content));

  return element;
}
'use strict';

const currRequest = new XMLHttpRequest();
currRequest.addEventListener('loadstart', onLoadStart);
currRequest.addEventListener('loadend', onLoadEnd);
currRequest.addEventListener('load', onLoad);

currRequest.open('GET', 'https://neto-api.herokuapp.com/currency', true);
currRequest.send();

// status "download..." on/off"
function onLoadStart() {
  document.getElementById('content').classList.add('hidden');
  document.getElementById('loader').classList.remove('hidden');
}
function onLoadEnd() {
  document.getElementById('content').classList.remove('hidden');
  document.getElementById('loader').classList.add('hidden');
}

// main function
function onLoad() {
  const currList = JSON.parse(currRequest.responseText);

  const selectFrom = document.getElementById('from');
  console.log(selectFrom.selectedIndex);
  //
  const selectTo = document.getElementById('to');
  const sourceNode = document.getElementById('source');
  const resultNode = document.getElementById('result');

  for (const currency of currList) {
    const el = `<option value=${currency.code}>${currency.code}</option>`;
    selectFrom.innerHTML += el;
    selectTo.innerHTML += el;
  }

  sourceNode.addEventListener('input', updateResult);
  selectFrom.addEventListener('input', updateResult);
  selectTo.addEventListener('input', updateResult);

  function updateResult() {
    // ищем значение элемента в списке 
    function findValue(el, list) {
      const index = el.selectedIndex; 
      const code = el[index].value;
      return list.filter(curr => (curr.code === code)).shift().value;
    }
    const fromValue = findValue(selectFrom, currList);
    const toValue = findValue(selectTo, currList);

    resultNode.value = (sourceNode.value * (fromValue / toValue)).toFixed(2);
  }
  
  updateResult();
}
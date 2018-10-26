'use strict'

function randName() {
    return 'rn' + String( Math.random() ).slice(-6);
}

function showRecipe(data) {
    console.log(data);
    document.querySelector('[data-pic]').style = `background-image: url(${data.pic})`;
    document.querySelector('[data-title]').textContent = data.title;
    document.querySelector('[data-ingredients]').textContent = data.ingredients.join(', ');
}

function showRating(data) {
    console.log(data);
    document.querySelector('[data-rating]').textContent = data.rating.toFixed(2);
    document.querySelector('[data-star]').style = `width: ${data.rating / 10 * 100}%`;
    document.querySelector('[data-votes]').textContent = data.votes;
}

function showUsers(data) {
    console.log(data);
    let dataHTML = '';
    data.consumers.forEach(consumer => {
        dataHTML += `<img src=${consumer.pic} title=${consumer.name}>`;
    });
    dataHTML += `<span>(+${data.total - data.consumers.length})</span>`;
    document.querySelector('[data-consumers]').innerHTML = dataHTML;
}

function loadData(url) {
    const callbackName = randName();
    return new Promise((done, fail) => {
        window[callbackName] = done;

        const script = document.createElement('script');
        script.src = `${url}?callback=${callbackName}`;
        document.body.appendChild(script);
    });
}

loadData('https://neto-api.herokuapp.com/food/42')
    .then(showRecipe)
    .then(() => loadData('https://neto-api.herokuapp.com/food/42/rating'))
    .then(showRating)
    .then(() => loadData('https://neto-api.herokuapp.com/food/42/consumers'))
    .then(showUsers)
    .catch(err => console.log(err));
'use strict';

const PI = Math.PI;
const canvas = document.querySelector('#wall');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'white';
// количество объектов в диапазоне от 50 до 200 (snows = bubbles)
const objAmount = randIntNumber(25, 100); 
const snows = [];
const bubbles = [];

// основа
class Obj {
  constructor() {
    this.xInit = randNumber(0, canvas.width);
    this.yInit = randNumber(0, canvas.height);
    this.x = this.xInit;
    this.y = this.yInit;
    this.size = randNumber(0.1, 0.6);
    this.lineWidth = this.size * 5;
  }
  updatePosition() {
    const { x, y } = this.nextPoint(this.xInit, this.yInit, Date.now());
    this.x = x;
    this.y = y;
  }
}

class BubbleObj extends Obj {
  constructor() {
    super();
    this.radius = this.size * 12;
  }
  showBubbleObj() {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * PI);
    ctx.stroke();
  }
}

class SnowObj extends Obj {
  constructor() {
    super();
    this.side = this.size * 20;
    this.angle = randNumber(0, 2 * PI);
    this.angleSpeed = randNumber(-0.2, 0.2);
  }
  updatePosition() {
    super.updatePosition();
    this.angle += this.angleSpeed * 1;
  }
  showSnowObj() {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.moveTo(-this.side, 0);
    ctx.lineTo(this.side, 0);
    ctx.moveTo(0, -this.side);
    ctx.lineTo(0, this.side);

    ctx.stroke();
    ctx.restore();
  }
}

// создание
console.log(`Всего обьектов: ${objAmount*2}`);
for (let i = 0; i < objAmount; i++) {
  const snow = new SnowObj;
  snow.nextPoint = (Math.random() < 0.5) ? nextPoint1 : nextPoint2;
  snows.push( snow );

  const bubble = new BubbleObj;
  bubble.nextPoint = (Math.random() < 0.5) ? nextPoint1 : nextPoint2;
  bubbles.push( bubble );
}

// 20 кадров в секунду (1000 / 20 = 50)
setInterval(repaint, 50);

function repaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < objAmount; i++) {
    bubbles[i].updatePosition();
    bubbles[i].showBubbleObj();
    snows[i].updatePosition();
    snows[i].showSnowObj();
  }
}

// Функция времени 1:
function nextPoint1(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}
// Функция времени 2:
function nextPoint2(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  };
}

function randNumber(from, to) {
  return from + ( (to - from) * Math.random() );
}

function randIntNumber(from, to) {
  return Math.round(randNumber(from, to));
}
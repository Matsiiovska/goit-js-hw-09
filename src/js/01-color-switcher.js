


const butStart = document.querySelector('[data-start]');
const butStop = document.querySelector('[data-stop]');
const bodyDos = document.querySelector('body');


let id = 0;

const clStart = butStart.addEventListener('click', onStart);
const clStop = butStop.addEventListener('click', onStop);

function onStart() {
    
    id = setInterval(getBgColor, 1000);
    butStart.toggleAttribute('disabled');

};

function onStop() {
    
    clearInterval(id);
    butStart.removeAttribute('disabled');

};



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function getBgColor() {
    bodyDos.style.backgroundColor = getRandomHexColor();
}



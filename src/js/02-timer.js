// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";






const inpDost = document.querySelector('#datetime-picker');
const butDost = document.querySelector('[data-start]');
// const timDost = document.querySelector(".timer");
// const fieldDost = document.querySelector(".field");
const daysDost = document.querySelector('[data-days]');
const hoursDost = document.querySelector('[data-hours]');
const minutesDost = document.querySelector('[data-minutes]');
const secondsDost = document.querySelector('[data-seconds]');

let timeDiff = 0;//Різниця у часі
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,//час увімкнення
  time_24hr: true, // час 24 год
  defaultDate: new Date(), //дата за замовчуванням
  minuteIncrement: 1,// хвилинний приріст
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      currentDifferenceDate(selectedDates[0]);
  },
};
function convertMs() {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Залишок днів
  const days = Math.floor(ms / day);
  // Залишок годин
  const hours = Math.floor((ms % day) / hour);
  // Залишок мінут
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Залишок секунд
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

butDost.setAttribute('disabled', true);
flatpickr(inpDost, options);// в інпут календар додаємо

butDost.addEventListener('click', onStart);

window.addEventListener('keydown', e => {
    if (e.code === 'Escape' && timerId) {
      clearInterval(timerId);
      
      inpDost.removeAttribute('disabled');
      butDost.setAttribute('disabled', true); 


      secondsDost.textContent = '00';
      minutesDost.textContent = '00';
      hoursDost.textContent = '00';
      daysDost.textContent = '00';
    }
});



function onStart() {//натискання на кнопку
    timerId = setInterval(startTimer, 1000);
    
}

//перевірка дати

function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    butDost.setAttribute('disabled', true);
    return window.alert("Please choose a date in the future"); 
  }
  timeDiff = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDiff);

  renderDate(formatDate);
  butDost.removeAttribute('disabled');
}

//Таймер

function startTimer() {
  butDost.setAttribute('disabled', true);
  inpDost.setAttribute('disabled', true); 
  timeDiff -= 1000;

  if (secondsDost.textContent <= 0 && minutesDost.textContent <= 0) {
    window.alert("Time end");  
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDiff);
    renderDate(formatDate);
  }
  
}
function renderDate(formatDate) {
  secondsDost.textContent = formatDate.seconds;
  minutesDost.textContent = formatDate.minutes;
  hoursDost.textContent = formatDate.hours;
  daysDost.textContent = formatDate.days;
  
}

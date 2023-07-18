// Import library
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Get form element
const formDost = document.querySelector('.form');

// Set event listener submit on form
formDost.addEventListener('submit', onSubmitForm);

// Submit form
function onSubmitForm(evt) {
  evt.preventDefault();

  let delay = Number(formDost.delay.value);

  for (let i = 1; i <= formDost.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(formDost.step.value);
  }
}

// Create promise
function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      } else {
        // Reject
        reject(obj);
      }
    }, delay);
  });
}

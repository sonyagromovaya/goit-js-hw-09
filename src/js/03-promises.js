import Notiflix from 'notiflix';

const delayRef = document.querySelector("input[name='delay']");
const stepRef = document.querySelector("input[name='step']");
const amountRef = document.querySelector("input[name='amount']");
const formRef = document.querySelector('.form');

const amountNum = Number(amountRef.value);
const stepNum = Number(stepRef.value);
let delayNum = Number(delayRef.value);
// const btnRef = document.querySelector("button[type='submit']");
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// const consoleLogged = () => {
//   console.log('hello');
// };

// const amountOfTimes = (event, amountRef) => {
//   event.preventDefault();
//   for (let i = 0; i < amountRef; i += 1) {
//     createPromise();
//   }
// };

formRef.addEventListener('submit', event => {
  for (let i = 1; i <= amountNum; i += 1) {
    console.log('check');
    createPromise(i, delayNum)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayNum += stepNum;
  }
  event.preventDefault();
});

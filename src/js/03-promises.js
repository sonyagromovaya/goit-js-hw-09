// import Notiflix from 'notiflix';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
// const delayRef = document.querySelector("input[name='delay']");
// const stepRef = document.querySelector("input[name='step']");
// const amountRef = document.querySelector("input[name='amount']");
const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

// Функция-колбек вызываемая при событии submit
function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const dataForm = new FormData(form);
  const finalData = {};
  for (const [key, value] of dataForm.entries()) {
    finalData[key] = Number(value);
  }
  // очищаем форму
  form.reset();
  // в цикле for вызываем функцию создающую промис
  for (let position = 1; position <= finalData.amount; position += 1) {
    createPromise(position, finalData.delay).then(onSuccess).catch(onError);
    finalData.delay = finalData.delay + finalData.step;
  }
}

// Функция вызываемая методом catch, когда промис возвращает reject
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

// Функция вызываемая методом then, когда промис возвращает resolve
function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

// Вешаем слушателя на форму по событию submit
formRef.addEventListener('submit', onSubmit);

// const amountNum = Number(amountRef.value);
// const stepNum = Number(stepRef.value);
// let delayNum = Number(delayRef.value);
// const btnRef = document.querySelector("button[type='submit']");
// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// const consoleLogged = () => {
//   console.log('hello');
// };

// const amountOfTimes = (event, amountRef) => {
//   event.preventDefault();
//   for (let i = 0; i < amountRef; i += 1) {
//     createPromise();
//   }
// };

// formRef.addEventListener('submit', event => {
//   for (let i = 1; i <= amountNum; i += 1) {
//     console.log('check');
//     createPromise(i, delayNum)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     delayNum += stepNum;
//   }
//   event.preventDefault();
// });

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const inputPicker = document.querySelector('input#datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
const spanDaysRef = document.querySelector('[data-days]');
const spanHoursRef = document.querySelector('[data-hours]');
const spanMinutesf = document.querySelector('[data-minutes');
const spanSecondsRef = document.querySelector('[data-seconds]');

let msSelected = null;
let idInterval = null;

btnStartRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    msSelected = selectedDates[0].getTime();
    if (msSelected < new Date()) {
      Notify.failure('Please choose a date in the future.');
      return;
    }
    btnStartRef.classList.add('btn');
    btnStartRef.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

let object = {};

const onCountTime = () => {
  idInterval = setInterval(() => {
    const diff = msSelected - new Date().getTime();
    if (diff <= 0) {
      inputPicker.disabled = false;
      btnStartRef.disabled = false;
      clearTimeout(idInterval);
      return;
    }
    object = convertMs(diff);
    onChangeContent(addLeadingZero(object));
  }, 1000);
  inputPicker.disabled = true;
  btnStartRef.disabled = true;
};

function addLeadingZero(values) {
  const newValues = { ...values };
  const keys = Object.keys(newValues);
  for (const key of keys) {
    newValues[key] = String(newValues[key]).padStart(2, 0);
  }
  return newValues;
}

function onChangeContent({ days, hours, minutes, seconds }) {
  spanDaysRef.textContent = days;
  spanHoursRef.textContent = hours;
  spanMinutesf.textContent = minutes;
  spanSecondsRef.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStartRef.addEventListener('click', onCountTime);

// const inputPicker = document.querySelector('input#datetime-picker');
// const btnStartEl = document.querySelector('button[data-start]');
// const daysRef = document.querySelector('.value[data-days]');
// const hoursRef = document.querySelector('.value[data-hours]');
// const minutesRef = document.querySelector('.value[data-minutes]');
// const secondsRef = document.querySelector('.value[data-seconds]');
// let timerId = null;
// console.log(inputPicker);

// btnStartEl.setAttribute('disabled', 'disabled');

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// const addLeadingZero = value => String(value).padStart(2, 0);
// // const listenerBtnStart = selectedDates => {
// //   timerId = setInterval(() => {
// //     const deltaTime = selectedDates[0] - Date.now();
// //     const newFormatTime = convertMs(deltaTime);
// //     console.log('hello');
// //   }, 1000);
// // };

// flatpickr(inputPicker, {
//   altInput: true,
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//     //   console.log(this.defaultDate);
//     if (selectedDates[0] < new Date()) {
//       Notiflix.Notify.failure('Please choose a date in the future');
//     } else {
//       btnStartEl.removeAttribute('disabled');

//       const timer = () => {
//         const timeNow = Date.now();
//         const difference = selectedDates[0] - timeNow;
//         const { days, hours, minutes, seconds } = convertMs(difference);
//         daysRef.textContent = days;
//         hoursRef.textContent = addLeadingZero(hours);
//         minutesRef.textContent = addLeadingZero(minutes);
//         secondsRef.textContent = addLeadingZero(seconds);

//         //   btnStartEl.addEventListener('click', convertMs());
//         //   console.log(selectedDates[0] - new Date());
//         //   convertMs(selectedDates[0] - new Date());
//       };

//       const clicked = () => {
//         if (timerId) {
//           clearInterval(timerId);
//         } else {
//           timer();
//           timerId = setInterval(timer, 1000);
//         }
//       };
//       btnStartEl.addEventListener('click', clicked);
//     }
//   },
// });

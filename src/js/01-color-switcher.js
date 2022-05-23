const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
let timeId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStartEl.addEventListener('click', () => {
  timeId = setInterval(() => {
    console.log(getRandomHexColor());
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStartEl.setAttribute('disabled', 'disabled');
});

btnStopEl.addEventListener('click', () => {
  clearInterval(timeId);
  btnStartEl.removeAttribute('disabled');
});

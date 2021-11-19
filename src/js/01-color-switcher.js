const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
// =======================================================================
refs.startBtn.disabled = false;
let timerID = null;
// =======================================================================
refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  changeRandomBGColor();
});
refs.stopBtn.addEventListener('click', () => {
  refs.startBtn.disabled = false;
  clearInterval(timerID);
});
// =======================================================================
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// =======================================================================
function changeRandomBGColor() {
  timerID = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    console.log(getRandomHexColor());
  }, 1000);
}

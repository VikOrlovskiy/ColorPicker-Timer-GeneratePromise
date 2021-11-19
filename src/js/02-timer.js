import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
// ==================================================================
const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysLeft: document.querySelector('[data-days]'),
  hoursLeft: document.querySelector('[data-hours]'),
  minutesLeft: document.querySelector('[data-minutes]'),
  secondsLeft: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let timeLeft = 0;
let timerId = null;
let choseDate = 0;
// =====================================================================
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    choseDate = selectedDates[0];
    let isNotValidDate = choseDate < options.defaultDate;
    if (isNotValidDate) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
  },
};
// ==================
flatpickr(refs.input, options);
// =======================================================================
refs.startBtn.addEventListener('click', startClock);
// =======================================================================
function startClock() {
  refs.startBtn.removeEventListener('click', startClock);
  timerId = setInterval(() => {
    let nowDate = Date.now();
    timeLeft = choseDate - nowDate;
    updateClockFase(convertMs(timeLeft));

    if (timeLeft < 0) {
      clearInterval(timerId);
    }
  }, 1000);
}
// =======================================================================
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// =======================================================================
function convertMs(ms) {
  // Number of milliseconds per unit of time

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
// =======================================================================
function updateClockFase({ days, hours, minutes, seconds }) {
  refs.daysLeft.innerHTML = `${days}`;
  refs.hoursLeft.innerHTML = `${hours}`;
  refs.minutesLeft.innerHTML = `${minutes}`;
  refs.secondsLeft.innerHTML = `${seconds}`;
}

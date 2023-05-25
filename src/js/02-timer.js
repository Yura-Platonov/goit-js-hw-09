import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
let countdownInterval;
let isTimerRunning = false;

function startCountdown() {
  if (isTimerRunning) {
    return;
  }

  const targetDate = new Date(datetimePicker.value).getTime();

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      resetTimer();
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(distance);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }, 1000);

  datetimePicker.disabled = true;
  isTimerRunning = true;
}

function resetTimer() {
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  datetimePicker.value = '';
  startButton.disabled = true;
  datetimePicker.disabled = false;
  isTimerRunning = false;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
let selectedDate 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate.getTime() < Date.now()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

startButton.addEventListener('click', startCountdown);

// DOM Elements
const form = document.getElementById('date-form');
const startDateInput = document.getElementById('start-date');
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const ampmInput = document.getElementById('ampm');
const timerContainer = document.getElementById('timer-container');
const formContainer = document.getElementById('form-container');
const elapsedTimeDisplay = document.getElementById('elapsed-time');
const resetButton = document.getElementById('reset-button');

// Load start time from localStorage
let startTime = localStorage.getItem('startTime') || null;

// Function to calculate and display elapsed time
const updateElapsedTime = () => {
  if (!startTime) return;

  const start = new Date(startTime);
  const now = new Date();
  const diff = now - start;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  elapsedTimeDisplay.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

// Initialize the app
const initialize = () => {
  if (startTime) {
    formContainer.style.display = 'none';
    timerContainer.style.display = 'block';
    updateElapsedTime();
    setInterval(updateElapsedTime, 1000);
  } else {
    formContainer.style.display = 'block';
    timerContainer.style.display = 'none';
  }
};

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = startDateInput.value;
  const hour = parseInt(hourInput.value, 10);
  const minute = minuteInput.value;
  const ampm = ampmInput.value;

  if (date && hour && minute && ampm) {
    // Convert 12-hour format to 24-hour format
    const formattedHour = ampm === "PM" ? (hour % 12) + 12 : hour === 12 ? 0 : hour;
    const fullDateTime = `${date}T${formattedHour.toString().padStart(2, '0')}:${minute}:00`;
    startTime = fullDateTime;
    localStorage.setItem('startTime', startTime);

    initialize();
  }
});

// Handle reset
resetButton.addEventListener('click', () => {
  localStorage.removeItem('startTime');
  startTime = null;
  initialize();
});

// Run initialize on load
initialize();

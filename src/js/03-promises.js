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

const form = document.querySelector('.form');
const messagesContainer = document.querySelector('#messages');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const initialDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  if (initialDelay < 0 || step < 0 || amount < 0) {
    // Если хотя бы одно значение отрицательное, выводим сообщение об ошибке
    alert('Please enter positive values for delay, step, and amount.');
    return;
  }

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = initialDelay + i * step;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        const message = document.createElement('div');
        message.classList.add('message', 'fulfilled');
        message.textContent = `✅ Fulfilled promise ${position} in ${delay}ms`;
        messagesContainer.appendChild(message);
      })
      .catch(({ position, delay }) => {
        const message = document.createElement('div');
        message.classList.add('message', 'rejected');
        message.textContent = `❌ Rejected promise ${position} in ${delay}ms`;
        messagesContainer.appendChild(message);
      });
  }
});

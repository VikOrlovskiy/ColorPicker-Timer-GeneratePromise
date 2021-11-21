const refs = {
  form: document.querySelector('form'),
};
refs.form.addEventListener('submit', e => {
  console.log(e.target);
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

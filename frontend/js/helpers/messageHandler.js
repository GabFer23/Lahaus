const showMessage = (container, message, type) => {
  const divMessage = document.createElement('div');
  divMessage.classList.add('text-center', 'alert', type);
  divMessage.textContent = message;
  container.appendChild(divMessage);
};

const removeMessage = (container, type) => {
  const divMessage = container.querySelector(`.${type}`);

  if (divMessage) divMessage.remove();
};

export { showMessage, removeMessage };

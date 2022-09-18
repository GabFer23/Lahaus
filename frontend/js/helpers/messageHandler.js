const showMessage = (container, message, type) => {
  const divMessage = document.createElement('div');
  divMessage.classList.add('text-center', 'alert', type);
  divMessage.textContent = message;
  container.appendChild(divMessage);
};

export { showMessage };

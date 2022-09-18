const showSpinner = (container) => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
    `;
  container.appendChild(spinner);
};

const removeSpinner = (container) => {
  container.querySelector('.spinner').remove();
};

export { showSpinner, removeSpinner };

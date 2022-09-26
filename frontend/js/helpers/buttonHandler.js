const getButtons = () => document.querySelectorAll('.btn');

// !===============================================================================

const disableButtons = () => {
  const btns = getButtons();
  btns.forEach((btn) => (btn.disabled = true));
};

// !===============================================================================

const enableButtons = () => {
  const btns = getButtons();
  btns.forEach((btn) => (btn.disabled = false));
};

// !===============================================================================

export { disableButtons, enableButtons };

const generarOptions = (select, selected) => {
  for (let i = 1; i < 7; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;

    if (Number(option.value) === selected) {
      option.selected = true;
    }
    select.appendChild(option);
  }
};

const showOptions = (select, data = [], selected) => {
  for (let i = 0; i < data.length; i++) {
    const option = document.createElement('option');
    option.value = data[i].id;
    option.text = data[i].nombre;

    if (Number(option.value) === selected) {
      option.selected = true;
    }
    select.appendChild(option);
  }
};

export { generarOptions, showOptions };

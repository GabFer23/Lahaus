import {
  showSpinner,
  removeSpinner,
  save,
  update,
  getById,
  remove,
  getAll,
  cleanContainer,
  showMessage,
  removeMessage,
  enableButtons,
  disableButtons,
} from './helpers/index.js';
// !================================================================================

const mainContainer = document.querySelector('#main-container');
const form = document.querySelector('#localidades-form');
const inputs = form.querySelectorAll('input');
const modal = document.querySelector('#saveLocalidad');
const listContainer = document.querySelector('.list-container');

// !================================================================================

window.addEventListener('DOMContentLoaded', () => getLocalidades());

// !================================================================================

form.addEventListener('submit', (e) => handleSubmit(e));

// !================================================================================

mainContainer.addEventListener('click', ({ target }) => {
  if (target.id === 'btn-nuevo') form.reset();

  if (target.id === 'btn-editar') editLocalidad(target);

  if (target.id === 'btn-eliminar') deleteLocalidad(target);
});

// !================================================================================

const getLocalidades = async () => {
  disableButtons();
  cleanContainer(listContainer);

  removeMessage(mainContainer, 'alert');

  showSpinner(mainContainer);

  const { data: localidades, error } = await getAll('localidad');

  if (error) {
    removeSpinner(mainContainer);
    mainContainer.innerHTML = '';
    return showMessage(mainContainer, error.message, 'alert-danger');
  }

  enableButtons();

  if (localidades.length === 0) {
    removeSpinner(mainContainer);
    return showMessage(
      mainContainer,
      'No hay localidades registradas',
      'alert-info'
    );
  }

  removeSpinner(mainContainer);

  localidades.forEach(showLocalidad);
};

// !================================================================================

const showLocalidad = ({ id, nombre }) => {
  const div = document.createElement('div');
  div.classList.add(
    'd-flex',
    'justify-content-between',
    'align-items-center',
    'p-2',
    'border',
    'rounded'
  );

  div.innerHTML = `
        <p class="d-inline m-0">${nombre}</p>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" id="btn-editar" class="btn btn-primary" data-id=${id} data-bs-toggle="modal" data-bs-target="#saveLocalidad">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" id="btn-eliminar" class="btn btn-danger" data-id=${id}>
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>`;

  listContainer.appendChild(div);
};

// !================================================================================

const handleSubmit = async (e) => {
  e.preventDefault();
  disableButtons();
  const localidad = {};

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') return;

    localidad[inputs[i].name] = inputs[i].value.trim();
  }

  if (localidad.id === 'null') {
    const { id, ...dataLocalidad } = localidad;
    await save('localidad', dataLocalidad);
  } else {
    const { id, ...dataLocalidad } = localidad;
    await update('localidad', id, dataLocalidad);
  }

  form.classList.remove('was-validated');
  form.reset();
  bootstrap.Modal.getInstance(modal).hide();
  getLocalidades();
};

// !================================================================================

const editLocalidad = async (target) => {
  form.reset();
  disableButtons();
  const { data, error } = await getById('localidad', target.dataset.id);
  enableButtons();

  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'error',
      text: error.message,
    });
  }

  inputs.forEach((input) => (input.value = data[input.name]));
};

// !================================================================================

const deleteLocalidad = async (target) => {
  const result = await Swal.fire({
    icon: 'question',
    title: '¿Deseas eliminar esta localidad?',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    allowOutsideClick: false,
  });

  if (!result.isConfirmed) return;

  await remove('localidad', target.dataset.id);

  Swal.fire({
    icon: 'success',
    title: 'Localidad eliminada',
    showConfirmButton: true,
    allowOutsideClick: false,
  });

  getLocalidades();
};

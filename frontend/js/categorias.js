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
  disableButtons,
  enableButtons,
} from './helpers/index.js';
// !================================================================================

const mainContainer = document.querySelector('#main-container');
const form = document.querySelector('#categorias-form');
const inputs = form.querySelectorAll('input');
const modal = document.querySelector('#saveCategoria');
const listContainer = document.querySelector('.list-container');

// !================================================================================

window.addEventListener('DOMContentLoaded', () => getCategorias());

// !================================================================================

form.addEventListener('submit', (e) => handleSubmit(e));

// !================================================================================

mainContainer.addEventListener('click', ({ target }) => {
  if (target.id === 'btn-nuevo') form.reset();

  if (target.id === 'btn-editar') editCategoria(target);

  if (target.id === 'btn-eliminar') deleteCategoria(target);
});

// !================================================================================

const getCategorias = async () => {
  disableButtons();
  cleanContainer(listContainer);

  removeMessage(mainContainer, 'alert');

  showSpinner(mainContainer);

  const { data: categorias, error } = await getAll('categoria');

  if (error) {
    removeSpinner(mainContainer);
    mainContainer.innerHTML = '';
    return showMessage(mainContainer, error.message, 'alert-danger');
  }

  enableButtons();

  if (categorias.length === 0) {
    removeSpinner(mainContainer);
    return showMessage(
      mainContainer,
      'No hay categorias registradas',
      'alert-info'
    );
  }

  removeSpinner(mainContainer);

  categorias.forEach(showCategoria);
};

// !================================================================================

const showCategoria = ({ id, nombre }) => {
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
              <button type="button" id="btn-editar" class="btn btn-primary" data-id=${id} data-bs-toggle="modal" data-bs-target="#saveCategoria">
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
  const categoria = {};

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') return;

    categoria[inputs[i].name] = inputs[i].value.trim();
  }

  disableButtons();

  if (categoria.id === 'null') {
    const { id, ...dataCategoria } = categoria;
    await save('categoria', dataCategoria);
  } else {
    const { id, ...dataCategoria } = categoria;
    await update('categoria', id, dataCategoria);
  }

  form.classList.remove('was-validated');
  form.reset();
  bootstrap.Modal.getInstance(modal).hide();
  getCategorias();
};

// !================================================================================

const editCategoria = async (target) => {
  form.reset();
  disableButtons();
  const { data, error } = await getById('categoria', target.dataset.id);
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

const deleteCategoria = async (target) => {
  const result = await Swal.fire({
    icon: 'question',
    title: '¿Deseas eliminar esta categoria?',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    allowOutsideClick: false,
  });

  if (!result.isConfirmed) return;

  disableButtons();
  await remove('categoria', target.dataset.id);
  enableButtons();

  Swal.fire({
    icon: 'success',
    title: 'Categoria eliminada',
    showConfirmButton: true,
    allowOutsideClick: false,
  });

  getCategorias();
};

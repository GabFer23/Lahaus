import {
  generarOptions,
  getById,
  getDataOptions,
  save,
  setUpImages,
  showMessage,
  update,
} from './helpers/index.js';
// !=======================================================================================

const urlParams = new URLSearchParams(window.location.search);

const idPropiedad = urlParams.get('id');

// !=======================================================================================

const title = document.querySelector('title');

const mainContainer = document.querySelector('.container-lg.py-5');
const encabezado = document.querySelector('h3.text-center');

const generatedDataSelect = document.querySelectorAll('.generated-data');
const backendDataSelect = document.querySelectorAll('.backend-data');
const inputs = document.querySelectorAll('.form-input');
const imgInputs = document.querySelectorAll('.img-input');
const form = document.querySelector('#frmGuardarPropiedad');

// !=======================================================================================

window.addEventListener('DOMContentLoaded', () => {
  if (idPropiedad) {
    encabezado.textContent = 'Editar propiedad';
    getPropiedad();
    return;
  }

  title.textContent = 'Nueva propiedad';
  encabezado.textContent = 'Nueva propiedad';

  generatedDataSelect.forEach((select) => generarOptions(select));

  backendDataSelect.forEach((select) => getDataOptions(select));
});

// !=======================================================================================

form.addEventListener('submit', (e) => handleSubmit(e));

// !=======================================================================================

const getPropiedad = async () => {
  const { data: propiedad, error } = await getById('propiedad', idPropiedad);

  if (error) {
    mainContainer.querySelector('.row').remove();
    return showMessage(mainContainer, error.message, 'alert-danger');
  }

  title.textContent = propiedad.titulo;

  showPropiedad(propiedad);
};

// !=======================================================================================

const showPropiedad = (propiedad) => {
  generatedDataSelect.forEach((select) =>
    generarOptions(select, propiedad[select.name])
  );

  backendDataSelect.forEach((select) =>
    getDataOptions(select, propiedad[select.name].id)
  );

  inputs.forEach((input) => {
    if (input.localName !== 'select') {
      input.value = propiedad[input.name];
    }
  });

  const { imagenes } = propiedad;

  imgInputs.forEach((input, i) => {
    input.value = imagenes[i].url;
    input.id = imagenes[i].id;
  });
};

// !=======================================================================================

const handleSubmit = async (e) => {
  e.preventDefault();
  const propiedad = {};
  const images = [];
  const idImgs = [];

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') return;

    if (
      inputs[i].type === 'number' &&
      Number(inputs[i].value) !== parseInt(inputs[i].value)
    )
      return;

    if (
      inputs[i].type === 'number' ||
      (inputs[i].localName === 'select' &&
        inputs[i].classList.contains('generated-data'))
    ) {
      propiedad[inputs[i].name] = Number(inputs[i].value);
      continue;
    }

    if (
      inputs[i].localName === 'select' &&
      inputs[i].classList.contains('backend-data')
    ) {
      propiedad[inputs[i].name] = {
        id: Number(inputs[i].value),
      };
      continue;
    }

    propiedad[inputs[i].name] = inputs[i].value.trim();
  }

  for (let i = 0; i < imgInputs.length; i++) {
    if (imgInputs[i].value === '') return;
    images.push(imgInputs[i].value);
    idImgs.push(imgInputs[i].id);
  }

  if (idPropiedad) {
    actualizarPropiedad(propiedad, idImgs, images);
    return;
  }

  guardarPropiedad(propiedad, images);
};

// !=======================================================================================

const guardarPropiedad = async (propiedad, images) => {
  const propiedadGuardada = await save('propiedad', propiedad);

  const { id: idPropiedadGuardada } = propiedadGuardada;

  const imgObjects = setUpImages(idPropiedadGuardada, images);

  const imageSavePromises = [];

  imgObjects.forEach((img) => {
    imageSavePromises.push(save('imagen', img));
  });

  await Promise.all(imageSavePromises);

  Swal.fire({
    icon: 'success',
    title: 'Propiedad Guardada',
    showConfirmButton: true,
    allowOutsideClick: false,
    didClose: () => (window.location.href = 'index.html'),
  });
};

// !=======================================================================================

const actualizarPropiedad = async (propiedad, idImgs, images) => {
  await update('propiedad', idPropiedad, propiedad);

  const imageUpdatePromises = [];

  const imgObjects = setUpImages(idPropiedad, images);

  imgObjects.forEach((img, i) => {
    imageUpdatePromises.push(update('imagen', idImgs[i], img));
  });

  await Promise.all(imageUpdatePromises);

  Swal.fire({
    icon: 'success',
    title: 'Propiedad Actualizada',
    showConfirmButton: true,
    allowOutsideClick: false,
    didClose: () => (window.location.href = 'index.html'),
  });
};

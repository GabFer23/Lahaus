import { lahausApi } from './api/index.js';
import { savePropiedad } from './guardarPropiedad.js';
import { generarOptions, getDataOptions } from './helpers/index.js';
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
  title.textContent = 'Nueva propiedad';
  encabezado.textContent = 'Nueva propiedad';

  generatedDataSelect.forEach((select) => generarOptions(select));

  backendDataSelect.forEach((select) => getDataOptions(select));
});

// !=======================================================================================

form.addEventListener('submit', (e) => handleSubmit(e));

// !=======================================================================================

const handleSubmit = (e) => {
  e.preventDefault();
  const propiedad = {};
  const images = [];

  for (let i = 0; i < inputs.length; i++) {
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

  imgInputs.forEach((input) => {
    images.push(input.value);
  });

  savePropiedad(propiedad, images);
  alert('Propiedad guardada correctamente');
  window.location.href = 'index.html';
};

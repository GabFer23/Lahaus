import { lahausApi } from './api/index.js';
import { generarOptions, getDataOptions, setUpImages } from './helpers/index.js';
// !========================================================================================

const generatedDataSelect = document.querySelectorAll('.generated-data');
const backendDataSelect = document.querySelectorAll('.backend-data');
const inputs = document.querySelectorAll('.form-input');
const imgInputs = document.querySelectorAll('.img-input');
const form = document.querySelector('#frmGuardarPropiedad');

// !========================================================================================

window.addEventListener('DOMContentLoaded', () => {
  // ? Generar los datos de los select del 1 al 6 (habitaciones, baños, estrato)
  generatedDataSelect.forEach((select) => generarOptions(select));

  // ? Mostrar los datos de la base de datos en los select (objetivo, estado, localidad, categoria)
  backendDataSelect.forEach((select) => getDataOptions(select));
});

// !========================================================================================

form.addEventListener('submit', (e) => {
  handleSubmit(e);
});

// !========================================================================================

const handleSubmit = (e) => {
  e.preventDefault();
  const propiedad = {};
  const images = [];

  // ? Recorrer cada campo del fomulario
  for (let i = 0; i < inputs.length; i++) {
    // ? Obtener nombre y valor de los inputs de tipo number y de los select habitaciones, baños y estrato.
    // ? Estos datos se agregar al objeto propiedad
    if (
      inputs[i].type === 'number' ||
      (inputs[i].localName === 'select' &&
        inputs[i].classList.contains('generated-data'))
    ) {
      propiedad[inputs[i].name] = Number(inputs[i].value);
      continue;
    }

    // ? Obtener nombre y valor de los select con contenido traido de base de datos (objetivo, estado, localidad, categoria)
    // ? Estos datos se agregar al objeto propiedad
    if (
      inputs[i].localName === 'select' &&
      inputs[i].classList.contains('backend-data')
    ) {
      propiedad[inputs[i].name] = {
        id: Number(inputs[i].value),
      };
      continue;
    }

    // ? Obtener nombre y valor de los input que quedan (tipo text, tipo tel, tipo email)
    // ? Estos datos se agregar al objeto propiedad
    propiedad[inputs[i].name] = inputs[i].value;
  }

  // ? Agregar los valores de la url de las imagenes en el arreglo imagenes
  imgInputs.forEach((input) => {
    images.push(input.value);
  });

  savePropiedad(propiedad, images);
};

const savePropiedad = async (propiedad, images) => {
  try {
    const { data } = await lahausApi.post(`/propiedad`, {
      ...propiedad,
    });

    const { id: idPropiedad } = data;

    // ? Crear un objeto con el id de la propiedad a la que pertencerá la imagen
    const imgObjects = setUpImages(idPropiedad, images);

    // ? Guardar cada imagen
    imgObjects.forEach(saveImage);
  } catch (error) {
    console.error(error);
  }
};

// !========================================================================================

const saveImage = async (imagen) => {
  try {
    await lahausApi.post(`/imagen`, { ...imagen });
  } catch (error) {
    console.error(error);
  }
};

// !========================================================================================
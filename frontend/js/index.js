import { paramsPropiedades } from './api/index.js';
import {
  generarOptions,
  getDataOptions,
  removeSpinner,
  showSpinner,
  showMessage,
  getAll,
} from './helpers/index.js';

// !=======================================================================================================
let params = {};
// !=======================================================================================================

const searchForm = document.querySelector('#search-form');
const inputs = document.querySelectorAll('.form-input');

const mainContainer = document.querySelector('#main-container');
const propiedadesContainer = document.querySelector('#propiedades-container');
const generatedDataSelect = document.querySelectorAll('.generated-data');
const backendDataSelect = document.querySelectorAll('.backend-data');

// !=======================================================================================================

window.addEventListener('DOMContentLoaded', () => {
  params = { ...paramsPropiedades };
  generatedDataSelect.forEach((select) => generarOptions(select));

  backendDataSelect.forEach((select) => getDataOptions(select));

  getPropiedades();
});

// !=======================================================================================================

searchForm.addEventListener('submit', (e) => {
  handleSearch(e);
});

// !=======================================================================================================

const getPropiedades = async () => {
  showSpinner(mainContainer);

  const { data, error } = await getAll('propiedad', params);

  if (error) {
    removeSpinner(mainContainer);
    return showMessage(mainContainer, error.message, 'alert-danger');
  }

  const { content: propiedades } = data;

  if (propiedades.length === 0) {
    removeSpinner(mainContainer);
    return showMessage(
      mainContainer,
      'No hay propiedades registradas',
      'alert-info'
    );
  }

  const announcement = document.createElement('span');
  announcement.classList.add('badge', 'text-bg-success', 'text-uppercase');
  announcement.textContent = 'Nuevas Propiedades';

  mainContainer.insertBefore(announcement, mainContainer.firstChild);

  propiedades.forEach(showPropiedades);

  removeSpinner(mainContainer);
};

// !=======================================================================================================

const showPropiedades = ({
  id,
  titulo,
  habitaciones,
  wc,
  precio,
  objetivo,
  direccion,
  area,
  estrato,
  estado,
  localidad,
  categoria,
  imagenes,
  fechaCreacion,
}) => {
  const cardContent = `
            <span class="badge text-bg-danger position-absolute m-2 start-0">
            ${objetivo.nombre}
              </span>
            <span class="badge text-bg-primary position-absolute m-2 end-0">
            ${categoria.nombre}
              </span>
            <img src=${imagenes[0].url} alt=${titulo}/>

            <div class="card-body">
                <small class="text-muted d-block">
                ${dayjs().to(dayjs(fechaCreacion))}
                </small>
                <span class="badge rounded-pill text-bg-dark">
                ${estado.nombre}
                  </span>
                <h5 class="card-title">${titulo}</h5>
                <p class="text-muted my-0">${localidad.nombre}</p>
                <p><i class="fa-solid fa-location-dot"></i> ${direccion}</p>
            </div>

            <div class="mb-0">
              <div class="d-flex justify-content-around">
                  <p><i class="fa-solid fa-bed"></i> ${habitaciones}</p>
                  <p><i class="fa-solid fa-bath"></i> ${wc}</p>
                  <p><i class="fa-solid fa-crown"></i> ${estrato}</p>
                  <p><i class="fa-solid fa-ruler-combined"></i> ${area} m²</p>
              </div>
              <div class="d-flex justify-content-around card-footer ">
                  <h6>
                      <i class="fa-solid fa-dollar-sign"></i>
                      ${precio.toLocaleString('es-CO')}
                  </h6>
              </div>
            </div>`;

  const card = document.createElement('a');
  card.classList.add('card', 'text-black', 'shadow', 'h-100');
  card.href = 'propiedad.html?id=' + id;

  card.innerHTML = cardContent;

  propiedadesContainer.appendChild(card);
};

// !=======================================================================================================

const handleSearch = (e) => {
  e.preventDefault();

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === 'number' || inputs[i].localName === 'select') {
      params[inputs[i].name] = Number(inputs[i].value);
      continue;
    }

    params[inputs[i].name] = inputs[i].value.trim();
  }

  localStorage.setItem('params', JSON.stringify(params));

  // let searchUrl = 'buscar.html';

  // Object.entries(params).forEach(([key, value], i) => {
  //   searchUrl += (i > 0 ? '&' : '?') + key + '=' + value;
  // });

  window.location.href = 'buscar.html';
};

// !=======================================================================================================

import { paramsPropiedades } from './api/index.js';
import {
  cleanContainer,
  generarOptions,
  generatePagination,
  getAll,
  getDataOptions,
  handlePageChange,
  removeSpinner,
  showMessage,
  showSpinner,
} from './helpers/index.js';
// !=======================================================================================================

let params = {};

const searchForm = document.querySelector('#search-form');
const inputs = document.querySelectorAll('.form-input');

const generatedDataSelect = document.querySelectorAll('.generated-data');
const backendDataSelect = document.querySelectorAll('.backend-data');

const resultTexts = document.querySelector('#results');

const searchContainer = document.querySelector('.search-container');

const paginationContainer = document.querySelector('#pagination-container');

// !=======================================================================================================

window.addEventListener('DOMContentLoaded', () => {
  params = JSON.parse(localStorage.getItem('params')) || { ...paramsPropiedades };

  generatedDataSelect.forEach((select) =>
    generarOptions(select, params[select.name])
  );

  backendDataSelect.forEach((select) =>
    getDataOptions(select, params[select.name])
  );

  inputs.forEach((input) => {
    if (input.localName !== 'select') {
      input.value = params[input.name];
    }
  });

  getSearch();
});

// !=======================================================================================================

searchForm.addEventListener('submit', (e) => handleSearch(e));

// !=======================================================================================================

paginationContainer.addEventListener('click', (e) => {
  handlePageChange(e, params);

  localStorage.setItem('params', JSON.stringify(params));

  getSearch();
});

// !=======================================================================================================
const handleSearch = (e) => {
  e.preventDefault();

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === 'number' || inputs[i].localName === 'select') {
      params[inputs[i].name] = Number(inputs[i].value);
      continue;
    }

    params[inputs[i].name] = inputs[i].value;
  }

  params.page = 1;

  localStorage.setItem('params', JSON.stringify(params));

  getSearch();
};

// !=======================================================================================================

const getSearch = async () => {
  cleanContainer(searchContainer);

  cleanContainer(paginationContainer);

  showSpinner(searchContainer);

  const { data, error } = await getAll('propiedad', params);

  if (error) {
    removeSpinner(searchContainer);
    return showMessage(searchContainer, error.message, 'alert-danger');
  }

  const { content: propiedades, first, last, totalPages, totalElements } = data;

  if (totalElements === 0) {
    removeSpinner(searchContainer);
    return showMessage(
      searchContainer,
      'No se encontraron resultados',
      'alert-info'
    );
  }

  removeSpinner(searchContainer);

  generatePagination(paginationContainer, params, totalPages, first, last);

  resultTexts.innerHTML = `
    <b class="d-block fs-4">
      ${params.q}
    </b>
    <small class="text-muted">
      ${totalElements} Resultado${totalElements === 1 ? '' : 's'}
    </small>
  `;

  propiedades.forEach(showSearchedPropiedades);
};

// !=======================================================================================================

const showSearchedPropiedades = ({
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
  const card = document.createElement('a');
  card.classList.add('card', 'mb-2', 'shadow', 'text-black');
  card.href = 'propiedad.html?id=' + id;

  card.innerHTML = `
  <div class="row">
      <div class="col-md-5">
        <span class="badge text-bg-danger position-absolute m-2 start-0">
          ${objetivo.nombre}
        </span>
        <img
          src=${imagenes[0].url}
          alt=${titulo}
        />
      </div>

      <div class="col-md-7 col-sm-12">
        <div class="card-body">
          <small class="text-muted d-block">
          ${dayjs().to(dayjs(fechaCreacion))}</small>
          <span class="badge text-bg-primary">${categoria.nombre}</span>
          <span class="badge rounded-pill text-bg-dark">${estado.nombre}</span>
          <h4 class="card-title">${titulo}</h4>
          <p class="text-muted my-0">${localidad.nombre}</p>
          <p>
            <i class="fa-solid fa-location-dot"></i> ${direccion}
          </p>
          <div class="row">
            <div class="col-md-7 col-sm-12 d-flex justify-content-between px-3">
              <p>
                <i class="fa-solid fa-bed"></i> ${habitaciones}
              </p>
              <p>
                <i class="fa-solid fa-bath"></i> ${wc}
              </p>
              <p>
                <i class="fa-solid fa-crown"></i> ${estrato}
              </p>
              <p>
                <i class="fa-solid fa-ruler-combined"></i> ${area} m²
              </p>
            </div>
            <h6>
              <i class="fa-solid fa-dollar-sign"></i>
              ${precio.toLocaleString('es-CO')}
            </h6>
          </div>
        </div>
      </div>
  </div>`;
  searchContainer.appendChild(card);
};

// !=======================================================================================================
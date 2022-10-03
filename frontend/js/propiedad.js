import {
    showSpinner,
    removeSpinner,
    showMessage,
    remove,
    getById,
    disableButtons,
    enableButtons,
  } from './helpers/index.js';
  
  const urlParams = new URLSearchParams(window.location.search);
  const mainContent = document.querySelector('#main-content');
  
  const idPropiedad = urlParams.get('id');
  
  window.addEventListener('DOMContentLoaded', () => getPropiedad());
  
  mainContent.addEventListener('click', (e) => {
    if (e.target.id === 'btn-eliminar') deletePropiedad();
  });
  
  // !===============================================================================
  
  const getPropiedad = async () => {
    showSpinner(mainContent);
  
    const { data: propiedad, error } = await getById('propiedad', idPropiedad);
  
    if (error) {
      removeSpinner(mainContent);
      return showMessage(mainContent, error.message, 'alert-danger');
    }
  
    showPropiedad(propiedad);
  
    removeSpinner(mainContent);
  };
  
  // !===============================================================================
  
  const showPropiedad = ({
    id,
    titulo,
    descripcion,
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
    telefono,
    correo,
  }) => {
    const content = `
    <small class="text-muted">${dayjs().to(dayjs(fechaCreacion))}</small>
      <p class="my-1">
          <span class="badge text-bg-primary">
              ${categoria.nombre}
          </span>
      </p>
              <h3 class="text-capitalize">${titulo}</h3>
              <h5 class="text-capitalize text-muted">
                  ${direccion},
                  <strong class="text-black">
                      ${localidad.nombre}
                  </strong>
              </h5>
              <h5 class="text-end">
                  <small class="text-muted d-block">Precio</small>
                  <strong class="my-1">
                      <i class="fa-solid fa-dollar-sign"></i> 
                      ${precio.toLocaleString('es-CO')}
                  </strong>
              </h5>
              <div class="col-md-6 col-sm-12">
  
                  <div id="carouselExampleControls" class="carousel slide carousel-fade" data-bs-ride="carousel">
  
                      <div class="carousel-inner"></div>
  
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                          data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                          data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                      </button>
                  </div>
  
                  <div class="d-flex gap-2 py-2">
                      <a 
                          href=${'formulario-propiedad.html?id=' + id} 
                          class="btn btn-outline-primary" 
                          id="btn-editar"
                          >
                              <i class="fa-solid fa-pen-to-square"></i>
                      </a>
                      <button 
                          class="btn btn-outline-danger" 
                          id="btn-eliminar">
                              <i class="fa-solid fa-trash-can"></i>
                      </button>
                  </div>
              </div>
  
              <div class="col-md-6 col-sm-12">
                  <div class="row p-2">
                      <div class="col-md-6 mb-2">
                          <ul class="list-group">
                              <li class="list-group-item d-flex justify-content-center align-items-center">
                                  <i class="fa-solid fa-ruler-combined fs-3"></i>
                                  <p class="m-2 text-center">
                                      <small class="text-muted d-block">Área</small>
                                      <strong class="my-1">${area} m²</strong>
                                  </p>
                              </li>
                              <li class="list-group-item d-flex justify-content-center align-items-center">
                                  <i class="fa-solid fa-bed fs-3"></i>
                                  <p class="m-2 text-center">
                                      <small class="text-muted d-block">Habitaciones</small>
                                      <strong class="my-1">${habitaciones}</strong>
                                  </p>
                              </li>
                              <li class="list-group-item d-flex justify-content-center align-items-center">
                                  <i class="fa-solid fa-bath fs-3"></i>
                                  <p class="m-2 text-center">
                                      <small class="text-muted d-block">Baños</small>
                                      <strong class="my-1">${wc}</strong>
                                  </p>
                              </li>
                          </ul>
                      </div>
  
                      <div class="col-md-6 mb-2">
                          <ul class="list-group">
                              <li class="list-group-item d-flex justify-content-center align-items-center">
                                  <i class="fa-solid fa-crown fs-3"></i>
                                  <p class="m-2 text-center">
                                      <small class="text-muted d-block">Estrato</small>
                                      <strong class="my-1">${estrato}</strong>
                                  </p>
                              </li>
                              <li class="list-group-item d-flex justify-content-center align-items-center">
                                  <i class="fa-solid fa-house-circle-exclamation fs-3"></i>
                                  <p class="m-2 text-center">
                                      <small class="text-muted d-block">Estado</small>
                                      <strong class="my-1">
                                          ${estado.nombre}
                                      </strong>
                                  </p>
                              </li>
                              <li class="list-group-item d-flex justify-content-center align-items-center">
                                  <i class="fa-solid fa-house-lock fs-3"></i>
                                  <p class="m-2 text-center">
                                      <small class="text-muted d-block">Para</small>
                                      <strong class="my-1">
                                          ${objetivo.nombre}
                                      </strong>
                                  </p>
                              </li>
                          </ul>
                      </div>
                  </div>
  
                  <p class="text-muted p-2">${descripcion}</p>
  
                  <div class="d-flex justify-content-around">
                      <div class="d-flex justify-content-center align-items-center">
                          <i class="fa-solid fa-envelope fs-4"></i>
                          <p class="m-2 text-center fs-6">
                              <small class="text-muted d-block">Correo</small>
                              <strong class="my-1">${correo}</strong>
                          </p>
                      </div>
                      <div class="d-flex justify-content-center align-items-center">
                          <i class="fa-solid fa-phone fs-4"></i>
                          <p class="m-2 text-center fs-6">
                              <small class="text-muted d-block">Teléfono</small>
                              <strong class="my-1">${telefono}</strong>
                          </p>
                      </div>
                  </div>
              </div>`;
  
    const row = document.createElement('div');
    row.classList.add('row');
  
    row.innerHTML = content;
  
    mainContent.appendChild(row);
  
    const carouselInner = document.querySelector('.carousel-inner');
  
    imagenes.forEach((imagen, i) => showImages(i, imagen, titulo, carouselInner));
  };
  
  // !===============================================================================
  
  const showImages = (i, imagen, titulo, carouselInner) => {
    const div = document.createElement('div');
    div.classList.add('carousel-item');
    i === 0 && div.classList.add('active');
  
    div.innerHTML = `<img src=${imagen?.url} class="d-block w-100" alt="${titulo}">`;
  
    carouselInner.appendChild(div);
  };
  
  // !===============================================================================
  
  const deletePropiedad = async () => {
    const result = await Swal.fire({
      icon: 'question',
      title: '¿Deseas eliminar esta propiedad?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      allowOutsideClick: false,
    });
  
    if (!result.isConfirmed) return;
  
    disableButtons();
    await remove('propiedad', idPropiedad);
    enableButtons();
  
    Swal.fire({
      icon: 'success',
      title: 'Propiedad eliminada',
      showConfirmButton: true,
      allowOutsideClick: false,
      didClose: () => (window.location.href = 'index.html'),
    });
  };
  
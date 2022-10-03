import { lahausApi, paramsPropiedades } from './api/index.js';
import { showSpinner, removeSpinner } from './helpers/index.js';
const mainContainer = document.querySelector('#main-container');
const propiedadesContainer = document.querySelector('#propiedades-container');

const getPropiedad = async () => {
  showSpinner(mainContainer);
  try {
    let params = { ...paramsPropiedades };
    const res = await lahausApi.get('propiedad', { params });

    if (res.status === 200) {
      for (let i = 0; i < res.data.content.length; i++) {
        let estructura = `
                <a class="contenedor-casas-lista text-dark shadow position-relative" href="propiedad.html?id=${res.data.content[i].id}">
                <span class="badge text-bg-danger position-absolute m-2 start-0">
            ${res.data.content[i].objetivo.nombre}
              </span>
            <span class="badge text-bg-primary position-absolute m-2 end-0">
            ${res.data.content[i].categoria.nombre}
              </span>
                    <img src="${res.data.content[i].imagenes[0]?.url || '../assets/img/not-found.png'}" alt="Vivienda" class="w-100">

                    <div class="card-body px-2">
                        <small class="text-muted d-block">
                            ${dayjs().to(dayjs(res.data.content[i].fechaCreacion))}
                        </small>
                        <span class="badge rounded-pill text-bg-dark">
                        ${res.data.content[i].estado.nombre}
                        </span>
                        <h5 class="card-title">${res.data.content[i].titulo}</h5>
                        <p class="text-muted my-0">${res.data.content[i].localidad.nombre}</p>
                        <p><i class="fa-solid fa-location-dot"></i> ${res.data.content[i].direccion}</p>
                        <div class="d-flex justify-content-around">
                            <p><i class="fa-solid fa-bed"></i> ${res.data.content[i].habitaciones}</p>
                            <p><i class="fa-solid fa-bath"></i> ${res.data.content[i].wc}</p>
                            <p><i class="fa-solid fa-crown"></i> ${res.data.content[i].estrato}</p>
                            <p><i class="fa-solid fa-ruler-combined"></i> ${res.data.content[i].area} m²</p>
                        </div>
                    </div>
              <div class="d-flex justify-content-around card-footer ">
                  <h6>
                      <i class="fa-solid fa-dollar-sign"></i>
                      ${res.data.content[i].precio.toLocaleString('es-CO')}
                  </h6>
              </div>
                </a>
                `;
        propiedadesContainer.innerHTML += estructura;
      }
    } else if (res.status === 401) {
      console.log(`API Invalida ${res}`);
    } else if (res.status === 404) {
      console.log(`La info no existe ${res}`);
    } else {
      console.log(`Error con la peticion ${res}`);
    }
  } catch (error) {
    console.log(`Error con la peticion ${error}`);
  }
  removeSpinner(mainContainer);
};

getPropiedad();

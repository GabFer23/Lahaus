import { lahausApi } from './api/index.js';
import { setUpImages } from './helpers/index.js';
// !========================================================================================

export const savePropiedad = async (propiedad, images) => {
  try {
    const { data } = await lahausApi.post(`/propiedad`, {
      ...propiedad,
    });

    const { id: idPropiedad } = data;

    const imgObjects = setUpImages(idPropiedad, images);

    imgObjects.forEach(saveImage);

    Swal.fire({
      icon: 'success',
      title: 'Propiedad Guardada',
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      didClose: () => (window.location.href = 'index.html'),
    });
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      text: `${error.message}`,
    });
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

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

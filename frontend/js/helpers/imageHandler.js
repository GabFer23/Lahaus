const setUpImages = (idPropiedad, images = []) => {
  images = images.map((image, i) => {
    return {
      url: image,
      propiedad: {
        id: idPropiedad,
      },
    };
  });

  return images;
};

export { setUpImages };

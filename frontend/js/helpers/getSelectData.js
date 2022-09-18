import { showOptions } from './generators.js';
import { getAll } from './index.js';

const getDataOptions = async (select, selected) => {
  try {
    const { data, error } = await getAll(select.name);

    if (error) {
      return Swal.fire({
        icon: 'error',
        title: `${select.name} no puedo cargar`,
        text: error.message,
      });
    }

    showOptions(select, data, selected);
  } catch (error) {
    console.error(error);
  }
};

export { getDataOptions };

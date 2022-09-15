import { lahausApi } from '../api/index.js';
import { showOptions } from './generators.js';

const getDataOptions = async (select, selected) => {
  try {
    const { data } = await lahausApi.get(`/${select.name}`);

    showOptions(select, data, selected);
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      text: `${error.message}`,
    });
  }
};

export { getDataOptions };

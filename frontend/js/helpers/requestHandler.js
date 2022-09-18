import { lahausApi } from '../api/index.js';

// !================================================================================================
const getAll = async (endpoint, params) => {
  try {
    const { data } = await lahausApi.get(endpoint, { params });

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error,
    };
  }
};

// !================================================================================================

const getById = async (endpoint, id) => {
  try {
    const { data } = await lahausApi.get(`${endpoint}/${id}`);

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error,
    };
  }
};

// !================================================================================================
const save = async (endpoint, data) => {
  try {
    const { data: respData } = await lahausApi.post(endpoint, {
      ...data,
    });
    return respData;
  } catch (error) {
    console.error(error);
  }
};

// !================================================================================================

const update = async (endpoint, id, data) => {
  try {
    await lahausApi.put(`${endpoint}/${id}`, { ...data });
  } catch (error) {
    console.error(error);
  }
};

// !================================================================================================

const remove = async (endpoint, id) => {
  try {
    await lahausApi.delete(`${endpoint}/${id}`);
  } catch (error) {
    console.error(error);
  }
};

// !================================================================================================
export { getAll, save, update, getById, remove };

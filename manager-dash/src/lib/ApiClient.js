import axios from 'axios';

const apiClient = {
  getFlags: async () => {
    let { data } = await axios.get('/api/flags');
    return data;
  },
  createFlag: async () => {

  },
  editFlag: async (key, updatedFields) => {
    let { data } = await axios.patch('/api/flags/' + key, updatedFields);
    return data;
  },
  deleteFlag: async () => {

  },
  getAudiences: async () => {
    let { data } = await axios.get('/api/audiences');
    return data;
  },
  createAudience: async () => {

  },
  editAudience: async () => {

  },
  getAttributes: async () => {
    let { data } = await axios.get('/api/attributes');
    return data;
  },
  createAttribute: async () => {

  }
}

export default apiClient;
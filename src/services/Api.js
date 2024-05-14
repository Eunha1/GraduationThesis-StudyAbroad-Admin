import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3001',
});

instance.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem('access_token')) {
      const access_token = localStorage.getItem('access_token');
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export async function getRequest(url) {
  try {
    let response = await instance.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function postRequest(url, body) {
  try {
    let response = await instance.post(url, body);
    return response.data;
  } catch (error) {
    return error;
  }
}
export async function postRequestFormData(url, body) {
  try {
    let response = await instance.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

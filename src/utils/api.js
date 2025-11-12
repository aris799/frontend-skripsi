import axios from 'axios';

const jsBackend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_JS_URL,
  withCredentials: true
});

const mlBackend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ML_URL,
  withCredentials: true
});

// Optional: Tambahkan interceptor untuk error handling
jsBackend.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('JS Backend Error:', error);
    return Promise.reject(error);
  }
);

mlBackend.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('ML Backend Error:', error);
    return Promise.reject(error);
  }
);

export { jsBackend, mlBackend };

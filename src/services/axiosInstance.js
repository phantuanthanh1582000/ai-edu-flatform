import createInstanceAxios from './customAxios';

const axiosInstance = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);

export default axiosInstance;

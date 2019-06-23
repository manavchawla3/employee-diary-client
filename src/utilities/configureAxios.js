import axios from 'axios';
import handleError from 'utilities/handleError';

const configureAxios = () => {
  const axiosConfig = {
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 8000
  };

  const axiosInstance = axios.create(axiosConfig);

  /**
   * log outs the request object
   */
  axiosInstance.interceptors.request.use(request => {
    return request;
  });

  /**
   * intercepts the response for axios
   * and handle error
   */
  axiosInstance.interceptors.response.use(
    response => {
      return response.data;
    },
    async e => {
      const error = await handleError(e);

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const api = configureAxios();

export default api;

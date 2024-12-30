import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://my-node-app-50fq.onrender.com/api/tasks',
    
    withCredentials: true,
  });

  export default axiosInstance;

import axios from 'axios';
import { BACKEND_URL } from '.';

const axiosInstance = axios.create({
    baseURL: `${BACKEND_URL}/api`,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default axiosInstance;
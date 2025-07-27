import axios from 'axios';

const axios = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axios;
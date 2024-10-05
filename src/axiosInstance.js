

// src/axiosInstance.js
import axios from 'axios';

// Get token from localStorage
const token = localStorage.getItem('token');

const axiosInstance = axios.create({

    baseURL: 'https://employee-management-system-backend-7rjr.onrender.com/api',
    headers: {
        Authorization: token ? `Token ${token}` : '',
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;

import axios from 'axios';
import AuthContext from '../context/AuthContext';

// Base URL for the API
const API_URL = 'http://localhost:5001/api';

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API function to get tasks
export const getTasks = (page: number, limit: number) => {
    return api.get('/tasks', {
        params: { page, limit },
    });
};

// API function to create a task
export const createTask = (task: { title: string; description: string }) => {
    return api.post('/tasks', task);
};

// API function to update a task
export const updateTask = (id: string, task: { title: string; description: string }) => {
    return api.put(`/tasks/${id}`, task);
};

// API function to delete a task
export const deleteTask = (id: string) => {
    return api.delete(`/tasks/${id}`);
};

// API function to login a user
export const loginUser = (credentials: { username: string; password: string }) => {
    return api.post('/auth/login', credentials);
};

// API function to register a user
export const registerUser = (user: { username: string; password: string; role: string }) => {
    return api.post('/auth/register', user);
};

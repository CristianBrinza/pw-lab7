import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const getTasks = (page: number, limit: number) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/tasks`, {
        params: { page, limit },
        headers: { 'x-auth-token': token },
    });
};

export const createTask = (task: { title: string; description: string }) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/tasks`, task, {
        headers: { 'x-auth-token': token },
    });
};

export const updateTask = (id: string, task: { title: string; description: string }) => {
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/tasks/${id}`, task, {
        headers: { 'x-auth-token': token },
    });
};

export const deleteTask = (id: string) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { 'x-auth-token': token },
    });
};

export const loginUser = (credentials: { username: string; password: string }) => {
    return axios.post(`${API_URL}/auth/login`, credentials);
};

export const registerUser = (data: { username: string; password: string; role: string }) => {
    return axios.post(`${API_URL}/auth/register`, data);
};

import axios from '../axios';
import endpoints from '../endpoints';

export const getUserByUsername = async (username) => {
    const response = await axios.get(endpoints.users.getByUsername(username));
    return response.data;
};

export const getUserByEmail = async (email) => {
    const response = await axios.get(endpoints.users.getByEmail(email));
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(endpoints.users.getById(id));
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await axios.put(endpoints.users.update(id), user);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(endpoints.users.delete(id));
    return response.data;
};
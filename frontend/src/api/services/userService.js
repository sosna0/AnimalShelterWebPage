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
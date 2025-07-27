import axios from 'axios';
import endpoints from '../endpoints';

export const getVolunteers = async () => {
    const response = await axios.get(endpoints.volunteers.get);
    return response.data;
};

export const getVolunteerById = async (id) => {
    const response = await axios.get(endpoints.volunteers.getById(id));
    return response.data;
};


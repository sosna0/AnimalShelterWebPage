import axios from '../axios';
import endpoints from '../endpoints';

export const createVolunteer = async (volunteer) => {
    const response = await axios.post(endpoints.volunteers.create, volunteer);
    return response.data;
};

export const getVolunteers = async () => {
    const response = await axios.get(endpoints.volunteers.get);
    return response.data;
};

export const getVolunteerById = async (id) => {
    const response = await axios.get(endpoints.volunteers.getById(id));
    return response.data;
};

export const getVolunteersByFilters = async (filters) => {
    const response = await axios.get(endpoints.volunteers.filter, { params: filters });
    return response.data;
};
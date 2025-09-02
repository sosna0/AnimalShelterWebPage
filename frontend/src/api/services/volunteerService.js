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

export const getUserVolunteer = async (userId) => {
    const response = await axios.get(endpoints.volunteers.getByUserId(userId));
    return response.data;
};

export const getVolunteersByFilters = async (filters) => {
    const response = await axios.get(endpoints.volunteers.filter, { params: filters });
    return response.data;
};

export const updateVolunteer = async (id, data) => {
    const response = await axios.put(endpoints.volunteers.update(id), data);
    return response.data;
};

export const deleteVolunteer = async (id) => {
    const response = await axios.delete(endpoints.volunteers.delete(id));
    return response.data;
};
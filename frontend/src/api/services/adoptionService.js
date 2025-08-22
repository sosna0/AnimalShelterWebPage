import axios from '../axios';
import endpoints from '../endpoints';

export const getAdoptions = async () => {
    const response = await axios.get(endpoints.adoptions.get);
    return response.data;
};

export const getAdoptionById = async (id) => {
    const response = await axios.get(endpoints.adoptions.getById(id));
    return response.data;
};

export const getUserAdoptions = async (userId) => {
    const response = await axios.get(endpoints.adoptions.getByUserId(userId));
    return response.data;
};

export const createAdoption = async (data) => {
    const response = await axios.post(endpoints.adoptions.create, data);
    return response.data;
};

export const updateAdoption = async (id, data) => {
    const response = await axios.put(endpoints.adoptions.update(id), data);
    return response.data;
};

export const updateAdoptionStatus = async (id, status, response) => {
    const data = { status, response };
    const apiResponse = await axios.put(endpoints.adoptions.updateStatus(id), data);
    return apiResponse.data;
};

export const deleteAdoption = async (id) => {
    const response = await axios.delete(endpoints.adoptions.delete(id));
    return response.data;
};

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

export const createAdoption = async (data) => {
    const response = await axios.post(endpoints.adoptions.create, data);
    return response.data;
};

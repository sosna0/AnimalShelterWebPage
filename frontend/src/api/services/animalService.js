import axios from '../axios';
import endpoints from '../endpoints';

export const getAnimals = async () => {
    const response = await axios.get(endpoints.animals.get);
    return response.data;
};

export const getAnimalById = async (id) => {
    const response = await axios.get(endpoints.animals.getById(id));
    return response.data;
}
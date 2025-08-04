import axios from '../axios';
import endpoints from '../endpoints';

export const createAnimal = async (animal) => {
    const response = await axios.post(endpoints.animals.create, animal);
    return response.data;
};

export const getAnimals = async () => {
    const response = await axios.get(endpoints.animals.get);
    return response.data;
};

export const getAnimalById = async (id) => {
    const response = await axios.get(endpoints.animals.getById(id));
    return response.data;
}

export const getAnimalsByFilters = async (filters) => {
    const response = await axios.get(endpoints.animals.filter, { params: filters });
    return response.data;
}

export const updateAnimal = async (id, animal) => {
    const response = await axios.put(endpoints.animals.update(id), animal);
    return response.data;
}

export const deleteAnimal = async (id) => {
    const response = await axios.delete(endpoints.animals.delete(id));
    return response.data;
}
import axios from 'axios';
import endpoints from '../endpoints';

export const getDonations = async () => {
    const response = await axios.get(endpoints.donations.get);
    return response.data;
};

export const getDonationById = async (id) => {
    const response = await axios.get(endpoints.donations.getById(id));
    return response.data;
};


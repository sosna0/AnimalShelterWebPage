import axios from '../axios';
import endpoints from '../endpoints';

export const createDonation = async (donation) => {
    const response = await axios.post(endpoints.donations.create, donation);
    return response.data;
};

export const getDonations = async () => {
    const response = await axios.get(endpoints.donations.get);
    return response.data;
};

export const getDonationById = async (id) => {
    const response = await axios.get(endpoints.donations.getById(id));
    return response.data;
};

export const getDonationsByUserId = async (userId) => {
    const response = await axios.get(endpoints.donations.getByUserId(userId));
    return response.data;
};

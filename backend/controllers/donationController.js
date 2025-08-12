const Donation = require('../models/donationModel.js');

const createDonation = async (req, res) => {
    const { 
        userId,
        amount,
        nickname,
        message,
        paymentStatus = 'pending',
    } = req.body;

    try {
        const donation = await Donation.create({
            userId: userId,
            amount: amount,
            nickname: nickname,
            message: message,
            paymentStatus: paymentStatus,
        });

        res.status(201).send(donation);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create donation' });
    }
};

const getDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll();

        res.status(200).send(donations);

    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch donations' });
    }
};

const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findByPk(req.params.id);

        if (!donation) {
            return res.status(404).send({ error: 'Donation not found' });
        }

        res.status(200).send(donation);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch donation by id' });
    }
};

const getDonationsByUserId = async (req, res) => {
    try {
        const donation = await Donation.findAll({
            where: {
                userId: req.params.userId
            }
        });

        if (!donation) {
            return res.status(404).send({ error: 'Donation not found' });
        }

        res.status(200).send(donation);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch donation by userId' });
    }
};

//TODO: czy to ma sens? Staff chyba powinien zmieniać tylko status płatności
const updateDonation = async (req, res) => {
    try {
        const donation = await Donation.findByPk(req.params.id);

        if (!donation) {
            return res.status(404).send({ error: 'Donation not found' });
        }

        const updatedDonation = await donation.update(req.body);

        res.status(200).send(updatedDonation);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update donation' });
    }
};

const deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findByPk(req.params.id);

        if (!donation) {
            return res.status(404).send({ error: 'Donation not found' });
        }

        await donation.destroy();

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete donation' });
    }
};


module.exports = {
    createDonation,
    getDonations,
    getDonationById,
    getDonationsByUserId,
    updateDonation,
    deleteDonation
};
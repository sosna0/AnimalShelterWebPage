const Adoption = require('../models/adoptionModel.js');

const CreateAdoption = async (req, res) => {
    const {
        userId,
        animalId,
        survey,
        response,
        status = 'Pending'
    } = req.body;

    try {
        const existing = await Adoption.findOne({
            where: { userId, animalId, status: 'Pending' }
        });

        if (existing) {
            return res.status(400).send({ error: 'You already have a pending adoption request for this animal' });
        }

        const adoption = await Adoption.create({
            userId,
            animalId,
            survey,
            response,
            status
        });

        res.status(201).send(adoption);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create adoption request' });
    }
};

const getAdoptions = async (req, res) => {
    try {
        const adoptions = await Adoption.findAll();

        res.status(200).send(adoptions);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch adoption requests' });
    }
}

const getAdoptionById = async (req, res) => {
    try {
        const adoption = await Adoption.findByPk(req.params.id);

        if (!adoption) {
            return res.status(404).send({ error: 'Adoption request not found' });
        }

        res.status(200).send(adoption);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch adoption request by id' });
    }
}

const getAdoptionsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const adoptions = await Adoption.findAll({
            where: { userId: userId }
        });

        res.status(200).send(adoptions);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch adoption requests by user id' });
    }
}

const getAdoptionsByAnimalId = async (req, res) => {
    const animalId = req.params.animalId;

    try {
        const adoptions = await Adoption.findAll({
            where: { animalId: animalId }
        });

        if (adoptions.length === 0) {
            return res.status(404).send({ error: 'No adoption requests found for this animal' });
        }

        res.status(200).send(adoptions);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch adoption requests by animal id' });
    }
}

const updateAdoption = async (req, res) => {
    const { survey } = req.body;
    const adoptionId = req.params.id;

    try {
        const adoption = await Adoption.findByPk(adoptionId);

        if (!adoption) {
            return res.status(404).send({ error: 'Adoption request not found' });
        }

        if (adoption.status !== 'Pending') {
            return res.status(400).send({ error: 'Can only edit pending adoption requests' });
        }

        await adoption.update({ survey });
        res.status(200).send(adoption);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update adoption request' });
    }
};

const updateAdoptionStatus = async (req, res) => {
    const { status, response } = req.body;
    const adoptionId = req.params.id;

    try {
        const adoption = await Adoption.findByPk(adoptionId);

        if (!adoption) {
            return res.status(404).send({ error: 'Adoption request not found' });
        }

        adoption.status = status;
        adoption.response = response;
        await adoption.save();

        res.status(200).send(adoption);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update adoption request status' });
    }
};

const deleteAdoption = async (req, res) => {
    const adoptionId = req.params.id;

    try {
        const adoption = await Adoption.findByPk(adoptionId);

        if (!adoption) {
            return res.status(404).send({ error: 'Adoption request not found' });
        }

        await adoption.destroy();

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete adoption request' });
    }
};

module.exports = {
    CreateAdoption,
    getAdoptions,
    getAdoptionById,
    getAdoptionsByUserId,
    getAdoptionsByAnimalId,
    updateAdoption,
    updateAdoptionStatus,
    deleteAdoption
};
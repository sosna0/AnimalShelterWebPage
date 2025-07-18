const Adoption = require('../models/adoptionModel.js');

const CreateAdoption = async (req, res) => {
    const {
        userId,
        animalId,
        status = 'pending'
    } = req.body;

    try {
        const adoption = await Adoption.create({
            userId: userId,
            animalId: animalId,
            status: status
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

        if (adoptions.length === 0) {
            return res.status(404).send({ error: 'No adoption requests found for this user' });
        }

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

const updateAdoptionStatus = async (req, res) => {
    const { status } = req.body;
    const adoptionId = req.params.id;

    try {
        const adoption = await Adoption.findByPk(adoptionId);

        if (!adoption) {
            return res.status(404).send({ error: 'Adoption request not found' });
        }

        adoption.status = status;
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
    updateAdoptionStatus,
    deleteAdoption
};
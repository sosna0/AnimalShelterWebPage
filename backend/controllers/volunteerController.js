const Volunteer = require('../models/volunteerModel.js');


const createVolunteer = async (req, res) => {
    const { 
        userId,
        animalId,
        activityType,
        date,
        durationMinutes,
        message,
    } = req.body;

    try {
        const volunteer = await Volunteer.create({
            userId: userId,
            animalId: animalId,
            activityType: activityType,
            date: date,
            durationMinutes: durationMinutes,
            message: message
        });

        res.status(201).send(volunteer);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create volunteer' });
    }
};

const getVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.findAll();

        res.status(200).send(volunteers);

    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch volunteers' });
    }
};

const getVolunteerById = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByPk(req.params.id);

        if (!volunteer) {
            return res.status(404).send({ error: 'Volunteer not found' });
        }

        res.status(200).send(volunteer);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch volunteer by id' });
    }
};

const getVolunteerByUserId = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByPk({
            where: {
                userId: req.params.userId
            }
        });

        if (!volunteer) {
            return res.status(404).send({ error: 'Volunteer not found' });
        }

        res.status(200).send(volunteer);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch volunteer by userId' });
    }
};


const getVolunteersByAnimalId = async (req, res) => {
    try {
        const volunteers = await Volunteer.findAll({
            where: {
                animalId: req.params.animalId
            }
        });

        if (!volunteers) {
            return res.status(404).send({ error: 'Volunteers not found' });
        }

        res.status(200).send(volunteers);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch volunteers by animalId' });
    }
};


const updateVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByPk(req.params.id);

        if (!volunteer) {
            return res.status(404).send({ error: 'volunteer not found' });
        }
        const updatedVolunteer = await volunteer.update(req.body);

        res.status(200).send(updatedVolunteer);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update volunteer' });
    }
}

const deleteVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByPk(req.params.id);

        if (!volunteer) {
            return res.status(404).send({ error: 'Volunteer not found' });
        }

        await volunteer.destroy();

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete volunteer' });
    }
};


module.exports = {
    createVolunteer,
    getVolunteers,
    getVolunteerById,
    getVolunteerByUserId,
    getVolunteersByAnimalId,
    updateVolunteer,
    deleteVolunteer
};
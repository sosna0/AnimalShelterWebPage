const { Op } = require('sequelize');
const Animal = require('../models/animalModel');

const createAnimal = async (req, res) => {
    const { 
        name, 
        description, 
        species,
        age,
        gender,
        weight,
        imageUrl,
        adoptionStatus = 'available'
    } = req.body;

    try {
        const animal = await Animal.create({
            name,
            description,
            species,
            age,
            gender,
            weight,
            imageUrl,
            adoptionStatus
        });

        res.status(201).send(animal);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create animal' });
    }
};

const getAnimals = async (req, res) => {
    try {
        const animals = await Animal.findAll();

        res.status(200).send(animals);

    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch animals' });
    }
};

const getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id);

        if (!animal) {
            return res.status(404).send({ error: 'Animal not found' });
        }

        res.status(200).send(animal);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch animal by id' });
    }
};

const getAnimalsByFilters = async (req, res) => {
    const { name, species, ageMin, ageMax, adoptionStatus, gender } = req.query;
    const filters = {};

    if (name) {
        filters.name = {
            [Op.like]: `%${name}%`
        };
    }
    if (species) {
        filters.species = species;
    }
    if (ageMin || ageMax) {
        filters.age = {};
    }
    if (ageMin) {
        filters.age[Op.gte] = parseInt(ageMin, 10);
    }
    if (ageMax) {
        filters.age[Op.lte] = parseInt(ageMax, 10);
    }
    if (adoptionStatus) {
        filters.adoptionStatus = adoptionStatus;
    }
    if (gender) {
        filters.gender = gender;
    }

    try {
        const animals = await Animal.findAll({
            where: filters
        });

        res.status(200).send(animals);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch animals by filters' });
    }
};

const updateAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id);

        if (!animal) {
            return res.status(404).send({ error: 'Animal not found' });
        }

        const updatedAnimal = await animal.update(req.body);

        res.status(200).send(updatedAnimal);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update animal' });
    }
};

const deleteAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id);

        if (!animal) {
            return res.status(404).send({ error: 'Animal not found' });
        }

        await animal.destroy();

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete animal' });
    }
};

const getSpecies = async (req, res) => {
    try {
        const species = await Animal.findAll({
            attributes: ['species'],
            group: 'species'
        });

        res.status(200).send(species);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch species' });
    }
};

module.exports = {
    createAnimal,
    getAnimals,
    getAnimalById,
    getAnimalsByFilters,
    updateAnimal,
    deleteAnimal,
    getSpecies
};
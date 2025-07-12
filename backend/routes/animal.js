const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.post('/', animalController.createAnimal);
router.get('/', animalController.getAnimals);
router.get('/filter', animalController.getAnimalsByFilters);
router.get('/species', animalController.getSpecies);
router.get('/:id', animalController.getAnimalById);
router.put('/:id', animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimal);

module.exports = router;
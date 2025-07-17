const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const { isStaff, isPublic } = require('../middleware/authentication');

router.post('/', isStaff, animalController.createAnimal);
router.get('/', animalController.getAnimals);
router.get('/filter', animalController.getAnimalsByFilters);
router.get('/species', animalController.getSpecies);
router.get('/:id', animalController.getAnimalById);
router.put('/:id', isStaff, animalController.updateAnimal);
router.delete('/:id', isStaff, animalController.deleteAnimal);

module.exports = router;
const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');

router.post('/', adoptionController.CreateAdoption);
router.get('/', adoptionController.getAdoptions);
router.get('/:id', adoptionController.getAdoptionById);
router.get('/user/:userId', adoptionController.getAdoptionsByUserId);
router.get('/animal/:animalId', adoptionController.getAdoptionsByAnimalId);
router.put('/:id', adoptionController.updateAdoption);
router.put('/:id/status', adoptionController.updateAdoptionStatus);
router.delete('/:id', adoptionController.deleteAdoption);

module.exports = router;
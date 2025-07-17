const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');


router.post('/', volunteerController.createVolunteer);
router.get('/', volunteerController.getVolunteers);
router.get('/:id', volunteerController.getVolunteerById);
router.get('/user/:userId', volunteerController.getVolunteerByUserId);
router.get('/animal/:animalId', volunteerController.getVolunteersByAnimalId);
router.put('/:id', volunteerController.updateVolunteer);
router.delete('/:id', volunteerController.deleteVolunteer);


module.exports = router;
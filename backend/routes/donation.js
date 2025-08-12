const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { isStaff } = require('../middleware/authentication');

router.post('/', donationController.createDonation);
router.get('/', donationController.getDonations);
router.get('/:id', donationController.getDonationById);
router.get('/user/:userId', donationController.getDonationsByUserId);
router.put('/:id', isStaff, donationController.updateDonation);
router.delete('/:id', donationController.deleteDonation);


module.exports = router;
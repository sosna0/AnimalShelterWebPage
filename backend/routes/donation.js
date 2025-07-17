const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { isStaff, isPublic } = require('../middleware/authentication');

// TODO: pomyśleć czy publiczny dostęp do darowizn ma sens

router.post('/', isPublic, donationController.createDonation);
router.get('/', donationController.getDonations);
router.get('/:id', donationController.getDonationById);
router.get('/user/:userId', donationController.getDonationsByUserId);
router.put('/:id', isStaff, donationController.updateDonation);
router.delete('/:id', donationController.deleteDonation);


module.exports = router;
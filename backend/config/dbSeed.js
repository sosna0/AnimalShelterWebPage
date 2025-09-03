const Animal = require('../models/animalModel');
const User = require('../models/userModel');
const Donation = require('../models/donationModel');
const animals = require('./presets/animalPreset');
const users = require('./presets/userPreset');
const donations = require('./presets/donationPreset');

// NOTES:
/*
    1. Animals from animalPreset are searched by the animal.name, 
    that means that names that already occur in the database will not be added again.

    2. Users are added by their username, which is unique in the model.

    3. Seeding uses transactions so if any operation fails, all changes are rolled back.
*/

async function seedDatabase(sequelize) {
    const t = await sequelize.transaction();

    try {
        for (const animal of animals) {
            const existingAnimal = await Animal.findOne({
                where: {
                    name: animal.name
                },
                transaction: t
            });

            if (!existingAnimal) {
                await Animal.create(animal, { transaction: t });
            }
        }

        for (const user of users) {
            const existingUser = await User.findOne({
                where: {
                    username: user.username
                },
                transaction: t
            });

            if (!existingUser) {
                await User.create(user, { transaction: t });
            }
        }

        for (const donation of donations) {
            const existingDonation = await Donation.findOne({
                where: {
                    userId: donation.userId,
                    amount: donation.amount,
                    message: donation.message
                },
                transaction: t
            });

            if (!existingDonation) {
                await Donation.create(donation, { transaction: t });
            }
        }

        // commit transaction
        await t.commit();
        console.log('✅ Database seeding completed successfully');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        await t.rollback();
        throw error;
    }
}

module.exports = seedDatabase;
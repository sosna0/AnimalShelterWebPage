const Animal = require('../models/animalModel');
const User = require('../models/userModel');
const animals = require('./presets/animalPreset');
const users = require('./presets/userPreset');

async function seedDatabase(sequelize) {
    const t = await sequelize.transaction();
    
    try {
        // seed users
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

        // seed animals
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
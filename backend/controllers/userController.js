const User = require('../models/userModel.js');


// w sumie to nie wiem, czy to jest potrzebne, skoro mam authController'a
const createUser = async (req, res) => {
    const { 
        name,
        surname,
        username,
        email,
        password,
        role = 'public'
    } = req.body;
    
    try {
        const user = await User.create({
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: password,
            role: role
        });
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create user' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user by id' });
    }
};

const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findByPk({
            where: {
                username: req.params.username
            }
        });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user by name' });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUserByUsername
};
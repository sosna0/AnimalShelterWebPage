const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');

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
    const user = await User.findByPk(req.params.id);
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
        const user = await User.findOne({
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

const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.params.email
            }
        });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch user by email' });
    }
};


const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { id, createdAt, updatedAt, ...fieldsToUpdate } = req.body;

        if (fieldsToUpdate.password) {
            const hashedPassword = await bcrypt.hash(fieldsToUpdate.password, 10);
            fieldsToUpdate.password = hashedPassword;
        }

        const updatedUser = await user.update(fieldsToUpdate);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};



const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        await user.destroy();

        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete user' });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    updateUser,
    deleteUser
};
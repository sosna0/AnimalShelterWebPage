const bcrypt = require('bcrypt');
const User = require('../models/userModel');


const registerUser = async (req, res) => {
    const { 
        name,
        surname,
        username,
        email,
        password,
        role = 'public'
     } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({
        where: {
            email: email,
            username: username,
        }
    });

    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: hashedPassword,
            role: role
        });

        // automatic login after registration
        req.session.userId = user.id;

        // tu sprawdzić, czy dobrze przekierowuje - na razie nie przekierowuje
        const lastUrl = req.session.lastUrl || '/';
        delete req.session.lastUrl;

        res.status(200).send('User registered successfully');
        // nie wiem, czy przekierowywać, czy nie
        // res.redirect(lastUrl);

    } catch (error) {
        console.error(error);
        res.status(500).send('Registration error');
    }
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by name
        const user = await User.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        // Check if the password is valid
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // login
        req.session.userId = user.id;
        const lastUrl = req.session.lastUrl || '/';
        delete req.session.lastUrl;

        // nie wiem, czy przekierowywać, czy nie
        // res.redirect(lastUrl);
        res.status(200).send('Login successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Probably it will be enough for correct logout
const logoutUser = async (req, res) => {
    delete req.session.userId;
    res.status(200).send('Logout successful');
}

const getCurrentUser = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Not logged in')
    }

    const user = await User.findByPk(req.session.userId, {
        attributes: { exclude: ['password'] } // Exclude password from the response
    });

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.status(200).json(user);

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};
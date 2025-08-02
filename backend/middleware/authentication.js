const User = require('../models/userModel.js');

const isPublic = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.session.userId);

        if (!user) {
            return res.status(401).send({ error: 'User not found' });
        }
        
        if (user.role !== 'public') {
            return res.status(403).send({ error: 'User does not have the public role' });
        }

        req.user = user;
        return next();

    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).send({ error: 'Failed to authenticate user' });
    }
};

const isStaff = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.session.userId);
        if (!user) {
            return res.status(401).send({ error: 'User not found' });
        }
        if (user.role !== 'staff') {
            return res.status(403).send({ error: 'User is not staff' });
        }
        req.user = user;
        return next();
        
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).send({ error: 'Failed to authenticate user' });
    }
};

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    else {
        return res.status(401).send({ error: 'User is not authenticated' });
    }
};

module.exports = {
    isPublic,
    isStaff,
    isAuthenticated
};
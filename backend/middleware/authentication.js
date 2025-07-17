const userController = require('../controllers/userController.js');

const isPublic = async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await userController.getUserById(req.session.userId);
            
            if (user.role === 'public') {
                return next();
            } 
            else {
                return res.status(403).send({ error: 'User does not have the public role' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Failed to authenticate user' });
        }
    }
    else {
        return res.status(401).send({ error: 'User is not authenticated' });
    }
};

const isStaff = async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await userController.getUserById(req.session.userId);
            
            if (user.role === 'staff') {
                return next();
            } 
            else {
                return res.status(403).send({ error: 'User is not staff' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Failed to authenticate user' });
        }
    }
    else {
        return res.status(401).send({ error: 'User is not authenticated' });
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
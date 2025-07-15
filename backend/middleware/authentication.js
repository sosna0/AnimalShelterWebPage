

// może dodać isAdmin / isStaff / isPublic?
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    } else {
        // to wypada zmienić na błąd raczej, zamiast przekierowania
        req.session.lastUrl = req.originalUrl;
        return res.redirect('/login-user');
    }
};

module.exports = isAuthenticated;
module.exports.checkRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.currentUser.role !== requiredRole) {
            return res.status(401).end();
        } else { 
            console.log('correct route');
            return next();
        }
    }
}
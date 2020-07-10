module.exports.checkRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(401).json({
                msg: 'unauthorized'
            })
        } else { 
            console.log('correct route');
            return next();
        }
    }
}
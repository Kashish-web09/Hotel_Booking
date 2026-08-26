export const authorize = (...requiredRoles) => {

    return (req, res, next) => {
        if (!requiredRoles.includes(req.role)) {
            return res.status(403).send("Access denied");
        }

        next();
    };

};
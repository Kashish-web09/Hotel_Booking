export const authorize = (requiredRole) => {

    return (req, res, next) => {

        if (req.role !== requiredRole) {
            return res.status(403).send("Access denied");
        }

        next();
    };

};
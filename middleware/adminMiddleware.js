export const authorize = (...requiredRoles) => {

    return (req, res, next) => {
   console.log("========== AUTHORIZATION ==========");
        console.log("Required Role:", requiredRoles);
        console.log("Actual Role:", req.role);
        console.log("User ID:", req.userId);
        console.log("===================================");

        if (!requiredRoles.includes(req.role)) {
            return res.status(403).send("Access denied");
        }

        next();
    };

};
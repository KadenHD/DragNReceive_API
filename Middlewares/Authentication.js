export const authUser = (req, res, next) => { //ptet useless car le isValidToken le fais déjà
    if (req.user == null) {
        res.status(403).json({
            error: `Vous devez être connecté !`
        });
    }
    next();
}

export const authRole = (role) => {
    return (res, req, next) => {
        if (req.user.role != role) {
            res.status(401).json({
                error: `Vous n'êtes pas autorisé à faire ceci !`
            });
        }
        next();
    }
}
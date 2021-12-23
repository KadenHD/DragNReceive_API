import User from '../Models/Models.js'

export const scopedUsers = (token, users) => { // faudra mettre cette fonction dans le findAllUsers => res.json(scopedUsers(token, users)) à peu près
    if (token.role === 1 || token.role === 2) return users;
    return users.filter(user => user.id === token.id);
}

export const canCreateUser = (token, user) => { //token = user from the token header, just receive the value
    return (
        token.role === 1 ||
        (token.role === 2 && user.id != 1 && user.id != 2)
    )
}

export const canViewUser = (token, user) => { //token = user from the token header, just receive the value
    return (
        token.role === 1 ||
        (token.role === 2 && user.id != 1 && user.id != 2) ||
        user.id === token.id
    )
}

export const canDeleteUser = (token, user) => {
    return token.role === 1;
}



/////// Normalement ce qu'il y a en dessous doit aller dans le router ///////

export const setUser = (req, res, next) => {
    const user = User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({
            error: `Utilisateur non trouvé !`
        });
    }
    next();
}

export const authCreateUser = (req, res, next) => {
    if (!canCreateUser(token, req.body));
    res.status(401).json({
        error: `Vous n'êtes pas autorisé à faire ceci !`
    });
}

export const authGetUser = (req, res, next) => {
    if (!canViewUser(token, req.body));
    res.status(401).json({
        error: `Vous n'êtes pas autorisé à faire ceci !`
    });
}

export const authDeleteUser = (req, res, next) => {
    if (!canDeleteUser(token, req.body));
    res.status(401).json({
        error: `Vous n'êtes pas autorisé à faire ceci !`
    });
}


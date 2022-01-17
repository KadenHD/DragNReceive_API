export const authRegisterClient = async (req, res, next) => {
    if (req.body.roleId != "4") return res.status(401).json({ error: `Seul des clients peuvent s'inscrire !` });
    next();
}
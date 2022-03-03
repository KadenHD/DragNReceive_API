export const authRegisterClient = async (req, res, next) => {
    if (req.body.roleId != "4") return res.status(403).json({ error: `Seul des clients peuvent s'inscrire !` });
    next();
}

export const validForgotUser = async (req, res, next) => {

}

export const validResetUser = async (req, res, next) => {

}
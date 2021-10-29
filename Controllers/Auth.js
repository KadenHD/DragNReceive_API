import bcrypt from 'bcrypt';

import User from '../Models/User.js'

export const loginUser = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) return res.status(400).send({
        message: 'Wrong email'
    });
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Do the token creation and auth
            res.send({
                message: 'You are connected'
            });
        } else {
            res.send({
                message: 'Wrong password'
            });
        }
    } catch {
        res.status(500).send();
    }
}

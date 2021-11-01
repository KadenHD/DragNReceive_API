import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { extractBearerToken } from '../Middlewares/TokenJWT.js';

import User from '../Models/User.js'

export const loginUser = async (req, res) => {
    // Get user and Check email
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(400).json({message: `Email not found`});

    // Check Password
    const checkPassword = await bcrypt.compareSync(req.body.password, user.password);
    if(!checkPassword) return res.status(400).json({message: `Invalid Password`});

    // Create User token
    const token = jwt.sign(
        {
            id: user.id,
        }, 
        process.env.SECRET_TOKEN
    );
    res.header('token', token).json({token: token, user})
}

export const currentUser = async (req, res) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    const decoded = jwt.decode(token, {complete: false})

    const getUser = await User.findByPk(decoded.id)
    
    const user = {
        id: getUser.id,
        lastname: getUser.lastname,
        firstname: getUser.firstname,
        email: getUser.email,
        roleId: getUser.roleId
    }

    return res.status(200).json({user})
}
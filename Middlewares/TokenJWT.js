import jwt from 'jsonwebtoken';

export const CheckToken = (req, res, next) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);
    if (!token) return res.status(401).json({error: `You need a token`});

    try {
        req.user = jwt.verify(token, process.env.SECRET_TOKEN);
        next();
    } catch (error) {
        res.status(400).json({error: `Token not valid`});
    }
}

export const extractBearerToken = (headerValue) => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}
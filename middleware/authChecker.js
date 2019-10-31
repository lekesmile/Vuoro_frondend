require('dotenv').config();
const jwt = require('jsonwebtoken');

function authChecker(req, res, next) {
    const token = req.header('Authorization');

    // Check for token
    if (!token)
        return res.status(401).json({ msg: 'No token, authorizaton denied' });

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
       return res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = authChecker;
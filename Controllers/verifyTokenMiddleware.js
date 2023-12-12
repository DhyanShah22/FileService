const jwt = require('jsonwebtoken')

const verifyTokenMiddleware = (req, res, next) => {
    try {
        // Extract the token from the request headers or wherever you store it
        const token = req.headers.authorization.split(' ')[1];

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.SECRET);

        // Attach the decoded token to the request object for further use
        req.user = decodedToken;

        next(); // Move to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized. Invalid or missing token.' });
    }
};

module.exports = verifyTokenMiddleware;
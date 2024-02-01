import jwt from 'jsonwebtoken';

const Auth = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.jwt, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid" });
        }
        req.user = user;
        next();
    });
};

export default Auth;



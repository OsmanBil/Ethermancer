"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyDecodedUser = exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware function to verify the authenticity of the JWT token
const verifyAuthToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401);
        res.json('Access denied, no token provided');
        return;
    }
    try {
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
};
exports.verifyAuthToken = verifyAuthToken;
// Middleware function to verify if the decoded user from the JWT token matches the requested user ID
const verifyDecodedUser = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).json({ message: 'Access denied, no token provided.' });
        return;
    }
    const decoded = jsonwebtoken_1.default.decode(authorizationHeader.split(' ')[1]);
    if (!decoded || typeof decoded === 'string') {
        res.status(401).json({ message: 'Invalid JWT payload.' });
        return;
    }
    const userId = parseInt(req.params.id);
    if (decoded.user && decoded.user.id === userId) {
        next();
    }
    else {
        res.status(401).json({ message: 'Access denied, invalid token' });
    }
};
exports.verifyDecodedUser = verifyDecodedUser;

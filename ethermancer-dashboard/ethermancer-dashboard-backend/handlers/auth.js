var jwt = require('jsonwebtoken');
require('dotenv').config();


// Middleware function to verify the authenticity of the JWT token
exports.verifyAuthToken = function(req, res, next) {
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401);
    res.json('Access denied, no token provided');
    return;
  }

  try {
    var token = authorizationHeader.split(' ')[1];
    var tokenSecret = process.env.TOKEN_SECRET;
    jwt.verify(token, tokenSecret);
    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};

// Middleware function to verify if the decoded user from the JWT token matches the requested user ID
exports.verifyDecodedUser = function(req, res, next) {
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ message: 'Access denied, no token provided.' });
    return;
  }

  var decoded = jwt.decode(authorizationHeader.split(' ')[1]);

  if (!decoded || typeof decoded === 'string') {
    res.status(401).json({ message: 'Invalid JWT payload.' });
    return;
  }

  var userId = parseInt(req.params.id);

  if (decoded.user && decoded.user.id === userId) {
    next();
  } else {
    res.status(401).json({ message: 'Access denied, invalid token' });
  }
};

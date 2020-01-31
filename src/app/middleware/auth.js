import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Import the configs of authentication
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verify if the header has the token
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Extract token from header
  const [, token] = authHeader.split(' ');

  try {
    // Verify if the token is valid
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Create a field userId in the request
    req.userId = decoded.id;

    // If all is ok then continue with the request
    return next();
  } catch (err) {
    // Error catch, send a message of error
    return res.status(401).json({ error: 'Token invalid' });
  }
};

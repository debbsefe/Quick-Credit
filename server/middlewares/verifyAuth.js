import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
    errorMessage, status,
} from '../helpers/status';

dotenv.config();

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */

const verifyToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        errorMessage.error = 'Token not provided';
        return res.status(status.unauthorized).send(errorMessage);
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        if (decoded.email !== 'admin@quick-credit.com') {
            errorMessage.error = 'Only Admin can access this route!';
            return res.status(status.forbidden).send(errorMessage);
        }
        next();
    } catch (error) {
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
};

export default verifyToken;


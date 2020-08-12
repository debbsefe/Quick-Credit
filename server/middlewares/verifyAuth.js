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
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = {
            email: decoded.email,
            id: decoded.id,
            is_admin: decoded.is_admin,
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            address: decoded.address,
            user_status: decoded.user_status,
        };
        next();
    } catch (error) {
        errorMessage.error = 'Authentication Failed';
        return res.status(status.unauthorized).send(errorMessage);
    }
};

export default verifyToken;


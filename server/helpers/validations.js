import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../env';
/**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
};

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEx.test(email);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
};

/**
   * isInteger helper method
   * @param {int, integer} input
   * @returns {Boolean} True or False
   */
const isNumber = (input) => {
    return Number.isInteger(input);
};

/**
   * isInteger helper method
   * @param {int, integer} input
   * @returns {Boolean} True or False
   */
const checkRange = (input) => {
    if (input >= 1 && input <= 12) {
        return true;
    }
};

/**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
const generateUserToken = (email, id, is_admin, first_name, last_name, address, user_status) => {
    const token = jwt.sign({
        email,
        id: id,
        is_admin,
        first_name,
        last_name,
        address,
        user_status
    },
        env.secret, { expiresIn: '3d' });
    return token;
};


export {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    empty,
    generateUserToken,
    isNumber,
    checkRange,
};

/* eslint-disable camelcase */
import moment from 'moment';

import dbQuery from '../models/dbQuery';

import {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    generateUserToken,
} from '../helpers/validations';

import {
    createUserQuery,
    userDetailsQuery,
    verifyUser,
} from '../models/queries.js';

import {
    errorMessage, successMessage, status,
} from '../helpers/status';

/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const createUser = async (req, res) => {
    const {
        email, first_name, last_name, password, address
    } = req.body;

    const created_on = moment(new Date());
    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password) || isEmpty(address)) {
        errorMessage.error = 'Email, password, first name, last name and address field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
    }
    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than five(5) characters';
        return res.status(status.bad).send(errorMessage);
    }
    const { rows } = await dbQuery.query(userDetailsQuery, [email]);
    if (rows.length > 0) {
        errorMessage.error = 'User with that EMAIL already exists';
        return res.status(status.conflict).send(errorMessage);

    }

    const hashedPassword = hashPassword(password);

    const values = [
        email,
        first_name,
        last_name,
        hashedPassword,
        address,
        created_on,
    ];

    try {
        const { rows } = await dbQuery.query(createUserQuery, values);

        console.log(rows);
        const dbResponse = rows[0];
        if (dbResponse.email) console.log('exist')
        delete dbResponse.password;
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name, dbResponse.address, dbResponse.user_status);
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.created).send(successMessage);
    } catch (e) {
        console.log(e);

        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

/**
   * Signin
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
const siginUser = async (req, res) => {
    const { email, password } = req.body;
    if (isEmpty(email) || isEmpty(password)) {
        errorMessage.error = 'Email or Password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email) || !validatePassword(password)) {
        errorMessage.error = 'Please enter a valid Email or Password';
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const { rows } = await dbQuery.query(userDetailsQuery, [email]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }
        if (!comparePassword(dbResponse.password, password)) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name, dbResponse.address, dbResponse.user_status);
        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        console.log(error);
        return res.status(status.error).send(errorMessage);
    }

};

/**
     * @description verifies a user account
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
const adminVerifyUser = async (req, res) => {

    const { email } = req.params;

    // Check if email exist on database
    const { rows } = await dbQuery.query(userDetailsQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
        errorMessage.error = 'User with this email does not exist';
        return res.status(status.notfound).send(errorMessage);
    }

    // Check if user is already verified
    if (dbResponse.user_status === 'verified') {
        errorMessage.error = 'This User has already been Verified!';
        return res.status(status.conflict).send(errorMessage);
    }
    try {
        const result = await dbQuery.query(verifyUser, [email]);
        const returnData = await dbQuery.query(userDetailsQuery, [email]);
        const user = returnData.rows[0];
        delete dbResponse.password;
        successMessage.data = user;
        successMessage.message = 'Client has been verified successfully';
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        console.log(error);
        return res.status(status.error).send(errorMessage);
    }
}

export {
    createUser,
    siginUser,
    adminVerifyUser
};

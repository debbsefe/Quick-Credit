/* eslint-disable no-unused-vars */
import moment from 'moment';
import dbQuery from '../models/dbQuery';
import {
    userDetailsQuery, createLoanQuery, getUserLoans, queryAllLoans, getALoan, getLoans, changeLoanStatus,
} from '../models/queries';
import { isNumber, isEmpty, checkRange } from '../helpers/validations';
import {
    errorMessage, successMessage, status,
} from '../helpers/status';

/**
 * @method loanApply
 * @description creates a loan application
 * @param {object} req - The Request Object
 * @param {object} res - The Response Object
 * @returns {object} JSON API Response
 */

const loanApply = async (req, res) => {

    const email = req.user.email;
    const { amount, tenor } = req.body;

    if (isEmpty(email) || isEmpty(tenor) || isEmpty(amount)) {
        errorMessage.error = 'Tenor, and amount cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }
    if (isNumber(tenor) || isNumber(amount)) {
        errorMessage.error = 'Amount and tenor should be integers';
        return res.status(status.bad).send(errorMessage);
    }
    if (!checkRange(tenor)) {
        errorMessage.error = 'Tenor must be between 1 and 12 months';
        return res.status(status.bad).send(errorMessage);
    }

    const loanData = {
        interest: 0.05 * parseInt(amount, 10).toFixed(3),
        get paymentInstallment() {
            return (parseInt((amount), 10) / parseInt(tenor, 10) + this.interest).toFixed(3);
        },
        get balance() {
            return (parseInt(this.paymentInstallment, 10) * parseInt(tenor, 10)).toFixed(3);
        },
    };
    const created_on = moment(new Date());

    const { rows } = await dbQuery.query(userDetailsQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
        errorMessage.error = 'User with this email does not exist';
        return res.status(status.notfound).send(errorMessage);
    }
    const findLoan = await dbQuery.query(getUserLoans, [email]);
    if (!findLoan.rows.length || findLoan.rows[findLoan.rows.length - 1].repaid === true) {
        try {
            const data = {
                email: email,
                tenor,
                amount,
                paymentInstallment: loanData.paymentInstallment,
                balance: loanData.balance,
                interest: loanData.interest,
            };
            const values = [email, created_on, data.tenor, data.amount, data.paymentInstallment, data.balance, data.interest];
            const addLoanData = await dbQuery.query(createLoanQuery, values);
            const getAppliedLoan = await dbQuery.query(getUserLoans, [email]);
            const result = getAppliedLoan.rows[0];
            successMessage.data = result;
            successMessage.message = 'Loan Application has been sent successfully';
            return res.status(status.created).send(successMessage);
        } catch (error) {
            errorMessage.error = 'Operation was not successful';
            return res.status(status.error).send(errorMessage);
        }
    }
    errorMessage.error = 'You already applied for a loan!';

    return res.status(status.conflict).send(errorMessage);
}

/**
   * @method getAllLoans
   * @description gets all loan applications
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
const getAllLoans = async (req, res) => {
    let { loan_status, repaid } = req.query;
    if (loan_status && repaid) {
        repaid = JSON.parse(repaid);

        const values = [loan_status, repaid];
        const result = await dbQuery.query(queryAllLoans, values);
        if (result.rows.length < 1) {
            successMessage.message = 'No data matched your request at the moment, check back later!';
            return res.status(status.success).send(successMessage);
        }
        successMessage.data = result.rows;
        successMessage.message = 'Loan retrieved successfully';
        return res.status(status.success).send(successMessage);
    }
    const retrieveLoan = await dbQuery.query(getLoans);
    if (retrieveLoan.rows.length < 1) {
        successMessage.success = 'No Loan available at the moment';
        return res.status(status.success).send(successMessage);
    }
    successMessage.data = retrieveLoan.rows;
    successMessage.message = 'Loan retrieved successfully';
    return res.status(status.success).send(successMessage);
}

/**
   * @method getOneLoan
   * @description retrieves one loan application
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
const retrieveOneLoan = async (req, res) => {
    const { id } = req.params;
    const result = await dbQuery.query(getALoan, [id]);
    if (result.rows.length) {
        successMessage.data = result.rows[0];
        successMessage.message = 'Loan retrieved successfully';
        return res.status(status.success).send(successMessage);
    }
    errorMessage.error = 'No Loan with that id exist on database';
    return res.status(status.notfound).send(errorMessage);

}

/**
  * @method adminApproveLoan
  * @description gets loan application and approves/rejects
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
const adminApproveLoan = async (req, res) => {
    const { loan_status } = req.body;
    const { id } = req.params;
    if (isEmpty(loan_status)) {
        errorMessage.error = 'Loan Status field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }
    const values = [loan_status, id];
    const getLoan = await dbQuery.query(getALoan, [id]);

    if (!getLoan.rows.length) {
        errorMessage.error = 'No Loan with that id exist on database';
        return res.status(status.notfound).send(errorMessage);
    }
    if (getLoan.rows[0].loan_status === 'approved' || getLoan.rows[0].loan_status === 'rejected') {
        errorMessage.error = `This loan has already been ${getLoan.rows[0].loan_status}`;
        return res.status(status.conflict).send(errorMessage);
    }
    if (getLoan.rows.length && loan_status !== 'rejected') {
        const getUser = await dbQuery.query(userDetailsQuery, [getLoan.rows[0].useremail]);
        if (getUser.rows[0].user_status === 'unverified') {
            errorMessage.error = `This user has not been verified!`;
            return res.status(status.bad).send(errorMessage);
        }
        const updateLoanStatus = await dbQuery.query(changeLoanStatus, values);
        const returnData = await dbQuery.query(getALoan, [id]);
        successMessage.data = returnData.rows[0];
        successMessage.message = 'Loan Updated Successfully';
        return res.status(status.success).send(successMessage);
    }

}

export { loanApply, getAllLoans, retrieveOneLoan, adminApproveLoan };

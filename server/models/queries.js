const createUserQuery = `INSERT INTO
users(email, first_name, last_name, password, address, created_on)
VALUES($1, $2, $3, $4, $5, $6)
returning *`;

const userDetailsQuery = 'SELECT * FROM users WHERE email = $1';

const verifyUser = "UPDATE users SET user_status='verified' WHERE email=$1";

export {
    createUserQuery,
    userDetailsQuery,
    verifyUser,
};
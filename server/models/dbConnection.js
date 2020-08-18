import pool from './pool';

//POOL CONNECT

pool.on('connect', () => {
  console.log('connected to database');
});


//CREATE USER TABLE

const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100) NOT NULL, 
  last_name VARCHAR(100) NOT NULL, 
  password VARCHAR(100) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  address VARCHAR(200) NOT NULL,
  user_status VARCHAR(20) DEFAULT 'unverified',
  created_on DATE NOT NULL)`;

  pool.query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createLoanTable = () => {
  const loanCreateQuery = `CREATE TABLE IF NOT EXISTS loans(
  id SERIAL UNIQUE PRIMARY KEY,
  userEmail VARCHAR(100) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  loan_status VARCHAR(20) DEFAULT 'pending',
  repaid BOOLEAN DEFAULT FALSE,
  tenor INT NOT NULL,
  amount NUMERIC NOT NULL,
  paymentInstallment NUMERIC NOT NULL,
  balance NUMERIC NOT NULL,
  interest NUMERIC NOT NULL);`;
  pool.query(loanCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
//DROP USER TABLE

const dropUserTable = () => {
  const userDropQuery = 'DROP TABLE IF EXISTS users';
  pool.query(userDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const dropLoanTable = () => {
  const loanDropQuery = 'DROP TABLE IF EXISTS loans';
  pool.query(loanDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
//CREATE ALL TABLES
const createAllTables = () => {
  createUserTable();
  createLoanTable();
}

//DROP ALL TABLES
const dropAllTables = () => {
  dropUserTable();
  dropLoanTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export {
  createAllTables,
  dropAllTables,
};

require('make-runnable');
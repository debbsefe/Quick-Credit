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

//CREATE ALL TABLES
const createAllTables = () => {
  createUserTable();
}

//DROP ALL TABLES
const dropAllTables = () => {
  dropUserTable();
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
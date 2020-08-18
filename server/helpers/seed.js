import pool from '../models/pool';

pool.on('connect', () => {
    console.log('connected to the db');
});


/**
 * SEED User
 */
const seedUser = () => {
    const seedUserQuery = `INSERT INTO
    users VALUES 
    ( default, 'eferha@gmail.com', 'Eferha', 'Eferha', '111111', true, 'Lagos', 'verified', NOW()),
    ( default, 'eferhamamus@gmail.com', 'Mamus', 'Mamus', '111111', true,'Lagos', default,  NOW()),
    ( default, 'flo@gmail.com', 'Flo', 'Flo', '111111', true, 'Lagos', default,  NOW()),
    ( default, 'florence@gmail.com', 'Renny', 'Renny', '111111', default, 'Lagos', default,  NOW()),
    ( default, 'sca@gmail.com', 'Sca', 'Sca', '111111', default, 'Lagos', default,  NOW())`;

    pool.query(seedUserQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

const seedLoan = () => {

    const seedLoanQuery = `INSERT INTO
    loans VALUES 
    ( default, 'efera@gmail.com', NOW(), default, default, 12, 20000, 2666.52, 2000, 2500),
    ( default, 'sc@gmail.com', NOW(), default, default, 12, 20000, 2666.52, 2000, 2500)`;

    pool.query(seedLoanQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

};

/**
 * Seed users
 */
const seed = () => {
    seedUser();
    seedLoan();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

export { seed };

require('make-runnable');

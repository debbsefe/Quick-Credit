import pool from '../models/dev/pool';

pool.on('connect', () => {
    console.log('connected to the db');
});


/**
 * SEED User
 */
const seed = () => {
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

/**
 * Seed users
 */
const seedUser = () => {
    seed();
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

export { seedUser };

require('make-runnable');

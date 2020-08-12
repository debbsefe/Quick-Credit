const correctUser = {
    first_name: 'Mamus',
    last_name: 'Eferha',
    email: 'efers@yaho.com',
    password: '111111',
    address: '9, Ojo Street Akoka',
};

const undefinedFirstName = {
    last_name: 'Efer',
    email: 'e@gmail.com',
    password: '111111',
    address: '9, Ojo Street Akoka',
};

const emptyFirstName = {
    first_name: '',
    last_name: 'Eferha',
    email: 'mamus@gmail.com',
    password: '111111',
    address: '9, Ojo Street Akoka',
};

const undefinedLastName = {
    first_name: 'Mamus',
    email: 'mamus@gmail.com',
    password: '111111',
    address: '9, Ojo Street Akoka',
};

const emptyLastName = {
    first_name: 'Flo',
    last_name: '',
    email: 'mamus@gmail.com',
    password: '111111',
    address: '9, Ojo Street Akoka',
};

const undefinedEmail = {
    first_name: 'James',
    last_name: 'Done',
    password: 'jamesdoe',
    address: '75 Bode-Thomas, Surulere',
};

const emptyEmail = {
    first_name: 'James',
    last_name: 'Done',
    email: '',
    password: 'jamesdoe',
    address: '75 Bode-Thomas, Surulere',
};

const undefinedAddress = {
    email: 'jamesdon@gmail.com',
    first_name: 'James',
    last_name: 'Done',
    password: 'jamesdoe',
};

const emptyAddress = {
    first_name: 'James',
    last_name: 'Done',
    email: 'jamesdoe@gmail.com',
    password: 'jamesdoe',
    address: '',
};

const invalidEmailCharacter = {
    first_name: 'James',
    last_name: 'Done',
    email: 'j%%##gmail.#om',
    password: 'jamesdoe',
    address: '75 Bode-Thomas, Surulere',
};

const existingEmail = {
    first_name: 'James',
    last_name: 'Done',
    email: 'eferhmamus@yahoo.com',
    password: 'jamesdoe',
    address: '75 Bode-Thomas, Surulere',
};

const undefinedPassword = {
    first_name: 'James',
    last_name: 'Done',
    email: 'jonahjang@gmail.com',
    address: '75 Bode-Thomas, Surulere',
};


const invalidPasswordLength = {
    first_name: 'James',
    last_name: 'Done',
    email: 'jonahjoe@gmail.com',
    password: 'j',
    address: 'Ojo Street',
};

const correctLogin = {
    email: 'jamesdoe@gmail.com',
    password: 'jamesdoe',
};

const undefinedEmailLogin = {
    password: 'johndoe',
};


const nonExistingEmail = {
    email: 'Jamesdoe@gmial.com',
    password: 'jamesdoe',
};

const undefinedPasswordLogin = {
    email: 'johndoe@gmail.com',
};

const emptyPasswordField = {
    email: 'jamesdoe@gmail.com',
    password: '',
};

const emptyEmailField = {
    email: '',
    password: 'jamesdoe',
};

const correctEmailIncorrectPassword = {
    email: 'jamesdoe@gmail.com',
    password: 'Jamesdroeh',
};

export {
    correctUser, undefinedFirstName, undefinedAddress,
    emptyAddress, emptyEmail,
    emptyFirstName, emptyLastName, undefinedLastName,
    undefinedEmail,
    invalidEmailCharacter, existingEmail, undefinedPassword,
    invalidPasswordLength, correctLogin, undefinedEmailLogin,
    nonExistingEmail, undefinedPasswordLogin, emptyPasswordField, emptyEmailField, correctEmailIncorrectPassword,
};

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {
    correctUser, undefinedFirstName, undefinedAddress,
    undefinedLastName,
    undefinedEmail,
    invalidEmailCharacter, existingEmail, undefinedPassword,
    emptyEmail,
    emptyFirstName, emptyLastName, invalidPasswordLength, correctLogin, nonExistingEmail, undefinedEmailLogin, emptyEmailField, undefinedPasswordLogin, emptyPasswordField
} from './mockData/mockUser';

// chai middleware
chai.use(chaiHttp);

// Define the should assertion
chai.should();
const url = '/api/v1/auth/signup';
const email = 'jamesdoe@gmail.com';
const loginUrl = '/api/v1/auth/signin';
const verifyUrl = `/api/v1/users/${email}/verify`;


//TEST FOR SIGNUP ROUTE
describe('User Sign Up Tests', () => {
    describe(`POST ${url}`, () => {
        it('Should create a new user account', (done) => {
            chai
                .request(app)
                .post(url)
                .send(correctUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('token');
                    res.body.data.should.have.property('user_status');
                    res.body.data.should.have.property('is_admin');
                    done();
                });
        });

        it('Should return 400 if firstName is ommited', (done) => {
            chai
                .request(app)
                .post(url)
                .send(undefinedFirstName)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email, password, first name, last name and address field cannot be empty');
                    done();
                });
        });

        it('Should return 400 if email is ommited', (done) => {
            chai
                .request(app)
                .post(url)
                .send(undefinedEmail)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email, password, first name, last name and address field cannot be empty');
                    done();
                });
        });

        it('Should return 400 if lastName is ommited', (done) => {
            chai
                .request(app)
                .post(url)
                .send(undefinedLastName)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email, password, first name, last name and address field cannot be empty');
                    done();
                });
        });
    });

    describe(`POST ${url}`, () => {
        it('Should return 400 if firstName is empty', (done) => {
            chai
                .request(app)
                .post(url)
                .send(emptyFirstName)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email, password, first name, last name and address field cannot be empty');
                    done();
                });
        });
        it('Should return 400 if lastName is empty', (done) => {
            chai
                .request(app)
                .post(url)
                .send(emptyLastName)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email, password, first name, last name and address field cannot be empty');
                    done();
                });
        });
    });
    it('Should return 400 if email is empty', (done) => {
        chai
            .request(app)
            .post(url)
            .send(emptyEmail)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.eql('Email, password, first name, last name and address field cannot be empty');
                done();
            });
    });
    it('Should return 400 if address is ommited', (done) => {
        chai
            .request(app)
            .post(url)
            .send(undefinedAddress)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.eql('Email, password, first name, last name and address field cannot be empty');
                done();
            });
    });



    describe(`POST ${url}`, () => {
        it('Should return 400 if address is ommited', (done) => {
            chai
                .request(app)
                .post(url)
                .send(undefinedAddress)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email, password, first name, last name and address field cannot be empty');
                    done();
                });
        });

        it('Should return 400 if password is ommited', (done) => {
            chai
                .request(app)
                .post(url)
                .send(undefinedPassword)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email, password, first name, last name and address field cannot be empty');
                    done();
                });
        });

        it('Should return 400 if Invalid Email Address is entered', (done) => {
            chai
                .request(app)
                .post(url)
                .send(invalidEmailCharacter)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Please enter a valid Email');
                    done();
                });
        });


    });


    it('Should return 400 if Invalid Email Address is entered', (done) => {
        chai
            .request(app)
            .post(url)
            .send(existingEmail)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.eql('User with that EMAIL already exist');
                done();
            });
    });

    it('Should return 400 if Invalid Password Length is entered', (done) => {
        chai
            .request(app)
            .post(url)
            .send(invalidPasswordLength)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.eql('Password must be more than five(5) characters');
                done();
            });
    });
});

//TEST FOR LOGIN ROUTE
describe('User Login Tests', () => {
    describe(`POST ${loginUrl}`, () => {
        it('Should successfully login a user account', (done) => {
            chai
                .request(app)
                .post(loginUrl)
                .send(correctLogin)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('token');
                    res.body.data.should.have.property('user_status');
                    res.body.data.should.have.property('is_admin');
                    done();
                });
        });
        it('Should return 404 and deny access if Invalid Email Address is inputed', (done) => {
            chai
                .request(app)
                .post(loginUrl)
                .send(nonExistingEmail)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('User with this email does not exist');
                    done();
                });
        });



        it('Should return 400  if Email field is omitted', (done) => {
            chai
                .request(app)
                .post(loginUrl)
                .send(undefinedEmailLogin)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email or Password detail is missing');
                    done();
                });
        });

        it('Should return 400  if Email field is empty', (done) => {
            chai
                .request(app)
                .post(loginUrl)
                .send(emptyEmailField)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email or Password detail is missing');
                    done();
                });
        });

        it('Should return 400  if Password field is omitted', (done) => {
            chai
                .request(app)
                .post(loginUrl)
                .send(undefinedPasswordLogin)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email or Password detail is missing');
                    done();
                });
        });
        it('Should return 400  if Password field is empty', (done) => {
            chai
                .request(app)
                .post(loginUrl)
                .send(emptyPasswordField)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.be.eql('Email or Password detail is missing');
                    done();
                });
        });
    });
});




// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app';
// import {
//     correctUser, myAdmin,
// } from './mockData/mockUser';

// // chai middleware
// chai.use(chaiHttp);

// // Define the should assertion
// chai.should();
// const email = 'sca@gmail.com	';
// const loginUrl = '/api/v1/auth/signin';
// const verifyUrl = `/api/v1/${email}/verify`;
// const notFoundUrl = '/api/v1/ee@gmail.com/verify';

// // TEST FOR ADMIN TO MARK USER AS VERIFIED
// describe(`PATCH ${verifyUrl}`, () => {
//     it('Should successfully verify user', (done) => {

//         chai
//             .request(app)
//             .post(loginUrl)
//             .send(myAdmin)
//             .end((loginErr, loginRes) => {
//                 const token = `${loginRes.body.data.token}`;
//                 chai
//                     .request(app)
//                     .patch(verifyUrl)
//                     .set('token', token)
//                     .end((err, res) => {
//                         res.should.have.status(200);
//                         res.body.should.be.a('object');
//                         res.body.should.have.property('data');
//                         done();
//                     });
//             });
//     });


//     it('Should return error when email is not found', (done) => {
//         chai
//             .request(app)
//             .post(loginUrl)
//             .send(myAdmin)
//             .end((loginErr, loginRes) => {
//                 const token = `${loginRes.body.data.token}`;
//                 chai
//                     .request(app)
//                     .patch(notFoundUrl)
//                     .set('token', token)
//                     .end((err, res) => {
//                         res.should.have.status(404);
//                         res.body.should.be.a('object');
//                         res.body.should.have.property('error');
//                         res.body.error.should.be.eql('User with this email does not exist');
//                         done();
//                     });
//             });
//     });

//     it('Should return error when token is not entered', (done) => {
//         chai
//             .request(app)
//             .post(loginUrl)
//             .send(myAdmin)
//             .end((loginErr, loginRes) => {
//                 const token = `Bearer ${loginRes.body.data.token}`;
//                 chai
//                     .request(app)
//                     .patch(verifyUrl)
//                     .end((err, res) => {
//                         res.should.have.status(401);
//                         res.body.should.be.a('object');
//                         res.body.should.have.property('error');
//                         res.body.error.should.be.eql('Token not provided');
//                         done();
//                     });
//             });
//     });
//     it('Should return error when user that is not admin is trying to access route', (done) => {
//         chai
//             .request(app)
//             .post(loginUrl)
//             .send(correctUser)
//             .end((loginErr, loginRes) => {
//                 const token = `${loginRes.body.data.token}`;
//                 chai
//                     .request(app)
//                     .patch(verifyUrl)
//                     .set('token', token)
//                     .end((err, res) => {
//                         res.should.have.status(403);
//                         res.body.should.be.a('object');
//                         res.body.should.have.property('error');
//                         res.body.error.should.be.eql('Only Admin can access this route!');
//                         done();
//                     });
//             });
//     });
// });
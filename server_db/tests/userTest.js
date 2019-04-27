/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
import { expect } from 'chai';
import { describe } from 'mocha';
import supertest from 'supertest';
import server from '../../server';

const api = supertest(server);

describe('tests for user controller', async () => {
  describe('/POST create user', () => {
    it('should create a new user', (done) => {
      const user = {
        firstName: 'Julius',
        lastName: 'Ngwu',
        email: 'jjude@gmail.com',
        password: '123Def@1',
        phoneNumber: '09088776654',
        type: 'staff',
        isAdmin: true,
      };
      api.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('id');
          expect(res.header).to.have.property('x-access-token');
          done();
        });
    });

    it('should not create a new user when the firstname is not provided', (done) => {
      const user = {
        lastName: 'Ngwu',
        email: 'jjude@gmail.com',
        password: '123Def@1',
        phoneNumber: '09088776654',
      };
      api.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('firstname is required');
          expect(res.body.status).to.equal(400);
          done();
        });
    });

    it('should not create a new user when the lastname is not provided', (done) => {
      const user = {
        firstName: 'Julius',
        email: 'jjude@gmail.com',
        password: '123def',
        phoneNumber: '09088776654',
      };
      api.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('lastname is required');
          expect(res.body.status).to.equal(400);
          done();
        });
    });

    it('should not create a new user when the email is not provided', (done) => {
      const user = {
        firstName: 'Julius',
        lastName: 'Ngwu',
        password: '123def',
        phoneNumber: '09088776654',
      };
      api.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('email is required');
          expect(res.body.status).to.equal(400);
          done();
        });
    });

    it('should not create a new user when the password is not provided', (done) => {
      const user = {
        firstName: 'Julius',
        lastName: 'Ngwu',
        email: 'jjude@gmail.com',
        phoneNumber: '09088776654',
      };
      api.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('password is required');
          expect(res.body.status).to.equal(400);
          done();
        });
    });

    it('should not create a new user when the phone number is not provided', (done) => {
      const user = {
        firstName: 'Julius',
        lastName: 'Ngwu',
        email: 'jjude@gmail.com',
        password: '123Def@1',
      };
      api.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('phoneNumber is required');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
    it('should not create a new user when the phone number is not provided', (done) => {
      const user = {
        firstName: 'Julius',
        lastName: 'Ngwu',
        email: 'jjude@gmail.com',
        password: '1Def@',
      };
      api.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Password must contain atleast one special character, number, uppercase and lowercase letter, min of 6 and max of 15 characters long');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });
});

describe('/POST Login user', () => {
  it('should login a registered user', (done) => {
    const user = {
      email: 'julius@gmail.com',
      password: '123Def@1',
    };
    api.post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('id');
        expect(res.header).to.have.property('x-access-token');
        done();
      });
  });

  it('should not login user if the password is incorrect', (done) => {
    const user = {
      email: 'julius@gmail.com',
      password: '123defgh',
    };
    api.post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('invalid email or password');
        done();
      });
  });
  it('should not login user if the password was not provided', (done) => {
    const user = {
      email: 'julius@gmail.com',
    };
    api.post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('password is required to login');
        done();
      });
  });

  it('should not login user if the email was not provided', (done) => {
    const user = {
      email: 'julius@gmail.com',
    };
    api.post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('password is required to login');
        done();
      });
  });
});

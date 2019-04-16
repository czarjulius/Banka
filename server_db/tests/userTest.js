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
        password: '123def',
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
        password: '123def',
        phoneNumber: '09088776654',
      };
      api.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error[0]).to.equal('firstname must contain only alphabets');
          expect(res.body.error[1]).to.equal('firstname must have atleast 3 characters');
          expect(res.body.error[2]).to.equal('firstname cannot contain whitespaces');
          done();
        });
    });
  });

  describe('/POST Login user', () => {
    it('should login a registered user', (done) => {
      const user = {
        email: 'julius@gmail.com',
        password: '123def',
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
  });
});

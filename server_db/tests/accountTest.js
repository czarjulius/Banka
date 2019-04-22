/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
import { expect } from 'chai';
import { describe } from 'mocha';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import server from '../../server';
import db from '../models/db';


const api = supertest(server);
let token;
let accountNumber;
let email;


async function createAdmin() {
  const query = `INSERT INTO users(firstName, lastname, email, password, isAdmin, phonenumber, type)
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING email, firstname, lastname, id`;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123def', salt);
  const values = ['Julius', 'Ngwu', 'julius@gmail.com', hashedPassword, true, '08109983465', 'staff'];
  return db.query(query, values);
}

describe('tests for Account controller', () => {
  before(async () => {
    await createAdmin();
  });
  it('should get login and return admin token', (done) => {
    const user = {
      email: 'julius@gmail.com',
      password: '123def',
    };
    api.post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        token = res.body.data.token;
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

  describe('/POST create account', () => {
    it('should create a new account', (done) => {
      const account = {
        type: 'current',
        amount: 100,
      };
      api.post('/api/v1/accounts')
        .set('x-access-token', token)
        .send(account)
        .end((err, res) => {
          accountNumber = parseInt(res.body.data.accountNumber, 10);
          email = res.body.data.email;
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to create a new account if account type is not provided', (done) => {
      const account = {
        amount: 100,
      };
      api.post('/api/v1/accounts')
        .set('x-access-token', token)
        .send(account)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Type is required');
          done();
        });
    });
  });

  describe('/PATCH  account', () => {
    it('should change account status', (done) => {
      const account = {
        status: 'dormant',
      };
      api.patch(`/api/v1/account/${accountNumber}`)
        .set('x-access-token', token)
        .send(account)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to update status if input is not active or dormant', (done) => {
      const account = {
        status: 'acteiveeee',
      };
      api.patch(`/api/v1/account/${accountNumber}`)
        .set('x-access-token', token)
        .send(account)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Account status must be active or dormant');
          done();
        });
    });
  });

  describe('/GET account by email', () => {
    it('should get a specific account detail by email', (done) => {
      api.get(`/api/v1/user/${email}/accounts`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to fetch specific account when the email is not correct', (done) => {
      api.get(`/api/v1/user/${email}w/accounts`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal(`There is no user with ${email}w`);
          done();
        });
    });
  });

  describe('/GET  account by account Number', () => {
    it('should get a specific account detail', (done) => {
      api.get(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to fetch accounts when the number is not correct', (done) => {
      api.get(`/api/v1/accounts/${accountNumber}1`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Account not found');
          done();
        });
    });
  });

  describe('/GET all accounts', () => {
    it('should get all accounts', (done) => {
      api.get('/api/v1/accounts')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });

  
  describe('/DELETE  account by account Number', () => {
    it('should delete a specific account detail', (done) => {
      api.delete(`/api/v1/accounts/${accountNumber}`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(203);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(203);
          expect(res.body.message).to.equal('Account has been deleted successfully');
          done();
        });
    });
    it('should fail to delte accounts when the number is not correct', (done) => {
      api.delete(`/api/v1/accounts/${accountNumber}1`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Account not found');
          done();
        });
    });
  });
});

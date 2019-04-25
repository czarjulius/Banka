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
let id;


async function createAdmin() {
  const query = `INSERT INTO users(firstName, lastname, email, password, isAdmin, phonenumber, type)
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING email, firstname, lastname, id`;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123def', salt);
  const values = ['Julius', 'Ngwu', 'julius33@gmail.com', hashedPassword, false, '08109983465', 'staff'];
  return db.query(query, values);
}

describe('tests for Transaction controller', () => {
  before(async () => {
    await createAdmin();
  });
  it('should get login and return admin token', (done) => {
    const user = {
      email: 'julius33@gmail.com',
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
        id = parseInt(res.body.data.id, 10);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  describe('/POST credit account', () => {
    it('should  credit an account', (done) => {
      const transact = {
        amount: 100,
      };
      api.post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('x-access-token', token)
        .send(transact)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to credit an account when account number is incorrect', (done) => {
      const account = {
        amount: 100,
      };
      api.post(`/api/v1/transactions/${accountNumber}3/credit`)
        .set('x-access-token', token)
        .send(account)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Account Number must be 10 digits');
          done();
        });
    });
  });

  describe('/POST debit Transaction', () => {
    it('should  debit an account', (done) => {
      const transact = {
        amount: 100,
      };
      api.post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('x-access-token', token)
        .send(transact)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to debit an account when account number is incorrect', (done) => {
      const account = {
        amount: 100,
      };
      api.post(`/api/v1/transactions/${accountNumber}3/debit`)
        .set('x-access-token', token)
        .send(account)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Account Number must be 10 digits');
          done();
        });
    });

    it('should fail to debit an account when account number is not a number ', (done) => {
      const account = {
        amount: 100,
      };
      api.post(`/api/v1/transactions/${accountNumber}ju3/debit`)
        .set('x-access-token', token)
        .send(account)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Account Number must be a number');
          done();
        });
    });
    it('should fail to debit an account when account number is contains white space', (done) => {
      const account = {
        amount: 100,
      };
      api.post(`/api/v1/transactions/${accountNumber}.3/debit`)
        .set('x-access-token', token)
        .send(account)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Account Number must be a whole integer');
          done();
        });
    });
  });

  describe('/GET  a specific transaction by account Number', () => {
    it('should fail to fetch transaction when the number is not correct', (done) => {
      api.get(`/api/v1/accounts/${accountNumber}1/transactions`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Account Number must be 10 digits');
          done();
        });
    });
  });

  describe('/GET  a specific transaction by account ID', () => {
    it('should get a specific transaction detail', (done) => {
      api.get(`/api/v1/transactions/${id}`)
        .set('x-access-token', token)
        .end((err, res) => {          
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });

    it('should fail to fetch transaction when the number is not correct', (done) => {
      api.get(`/api/v1/transactions/${id}o`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('ID must be a number');
          done();
        });
    });
  });
});

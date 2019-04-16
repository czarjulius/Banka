/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
import { expect } from 'chai';
import { describe } from 'mocha';
import supertest from 'supertest';
import server from '../../server';

const api = supertest(server);
let token;

describe('tests for Account controller', () => {
  describe('/POST Login user', () => {
    it('should login a registered user', (done) => {
      const user = {
        email: 'admin@gmail.com',
        password: 'admin123',
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
  });

  describe('/POST credit account', () => {
    it('should credit a specified account', (done) => {
      const transaction = {
        transactionType: 'credit',
        amount: 100,
      };
      api.post('/api/v1/transactions/0733215768/credit')
        .set('x-access-token', token)
        .send(transaction)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('transactionId');
          expect(res.body.data).to.have.property('accountNumber');
          expect(res.body.data).to.have.property('amount');
          expect(res.body.data).to.have.property('cashier');
          expect(res.body.data).to.have.property('transactionType');
          expect(res.body.data).to.have.property('accountBalance');

          done();
        });
    });
    it('should fail to credit account', (done) => {
      const transaction = {
        amount: 100,
        transactionType: 'credits',
      };
      api.post('/api/v1/transactions/0733215768/credit')
        .set('x-access-token', token)
        .send(transaction)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error[0]).to.equal('only debit or credit transaction types are allowed');
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status');
          done();
        });
    });
    it('should fail to credit account', (done) => {
      const transaction = {
        transactionType: 'credit',
      };
      api.post('/api/v1/transactions/0733215768/credit')
        .set('x-access-token', token)
        .send(transaction)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error[0]).to.equal('Amount is required');
          expect(res.body.error[1]).to.equal('Amount must be a number');
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status');
          done();
        });
    });
  });

  describe('/POST debit account', () => {
    it('should debit a specified account', (done) => {
      const transaction = {
        transactionType: 'debit',
        amount: 1,
      };
      api.post('/api/v1/transactions/0733215768/debit')
        .set('x-access-token', token)
        .send(transaction)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('transactionId');
          expect(res.body.data).to.have.property('accountNumber');
          expect(res.body.data).to.have.property('amount');
          expect(res.body.data).to.have.property('cashier');
          expect(res.body.data).to.have.property('transactionType');
          expect(res.body.data).to.have.property('accountBalance');

          done();
        });
    });
    it('should fail to debit account because of insufficient balance', (done) => {
      const transaction = {
        amount: 1000000000000000000,
        transactionType: 'debit',
      };
      api.post('/api/v1/transactions/0733215768/debit')
        .set('x-access-token', token)
        .send(transaction)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Insufficient Account Balance');
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status');
          done();
        });
    });
    it('should fail to debit account without amount provided', (done) => {
      const transaction = {
        transactionType: 'debit',
      };
      api.post('/api/v1/transactions/0733215768/credit')
        .set('x-access-token', token)
        .send(transaction)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error[0]).to.equal('Amount is required');
          expect(res.body.error[1]).to.equal('Amount must be a number');
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status');
          done();
        });
    });
  });

  describe('/GET get all Transactions', () => {
    it('should get all transaction records', (done) => {
      api.get('/api/v1/transactions')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('Array');
          done();
        });
    });
  });
});

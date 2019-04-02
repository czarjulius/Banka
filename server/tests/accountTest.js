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

  describe('/POST create account', () => {
    it('should create a new account', (done) => {
      const account = {
        type: 'current',
        passportUrl: 'www.user.png',
        amount: 100,
      };
      api.post('/api/v1/accounts')
        .set('x-access-token', token)
        .send(account)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to create a new account', (done) => {
      const account = {
        passportUrl: 'www.user.png',
        amount: 100,
      };
      api.post('/api/v1/accounts')
        .set('x-access-token', token)
        .send(account)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error[0]).to.equal('Account type is required');
          expect(res.body.error[1]).to.equal('Account type must contain only alphabets');
          expect(res.body.error[2]).to.equal('Account type cannot contain whitespaces');
          expect(res.body.error[3]).to.equal('only savings or current account types are allowed');
          done();
        });
    });
  });

  describe('/PATCh updates account status', () => {
    it('should update the account status', (done) => {
      const newStatus = {
        status: 'active',
      };
      api.post('/api/v1/account/0733215768')
        .set('x-access-token', token)
        .send(newStatus)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to Update account status', (done) => {
      const newStatus = {
        status: 'activeee',
      };
      api.post('/api/v1/account/0733215768')
        .set('x-access-token', token)
        .send(newStatus)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error[0]).to.equal('only active or dormant  are allowed');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});

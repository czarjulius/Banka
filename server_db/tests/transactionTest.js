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
  const values = ['Julius', 'Ngwu', 'julius33@gmail.com', hashedPassword, true, '08109983465', 'staff'];
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

  describe('/GET  a specific transaction by account Number', () => {
    it('should fail to fetch transaction when the number is not correct', (done) => {
      api.get(`/api/v1/accounts/${accountNumber}1/transactions`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('No Transaction created on this account yet');
          done();
        });
    });
  });
});

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
        passportUrl: 'www.user.png',
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
});

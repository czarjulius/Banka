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


async function createAdmin() {
  const query = `INSERT INTO users(firstName, lastname, email, password, isAdmin, phonenumber, type)
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING email, firstname, lastname, id`;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123Def@1', salt);
  const values = ['Julius', 'Ngwu', 'collins@gmail.com', hashedPassword, true, '08109983465', 'staff'];
  return db.query(query, values);
}

describe('tests for Admin controller', () => {
  before(async () => {
    await createAdmin();
  });
  it('should get login and return admin token', (done) => {
    const user = {
      email: 'collins@gmail.com',
      password: '123Def@1',
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

  describe('/POST create new admin', () => {
    it('should create a new admin', (done) => {
      const admin = {
        firstName: 'Julius',
        lastName: 'Ngwu',
        email: 'wisdom@gmail.com',
        password: '123Def@1',
        phoneNumber: '09088776654',
        type: 'staff',
        isAdmin: true,
      };
      api.post('/api/v1/newadmin')
        .set('x-access-token', token)
        .send(admin)
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
    it('should not create a new admin when the firstname is not provided', (done) => {
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

    it('should not create a new admin when the lastname is not provided', (done) => {
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

    it('should not create a new admin when the email is not provided', (done) => {
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

    it('should not create a new admin when the password is not provided', (done) => {
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

    it('should not create a new admin when the phone number is not provided', (done) => {
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
  });
});

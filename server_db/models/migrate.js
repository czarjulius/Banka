/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import pool from './db';

const tableQuery = async () => {
  try {
    const dropUserTable = await pool.query('DROP TABLE IF EXISTS users CASCADE;');
    const dropAcountTable = await pool.query('DROP TABLE IF EXISTS accounts CASCADE;');
    const dropTransactionTable = await pool.query('DROP TABLE IF EXISTS transactions CASCADE;');

    const userTable = await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(50) NOT NULL,
      lastNAme VARCHAR(50) NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phoneNumber VARCHAR(15) NOT NULL,
      type VARCHAR(15) DEFAULT 'user',
      isAdmin BOOLEAN DEFAULT FALSE,
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);

    const accountTable = await pool.query(`CREATE TABLE IF NOT EXISTS accounts(
      id SERIAL PRIMARY KEY,
      accountNumber numeric UNIQUE NOT NULL,
      type VARCHAR(15) NOT NULL,
      status VARCHAR(15) DEFAULT 'active',
      owner INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      balance DECIMAL(18,2) DEFAULT 0.00,
      createdOn DATE DEFAULT CURRENT_TIMESTAMP)`);

    const transactionTable = await pool.query(`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      accountNumber numeric NOT NULL,
      amount float NOT NULL,
      cashier INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type VARCHAR(15) NOT NULL,
      oldbalance DECIMAL(18,2) DEFAULT 0.00,
      newbalance DECIMAL(18,2) DEFAULT 0.00,
      createdOn DATE DEFAULT CURRENT_TIMESTAMP)`);

    const adminValues = ['admin', 'admin', 'admin@gmail.com', bcrypt.hashSync('admin123', 10), '08135778669', 'staff', 'true'];
    const admin = await pool.query('INSERT into users(firstName, lastName, email, password, phoneNumber, type, isAdmin)VALUES($1,$2,$3,$4,$5,$6,$7)', adminValues);

    const staffValues = ['staff', 'staff', 'staff@gmail.com', bcrypt.hashSync('staff123', 10), '08135778669', 'staff', 'false'];
    const staff = await pool.query('INSERT into users(firstName, lastName, email, password, phoneNumber, type, isAdmin)VALUES($1,$2,$3,$4,$5,$6,$7)', staffValues);

    console.log('All Tables Created Successfully');
  } catch (err) {
    console.log(err.stack);
    return err.stack;
  }
};

tableQuery();

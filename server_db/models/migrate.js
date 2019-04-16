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
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP)`);

    const accountTable = await pool.query(`CREATE TABLE IF NOT EXISTS accounts(
      id SERIAL PRIMARY KEY,
      accountNumber numeric UNIQUE NOT NULL,
      type VARCHAR(15) NOT NULL,
      status VARCHAR(15) DEFAULT 'active',
      owner INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      balance float DEFAULT 0.00,
      createdOn DATE DEFAULT CURRENT_TIMESTAMP)`);

    const transactionTable = await pool.query(`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      accountNumber numeric NOT NULL,
      amount float NOT NULL,
      cashier INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type VARCHAR(15) NOT NULL,
      oldbalance float DEFAULT 0.00,
      newbalance float DEFAULT 0.00,
      createdOn DATE DEFAULT CURRENT_TIMESTAMP)`);

  } catch (err) {
    console.log(err.stack);
    return err.stack;
  }
};

tableQuery();

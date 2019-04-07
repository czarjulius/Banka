[![Build Status](https://travis-ci.org/czarjulius/Banka.svg?branch=develop)](https://travis-ci.org/czarjulius/Banka)
[![Coverage Status](https://coveralls.io/repos/github/czarjulius/Banka/badge.svg?branch=develop)](https://coveralls.io/github/czarjulius/Banka?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/3bce26c1aa98277081ac/maintainability)](https://codeclimate.com/github/czarjulius/Banka/maintainability)
# Banka
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money.

### Required Features
- User (client) can sign up. 
- User (client) can login. 
- User (client) can create an account. 
- User (client) can view account transaction history. 
- User (client) can view a specific account transaction. 
- Staff (cashier) can debit user (client) account. 
- Staff (cashier) can credit user (client) account. 
- Admin/staff can view all user accounts. 
- Admin/staff can view a specific user account. 
- Admin/staff can activate or deactivate an account. 
- Admin/staff can delete a specific user account. 
- Admin can create staff and admin user accounts. 

### Optional Features

- User can reset password. 
- Integrate real time email notification upon credit/debit transaction on user account. 
- User can upload a photo to their profile. 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing
- Install Node js
- Clone the repository `https://github.com/czarjulius/Banka`
- Navigate to the location of the folder
- Run `npm install` to install dependencies
- Run `npm start` to get the app started on your local machine

## Running the tests 
### Server Side
To run tests for the server side
- Navigate to the location of the folder in your terminal
- Run `npm run test` to run app tests
- Run `npm run coverage` to run test coverage on the app

# API

- Heroku - 

 | Method | Description | Endpoints      | Role |
 | ------ | ----------- | -------------- | ---- |
 | POST |Create new user| /api/v1/auth/signup| * |
 | POST |Sign in a user | /api/v1/auth/signin| * |
 | POST |Create new account  | /api/v1/accounts| user |
 | PATCH | Update account status  | /api/v1/account/:accountNumber | Admin |
 | DELETE | Delete existing account  | /api/v1/accounts/:accountNumber | Admin |
 | POST | Debit a user account | /api/v1/transactions/:accountNumber/debit | staff |
 | POST | Credit a user account | /api/v1/transactions/:accountNumber/credit | staff |


## Built With

* https://www.pivotaltracker.com/n/projects/2319908 - Management Tool

### Client Side:

The frontend was implmented using:

- [HTML]() A standard markup language for creating websites
- [CSS]() This describes how HTML elements are to be displayed on screen
- [JAVASCRIPT](https://www.javascript.com/) A programing language of html and the web

### Backend
The backend was implemented using:

- [Node](https://nodejs.org/en/) Node Js is a Javascript runtime built on Chrome's V8 JavaScript engine
- [Express](https://expressjs.com/) Express is a minimal and flexible Node.js web application framework

## Authors

- Julius Ngwu - [Banka](https://czarjulius.github.io/Banka/)

## License
MIT License
Copyright (c) 2019 Julius Ngwu

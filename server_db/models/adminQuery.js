const staffSignup = `INSERT INTO users(firstName, lastName, email, password, phoneNumber, type, isAdmin)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING id, firstName, lastName, email, phoneNumber, type, isAdmin, registeredOn`;

const userDetails = 'SELECT * FROM users WHERE email = $1';

export { staffSignup, userDetails };

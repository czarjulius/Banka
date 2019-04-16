const userSignup = `INSERT INTO users(firstName, lastName, email, password, phoneNumber)
VALUES($1, $2, $3, $4, $5)
RETURNING id, firstName, lastName, email, phoneNumber, type, isAdmin, registeredOn`;

export default userSignup;

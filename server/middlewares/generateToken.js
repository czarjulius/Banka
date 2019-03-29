import jwt from 'jsonwebtoken';

const generateToken = (id, email, isAdmin, type) => {
  const token = jwt.sign({
    id,
    email,
    isAdmin,
    type,
  },
  process.env.SECRET_KEY, {
    expiresIn: '24h',
  });

  return token;
};

export default generateToken;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userRepository } = require('../data/auth');
let authController = {};

const jwtSecretKey = 'asdfasdfasdfa';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;
const createJwtToken = (id) => {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
};
authController.signup = async (req, res) => {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);

  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  return res.status(201).json({ token, username });
};

authController.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }

  const token = createJwtToken(user.id);
  return res.status(201).json({ token, username });
};

authController.me = async (req, res, next) => {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ token: req.token, username: user.username });
};

module.exports.authController = authController;

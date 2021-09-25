const jwt = require('jsonwebtoken');
const { userRepository } = require('../data/auth');

const AUTH_ERROR = { message: 'Authentication Error' };

const isAuth = async (req, res, next) => {
  // 인증 추가 부분
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'asdfasdfasdfa', async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    next();
  });
};

module.exports = isAuth;

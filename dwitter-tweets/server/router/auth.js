const express = require('express');
const express_error = require('express-async-errors');
const { body, param } = require('express-validator');
const { authController } = require('../controller/auth');
const validate = require(`../middleware/validator`);
const isAuth = require(`../middleware/auth`);
const { route } = require('./tweets');
const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username 은 최소 5글자 이상 문자여야 합니다'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password 은 최소 5글자 이상 문자여야 합니다'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];
// 회원가입 요청
router.post('/signup', validateSignup, authController.signup);

// 로그인 인증
router.post('/login', validateCredential, authController.login);

// 로그인 한 후 유효한지 아닌지 확인
router.get('/me', isAuth, authController.me);
module.exports = router;

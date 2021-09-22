const express = require('express');
const express_error = require('express-async-errors');
const router = express.Router();
const { tweetController } = require('../controller/tweet');
const { body, param } = require('express-validator');
const validate = require(`../middleware/validator`);
const isAuth = require(`../middleware/auth`);

//validation
// sanitization
// contract Testing:client-server

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('텍스트는 3글자 이상 입력'),
];
// GET /tweets
// Get /tweets?username="username"
router.get('/', tweetController.getTweets);
// Get /tweets/:id
router.get('/:id', isAuth, tweetController.getById);
// POST /tweets
router.post('/', validateTweet, tweetController.create);
// PUT /tweets/:id
router.put('/:id', isAuth, validateTweet, tweetController.update);
// DELETE /tweets/:id
router.delete('/:id', isAuth, tweetController.delete);

module.exports = router;

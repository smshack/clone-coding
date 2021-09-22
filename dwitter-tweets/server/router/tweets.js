const express = require('express');
const express_error = require('express-async-errors')
const router = express.Router();
const {tweetController} = require('../controller/tweet')

// GET /tweets
// Get /tweets?username="username"
router.get('/',tweetController.getTweets)
// Get /tweets/:id
router.get('/:id',tweetController.getById)
// POST /tweets
router.post('/',tweetController.create)
// PUT /tweets/:id
router.put('/:id',tweetController.update)
// DELETE /tweets/:id
router.delete('/:id',tweetController.delete)

module.exports = router;


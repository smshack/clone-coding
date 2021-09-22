const express = require('express');
const express_error = require('express-async-errors')
const router = express.Router();
const {tweetController} = require('../controller/tweet')

// GET /tweets
// Get /tweets?username="username"
router.get('/',(req,res,next)=>{
    const username = req.query.username;
    const data = username ? tweetRepository.getAllByUsername(username)
                            :tweetRepository.getAll();
    return res.status(200).json(data)

})

// Get /tweets/:id
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    const tweet = tweetRepository.getById(id)
    if(tweet){
        return res.status(200).json(tweet)
    }else{
        return res.status(404).json({message:"tweet id not found"})
    }
})
// POST /tweets
router.post('/',(req,res,next)=>{
    
    const {text,name,username} = req.body;
  
    const tweet = tweetRepository.create(text,name,username)
    return res.status(201).json(tweet)
})
// PUT /tweets/:id
router.put('/:id',(req,res,next)=>{
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweetRepository.update(id,text)
    if(tweet){
        return res.status(200).json(tweet)
    }else{
        return res.status(404).json({message:"tweet id not found"})
    }
})
// DELETE /tweets/:id
router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    tweetRepository.remove(id)
    return res.sendStatus(204)
})

module.exports = router;


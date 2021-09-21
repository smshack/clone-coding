const express = require('express');
const express_error = require('express-async-errors')
const router = express.Router();

let tweets =[
    {
        id:'1',
        text:"드림코딩 화이팅!",
        createdAt:Date.now().toString(),
        name:'Bob',
        username:'bob',
        url:"https://item.kakaocdn.net/do/62583c7d1cd73fb8a1e9fe0a5cf80ceef43ad912ad8dd55b04db6a64cddaf76d"
    },
    {
        id:'2',
        text:"안녕",
        createdAt:Date.now().toString(),
        name:'ellie',
        username:'ellie',
        url:"https://item.kakaocdn.net/do/62583c7d1cd73fb8a1e9fe0a5cf80ceef43ad912ad8dd55b04db6a64cddaf76d"
    },
];
// GET /tweets
// Get /tweets?username="username"
router.get('/',(req,res,next)=>{
    const username = req.query.username;
    const data = username ? tweets.filter(t=>t.username === username)
                            :tweets;
    return res.status(200).json(data)

})

// Get /tweets/:id
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    const tweet = tweets.find(tweet =>tweet.id ===id);
    if(tweet){
        return res.status(200).json(tweet)
    }else{
        return res.status(404).json({message:"tweet id not found"})
    }
})
// POST /tweets
router.post('/',(req,res,next)=>{
    console.log(req.body)
    const {text,name,username} = req.body;
    const tweet ={
        id:Date.now().toString(),
        text,
        createAt:new Date(),
        name,
        username,
    }
    tweets = [tweet,...tweets];
    console.log(tweet)
    return res.status(201).json(tweet)
})
// PUT /tweets/:id
router.put('/:id',(req,res,next)=>{
    const id = req.params.id;
    const text = req.body.text;
    console.log(text,id)
    const tweet = tweets.find((tweet)=>tweet.id ===id);
    if(tweet){
        tweet.text =text;
        return res.status(200).json(tweet)
    }else{
        return res.status(404).json({message:"tweet id not found"})
    }
})
// DELETE /tweets/:id
router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    console.log(id)
    tweets = tweets.filter((tweet)=>tweet.id !==id);
    return res.sendStatus(204)
})

module.exports = router;


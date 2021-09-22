const {tweetRepository} = require('../data/tweet')

let tweetController ={}
tweetController.getTweets=(req,res)=>{
    const username = req.query.username;
    const data = username ? tweetRepository.getAllByUsername(username)
                            :tweetRepository.getAll();
    return res.status(200).json(data)
}

tweetController.getById=(req,res)=>{
    const id = req.params.id;
    const tweet = tweetRepository.getById(id)
    if(tweet){
        return res.status(200).json(tweet)
    }else{
        return res.status(404).json({message:"tweet id not found"})
    }
} 

tweetController.create=(req,res)=>{
    const {text,name,username} = req.body;
  
    const tweet = tweetRepository.create(text,name,username)
    return res.status(201).json(tweet)
} 

tweetController.update=(req,res)=>{
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweetRepository.update(id,text)
    if(tweet){
        return res.status(200).json(tweet)
    }else{
        return res.status(404).json({message:"tweet id not found"})
    }
}

tweetController.delete=(req,res)=>{
    const id = req.params.id;
    tweetRepository.remove(id)
    return res.sendStatus(204)
}
// router.get('/',(req,res,next)=>{
//     const username = req.query.username;
//     const data = username ? tweetRepository.getAllByUsername(username)
//                             :tweetRepository.getAll();
//     return res.status(200).json(data)
// })

// Get /tweets/:id
// router.get('/:id',(req,res,next)=>{
//     const id = req.params.id;
//     const tweet = tweetRepository.getById(id)
//     if(tweet){
//         return res.status(200).json(tweet)
//     }else{
//         return res.status(404).json({message:"tweet id not found"})
//     }
// })
// POST /tweets
// router.post('/',(req,res,next)=>{
    
//     const {text,name,username} = req.body;
  
//     const tweet = tweetRepository.create(text,name,username)
//     return res.status(201).json(tweet)
// })
// PUT /tweets/:id
// router.put('/:id',(req,res,next)=>{
//     const id = req.params.id;
//     const text = req.body.text;
//     const tweet = tweetRepository.update(id,text)
//     if(tweet){
//         return res.status(200).json(tweet)
//     }else{
//         return res.status(404).json({message:"tweet id not found"})
//     }
// })
// DELETE /tweets/:id
// router.delete('/:id',(req,res,next)=>{
//     const id = req.params.id;
//     tweetRepository.remove(id)
//     return res.sendStatus(204)
// })
module.exports.tweetController=tweetController

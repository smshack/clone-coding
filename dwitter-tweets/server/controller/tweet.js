const { tweetRepository } = require('../data/tweet');

let tweetController = {};
tweetController.getTweets = async (req, res) => {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  return res.status(200).json(data);
};

tweetController.getById = async (req, res) => {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    return res.status(200).json(tweet);
  } else {
    return res.status(404).json({ message: 'tweet id not found' });
  }
};

tweetController.create = async (req, res) => {
  const { text, name, username } = req.body;

  const tweet = await tweetRepository.create(text, name, username);
  return res.status(201).json(tweet);
};

tweetController.update = async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(id, text);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId != req.userId) {
    return res.sendStatus(403);
  }
  const updated = await tweetRepository.update(id, text);
  return res.status(200).json(updated);

  // if (tweet) {
  //   return res.status(200).json(tweet);
  // } else {
  //   return res.status(404).json({ message: 'tweet id not found' });
  // }
};

tweetController.delete = async (req, res) => {
  const id = req.params.id;
  await tweetRepository.remove(id);
  return res.sendStatus(204);
};
// router.get('/', async (req,res,next)=>{
//     const username = req.query.username;
//     const data = username ? tweetRepository.getAllByUsername(username)
//                             :tweetRepository.getAll();
//     return res.status(200).json(data)
// })

// Get /tweets/:id
// router.get('/:id', async (req,res,next)=>{
//     const id = req.params.id;
//     const tweet = tweetRepository.getById(id)
//     if(tweet){
//         return res.status(200).json(tweet)
//     }else{
//         return res.status(404).json({message:"tweet id not found"})
//     }
// })
// POST /tweets
// router.post('/', async (req,res,next)=>{

//     const {text,name,username} = req.body;

//     const tweet = tweetRepository.create(text,name,username)
//     return res.status(201).json(tweet)
// })
// PUT /tweets/:id
// router.put('/:id', async (req,res,next)=>{
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
// router.delete('/:id', async (req,res,next)=>{
//     const id = req.params.id;
//     tweetRepository.remove(id)
//     return res.sendStatus(204)
// })
module.exports.tweetController = tweetController;

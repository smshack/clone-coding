
let tweetRepository={}
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

tweetRepository.getAll=()=>{
    return tweets;
}

tweetRepository.getAllByUsername=(username)=>{
    return tweets.filter(t=>t.username === username)
}


tweetRepository.getById =(id)=>{
    return tweets.find(tweet =>tweet.id ===id);
}

tweetRepository.create=(text,name,username)=>{
    const tweet ={
        id:Date.now().toString(),
        text,
        createAt:new Date(),
        name,
        username,
    }
    tweets = [tweet,...tweets];
    return tweet;
}

tweetRepository.update = (id,text) =>{
    const tweet = tweets.find((tweet)=>tweet.id ===id)
    if(tweet){
        tweet.text =text;
    }
    return tweet;
}

tweetRepository.remove = (id) =>{
    tweets = tweets.filter((tweet)=>tweet.id !==id);
}

module.exports.tweetRepository=tweetRepository
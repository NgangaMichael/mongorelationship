const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect('mongodb://localhost:27017/mongorelationship', {
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
});

const userSchema = new Schema({
    username: String,
    age: Number,
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);


const makeTweet = async () => {
    const user = new User({username: 'Don001', age: 27});
    const tweet1 = new Tweet({text: 'I Love man city', likes: 34});
    // associate the tweet to user 
    tweet1.user = user;
    await user.save();
    await tweet1.save();
    console.log(tweet1)
};

// makeTweet();

const addTweet = async () => {
    const user = await User.findOne({username: 'Don001'});
    const tweet2 = new Tweet({text:'Mobile developer', likes: 76465});
    // associate the tweet to user 
    tweet2.user = user;
    await tweet2.save();
    console.log(tweet2)
}

// addTweet();

const findTweet = async () => {
    const tweet = await Tweet.find({}).populate('user')
    console.log(tweet);
};

findTweet();
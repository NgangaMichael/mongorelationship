// types of relationships 
// 1. One to few 
//database connection 
const mongoose = require('mongoose');
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

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    adresses: [{
        _id: {id: false},
        city: String,
        street: String,
        county: String,

    }]
});

const User = mongoose.model('User', userSchema);
const makeUser = async () => {
    const user = new User({
        firstname: 'John Doe', 
        lastname: 'Peter parker'
    })
    user.adresses.push({
        city: 'Nairobi',
        street: 'Kimathi street',
        county: 'Nairobi',
    })
    const res = await user.save();
    console.log(res);
};

// makeUser();

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.adresses.push({
        city: 'Mombasa',
        street: 'Kondele',
        county: 'kimilili',
    })
    const res = await user.save();
    console.log(res);
};

addAddress('621a3a32edf6e8bc3df7917a');
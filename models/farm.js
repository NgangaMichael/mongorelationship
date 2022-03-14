// types of relationships 
// 1. One to many
//database connection 
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

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['spring', 'winter', 'fall', 'summer'],
    }
});

const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     {name: 'Apple mango', price: 40, season: 'summer'},
//     {name: 'Banana', price: 20, season: 'fall'},
//     {name: 'Orange', price: 100, season: 'winter'},
//     {name: 'Watermellon', price: 70, season: 'spring'},
// ]);


const farmSchema = new Schema({
    name: 'String',
    location: 'String',
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Farm = mongoose.model('Farm', farmSchema);

// const makeFarm = async () => {
//     const farm = new Farm({name: 'Oxfarm Organic', location: 'Nairobi'});
//     const Banana = await Product.findOne({name: 'Banana'});
//     farm.products.push(Banana);
//     await farm.save();
//     console.log(farm)
// }

// makeFarm();

const addProducts = async() => {
    const farm = await Farm.findOne({name:'Oxfarm Organic' });
    const grape = await Product.findOne({name:'Orange' });
    farm.products.push(grape);
    await farm.save()
    console.log(farm)
}

addProducts();

// Farm.findOne({name: 'Oxfarm Organic'}).populate('products')
// .then(farm => console.log(farm))
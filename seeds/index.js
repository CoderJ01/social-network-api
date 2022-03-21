const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const seedUsers = require('./user-seeds');
const seedThoughts = require('./thought-seeds');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/3001', {
  // useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
    console.log('================== USERS SEEDED ==================');

    await Thought.deleteMany({});
    await Thought.insertMany(seedThoughts);
    console.log('================== THOUGHTS SEEDED ==================');
}

seedDB().then(() => {
    mongoose.connection.close();
});
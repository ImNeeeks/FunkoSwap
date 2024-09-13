const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb+srv://funkoAdmin:0000@cluster0.vx2ke.mongodb.net/funkoInventory?retryWrites=true&w=majority&appName=Cluster0'
);

module.exports = mongoose.connection;
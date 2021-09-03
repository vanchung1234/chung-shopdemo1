const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/demo1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});


module.exports = mongoose
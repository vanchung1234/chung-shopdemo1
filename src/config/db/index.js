const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://chungdev:vanchung123@cluster0.pkavz.mongodb.net/demo1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});


module.exports = mongoose
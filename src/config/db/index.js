const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL || 'mongodb+srv://chungdev:vanchung123@cluster0.pkavz.mongodb.net/demo1?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;
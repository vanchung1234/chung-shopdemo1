const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.3aozg.mongodb.net/demo1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


module.exports = mongoose;
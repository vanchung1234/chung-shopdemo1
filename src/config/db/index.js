const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.3aozg.mongodb.net/demo1?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('ket noi thanh cong')
    } catch (error) {
        console.log('ket noi that bai')
    }
}

module.exports = { connect };
const mongoose = require('mongoose');

async function connect() {
    try {
     await mongoose.connect('mongodb://localhost/demo1', {
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


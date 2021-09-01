var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(8);

// định nghĩ cấu trúc user model
var userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String
    }
});

// kiểm tra password có hợp lệ không

 module.exports = mongoose.model('account', userSchema)

 
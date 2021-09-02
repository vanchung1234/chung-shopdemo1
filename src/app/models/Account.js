const mongoose = require('../../config/db/index');


// định nghĩ cấu trúc user model
var userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String
    }
});

// kiểm tra password có hợp lệ không

module.exports = mongoose.model('account', userSchema)
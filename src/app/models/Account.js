const mongoose = require('../../config/db/index');


// định nghĩ cấu trúc user model
var userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String
    },
    avatar: { type: String, default: "https://cuoixastress.com/wp-content/uploads/2021/06/anh-che-meo-41.jpg" },
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    email: { type: String },
    name: { type: String },
    city: { type: String },
    role: {
        type: String,
        default: 'user'
    },


});





// kiểm tra password có hợp lệ không


module.exports = mongoose.model('account', userSchema)
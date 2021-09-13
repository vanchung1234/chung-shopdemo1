const { Schema } = require('mongoose');
const mongoose = require('../../config/db/index');

// định nghĩ cấu trúc user model
var orderSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "account" },
    cart: { type: Object, require: true },
    name: { type: String },
    email: { type: String, require: true },
    address: { type: String, require: true },
    phone: { type: String, require: true },
    city: { type: String, require: true },
    paymentMethod: { type: String, require: true },
    time: { type: String, require: true }
}, {
    collection: 'orders'
});

module.exports = mongoose.model('order', orderSchema)
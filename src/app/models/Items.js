const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');


const item = new Schema({

    name: { type: String, required: true },
    img: { type: String, required: true },
    cost: { type: Number, required: true },
    slug: { type: String, slug: 'name', unique: true },
    type: { type: String, required: true },
    desc: { type: String, required: true },
    use: { type: String, required: true },
}, {

    timestamps: true
});


mongoose.plugin(slug)
item.plugin(mongoose_delete, {
    deleteAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('item', item);
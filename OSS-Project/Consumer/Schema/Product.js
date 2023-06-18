const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    value: {
        type: Number,
        required: true
    }
});

module.exports = Product = mongoose.model('product', ProductSchema);
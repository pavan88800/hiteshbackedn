const mongoose = require('mongoose')

const ProductSchem = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String,
        trim: true,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    categroy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categroy',
        required: true
    },

    stock: {
        type: Number,
    },

    sold: {
        type: Number,
        default: 0,
    },

    photo: {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true,
})


module.exports = mongoose.model('product', ProductSchem)
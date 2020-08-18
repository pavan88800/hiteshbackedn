const mongoose = require('mongoose');

const ProductCartSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },

    name: String,
    count: Number,
    price: Number
})

const OrderSchema = new mongoose.Schema({

    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    address: {
        type: String
    },
    update: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

const Order = mongoose.model('order', OrderSchema)
const ProductCart = mongoose.model('productCart', ProductCartSchema)


module.exports = {
    Order,
    ProductCart
}
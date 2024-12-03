const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    productId: { type: mongoose.Schema.Types.ObjectId,  
        ref: 'Product'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;

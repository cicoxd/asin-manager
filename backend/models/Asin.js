const mongoose = require('mongoose');

const asinSchema = new mongoose.Schema({
    asin: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    price: Number,
    stock: Number,
    category: String,
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Asin', asinSchema);
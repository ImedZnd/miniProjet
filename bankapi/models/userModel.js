const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cin: {
        type: String,
        required: true,
        unique: true,
        length: 8
    },
    phone: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    }
});

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        num: {
            type: String,
            length: 6,
            required: true,
            unique: true
        },
        solde: {
            type: Number,
            min: 0
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)


accountSchema.virtual('transactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'account',
});

accountSchema.virtual('totransactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'to',
});

accountSchema.set('toObject', { virtuals: true });
accountSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Account', accountSchema);
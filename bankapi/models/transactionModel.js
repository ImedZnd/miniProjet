const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account'
        },

        fromNum: {
            type: String
        },

        type: ["depot", "retrait", "virement"],
        value: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account'
        },
        toNum: {
            type: String
        },
        description: {
            type: String,
            default: "No description"
        }

    }
)



module.exports = mongoose.model('Transaction', transactionSchema);
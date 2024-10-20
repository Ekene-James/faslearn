const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const payoutSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the Instructor userID"],
        ref: "user",
    }],
    bankName: {
        required: [true, "Please enter the Bank name"],
        type: String,
    },
    accountName: {
        required: [true, "Please enter the Bank name"],
        type: String,
    },
    accountNumber: {
        required: [true, "Please enter the Bank name"],
        type: Number,
    },
    amount: {
        required: false,
        type: Number,
    },
    payed: {
        required: [true, "Please enter payed"],
        type: Boolean,
    }
}, { timestamps: true });

const Payout = mongoose.model('payout', payoutSchema);

module.exports = Payout;
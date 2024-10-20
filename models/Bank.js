const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const bankSchema = new mongoose.Schema({
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
}, { timestamps: true });

const Bank = mongoose.model('bank', bankSchema);

module.exports = Bank;
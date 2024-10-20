const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const testLogSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the user id"],
        ref: "user",
    }],
    test: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the test id"],
        ref: "test",
    }],
    result: {
        required: false,
        type: Number
    },
    total: {
        required: false,
        type: Number
    },
    completed: {
        required: false,
        type: Boolean
    },
    canceled: {
        required: false,
        type: Boolean
    }
}, { timestamps: true });

const TestLog = mongoose.model('testLog', testLogSchema);

module.exports = TestLog;
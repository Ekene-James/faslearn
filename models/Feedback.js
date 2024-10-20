const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const feedbackSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the userID"],
        ref: "user"
    }],
    content: {
        type: String,
        required: [true, "Please enter content"]
    },
    image: {
        type: Map,
        of: String,
        required: false
    },
    seen: {
        type: Boolean,
        required: [true, "Please enter if seen"]
    }
}, { timestamps: true });

const Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = Feedback;
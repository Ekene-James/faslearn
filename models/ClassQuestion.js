const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const ClassQuestionSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }],
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the course id"],
        ref: "course",
    }],
    lecture: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the lecture id"],
        ref: "lecture",
    }],
    question: {
        type: String,
        required: [true, "Please enter your question"],
    },
    respond: {
        type: String,
    },
    seen: {
        type: Boolean
    }

}, { timestamps: true });

const ClassQuestion = mongoose.model('ClassQuestion', ClassQuestionSchema);

module.exports = ClassQuestion;
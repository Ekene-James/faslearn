const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const optionsSchema = new mongoose.Schema({
    content: {
        required: [true, "Please enter the question content"],
        type: String
    },
    isCorrect: {
        required: [true, "Please enter the question content"],
        type: Boolean
    }, 
    // deleted: {
    //     required: false,
    //     type: Boolean
    // },
})

const questionsSchema = new mongoose.Schema({
    content: {
        required: [true, "Please enter the question content"],
        type: String
    },
    deleted: {
        required: false,
        type: Boolean
    },
    options: [optionsSchema]
})

const testSchema = new mongoose.Schema({
    courseId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the course id"],
        ref: "course",
    }],
    description: {
        required: [true, "Please enter description"],
        type: String
    },
    time: {
        required: [true, "Please enter time"],
        type: Number
    },
    questionsPerStudent: {
        required: [true, "Please enter questionsPerStudent"],
        type: Number
    },
    questions: [questionsSchema]
}, { timestamps: true });

const Test = mongoose.model('test', testSchema);

module.exports = Test;
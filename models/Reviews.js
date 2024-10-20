const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const reviewSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the Instructor userID"],
        ref: "user",
    }], 
    courseId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "course",
    }],
    institutionId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "institution",
    }],
    instructorId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "instructor",
    }],
    star: {
        type: Number,
        max: [20, 'Maximum characters allowed is 2 characters'],
        required: [true, "Please enter star level"]
    },
    like: {
        type: Number,
        max: [20, 'Maximum characters allowed is 2 characters'],
        required: [true, "Please enter likes"]
    },
    reviewMessage: {
        type: String,
        max: [955, 'Maximum characters allowed is 255 characters'],
        required: [true, "Please enter review message"]
    },


}, { timestamps: true });

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
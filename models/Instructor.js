const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const institutionsEmployedSchema = new mongoose.Schema({
    institutionId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "institution"
    }],
    accepted: {
        type: Boolean,
        required: true
    },
    rejected: {
        type: Boolean,
        required: true
    },
})

const instructorSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }],
    expertise: {
        type: String,
        required: false
    },
    experience: {
        type: Date,
        required: false
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "category"
    }],
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }],
    isVerified: {
        type: Boolean,
        required: true,
    },
    institutionsEmployed: [institutionsEmployedSchema]
}, {timestamps: true});

const Instructor = mongoose.model('instructor', instructorSchema);

module.exports = Instructor;
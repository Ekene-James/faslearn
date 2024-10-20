const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const affiliatedInstitutionsSchema = new mongoose.Schema({
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

const courseSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the Instructor userID"],
        ref: "user",
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "category"
    }],
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }],
    thumbnail: {
          type: Map,
          of: String, 
          required: [true, "Please upload course image"]
    },
    title: {
       type: String,
       max: [255, 'Maximum characters allowed is 255 characters'],
       required: [true, "Please enter the course title"]
    },
    whatYouLearn: {
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters'],
        required: [true, "Please enter course what you will learn"]
    },
    requirement: {
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    description: {
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters'],
        required: [true, "Please enter the course description"]
    },
    secondTitle: {
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters'],
        required: [true, "Please enter the course sub title"]
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    price: {
        type: mongoose.Decimal128,
        required: false,
    },
    visibilty: {
        type: String,
        required: [true, "Please enter the course visibilty value"]
    },
    affiliatedInstitutions: [affiliatedInstitutionsSchema]

}, {timestamps: true});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;
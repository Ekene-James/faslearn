const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const purchasedCourseSchema = new mongoose.Schema({
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the courseID"],
        ref: "course"
    }],
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the Instructor userID"],
        ref: "user",
    }],
    instructor: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }],
    reference: {
        type: String,
        required: [true, "Please enter the Paystack reference"],
    }, 
    price: {
        type: mongoose.Decimal128,
        required: [true, "Please enter the price"]
    }
}, {timestamps: true});

const PurchasedCourse = mongoose.model('purchasedCourse', purchasedCourseSchema);

module.exports = PurchasedCourse;
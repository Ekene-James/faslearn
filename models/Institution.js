const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const { isEmail } = require('validator');

const institutionSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }],
    institutionType: {
        required: [true, "Please enter institution type"],
        type: String,
    },
    institutionName: {
        type: String,
        required: [true, "Please enter institution name"],
    },
    institutionLogo: {
        type: Map,
        of: String,
        required: [true, "Please upload Logo"]
    },
    institutionLicence: {
        type: Map,
        of: String,
        required: false
    }, 
    address: {
        type: String,
        required: [true, "Please enter Institution Address"],
    }, 
    email: {
        type: String,
        required: [true, "Please enter your email"],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    }, 
    mobile: {
        type: String,
        required: [true, "Please enter your phone number"],
    },
    bio: {
        type: String,
        required: false
    },
    percent: {
        type: Number,
        required: false
    },
    isVerified: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

const Institution = mongoose.model('institution', institutionSchema);

module.exports = Institution;
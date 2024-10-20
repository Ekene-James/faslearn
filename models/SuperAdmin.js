const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const superAdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your email"],
    },
    name: {
        type: String,
        required: [true, "Please enter your name"],
    }

}, { timestamps: true });

const SuperAdmin = mongoose.model('superAdmin', superAdminSchema);

module.exports = SuperAdmin;
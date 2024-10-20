const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const notificationSchema = new mongoose.Schema({
    userFrom: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    }],
    userTo: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "user"
    }],
    type: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
        required: false,
    },
    seen: {
        type: Boolean,
        required: true,
    },

}, { timestamps: true });

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
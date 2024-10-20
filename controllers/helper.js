
const Notification = require("../models/Notification");
const axios = require('axios');
const notificationTypes = ['subsciption', 'admissionRequest', 'admissionResponse', 'employmentRequest', 'employmentResponse', 'affiliationRequest', 'affiliationResponse', 'newCourseForSubscribers', 'newCourseFroAdmission', 'purchasedCourse']


module.exports.notifyUser = async (object) => {
    const { userFrom, userTo, type, itemId } = object;
    var noitify;
    if (notificationTypes.includes(type)) {
        try {
            const notices = await Notification.find({ userTo: object.userTo, type: type, seen: true }, '_id');
            if (notices.length == 0) {
                noitify = await Notification.create({ userFrom, userTo, type, itemId, seen: false })
            } else {
                noitify = await Notification.updateOne({ userTo: userTo, type: itemId, _id: notices[0]._id }, {
                    $set: {
                        userFrom: userFrom,
                        itemId: itemId,
                        seen: true
                    }
                });
            }
            return noitify;
        } catch (err) {
            throw Error(err);
        }  
    }else{
        throw Error('invalid type');
    }
    
}


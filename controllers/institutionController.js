const User = require('../models/User');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const Institution = require('../models/Institution');
const PurchasedCourse = require("../models/PurchasedCourse");
const Helper = require("./helper");
const Course = require("../models/Course");
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
const errorController = require('./errorController');
const emailController = require('./emailController');
//console.log(process.env.SECRET_CODE);
// maximum time for jwt
const maxAge = 3 * 24 * 60 * 60;
const limit = 10;

//Create JWT
const createToken = (id, scopes) => {
    const payload = {
        id: id,
        scopes: scopes
    }
    return jwt.sign(payload, process.env.SECRET_CODE, { expiresIn: maxAge });
}

module.exports.institution_register = async (req, res) => {
    const verifyId = cryptoRandomString({ length: 30 });
    let token_name = '';
    let user = null;
    

    token_name = 'instructor_token';

    try {

        const isValid = errorController.checkInstitutionErrors(req);


        const { user_id, institutionName, institutionType, address, email, mobile, bio } = req.body;
        
        const institution = await Institution.create({
            user: user_id, institutionName: institutionName, bio: bio, institutionType: institutionType, address: address, email: email, mobile: mobile, isVerified: false,
            institutionLogo: {
                data: req.files['institutionLogo'][0].buffer.toString('base64'),
                mimetype: req.files['institutionLogo'][0].mimetype
            },
            institutionLicence: {
                data: req.files['institutionLicence'][0].buffer.toString('base64'),
                mimetype: req.files['institutionLicence'][0].mimetype
            }

        })
        
        res.status(201).json({ institution: institution });

    } catch (err) {

        const errors = err;
        res.status(400).json({ error: errors });

    }
 
}

module.exports.update_institutionInfo = async (req, res) => {

    try {

        const { institutionId, institutionName, address, email, mobile, bio } = req.body;

        const institution = await Institution.updateOne({ _id : institutionId }, { 
            $set : {
                institutionName: institutionName, bio: bio, address: address, email: email, mobile: mobile,
            }
        })
        res.status(201).json({ institution: institution, success: true });

    } catch (err) {

        const errors = err;
        res.status(400).json({ error: errors });

    }

}

module.exports.fetchSingleInstitution = async (req, res) => {
    const institutionId = req.params.id;
    try {
        //console.log("I'm here");
        const institution = await Institution.findById(institutionId, "_id user bio mobile email address isVerified institutionName institutionType createdAt");
        res.json(institution);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
} 

module.exports.fetchAllInstitution = async (req, res) => {
    //const institutionId = req.params.id;
    try { 
        //console.log("I'm here");
        const skip = parseInt(req.params.skip)
        const institution = await Institution.find({ isVerified: true }, "_id address isVerified institutionName institutionType").skip(skip).limit(limit);
        res.json(institution);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
} 

module.exports.fetchInstitutionAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const institution = await Institution.find({ user: id, isVerified: true }, "_id institutionName");
        res.json(institution);
    } catch (errors) {
        console.log(errors);
        res.status(404).json({ error: errors.message });
    }
}
 
module.exports.viewInstitutionImg = async (req, res) => {
    const id = req.params.id;
    const institution = await Institution.findById(id);
    //console.log(course);
    var b64string = institution.institutionLogo.get('data');
    var buf = Buffer.from(b64string, 'base64');
    res.writeHead(200, { "Content-type": institution.institutionLogo.get('mimetype') });
    res.end(buf);
}

module.exports.fetchAdminDashboard = async (req, res) => {
    const userId = req.params.id;
    var students, lecturers;
    try {
        var pc = await PurchasedCourse.find({ instructor: userId }, 'course');
        var courseN = await Course.find({ user: userId }, 'price');
        var adminIns = [];
        const userIns = await Institution.find({ user: userId }, "_id user")
        for (let i = 0; i < userIns.length; i++) {
            const element = userIns[i];
            adminIns.push(element._id)
        }
        lecturers = await Instructor.find({ institutionsEmployed: { $elemMatch: { institutionId: { $in: adminIns }, accepted: true, rejected: false } } }, '_id');
        students = await User.find({ admission: { $elemMatch: { institutionId: { $in: adminIns }, accepted: true, rejected: false } } }, '_id');
        res.json({ students: students.length, instructors: lecturers.length, courses: courseN.length, saleN: pc.length });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchInstitutionDashboard = async (req, res) => {
    const institutionId = req.params.id;
    var students, lecturers;
    try {
        const institude = await Institution.findById(institutionId, "_id user")
        var courseN = await Course.find({ user: institude.user }, 'price');
        var AffiliateCourse = await Course.find({ affiliatedInstitutions: { $elemMatch: { institutionId: institutionId, accepted: true, rejected: false } } }, 'price');
        var pc = await PurchasedCourse.find({ instructor: institude.user[0] }, 'course');
        lecturers = await Instructor.find({ institutionsEmployed: { $elemMatch: { institutionId: institutionId, accepted: true, rejected: false } } }, '_id');
        students = await User.find({ admission: { $elemMatch: { institutionId: institutionId, accepted: true, rejected: false } } }, '_id');
        res.json({ students: students.length, instructors: lecturers.length, courses: courseN.length, saleN: pc.length, AffiliateCourse: AffiliateCourse.length });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchAllInstitutionLecturers = async (req, res) => {
    const institutionId = req.params.id;
    try {
        const institude = await Institution.findById(institutionId, "_id user")
        var lecturers = await Instructor.find({ institutionsEmployed: { $elemMatch: { institutionId: institutionId, accepted: true, rejected: false } } }, '_id user expertise experience companyName instructorType category').populate({ path: 'user', select: "email firstName lastName address phone userType" }).populate({ path: 'category', select: "name" });
        
        res.json(lecturers);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchAllInstitutionAffiliatedCourses = async (req, res) => {
    const institutionId = req.params.id;
    try {
        const skip = parseInt(req.params.skip)
        var AffiliateCourse = await Course.find({ affiliatedInstitutions: { $elemMatch: { institutionId: institutionId, accepted: true, rejected: false } } }, '_id title category user whatYouLearn requirement description secondTitle price')
        .populate({ path: 'category', select: "_id name" })
        .populate({ path: 'user', select: "email firstName lastName address phone userType" }).limit(limit).skip(skip);

        res.json(AffiliateCourse);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchAllStudentApplications = async (req, res) => {
    const user_Id = req.params.id;
    try {
        var adminIns = [];
        const userIns = await Institution.find({ user: user_Id}, "_id user")
        for (let i = 0; i < userIns.length; i++) {
            const element = userIns[i];
            adminIns.push(element._id)
        }
        var admissions = await User.find({ admission: { $elemMatch: { institutionId: { $in: adminIns }, accepted: false, rejected: false } } }, '_id firstName lastName email address phone isBlocked bio admission')
            .populate({ path: 'admission.institutionId', select: "institutionName institutionType user" }).limit(15);
        res.json(admissions);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.manageAdmission = async (req, res) => {
    const {institutionAdminUserId, userId , admissionId, type} = req.body;
    try {
        if (type=='grant') {
            
            var details = await User.updateOne({ _id: userId, "admission._id": admissionId }, {
                $set: {
                    'admission.$.accepted': true
                }
            });
        }

        if (type=='deny') {
            var details = await User.updateOne({ _id: userId, "admission._id": admissionId }, {
                $set: {
                    'admission.$.rejected': true
                }
            });
        }

        let object = {
            userFrom: institutionAdminUserId,
            userTo: userId,
            type: 'admissionResponse',
            itemId: admissionId
        }
        Helper.notifyUser(object)

        var adminIns = [];
        const userIns = await Institution.find({ user: institutionAdminUserId }, "_id user")
        for (let i = 0; i < userIns.length; i++) {
            const element = userIns[i];
            adminIns.push(element._id)
        }
        var admissions = await User.find({ admission: { $elemMatch: { institutionId: { $in: adminIns }, accepted: false, rejected: false } } }, '_id firstName lastName email address phone isBlocked bio admission')
        .populate({ path: 'admission.institutionId', select: "institutionName institutionType user" }).limit(15);
        res.json(admissions);
        
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchAllLecturerApplications = async (req, res) => {
    const user_Id = req.params.id;
    try {
        var adminIns = [];
        const userIns = await Institution.find({ user: user_Id }, "_id user")
        for (let i = 0; i < userIns.length; i++) {
            const element = userIns[i];
            adminIns.push(element._id)
        }
        var instructors = await Instructor.find({ institutionsEmployed: { $elemMatch: { institutionId: { $in: adminIns }, accepted: false, rejected: false } } })
        .populate({ path: 'institutionsEmployed.institutionId', select: "institutionName institutionType user" })
            .populate({ path: 'user', select: "_id firstName lastName email bio" }).limit(15);
        res.json(instructors);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.manageEmployment = async (req, res) => {
    const { institutionAdminUserId, instructorId, institutionsEmployedId, type } = req.body;
    try {
        if (type == 'grant') {

            var details = await Instructor.updateOne({ _id: instructorId, "institutionsEmployed._id": institutionsEmployedId }, {
                $set: {
                    'institutionsEmployed.$.accepted': true
                }
            });
        }

        if (type == 'deny') {
            var details = await Instructor.updateOne({ _id: instructorId, "institutionsEmployed._id": institutionsEmployedId }, {
                $set: {
                    'institutionsEmployed.$.rejected': true
                }
            });
        }

        let userD = await Instructor.findById(instructorId, "user")
        let object = {
            userFrom: institutionAdminUserId,
            userTo: userD.user[0],
            type: 'employmentResponse',
            itemId: institutionsEmployedId
        }
        Helper.notifyUser(object)

        var adminIns = [];
        const userIns = await Institution.find({ user: institutionAdminUserId }, "_id user")
        for (let i = 0; i < userIns.length; i++) {
            const element = userIns[i];
            adminIns.push(element._id)
        }
        var instructors = await Instructor.find({ institutionsEmployed: { $elemMatch: { institutionId: { $in: adminIns }, accepted: false, rejected: false } } })
        .populate({ path: 'institutionsEmployed.institutionId', select: "institutionName institutionType user" })
            .populate({ path: 'user', select: "_id firstName lastName email bio" }).limit(15);
        res.json(instructors);

    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchAllInstitutionCourseAffiliations = async (req, res) => {
    const user_Id = req.params.id;
    try {
        var adminIns = [];
        const userIns = await Institution.find({ user: user_Id }, "_id user")
        for (let i = 0; i < userIns.length; i++) {
            const element = userIns[i];
            adminIns.push(element._id)
        }
        var courses = await Course.find({ affiliatedInstitutions: { $elemMatch: { institutionId: { $in: adminIns }, accepted: false, rejected: false } } }, "_id user category title visibilty price affiliatedInstitutions description secondTitle whatYouLearn requirement createdAt")
        .populate({ path: 'affiliatedInstitutions.institutionId', select: "institutionName institutionType user" })
        .populate({ path: 'user', select: "_id firstName lastName email" }).populate({ path: 'category', select: "_id name" })
            .skip(0).limit(15).sort({ createdAt: -1 });
        res.json(courses);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.manageCourseAffiliations = async (req, res) => {
    const { institutionAdminUserId, courseId, affiliatedInstitutionsId, type } = req.body;
    try {
        if (type == 'grant') {

            var details = await Course.updateOne({ _id: courseId, "affiliatedInstitutions._id": affiliatedInstitutionsId }, {
                $set: {
                    'affiliatedInstitutions.$.accepted': true
                }
            });
        }

        if (type == 'deny') {
            var details = await Course.updateOne({ _id: courseId, "affiliatedInstitutions._id": affiliatedInstitutionsId }, {
                $set: {
                    'affiliatedInstitutions.$.rejected': true
                }
            });
        }
        var cos = await Course.findById(courseId, '_id user')
        let object = {
            userFrom: institutionAdminUserId,
            userTo: cos.user[0],
            type: 'affiliationResponse',
            itemId: courseId
        }
        Helper.notifyUser(object)

        var adminIns = [];
        const userIns = await Institution.find({ user: institutionAdminUserId }, "_id user")
        for (let i = 0; i < userIns.length; i++) {
            const element = userIns[i];
            adminIns.push(element._id)
        }
        var courses = await Course.find({ affiliatedInstitutions: { $elemMatch: { institutionId: { $in: adminIns }, accepted: false, rejected: false } } }, "_id user category title visibilty price affiliatedInstitutions description secondTitle whatYouLearn requirement createdAt")
        .populate({ path: 'affiliatedInstitutions.institutionId', select: "institutionName institutionType user" })
        .populate({ path: 'user', select: "_id firstName lastName email" })
            .populate({ path: 'category', select: "_id name" }).skip(0).limit(15).sort({ createdAt: -1 });
        res.json(courses);

    } catch (errors) {
        res.status(404).json({ errors });
    }
}
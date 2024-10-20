const Instructor = require('../models/Instructor');
const User = require('../models/User');
const Student = require('../models/Student');
const SuperAdmin = require('../models/SuperAdmin');
const Category = require('../models/Category');
const Institution = require('../models/Institution');
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const Playlist = require("../models/Playlist");
const Feedback = require("../models/Feedback");
const Payout = require('../models/Payout');
const errorController = require('./errorController');
const cryptoRandomString = require('crypto-random-string');
const limit = 10;

module.exports.addSuperAdmin = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const admin = await SuperAdmin.create({ email, password, name });
        res.status(200).json(admin);
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.loginSuperAdmin = async (req, res) => {
    const { id, password } = req.body;
    try {
        const admin = await SuperAdmin.find({ _id: id}, "email password name");
        if (admin.length==0) {
            res.json({ success: false, message: "hello stranger, only admin allowed" });
        }else{
            if (admin.password == password) {
                res.json({ success: true, admin: admin, message: "welcome" });
            } else {
                res.json({ success: false, message: "invalid details" });
            }
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.fetchSuperDasboard = async (req, res) => {
    try {
        const instructors = await Instructor.find({ isVerified: true }, '_id');
        const institutions = await Institution.find({ isVerified: true }, '_id');
        const courses = await Course.find({ isApproved: true }, '_id');
        const users = await User.find({}, '_id');
        const ninstructors = await Instructor.find({ isVerified: false }, '_id');
        const ninstitutions = await Institution.find({ isVerified: false }, '_id');
        const ncourses = await Course.find({ isApproved: false }, '_id');
        const feedback = await Feedback.find({}, '_id');
        res.json({ 
            users: users.length, 
            instructors: instructors.length, 
            institutions: institutions.length, 
            courses: courses.length,
            ninstructors: ninstructors.length,
            ninstitutions: ninstitutions.length,
            ncourses: ncourses.length,
            feedback: feedback.length
        });
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }

}

module.exports.fetchAllInstructors = async (req, res) => {
    try{
        const skip = parseInt(req.params.skip);
        const instructors = await Instructor.find({}).populate({ path: 'user', select: "email firstName lastName address phone userType" }).limit(limit).skip(skip)//.sort({ createdAt: -1 });
        res.json( instructors );
    } catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchUsers = async (req, res) => {
    try {
        const skip = parseInt(req.params.skip);
        const users = await User.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
        res.json(users);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}
module.exports.fetchNewPayouts = async (req, res) => {
    try {
        const skip = parseInt(req.params.skip);
        const payouts = await Payout.find({payed: false}).sort({ createdAt: -1 }).limit(limit).skip(skip);
        res.json(payouts);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchHistoryPayouts = async (req, res) => {
    try {
        const skip = parseInt(req.params.skip);
        const payouts = await Payout.find({ payed: true }).sort({ createdAt: -1 }).limit(limit).skip(skip);
        res.json(payouts);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchFeedbacks = async (req, res) => {
    try {
        const skip = parseInt(req.params.skip);
        const payouts = await Feedback.find({ seen: false }, "_id user content seen createdAt ").sort({ createdAt: -1 }).populate({ path: 'user', select: "email firstName lastName address phone userType" }).limit(limit).skip(skip);
        res.json(payouts);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}


module.exports.markPaidPayout = async (req, res) => {
    try {
        const { payoutId, amount } = req.body
        const pay = await Payout.updateOne({ _id: payoutId }, {
            $set:{
                amount: amount,
                payed: true
            }
        })
        const payouts = await Payout.find({ payed: false }).sort({ createdAt: -1 }).limit(limit);
        res.json(payouts);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}


module.exports.fetchInstructor = async (req, res) => {
    const id = req.params.id;
    try{
        const instructor = await Instructor.findById(id).populate({ path: 'user',  select: "email firstName lastName address phone userType"});
        if(!instructor){
            res.status(404).json({ error: "User not found" });
        }
        res.json( instructor );
    }catch(errors){
        res.status(404).json({ error: "Instructor not found" });
    }
}


module.exports.fetchSingleInstitution_Admin = async (req, res) => {
    const institutionId = req.params.id;
    try {
        //console.log("I'm here");
        const institution = await Institution.findById(institutionId, "_id user bio mobile email address isVerified institutionName institutionType createdAt");
        res.json(institution);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchUnverifiedInstitution_Admin = async (req, res) => {
    try {
        const skip = parseInt(req.params.skip);
        const institution = await Institution.find({ isVerified: false}, "_id user address isVerified bio institutionName institutionType createdAt").sort({ createdAt: -1 }).limit(limit).skip(skip);
        res.json(institution);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}
module.exports.fetchVerifiedInstitution_Admin = async (req, res) => {
    try {
        const skip = parseInt(req.params.skip);
        const institution = await Institution.find({ isVerified: true }, "_id user address isVerified bio institutionName institutionType createdAt").sort({ createdAt: -1 }).limit(limit).skip(skip);
        res.json(institution);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
} 
module.exports.viewInstitutionImg_Admin = async (req, res) => {
    const id = req.params.id;
    const type = req.params.type;
    const institution = await Institution.findById(id);
    //console.log(course);
    switch (type) {
        case 'logo':
            var b64string = institution.institutionLogo.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": institution.institutionLogo.get('mimetype') });
            res.end(buf);
            break;
        case 'licence':
            var b64string = institution.institutionLicence.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": institution.institutionLicence.get('mimetype') });
            res.end(buf);
            break;
        default:
            break;
    }
}
module.exports.fetchSingleInstitution_Admin = async (req, res) => {
    const institutionId = req.params.id;
    try {
        //console.log("I'm here");
        const institution = await Institution.findById(institutionId, "_id user bio mobile email address isVerified institutionName institutionType percent createdAt");
        res.json(institution);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}
module.exports.manageVerifyInstitution_Admin = async (req, res) => {
    const {institutionId, type, percent} = req.body;
    var updatedInstitution
    try {
        switch (type) {
            case 'verify':
                updatedInstitution = await Institution.findByIdAndUpdate(institutionId, { isVerified: true, percent: percent })
                break;
            case 'block':
                updatedInstitution = await Institution.findByIdAndUpdate(institutionId, { isVerified: false })
                break;
            // case 'delete':
            //     updatedInstitution = await Institution.findByIdAndDelete(institutionId)
            //     break;
        
            default:
                break;
        }
        res.json({ success: true });
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchAllInstructor__Admin = async (req, res) => {
    try {
        const skip = parseInt(req.params.skip);
        const type = req.params.type;
        var ver = true
        if (type=='verified') {
            ver = true
        }else{
            ver = false
        }
        const instructor = await Instructor.find({ isVerified: ver }, "_id expertise experience instructorType category")
            .populate({ path: 'user', select: "email firstName lastName address phone userType" })
            .populate({ path: 'category', select: "name" }).sort({ createdAt: -1 }).limit(limit).skip(skip);
        res.json(instructor);
    } catch (errors) {
        res.status(404).json({ error: errors.message });
    }
}

module.exports.fetchInstructorDetails__Admin = async (req, res) => {
    const id = req.params.id;
    try {
        const instructor = await Instructor.find({ user: id })
            .populate({ path: 'institutionsEmployed.institutionId', select: "institutionName institutionType" })
            .populate({ path: 'user', select: "email firstName lastName address phone userType" })
            .populate({ path: 'category', select: "name" });
        res.json(instructor);
    } catch (errors) {
        res.status(404).json({ error: errors.message });
    }
}

module.exports.fetchAllCourses__Admin = async (req, res) => {
    try {
        const skip = parseInt(req.params.skip);
        const type = req.params.type;
        var ver = true
        if (type == 'verified') {
            ver = true
        } else {
            ver = false
        }
        const courses = await Course.find({ isApproved: ver}, "_id title category user whatYouLearn requirement description secondTitle price")
            .populate({ path: 'user', select: "email firstName lastName address phone userType" })
            .populate({ path: 'category', select: "_id name" }).sort({ createdAt: -1 }).limit(limit).skip(skip);
        
        res.json(courses);
        
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.viewCourse__Admin = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = await Course.findById(courseId, "_id title category user whatYouLearn requirement description secondTitle price updatedAt")
            .populate({ path: 'category', select: "name" })
            .populate({ path: 'user', select: "_id email firstName lastName address phone userType" });
        
        var modules = await getPlaylists(courseId);
        res.json({ course: course, modules: modules });
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

const getPlaylists = async (courseId) => {
    try {
        var modules = [];
        var playlists = await Playlist.find({ course: courseId }, '_id name');
        for (let index = 0; index < playlists.length; index++) {
            var module = {
                videos: []
            };
            module['sectionTitle'] = playlists[index].name;
            module['id'] = playlists[index]._id;
            const lectures = await fetchLectures(playlists[index]._id);
            module.videos = lectures;
            modules.push(module);
            ////console.log(module);
        }
        return modules
    } catch (errors) {
        throw Error(errors.message);
    }
}

const fetchLectures = async (id) => {
    try {
        const lectures = await Lecture.find({ playlist: id }, '_id title description link uri duration fileType isPreview');
        return lectures;
    } catch (err) {
        throw Error(err.message);
    }
} 

module.exports.viewCourseImg_Admin = async (req, res) => {
    const id = req.params.id;
    const course = await Course.findById(id);
    //console.log(course);
    var b64string = course.thumbnail.get('data');
    var buf = Buffer.from(b64string, 'base64');
    res.writeHead(200, { "Content-type": course.thumbnail.get('mimetype') });
    res.end(buf);
}

module.exports.fetchUserCredential__Admin = async (req, res) => {
    const id = req.params.id;
    const type = req.params.type;
    const user = await User.findById(id);
    switch (type) {
        case 'trainingLicence':
            var b64string = user.trainingLicence.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": user.trainingLicence.get('mimetype') });
            res.end(buf);
            break;
        case 'image':
            var b64string = user.image.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": user.image.get('mimetype') });
            res.end(buf);
            break;
        case 'incorporationCertificate':
            var b64string = user.incorporationCertificate.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": user.incorporationCertificate.get('mimetype') });
            res.end(buf);
            break;
        case 'Bsc':
            var b64string = user.Bsc.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": user.Bsc.get('mimetype') });
            res.end(buf);
            break;
        case 'Olevel':
            var b64string = user.Olevel.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": user.Olevel.get('mimetype') });
            res.end(buf);
            break;
        case 'cv':
            var b64string = user.cv.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": user.cv.get('mimetype') });
            res.end(buf);
            break;
        case 'signature':
            var b64string = user.signature.get('data');
            var buf = Buffer.from(b64string, 'base64');
            res.writeHead(200, { "Content-type": user.signature.get('mimetype') });
            res.end(buf);
            break;
        default:
            console.log('nothing, others not implemented')
            break;
    }

}

module.exports.manageVerifyInstructor_Admin = async (req, res) => {
    const { instructorId, type } = req.body;
    var updatedInstructor
    try {
        switch (type) {
            case 'verify':
                updatedInstructor = await Instructor.findByIdAndUpdate(instructorId, { isVerified: true })
                break;
            case 'block':
                updatedInstructor = await Instructor.findByIdAndUpdate(instructorId, { isVerified: false })
                break;
            // case 'delete':
            //     updatedInstructor = await Instructor.findByIdAndDelete(InstructorId)
            //     break;

            default:
                break;
        }
        res.json({ success: true });
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.manageVerifyCourse_Admin = async (req, res) => {
    const { courseId, actionType, courseType } = req.body;
    var updatedCourse
    try {
        switch (actionType) {
            case 'verify':
                updatedCourse = await Course.findByIdAndUpdate(courseId, { isApproved: true })
                break;
            case 'block':
                updatedCourse = await Course.findByIdAndUpdate(courseId, { isApproved: false })
                break;
            // case 'delete':
            //     updatedCourse = await Course.findByIdAndDelete(CourseId)
            //     break;
            default:
                break;
        }

        if (courseType!=null) {
            var ver = true
            if (courseType == 'verified') {
                ver = true
            } else {
                ver = false
            }
            const courses = await Course.find({ isApproved: ver }, "_id title category user whatYouLearn requirement description secondTitle price")
                .populate({ path: 'user', select: "email firstName lastName address phone userType" })
                .populate({ path: 'category', select: "_id name" }).sort({ createdAt: -1 }).limit(limit).skip(0);

            res.json(courses);
        }else{
            res.json({ success: true });
        }
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}
module.exports.markSeenFeedback_Admin = async (req, res) => {
    const feedbackId = req.params.id;
    var updatedInstructor
    try {
        updatedInstructor = await Feedback.findByIdAndUpdate(feedbackId, { seen: true })
        res.json({ success: true });
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchLecture__Admin = async (req, res) => {
    const lectureId = req.params.id;
    try {
        const lecture = await Lecture.findById(lectureId, '_id title link uri duration fileType playlist');
        res.json(lecture);
    } catch (errors) {
        res.status(404).json({ error: errors.message });
    }
}
module.exports.fetchSingleFeedback__Admin = async (req, res) => {
    const feedbackId = req.params.id;
    try {
        const feedback = await Feedback.findById(feedbackId);
        res.json(feedback);
    } catch (errors) {
        res.status(404).json({ error: errors.message });
    }
}

module.exports.viewFeedbackImg_Admin = async (req, res) => {
    const id = req.params.id;
    const feedback = await Feedback.findById(id);
    if (feedback!=null) {
        //console.log(course);
        var b64string = feedback.image.get('data');
        var buf = Buffer.from(b64string, 'base64');
        res.writeHead(200, { "Content-type": feedback.image.get('mimetype') });
        res.end(buf);
    }else{
        res.json({error: 'nothing here'})
    }
    
}






module.exports.verifyCorporateInstructor = async (req, res) => {
    const id = req.params.id;
    try{
        const updatedInstructor = await Instructor.findByIdAndUpdate(id, {isVerified: true } );
        res.json({msg: "Instructor successfully updated"});
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.blockUser = async (req, res) => {
    const id = req.params.id;
    try{
        const blockedUser = await User.findByIdAndUpdate(id, { isBlocked: true } );
        res.json({msg: "User Blocked Successfully"});
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchCorporateInstructors = async (req, res) => {
    try{
        const instructors = await Instructor.find({ instructorType: "corporate" }).populate({ path: 'user',  select: "email firstName lastName address phone userType"}).sort({ createdAt: -1 });
        res.json( instructors );
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchUser = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findById(id);
        if(!user){
            res.status(404).json({ error: "User not found" });
        }
        res.json( user );
    }catch(errors){
        res.status(404).json({ error: "User not found" });
    }
}


module.exports.fetchStudents = async (req, res) => {
    
    try{
        const students = await Student.find().populate({ path: 'user', select: "email firstName lastName address phone userType"}).sort({ createdAt: -1 });
        res.json( students );
    } catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchStudent = async (req, res) => {
    const id = req.params.id;
    try{
        const student = await Student.findById(id).populate({ path: 'user',  select: "email firstName lastName address phone userType"});
        if(!student){
            res.status(404).json({ error: "User not found" });
        }
        res.json( student );
    }catch(errors){
        res.status(404).json({ error: "Student not found" });
    }
}

module.exports.viewCertificate = async (req, res) => {
    const id = req.params.id;
    const instructor = await Instructor.findById(id);
        //console.log(instructor);
        var b64string = instructor.incorporationCertificate.get('data');
        var buf = Buffer.from(b64string, 'base64');
        res.writeHead(200, { "Content-type": instructor.incorporationCertificate.get('mimetype')});
        res.end(buf);
}

module.exports.viewLicence = async (req, res) => {
    const id = req.params.id;
    const instructor = await Instructor.findById(id);
        //console.log(instructor);
        var b64string = instructor.trainingLicence.get('data');
        var buf = Buffer.from(b64string, 'base64');
        res.writeHead(200, { "Content-type": instructor.trainingLicence.get('mimetype')});
        res.end(buf);
}

module.exports.viewCV = async (req, res) => {
    const id = req.params.id;
    const instructor = await Instructor.findById(id);
        //console.log(instructor);
        var b64string = instructor.cv.get('data');
        var buf = Buffer.from(b64string, 'base64');
        res.writeHead(200, { "Content-type": instructor.cv.get('mimetype')});
        res.end(buf);
}

module.exports.addCategory = async (req, res) => {
    const {category} = req.body;
    try{
        const newCategory = await Category.create({ name: category });
        res.status(201).json({ message: "Category Added Successfully" });
    }catch(errors){
        res.status(500).json({ error: "Error adding caregory" });
    }
}
 
module.exports.fetchCategories = async (req, res) => {
    try{
        const categories = await Category.find({}).sort({ createdAt: -1 });
        res.json(categories);
    }catch(errors){
        console.log(errors);
        res.status(404).json({ errors: errors.message });
    }
}



module.exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.body;

    try{
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        res.json(deletedCategory);
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.deleteCourse = async (req, res) => {
    const { courseId } = req.body;

    try{
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        res.json(deletedCourse);
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}
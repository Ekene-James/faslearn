const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const User = require("../models/User");
const Category = require('../models/Category');
const Playlist = require("../models/Playlist");
const PurchasedCourse = require("../models/PurchasedCourse");
const Review = require("../models/Reviews");
const ClassQuestion = require("../models/ClassQuestion");
const TestLog = require("../models/TestLog")
const Test = require("../models/Test");
const Institution = require('../models/Institution');
const Instructor = require('../models/Instructor');
const Notification = require("../models/Notification"); 
const Feedback = require("../models/Feedback");
const Helper = require("./helper");
const axios = require('axios');
const { rawListeners } = require("../models/Category");
const limit = 10;


module.exports.fetchAllCourses = async (req, res) => {
    try{
        const skip = parseInt(req.params.skip)
        const courses = await Course.find({}, "_id title category user whatYouLearn requirement description secondTitle price").populate({ path: 'user', select: "email firstName lastName address phone userType" }).populate({ path: 'category', select: "_id name" }).limit(limit).skip(skip).sort({ createdAt: -1 });
        if(courses){
            res.json(courses);
        }else{
            res.status(404).json({ errors: "Not Found" });
        }
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}
//fetching the cousres by its category
module.exports.fetchAllCategoryCourses = async (req, res) => {
    const skip = parseInt(req.params.skip)
    const category = req.params.cat
   //console.log(skip)
    var courses
    try {
        if (category=='e') {
            courses = await Course.find({}, "_id title category user whatYouLearn requirement description secondTitle price")
            .populate({ path: 'user', select: "firstName lastName" })
            .populate({ path: 'category', select: "_id name" })
            .limit(limit).skip(skip).sort({ createdAt: -1 });
        }else{
            courses = await Course.find({ category: category }, "_id title category user whatYouLearn requirement description secondTitle price")
            .populate({ path: 'user', select: "firstName lastName" })
            .populate({ path: 'category', select: "_id name" })
            .limit(limit).skip(skip).sort({ createdAt: -1 });
        }
        res.json(courses);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchRecentCourses = async (req, res) => {
    try {
        const skip = parseInt(req.params.skip)
        const courses = await Course.find({}, "_id title category user whatYouLearn requirement description secondTitle price")
            .populate({ path: 'user', select: "email firstName lastName address phone userType" })
            .sort({ createdAt: -1 })
            .populate({ path: 'category', select: "_id name" }).limit(limit).skip(skip);
        
            res.json(courses);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

// module.exports.fetchAllCourses = async (req, res) => {
//     try {
//         const courses = await Course.find({}, "_id title category user whatYouLearn requirement description secondTitle price").populate({ path: 'user', select: "email firstName lastName address phone userType" }).populate({ path: 'category', select: "name" }).sort({ createdAt: -1 });
//         if (courses) {
//             res.json(courses);
//         } else {
//             res.status(404).json({ errors: "Not Found" });
//         }
//     } catch (errors) {
//         res.status(404).json({ errors: errors.message });
//     }
// }

module.exports.fetchInstructorCourses = async (req, res) => {
    const instructorId = req.params.id;
    const skip = parseInt(req.params.skip)
    try{
        const courses = await Course.find({ user: instructorId }, "_id title category user whatYouLearn requirement description secondTitle price").populate({ path: 'user', select: "email firstName lastName address phone userType" }).populate({ path: 'category', select: "name" }).sort({ createdAt: -1 }).limit(limit).skip(skip);
        if(courses){
            res.json(courses);
        }else{
            res.status(404).json({ errors: "Not Found" });
        }
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}


module.exports.viewCourse = async (req, res) => {
    const {courseId, userId} = req.body;
    try{
        const course = await Course.findById(courseId, "_id title category user whatYouLearn requirement description secondTitle price updatedAt").populate({ path: 'category', select: "name" }).populate({ path: 'user', select: "_id firstName lastName" });
        if(!course){
            res.status(404).json({ errors: "Course not found" });
        }
        const instructor = await User.findById(course.user, "email firstName lastName address phone userType");
        var modules = await getPlaylists(courseId, userId);
        res.json({course: course, modules: modules, instructor: instructor });
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchPlaylists = async (req, res) => {
    const courseId = req.params.id;
    try{
        const courseName = await Course.findById(courseId, "title");
        var modules = await getPlaylists(courseId);
        res.json({modules, courseName: courseName.title});
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

const getPlaylists = async (courseId, userId) => {
    try{
        var modules = [];
        let lectures;
        var playlists = await Playlist.find({course: courseId}, '_id name');
        const isPurchased = PurchasedCourse.findOne({$and: [{course: courseId }, {student: userId}]}, '_id');
        for (let index = 0; index < playlists.length; index++) {
            var module = {
                videos: []
            };
            module['sectionTitle'] = playlists[index].name;
            module['id'] = playlists[index]._id;
            if(isPurchased){
                lectures = await fetchPurchasedLectures(playlists[index]._id);
            }else{
                lectures = await fetchLectures(playlists[index]._id);
            }
            module.videos = lectures;
            modules.push(module);
            ////console.log(module);
        }
        return modules
    }catch(errors){
        throw Error(errors.message);
    }
}

const fetchLectures = async (id) => {
    try{
        const lectures = await Lecture.find({playlist: id}, '_id title duration fileType isPreview');
        return lectures;
    }catch(err){
        throw Error(err.message);
    }
} 

const fetchPurchasedLectures = async (id) => {
    try{
        const lectures = await Lecture.find({ playlist: id }, '_id title link uri duration fileType isPreview');
        return lectures;
    }catch(err){
        throw Error(err.message);
    }
} 

const fetchCourse = async (courseId) => {
    try{
        const course = await Course.findById(courseId, "_id title category user whatYouLearn requirement description secondTitle price").sort({ createdAt: -1 }).populate({ path: 'category', select: "name" }).populate({ path: 'user', select: "firstName lastName" });
        return course;
    }catch(errors){
        throw Error(errors.message);
    }
}

module.exports.studentPurchasedCourses = async (req, res) => {
    const studentId = req.params.id;
    const skip = parseInt(req.params.skip)
    try{
        //console.log(studentId);
        let courses = [];
        const purchasedCourses = await PurchasedCourse.find({ student: studentId }, 'course').limit(limit).skip(skip) ;
        //console.log(purchasedCourses);
        for (let index = 0; index < purchasedCourses.length; index++) {
            let course = await fetchCourse(purchasedCourses[index].course);
            courses.push(course);
            
        }
        res.json(courses);
    }catch(error){
        console.log(error);
        res.status(404).json({ errors: error.message });
    }
}

module.exports.viewLecture = async (req, res) => {
    const lectureId = req.params.id;
    try{
        const lecture = await Lecture.findById(lectureId, '_id title link uri duration fileType playlist');
        const courseId = await Playlist.findById(lecture.playlist, 'course');
        //console.log(courseId);
        const nextLecture = await Lecture.findOne({$and: [{_id: {$gt: lectureId}}, {playlist: lecture.playlist}, {fileType: "video/mp4"}]}, '_id').sort({_id: 1});
        const previousLecture = await Lecture.findOne({$and: [{_id: {$lt: lectureId}}, {playlist: lecture.playlist}, {fileType: "video/mp4"}]} , '_id').sort({_id: -1});
        if(lecture){
            res.json({lecture, nextLecture, previousLecture, courseId: courseId.course});
        } else{
            res.status(404).json({ errors: "Not Found" });
        }  
    }catch(errors){
        res.status(404).json({ errors: "Not Found" });
    }
}

module.exports.viewLectureMaterial = async (req, res) => {
    const id = req.params.id;
    const lecture = await Lecture.findById(id);
    ////console.log(lecture);
    var b64string = lecture.material;
    var buf = Buffer.from(b64string, 'base64');
    res.writeHead(200, { "Content-type": lecture.fileType});
    res.end(buf);
}


module.exports.fetchCategories = async (req, res) => {
    try{
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.searchCourseByTitle = async (req, res) => {
    const {search} = req.body;
    try{
        const courses = await Course.find({ title: { $regex: search, $options: "i"}}, "_id title category user whatYouLearn requirement description secondTitle price").populate({ path: 'user',  select: "email firstName lastName address phone userType"}).populate({ path: 'category',  select: "name"}).sort({ createdAt: -1 });
        if(courses){
            res.json(courses);
        }else{
            res.status(404).json({ errors: "Not Found" });
        }
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}
module.exports.searchItems = async (req, res) => {
    const { search, type, skip } = req.body;
    var result
    try {
        switch (type) {
            case 'course':
                result = await Course.find({ title: { $regex: search, $options: "i" } }, "_id title category user whatYouLearn requirement description secondTitle price").populate({ path: 'user', select: "email firstName lastName address phone userType" }).populate({ path: 'category', select: "name" }).sort({ createdAt: -1 }).limit(limit).skip(skip);
                break;
            case 'instructor':
                result = await User.find({ $or: [{ firstName: { $regex: search, $options: "i" } }, { lastName: { $regex: search, $options: "i" } }] }, "_id email firstName lastName address phone userType").limit(limit).skip(skip);
                break;
            case 'institution':
                result = await Institution.find({ institutionName: { $regex: search, $options: "i" } }, "_id institutionType institutionName email address").limit(limit).skip(skip);
                break;
            default:
                break;
        }
        res.json(result);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.searchCourseByCategory =  async (req, res) => {
    const {categoryId} = req.body;
    try{
        const courses = await Course.find({ category: categoryId}).sort({ createdAt: -1 });
        if(courses){
            res.json(courses);
        }else{
            res.status(404).json({ errors: "Not Found" });
        }
    } catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.viewLectureMaterial = async (req, res) => {
    const id = req.params.id;
    const lecture = await Lecture.findById(id);
    ////console.log(lecture);
    var b64string = lecture.material;
    var buf = Buffer.from(b64string, 'base64');
    res.writeHead(200, { "Content-type": lecture.fileType});
    res.end(buf);
}

module.exports.verifyPayment = async (req, res) => {
    const {reference, userId, courseId} = req.body;
    try{
        const response = await axios.get("https://api.paystack.co/transaction/verify/" + reference, {
            headers: {
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            }
        });
        if(response.data.data.status === "success"){
            
            const ins = await Course.findById(courseId, "user price");
            const checkDuplicate = await PurchasedCourse.find({ reference: reference, student: userId, course: courseId }, "_id")
            if (checkDuplicate==0) {
                const instructorUserId = ins.user;
                const purchaseCourse = await PurchasedCourse.create({ course: courseId, student: userId, instructor: instructorUserId, reference: reference, price: ins.price });
                let object = {
                    userFrom: userId,
                    userTo: instructorUserId,
                    type: 'purchasedCourse',
                    itemId: courseId
                }
                Helper.notifyUser(object)
            }
            res.json({ status : response.data.data.status });
        
        } else{
            res.status(404).json({ "status": "failed" });
        }
    }catch(errors){
        //console.log(errors); 
        res.status(400).json(errors.message);
    }
}

module.exports.verifyPurchased = async (req, res) => {
    const {userId, courseId} = req.body;
    try{
        const isPurchased = await PurchasedCourse.findOne({$and: [{course: courseId }, {student: userId}]}, '_id');
        if(isPurchased){
            res.json({isPurchased: true});
        }else{
            res.json({isPurchased: false});
        }
    }catch(error){
        res.json({error: error.message});
    }
    
}

module.exports.fetchUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id, "firstName lastName email address phone isBlocked bio admission subscribtion socialMedia").populate({ path: 'admission.institutionId', select: "institutionName institutionType" }).populate({ path: 'subscribtion.instructorUserId', select: "firstName lastName" });
        res.json({ user });
    } catch (errors) { 
        res.status(400).json(errors);
    }
}

module.exports.submitCourseReview = async (req, res) => {
    try {
        const { user, courseId, star, like, reviewMessage } = req.body;
        const courseReview = await Review.create({ user: user, courseId: courseId, star: star, like: like, reviewMessage: reviewMessage });
        //console.log(req.body)
        const Reviews = await Review.find({ courseId: courseId }).sort({ createdAt: -1 }).limit(8).skip(0).populate({ path: 'user', select: "_id firstName lastName" });
        const stars = await Review.find({ courseId: courseId }, "star like");
        res.json({ Reviews: Reviews, stars: stars });
    } catch (error) {
        res.status(400).json({ error });
        console.log(error)
    }
}

module.exports.fetchCourseReviews = async (req, res) => {
    const courseId = req.params.id;
    const skip = parseInt(req.params.skip)
    try {
        const Reviews = await Review.find({ courseId: courseId }).sort({ createdAt: -1 }).limit(limit).skip(skip).populate({ path: 'user', select: "_id firstName lastName" });
        const stars = await Review.find({ courseId: courseId }, "star like");
        res.json({Reviews: Reviews, stars: stars});
        //console.log(courseId)
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.checkIfUserAlreadyReviewedAndFetchAll = async (req, res) => {
    const { user, id, type, skip } = req.body;
    var reviews, stars, temp;
    var alreadyReviewed = false;
    try {
        switch (type) {
            case 'instructor':
                reviews = await Review.find({ instructorId: id }).sort({ createdAt: -1 }).limit(limit).skip(skip).populate({ path: 'user', select: "_id firstName lastName" });
                stars = await Review.find({ instructorId: id }, "star like");
                temp = await Review.find({ instructorId: id, user: user })
                if (temp.length>0) {
                    alreadyReviewed = true
                }
                break;
            case 'institution':
                reviews = await Review.find({ institutionId: id }).sort({ createdAt: -1 }).limit(limit).skip(skip).populate({ path: 'user', select: "_id firstName lastName" });
                stars = await Review.find({ institutionId: id }, "star like");
                temp = await Review.find({ institutionId: id, user: user })
                if (temp.length > 0) {
                    alreadyReviewed = true
                }
                break;
            case 'course':
                reviews = await Review.find({ courseId: id }).sort({ createdAt: -1 }).limit(limit).skip(skip).populate({ path: 'user', select: "_id firstName lastName" });
                stars = await Review.find({ courseId: id }, "star like");
                temp = await Review.find({ courseId: id, user: user })
                if (temp.length > 0) {
                    alreadyReviewed = true
                }
                break;
            default:
                reviews = 'nothing';
                stars = 'nothing';
                alreadyReviewed = 'nothing';
                break;
        }
        res.json({ Reviews: reviews, stars, alreadyReviewed });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.submitReview = async (req, res) => {
    var Reviews, stars, courseReview
    var alreadyReviewed = true;
    try {
        const { user, id, star, like, reviewMessage, type } = req.body;
        switch (type) {
            case 'instructor':
                courseReview = await Review.create({ user: user, instructorId: id, institutionId: null, courseId: null, star: star, like: like, reviewMessage: reviewMessage });
                Reviews = await Review.find({ instructorId: id }).sort({ createdAt: -1 }).limit(8).skip(0).populate({ path: 'user', select: "_id firstName lastName" });
                stars = await Review.find({ instructorId: id }, "star like");
                break;
            case 'institution':
                courseReview = await Review.create({ user: user, institutionId: id, courseId: null, instructorId: null, star: star, like: like, reviewMessage: reviewMessage });
                Reviews = await Review.find({ institutionId: id }).sort({ createdAt: -1 }).limit(8).skip(0).populate({ path: 'user', select: "_id firstName lastName" });
                stars = await Review.find({ institutionId: id }, "star like");
                break;
            case 'course':
                courseReview = await Review.create({ user: user, courseId: id, instructorId: null, institutionId: null, star: star, like: like, reviewMessage: reviewMessage });
                Reviews = await Review.find({ courseId: id }).sort({ createdAt: -1 }).limit(8).skip(0).populate({ path: 'user', select: "_id firstName lastName" });
                stars = await Review.find({ courseId: id }, "star like");
                break;
        
            default:
                break;
        }
        
        res.json({ Reviews: Reviews, stars, alreadyReviewed });
    } catch (error) {
        res.status(400).json({ error });
        console.log(error)
    }
}

module.exports.fetchAllPurchaseForCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const people = await PurchasedCourse.find({ course: courseId }, "student");
        res.json({ people: people });
        //console.log(courseId)
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.AskClassQuestion = async (req, res) => {
    try {
        const { user, course, lecture, question } = req.body;
        const classQuestion = await ClassQuestion.create({ user: user, course: course, lecture: lecture, question: question, seen: false });
        //console.log(req.body)
        const Questions = await ClassQuestion.find({ lecture: lecture, respond: { $exists: true } }).sort({ createdAt: -1 }).limit(10).skip(0).populate({ path: 'user', select: "_id firstName lastName" });
        res.json(Questions);
    } catch (error) {
        res.status(400).json({ error });
        console.log(error)
    }
}

module.exports.fetchClassQuestions  = async (req, res) => {
    const lecture = req.params.id;
    const skip = parseInt(req.params.skip)
    try {
        const Questions = await ClassQuestion.find({ lecture: lecture, respond: { $exists: true } }).sort({ createdAt: -1 }).limit(limit).skip(skip).populate({ path: 'user', select: "_id firstName lastName" });
        res.json(Questions);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchAllUserAskedQuestion = async (req, res) => {
    const userId = req.params.id;
    const skip = parseInt(req.params.skip)
    var courses = [];
    var c = await PurchasedCourse.find({ student: userId }, 'course');
    for (let i = 0; i < c.length; i++) {
        const element = c[i];
        courses.push(element.course);
    }
   // console.log(userId)
    try {
        const Questions = await ClassQuestion.find({ user: userId, respond: { $exists: true }, seen: false }).sort({ createdAt: -1 }).limit(limit).skip(skip).populate({ path: 'user', select: "_id firstName lastName" });
        res.json(Questions);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchStudentDashboard = async (req, res) => {
    const userId = req.params.id;
    var institutions = 0, instructors = 0, certificates = 0
    try {
        var c = await PurchasedCourse.find({ student: userId }, 'course');
        var user = await User.findById(userId, 'admission subscribtion');
        const testLog = await TestLog.find({ user: userId });
        for (let i = 0; i < user.admission.length; i++) {
            const element = user.admission[i];
            if (element.accepted) {
                institutions++
            }
        }
        for (let i = 0; i < user.subscribtion.length; i++) {
            const element = user.subscribtion[i];
            if (!element.unsubscribe) {
                instructors++
            }
        }
        for (let i = 0; i < testLog.length; i++) {
            const element = testLog[i];
            if (element.completed) {
                certificates++
            }
        }
        res.json({ purchased: c.length, certificates: certificates, institutions: institutions, instructors: instructors }); 
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.addCategory = async (req, res) => {
    const { category } = req.body;
    try {
        const newCategory = await Category.create({ name: category });
        res.status(201).json({ message: "Category Added Successfully" });
    } catch (errors) {
        res.status(500).json({ error: "Error adding caregory" });
    }
}

module.exports.addSubCategory = async (req, res) => {
    const { categoryId, subCat } = req.body;
    try {
        const details = await Category.update({ _id: categoryId }, {
            $push: {
                subCategory: {
                    name: subCat 
                }
            }
        });
        res.status(201).json({ message: "Sub Category Added Successfully" });
    } catch (errors) {
        res.status(500).json({ error: "Error adding caregory" });
    }
}
module.exports.applyForAdmission = async (req, res) => {
    const { userId, institutionId } = req.body;
    try {
        const details = await User.updateOne({ _id: userId }, {
            $push: {
                admission: {
                    institutionId: institutionId,
                    accepted: false,
                    rejected: false
                }
            }
        });
        const Ins = await Institution.findById(institutionId, "_id user")
        let object = {
            userFrom: userId,
            userTo: Ins.user[0],
            type: 'admissionRequest',
            itemId: institutionId
        }
        Helper.notifyUser(object)
        res.status(200).json({ message: "Application Successfully" });
    } catch (errors) {
        res.status(500).json({ error: "Error applying" });
    }
}

module.exports.manageSubscription = async (req, res) => {
    const { userId, instructorUId } = req.body;
    try {
        var flag = false;
        var flag2 = false;
        var isSubscribe = false;
        var details;
        var user = await User.findById(userId, "subscribtion");
        for (let i = 0; i < user.subscribtion.length; i++) {
            const element = user.subscribtion[i];
            if (element.instructorUserId[0] == instructorUId) {
                flag = true
                if (element.unsubscribe == true) {
                    flag2 = true
                }
            }
        }
        if (flag == true) {
            if (flag2==true) {
                details = await User.updateOne({ _id: userId, "subscribtion.instructorUserId": instructorUId }, {
                    $set: {
                        'subscribtion.$.unsubscribe': false
                    }
                });
                isSubscribe = true
            }else{
                details = await User.updateOne({ _id: userId, "subscribtion.instructorUserId": instructorUId }, {
                    $set: {
                        'subscribtion.$.unsubscribe': true
                    }
                });
                isSubscribe = false
            }
        }else{
            details = await User.updateOne({ _id: userId }, {
                $push: {
                    subscribtion: {
                        instructorUserId: instructorUId,
                        unsubscribe: false
                    }
                }
            });
            isSubscribe = true
            let object ={ 
                userFrom: userId, 
                userTo: instructorUId, 
                type: 'subsciption',
                itemId: null
            }
            Helper.notifyUser(object)
        }
        res.status(200).json({ isSubscribed: isSubscribe });
    } catch (errors) {
        res.status(500).json({ error: "Error applying" });
    }
}

module.exports.checkIsUserSubscribed = async (req, res) => {
    const { userId, instructorUId } = req.body;
    try {
        var flag = false;
        var user = await User.findById(userId, "subscribtion");
        for (let i = 0; i < user.subscribtion.length; i++) {
            const element = user.subscribtion[i];
            if (element.instructorUserId[0] == instructorUId) {
                if (element.unsubscribe== false) {
                    flag = true 
                }
            }
        }
        res.status(200).json({ isSubscribed: flag });
    } catch (errors) {
        res.status(500).json({ error: "Error applying" });
    }
}

module.exports.checkIsUserInstitutionStudent = async (req, res) => {
    const { userId, institutionId } = req.body;
    try {
        var flag = false;
        var isStudent = false
        var user = await User.findById(userId, "admission");
        for (let i = 0; i < user.admission.length; i++) {
            const element = user.admission[i];
            if (element.institutionId[0] == institutionId) {
                flag = true
                if (element.accepted) {
                    isStudent = true
                }
            }
        }
        res.status(200).json({ isStudent: isStudent, isApplied: flag });
    } catch (errors) {
        res.status(500).json({ error: "Error applying" });
    }
}
module.exports.fetchTestForCourseDetails = async (req, res) => {
    const courseId = req.params.id;
    try {
        var c = await Test.find({ courseId: courseId }, "description time _id");
        res.json(c);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}
module.exports.fetchTestForStudentExamRoom = async (req, res) => {
    const courseId = req.params.id;
    try {
        var c = await Test.find({ courseId: courseId }).populate({ path: 'courseId', select: "title" });
        res.json(c);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}
module.exports.officiallyStartTest = async (req, res) => {
    const { user, test, result, total, completed, canceled } = req.body;
    try {
        var alreadyStarted = true
        var c = await TestLog.find({ user: user, test : test })
        if (c==null||c=='') {
            alreadyStarted = false
            c = await TestLog.create({ user: user, test: test, result: result, total: total, completed: completed, canceled: canceled });
        }
        res.json({ test: c, alreadyStarted: alreadyStarted});
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.checkIfUserAlreadyStartedTest = async (req, res) => {
    const { user, test} = req.body;
    try {
        var alreadyStarted = true
        var c = await TestLog.find({ user: user, test: test })
        if (c == null || c == '') {
            alreadyStarted = false
        }
        res.json({ test: c, alreadyStarted: alreadyStarted });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.manageTestLogResults = async (req, res) => {
    const { user, test, result, type} = req.body;
    var details;
    try {
        switch (type) {
            case 'submit':
                details = await TestLog.updateOne({ user: user, test: test }, {
                    $set: {
                        result: result,
                        completed: true
                    }
                });
                break;
            case 'cancel':
                details = await TestLog.updateOne({ user: user, test: test }, {
                    $set: {
                        result: result,
                        canceled: true
                    }
                });
                break;
        
            default:
                break;
        }
        var c = await Test.findById(test, "courseId")
        res.json(c);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchStudentCertificate = async (req, res) => {
    const { user, test, course } = req.body;
    try {
        const testLog = await TestLog.find({ user: user, test: test });
        const courseDetails = await Course.findById(course, "_id title user affiliatedInstitutions").populate({ path: 'affiliatedInstitutions.institutionId', select: "institutionName" }).populate({ path: 'user', select: "_id firstName lastName" });
        const userDetails = await User.findById(user, 'firstName lastName admission');
        res.json({ testLog, courseDetails, userDetails});
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchUserNotifications = async (req, res) => {
    const userId = req.params.id;
    const skip = parseInt(req.params.skip)
    try {
        const notifications = await Notification.find({ userTo: userId }, "userFrom userTo type itemId seen updatedAt").sort({ updatedAt: -1 }).limit(limit).skip(skip);
        res.json(notifications);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}
module.exports.countUnseenNotifications = async (req, res) => {
    const userId = req.params.id;
    try {
        const notifications = await Notification.find({ userTo: userId, seen: false }, "seen");
        res.json(notifications.length);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}
module.exports.countUnseenQuestions = async (req, res) => {
    const userId = req.params.id;
    try {
        var instructorCourses = [];
        const cos = await Course.find({ user: userId }, "_id user")
        for (let i = 0; i < cos.length; i++) {
            const element = cos[i];
            instructorCourses.push(element._id)
        }
        const asInstructor = await ClassQuestion.find({ course: { $in: instructorCourses }, respond: { $exists: false } }, "seen");
        const asStudent = await ClassQuestion.find({ user: userId, respond: { $exists: true }, seen: false }, "seen")
        res.json({ asInstructor: asInstructor.length, asStudent: asStudent.length});
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchSubscribtionNotification = async (req, res) => {
    const { userFrom,userTo,type,itemId, } = req.body;
    try {
        const from = await User.findById(userFrom, '_id lastName firstName');
        const subscribes = await User.find({ subscribtion: { $elemMatch: { instructorUserId: userTo, unsubscribe: false } } }, '_id')
        res.json({ from, subscribes: subscribes.length-1 });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchAdmissionRequestNotification = async (req, res) => {
    const { userFrom, userTo, type, itemId } = req.body;
    try {
        const from = await User.findById(userFrom, '_id lastName firstName');
        const institution = await Institution.findById(itemId, "_id institutionName")
        res.json({ from, institution });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchAdmissionResponseNotification = async (req, res) => {
    const { userFrom, userTo, type, itemId } = req.body;
    try {
        var institution, status, institutionn = 0
        const from = await User.findById(userFrom, '_id lastName firstName');
        const user = await User.find({ 'admission._id': itemId }, "admission")
        for (let i = 0; i < user[0].admission.length; i++) {
            const element = user[0].admission[i];
            if (element._id == itemId) {
                institution = element.institutionId
                if (element.accepted) {
                    status = "granted"  
                }
                if (element.rejected) {
                    status = "denied"
                }
            }
        }
        institutionn = await Institution.findById(institution, "_id institutionName")
        res.json({ from, institution: institutionn, status });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchEmploymentRequestNotification = async (req, res) => {
    const { userFrom, userTo, type, itemId } = req.body;
    try {
        const from = await User.findById(userFrom, '_id lastName firstName');
        const institution = await Institution.findById(itemId, "_id institutionName")
        res.json({ from, institution });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchEmploymentResponseNotification = async (req, res) => {
    const { userFrom, userTo, type, itemId } = req.body;
    try {
        var institution, status, institutionn = 0
        const from = await User.findById(userFrom, '_id lastName firstName');
        const instructor = await Instructor.find({ 'institutionsEmployed._id': itemId }, "institutionsEmployed")
        for (let i = 0; i < instructor[0].institutionsEmployed.length; i++) {
            const element = instructor[0].institutionsEmployed[i];
            if (element._id == itemId) {
                institution = element.institutionId
                if (element.accepted) {
                    status = "accepted"
                }
                if (element.rejected) {
                    status = "rejected"
                }
            }
        }
        institutionn = await Institution.findById(institution, "_id institutionName")
        res.json({ from, institution: institutionn, status });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchAffiliationRequestNotification = async (req, res) => {
    const { userFrom, userTo, type, itemId } = req.body;
    try {
        const from = await User.findById(userFrom, '_id lastName firstName');
        const course = await Course.findById(itemId, "_id title")
        res.json({ from, course });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchAffiliationResponseNotification = async (req, res) => {
    const { userFrom, userTo, type, itemId } = req.body;
    try {
        const from = await User.findById(userFrom, '_id lastName firstName');
        const course = await Course.findById(itemId, "_id title affiliatedInstitutions");
        res.json({ from, course });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchPurchasedCourseNotification = async (req, res) => {
    const { userFrom, userTo, type, itemId } = req.body;
    try {
        const from = await User.findById(userFrom, '_id lastName firstName');
        const course = await Course.findById(itemId, "_id title");
        res.json({ from, course });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchNewCourseNotification = async (req, res) => {
    const { userFrom, userTo, type, itemId } = req.body
    try {
        var notify = false;
        const from = await User.findById(userFrom, '_id lastName firstName');
        const course = await Course.findById(itemId, "_id title user");
        res.json({ from, course });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}
module.exports.seenAllNotification = async (req, res) => {
    const userId = req.params.id
    try {
        const see = await Notification.updateMany({ userTo: userId }, {
            $set: {
                seen: true
            }
        });
        res.json({ success: true });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.sendStudentFeedback = async (req, res) => {
    const { userId, content, isFilePresent } = req.body;
    var feed
    try {
        if (isFilePresent=='true') {
            feed = await Feedback.create({
                user: userId, content: content, seen: false, image: {
                    data: req.files['file'][0].buffer.toString('base64'),
                    mimetype: req.files['file'][0].mimetype
                }
            })  
        }else{
            feed = await Feedback.create({
                user: userId, content: content, seen: false
            }) 
        }
        res.json({ feed, success: true })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.fetchUserCertificates = async (req, res) => {
    const userId = req.params.id
    try {
        const certificates = await TestLog.find({ user: userId, completed: true })
            .populate({ path: 'test', select: "courseId questionsPerStudent ", populate: { path: 'courseId', select: "title" } });
        res.json(certificates);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}
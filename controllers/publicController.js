const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const User = require("../models/User");
const Review = require("../models/Reviews");
const Category = require('../models/Category');
const Playlist = require("../models/Playlist");
const SuperAdmin = require('../models/SuperAdmin');
const PurchasedCourse = require("../models/PurchasedCourse");

const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60 * 60;
//Create JWT
const createToken = (id, scopes) => {
    const payload = {
        id: id,
        scopes: scopes
    }
    return jwt.sign(payload, process.env.SECRET_CODE, { expiresIn: maxAge });
}

module.exports.loginSuperAdmin = async (req, res) => {
    const { id, password } = req.body;
    try {
        const admin = await SuperAdmin.find({ _id: id }, "_id email password name");
        if (admin.length == 0) {
            res.json({ success: false, message: "hello stranger, only admin allowed" });
        } else {
            if (admin[0].password == password) {
                const token_name = "superAdmin_token"
                const token = createToken(id, ["superAdmin", "user"]);
                //remember to add secure when in production
                res.cookie(token_name, token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.json({ success: true, token: token, admin: admin, message: "welcome" });
            } else {
                res.json({ success: false, message: "invalid details" });
            }
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.viewCourseImg = async (req, res) => {
    const id = req.params.id;
    const course = await Course.findById(id);
        //console.log(course);
        var b64string = course.thumbnail.get('data');
        var buf = Buffer.from(b64string, 'base64');
        res.writeHead(200, { "Content-type": course.thumbnail.get('mimetype')});
        res.end(buf);
}

module.exports.fetchAllCourses = async (req, res) => {
    try{
        const courses = await Course.find({}, "_id title category user whatYouLearn requirement description secondTitle price").populate({ path: 'user',  select: "email firstName lastName address phone userType"}).populate({ path: 'category',  select: "name"}).sort({ createdAt: -1 });
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
    const {courseId} = req.body; 
    try{
        const course = await Course.findById(courseId, "_id title category user whatYouLearn requirement description secondTitle price");
        if(!course){
            res.status(404).json({ errors: "Course not found" });
        }
        const instructor = await User.findById(course.user, "email firstName lastName address phone userType");
        var modules = await getPlaylists(courseId);
        res.json({course: course, modules: modules, instructor: instructor });
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

const getPlaylists = async (courseId) => {
    try{
        var modules = [];
        let lectures;
        var playlists = await Playlist.find({course: courseId}, '_id name');
        for (let index = 0; index < playlists.length; index++) {
            var module = {
                videos: []
            };
            module['sectionTitle'] = playlists[index].name;
            module['id'] = playlists[index]._id;
            lectures = await fetchLectures(playlists[index]._id);
            module.videos = lectures;
            modules.push(module);
            //console.log(module);
        }
        return modules
    }catch(errors){
        throw Error(errors.message);
    }
}

const fetchLectures = async (id) => {
    try{
        const lectures = await Lecture.find({playlist: id}, '_id title duration fileType');
        return lectures;
    }catch(err){
        throw Error(err.message);
    }
}

module.exports.fetchReviewedPublic = async (req, res) => {
    const { id, type } = req.body;
    var reviews, stars, temp;
    var alreadyReviewed = false;
    try {
        switch (type) {
            case 'instructor':
                reviews = await Review.find({ instructorId: id }).sort({ createdAt: -1 }).limit(10).skip(0).populate({ path: 'user', select: "_id firstName lastName" });
                stars = await Review.find({ instructorId: id }, "star like");
                break;
            case 'institution':
                reviews = await Review.find({ institutionId: id }).sort({ createdAt: -1 }).limit(10).skip(0).populate({ path: 'user', select: "_id firstName lastName" });
                stars = await Review.find({ institutionId: id }, "star like");
                break;
            case 'course':
                reviews = await Review.find({ courseId: id }).sort({ createdAt: -1 }).limit(10).skip(0).populate({ path: 'user', select: "_id firstName lastName" });
                stars = await Review.find({ courseId: id }, "star like");
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

module.exports.checkTotalTimeCourse = async (req, res) => {
    const courseId  = req.params.id;
    try {
        //var modules = [];
        var total = 0;
        var lectures;
        var playlists = await Playlist.find({ course: courseId }, '_id');
        for (let index = 0; index < playlists.length; index++) {
            
            lectures = await fetchLectures(playlists[index]._id);
            for (let i = 0; i < lectures.length; i++) {
                const element = lectures[i];
                if (element.fileType == 'video/mp4') {
                    total = parseInt(element.duration) + parseInt(total)
                }
            }
            
        }
        res.json((total/60).toFixed(2));
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}
module.exports.checkTotalSee = async (req, res) => {
    const courseId = req.params.id;
    try {
        const total = await PurchasedCourse.find({ course: courseId }, '_id');
        const timeCreated = await Course.find({_id: courseId}, 'createdAt')
        //console.log("totalPurchased " + totalPurchased)
        res.json({ totalPurchased: total.length, timeCreated: timeCreated[0].createdAt});
    } catch (errors) {
        res.status(500).json({ errors: errors.message });
        console.log(errors)
    }
}
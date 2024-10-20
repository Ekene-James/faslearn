const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const User = require("../models/User");
const Category = require('../models/Category');
const Playlist = require("../models/Playlist");
const PurchasedCourse = require("../models/PurchasedCourse");
const Instructor = require('../models/Instructor');
const ClassQuestion = require("../models/ClassQuestion");
const Test = require("../models/Test");
const Institution = require('../models/Institution');
const Helper = require("./helper");
const axios = require('axios');
const errorController = require('./errorController');
const { getVideoDurationInSeconds } = require('get-video-duration');
const limit = 10;

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.PERSONAL_ACCESS_TOKEN);
////console.log(process.env.SECRET_CODE);
let uri;
let link;

module.exports.createCourse = async (req, res) => {
    const { userId, title, whatYouLearn, requirement, description, secondTitle, category, subCategory, visibilty, price} = req.body;
    try{
        const course = await Course.create({ user: userId, title, whatYouLearn, requirement, description, secondTitle, category, subCategory, visibilty, thumbnail: {
            data: req.file.buffer.toString('base64'),
            mimetype: req.file.mimetype
        }, price: price, isApproved: true });
        const playlist = await Playlist.create({ course: course._id, name: 'Preview' });

        var subscribes = await User.find({ subscribtion: { $elemMatch: { instructorUserId: course.user[0], unsubscribe: false } } }, '_id');
        for (let i = 0; i < subscribes.length; i++) {
            const element = subscribes[i];
            let object = {
                userFrom: userId,
                userTo: element._id,
                type: 'newCourseForSubscribers',
                itemId: course._id
            }
            Helper.notifyUser(object)
        }
        //notify all students if user is an admin
        var adminIns = [];
        const userIns = await Institution.find({ user: userId }, "_id user")
        for (let i = 0; i < userIns.length; i++) {
            const element = userIns[i];
            adminIns.push(element._id)
        }
        var students = await User.find({ admission: { $elemMatch: { institutionId: { $in: adminIns }, accepted: true, rejected: false } } }, '_id');
        for (let i = 0; i < students.length; i++) {
            const element = students[i];
            let object = {
                userFrom: userId,
                userTo: element._id,
                type: 'newCourseFroAdmission',
                itemId: course._id
            }
            Helper.notifyUser(object)
        }

        res.status(201).json({user: course.user, title: course.title, whatYouLearn: course.whatYouLearn, description: course.description, secondTitle: course.secondTitle, category: course.category, _id: course._id, success: true});
    }catch(err){
        const errors = errorController.handleCourseErrors(err);
        res.status(404).json({ error: errors });
    }
}

module.exports.createPlaylist = async (req, res) => {
    const {courseId, name} = req.body;
    //console.log(req.body)
    try{
        const courseName = await Course.findById(courseId, "title");
        const playlist = await Playlist.create({ course: courseId, name: name });
        var modules = [];
        modules = await getPlaylists(courseId);
        res.status(201).json({modules, courseName});
    }catch(err){
        ////console.log(err);
        const errors = errorController.handlePlaylistErrors(err);
        res.status(404).json({ errors });
    }
}

module.exports.createLecture = async (req, res) => {
    req.setTimeout(21600000);
    const { playlistId, title, isPreview} = req.body;
    const fileType = req.file.mimetype
    let uri;
    let duration;
    
    try {
        const isValid = errorController.checkLectureErrors(req);
        duration = await getVideoDurationInSeconds(req.file.path);
        //console.log(duration);
        if(duration >= 1200){
            return res.status(400).json("Duration must not be more than 20 minutes"); 
        }
         client.upload(
            req.file.path,
            {
                'name': req.body.title,
                'description': '',
                'privacy': {
                    // 'view': 'disable'
                },
                "upload": {
                    "size": req.file.size
                }
            },
            function(responseUri){
                //console.log('Your video URI is ' + responseUri);
                uri = responseUri;
                //console.log("The uri " + uri);
                saveLecture(playlistId, uri, title, duration, fileType, isPreview).then(data => res.json(data));
                getVideoLink(responseUri);
            },
            function(bytes_uploaded, bytes_total){
                var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2);
                //console.log(bytes_uploaded, bytes_total, percentage + "%");
            },
            function(error){
               // console.log('Failed because: ' + error);
                throw Error("error vimeo");
            }
        );
    } catch(error){
        const errors = errorController.handleCreateLectureErrors(error); 
        res.status(404).json({ error: errors }); 
    }
}

module.exports.createMaterial = async (req, res) => {
    try{
        const { playlistId, title, isPreview} = req.body;
        ////console.log(req.file.buffer);
        const lecture = await Lecture.create({ playlist: playlistId, title, isPreview, material: req.file.buffer.toString('base64'), fileType: req.file.mimetype});
        const playlist = await Playlist.findById(playlistId).populate({ path: 'course',  select: "title"});
        //console.log(playlist);
        //var modules = await fetchLectures(playlistId);
        var modules = [];
        modules = await getPlaylists(playlist.course[0]);
        res.json(modules);
    }catch(error){
        //console.log(error);
        res.status(500).json({error: error.message}); 
    }
}

// module.exports.createMaterial = async (req, res) => {
//     try {
//         const { playlistId, title } = req.body;
//         ////console.log(req.file.buffer);
//         const lecture = await Lecture.create({ playlist: playlistId, title, material: req.file.buffer.toString('base64'), fileType: req.file.mimetype });
//         const playlist = await Playlist.findById(playlistId).populate({ path: 'course', select: "title" });
//         //console.log(playlist);
//         var modules = await getPlaylists(playlist.course);
//         res.json({ modules, courseName: playlist.course[0].title });
//     } catch (error) {
//         //console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// }

const getVideoLink = async (uri) => {
    let link;
    client.request(uri + '?fields=link', function (error, body, statusCode, headers) {
        if (error) {
        //console.log('There was an error making the request.')
        //console.log('Server reported: ' + error)
        throw Error("error vimeo");
        }
        link = body.link;
        //console.log('Your video link is: ' + link);
        updateVideoLink(link, uri);
    });
}

const updateVideoLink = async (link, uri) => {
    try{
        const updatedVideo = await Lecture.findOneAndUpdate({uri: uri}, {link});
        //console.log(updatedVideo);
    }catch(error){
        //console.log(error.message);
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



const saveLecture = async (playlistId, uri, title, duration, fileType, isPreview) => {
    try{
        const lecture = await Lecture.create({ playlist: playlistId, title, uri, duration, fileType, isPreview});
        const playlist = await Playlist.findById(playlistId).populate({ path: 'course',  select: "title"});
        var modules = [];
        modules = await getPlaylists(playlist.course[0]);
        // var modules = await getPlaylists(playlist.course);
        // return {modules, courseName: playlist.course[0].title};

        //var modules = await fetchLectures(playlistId);
        return modules;
    }catch(error){
        //console.log(error.message);
        throw Error(error.message);
    }
}

// const saveLecture = async (playlistId, uri, title, duration, fileType) => {
//     try {
//         const lecture = await Lecture.create({ playlist: playlistId, title, uri, duration, fileType })
//             .catch(err => {
//                 console.log(err)
//             });
//         //console.log(title + ' save lecture')
//         const playlist = await Playlist.findById(playlistId).populate({ path: 'course', select: "title" });
//         //console.log(title + ' save lecture after')
//         var modules = await getPlaylists(playlist.course);
//         return { modules, courseName: playlist.course[0].title };
//     } catch (error) {
//         //console.log(error.message);
//         throw Error(error.message);
//     }
// }

module.exports.fetchPlaylists = async (req, res) => {
    const courseId = req.params.id;
    try{
        const courseName = await Course.findById(courseId, "title");
        var modules = await getPlaylists(courseId);
        //console.log("modules", modules);
        //console.log("courseName", courseName);
        res.json({modules, courseName: courseName.title});
    }catch(errors){
        //console.log(errors);
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.fetchInstructorCourses = async (req, res) => {
    const instructorId = req.params.id;
    const skip = parseInt(req.params.skip)
    try{
        const courses = await Course.find({ user: instructorId }, "_id title category user whatYouLearn requirement description secondTitle price")
        .populate({ path: 'category', select: "_id name" })
        .populate({ path: 'user', select: "email firstName lastName address phone userType" })
        .limit(limit).skip(skip);
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
    const courseId = req.params.id;
    try{
        const course = await Course.findById(courseId, "_id title category user whatYouLearn requirement description secondTitle price").populate({ path: 'category', select: "_id name" });
        if(!course){
            res.status(404).json({ errors: "Course not found" });
        }
        const instructor = await User.findById(course.user);
        var modules = await getPlaylists(courseId);
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
        //console.log("modules", modules);
        //console.log("courseName", courseName);
        res.json({modules, courseName: courseName.title});
    }catch(errors){
        //console.log(errors);
        res.status(404).json({ errors: errors.message });
    }
}

const getPlaylists = async (courseId) => {
    try{
        var modules = [];
        var playlists = await Playlist.find({course: courseId}, '_id name');
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
    }catch(errors){
        throw Error(errors.message);
    }
}

const fetchLectures = async (id) => {
    try{
        const lectures = await Lecture.find({playlist: id}, '_id title description link uri duration fileType isPreview');
        return lectures;
    }catch(err){
        throw Error(err.message);
    }
}  

module.exports.playlistLectures = async (req, res) => {
    const playlistId = req.params.id;
    try {
        //console.log("I'm here");
        const lectures = await Lecture.find({ playlist: playlistId }, '_id title description link uri duration fileType');
        res.json(lectures);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
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

module.exports.fetchCategories = async (req, res) => {
    try{
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.deleteCourse = async (req, res) => {
    const  courseId = req.params.id;

    try{
        const course = await Course.findById(courseId);
        const instructorId = course.user[0]
        if(!course){
            res.status(404).json({ errors: "Not Found" });
        }
        const modules = await getPlaylists(courseId);
        for (let i = 0; i < modules.length; i++) {
            for (let j = 0; j < modules[i].videos.length; j++) {
                await removeLecture(modules[i].videos[j]._id);   
            }  
        }
        await deletePlaylists(courseId);
        await PurchasedCourse.deleteMany({course: courseId});
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        const courses = await Course.find({ user: instructorId }, "_id title category user whatYouLearn requirement description secondTitle price");
        res.json({ courses: courses});
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

const deletePlaylists = async (courseId) => {
    try{
        await Playlist.deleteMany({ course: courseId });
        return true;
    }catch(errors){
        throw Error(errors.message);
    }
}


module.exports.deletePlaylist = async (req, res) => {
    const playlistId = req.params.id;
    try{
        const playlist = await Playlist.findById(playlistId).populate({ path: 'course',  select: "title"});
        if(!playlist){
            res.status(404).json({ errors: "Not Found" });
        }
        const videos = await Lecture.find({ playlist: playlistId });
        for (let index = 0; index < videos.length; index++) {
            await removeLecture(videos[index]._id);
            
        }
        const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);
        var modules = await getPlaylists(playlist.course);
        res.json({modules, courseName: playlist.course[0].title});
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.deleteLecture = async (req, res) => {
    const lectureId  = req.params.id;

    try{
        //console.log(lectureId);
        const lecture = await Lecture.findById(lectureId);
        const courseInfo = await Playlist.findById(lecture.playlist, "_id").populate({ path: 'course',  select: "title"});
        //console.log(lecture);
        if(lecture.fileType === "video/mp4"){
            const video_id = lecture.uri.substr(8);
            const response = await axios.delete("https://api.vimeo.com/videos/" + video_id, {
                headers: {
                    "Authorization": `bearer ${process.env.PERSONAL_ACCESS_TOKEN}`,
                    "Accept": "application/vnd.vimeo.*+json;version=3.4"
                }
            });
        }
        //console.log({modules, courseName: courseInfo.course[0].title});
        const deletedLecture = await Lecture.findByIdAndDelete(lectureId);
        var modules = await getPlaylists(courseInfo.course[0]._id);
        res.json({modules, courseName: courseInfo.course[0].title});
    }catch(errors){
        res.status(404).json({ errors: errors.message });
    }
}

const removeLecture = async (lectureId) => {
    try{
        //console.log(lectureId);
        const lecture = await Lecture.findById(lectureId);
        ////console.log(lecture);
        if(lecture.fileType === "video/mp4"){
            const video_id = lecture.uri.substr(8);
            const response = await axios.delete("https://api.vimeo.com/videos/" + video_id, {
                headers: {
                    "Authorization": `bearer ${process.env.PERSONAL_ACCESS_TOKEN}`,
                    "Accept": "application/vnd.vimeo.*+json;version=3.4"
                }
            });
            //console.log(response);
        }
        const deletedLecture = await Lecture.findByIdAndDelete(lectureId);
        return true;
    }catch(errors){
        throw Error(errors.message);
    }
}

module.exports.fetchInstructor = async (req, res) => {
    const id = req.params.id;
    try{
        const instructor = await Instructor.find({ user: id, isVerified: true }, "_id expertise experience category bio user").populate({ path: 'user', select: "firstName lastName"});
        res.json(instructor); 
    }catch(errors){
        console.log(errors);
        res.status(404).json({ error: errors.message });
    }
}
module.exports.fetchInstructorDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const instructor = await Instructor.find({ user: id }).populate({ path: 'institutionsEmployed.institutionId', select: "institutionName institutionType" });
        res.json(instructor);
    } catch (errors) {
        console.log(errors);
        res.status(404).json({ error: errors.message });
    }
}

module.exports.fetchAllInstructor = async (req, res) => {
    //const id = req.params.id;
    const skip = parseInt(req.params.skip)
    try { 
        const instructor = await Instructor.find({ isVerified: true}, "_id expertise experience companyName instructorType category").limit(limit).skip(skip).populate({ path: 'user', select: "email firstName lastName address phone userType" }).populate({ path: 'category', select: "name" });
        res.json(instructor);
    } catch (errors) {
        console.log(errors);
        res.status(404).json({ error: errors.message });
    }
}
module.exports.fetchAllInstructorByCategory = async (req, res) => {
    const id = req.params.id;
    const skip = parseInt(req.params.skip)
    var instructor
    try {
        if (id=='e') {
            instructor = await Instructor.find({ isVerified: true }, "_id expertise experience companyName instructorType category").limit(limit).skip(skip).populate({ path: 'user', select: "email firstName lastName address phone userType" }).populate({ path: 'category', select: "name" });
        }else{
            instructor = await Instructor.find({ category: id, isVerified: true }, "_id expertise experience companyName instructorType category").limit(limit).skip(skip).populate({ path: 'user', select: "email firstName lastName address phone userType" }).populate({ path: 'category', select: "name" });
        }
        res.json(instructor);
    } catch (errors) {
        console.log(errors);
        res.status(404).json({ error: errors.message });
    }
}

module.exports.updateCV = async (req, res) => {
    const userId = req.params.id;

    try{
        const updatedCV = await Instructor.findOneAndUpdate({user: userId});
    }catch(errors){
        
    }
}

module.exports.fetchClassQuestionForRespond = async (req, res) => {
    const instructor = req.params.id;
    var courses = [];
    const skip = parseInt(req.params.skip)
    var c = await Course.find({ user: instructor }, '_id');
    for (let i = 0; i < c.length; i++) {
        const element = c[i];
        courses.push(element._id);
    }
    try {
        const Questions = await ClassQuestion.find({ course: { $in: courses }, respond: { $exists: false } }).sort({ createdAt: -1 }).limit(limit).skip(skip).populate({ path: 'user', select: "_id firstName lastName" });
        res.json(Questions);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}



module.exports.fetchSingleClassQuestion= async (req, res) => {
    const question_id = req.params.id;
    try {
        const Question = await ClassQuestion.findById(question_id).populate({ path: 'course', select: "title" }).populate({ path: 'lecture', select: "title" });
        res.json(Question);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.AnswerSingleClassQuestion = async (req, res) => {
    const { question_id, respond } = req.body;
    try {
        const answered = await ClassQuestion.findOneAndUpdate({ _id: question_id }, { respond, respond });
        const Question = await ClassQuestion.findById(question_id).populate({ path: 'course', select: "title" }).populate({ path: 'lecture', select: "title" });
        const instructor = Question.user[0];
        var courses = [];
        var c = await Course.find({ user: instructor }, '_id');
        for (let i = 0; i < c.length; i++) {
            const element = c[i];
            courses.push(element._id);
        }
        const AllQuestions = await ClassQuestion.find({ course: { $in: courses }, respond: { $exists: false } }).sort({ createdAt: -1 }).limit(8).skip(0).populate({ path: 'user', select: "_id firstName lastName" });
        res.json({AllQuestions, Question});
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.DeleteSingleClassQuestion = async (req, res) => {
    const question_id = req.params.id;
    try {
        const Quest = await ClassQuestion.findById(question_id).populate({ path: 'course', select: "title" }).populate({ path: 'lecture', select: "title" });
        const instructor = Quest.user[0];
        var courses = [];
        var c = await Course.find({ user: instructor }, '_id');
        for (let i = 0; i < c.length; i++) {
            const element = c[i];
            courses.push(element._id);
        }
        const Q = await ClassQuestion.findByIdAndDelete(question_id);
        //const AllQuestions = '';
        const Question = '';
        const AllQuestions = await ClassQuestion.find({ course: { $in: courses }, respond: { $exists: false } }).sort({ createdAt: -1 }).limit(8).skip(0).populate({ path: 'user', select: "_id firstName lastName" });
        
        res.json({ AllQuestions});
    } catch (errors) {
        res.status(404).json({ errors }); 
    }

}

module.exports.fetchInstructorDashboard = async (req, res) => {
    const userId = req.params.id;
    var employed = 0
    
    try {
        var pc = await PurchasedCourse.find({ instructor: userId }, 'course');
        var courseN = await Course.find({ user: userId }, 'price');
        var institutions = await Instructor.find({ user: userId }, 'institutionsEmployed')
        for (let i = 0; i < institutions[0].institutionsEmployed.length; i++) {
            const element = institutions[0].institutionsEmployed[i];
            if (element.accepted) {
                employed++ 
            }
        }
        var subscribes = await User.find({ subscribtion: { $elemMatch: { instructorUserId: userId, unsubscribe: false} } }, '_id');
        res.json({ subscribes: subscribes.length, institutions: employed, courses: courseN.length, saleN: pc.length });
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.applyForEmployment = async (req, res) => {
    const { userId, institutionId } = req.body;
    try {
        const details = await Instructor.updateOne({ user: userId }, {
            $push: {
                institutionsEmployed: {
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
            type: 'employmentRequest',
            itemId: institutionId
        }
        Helper.notifyUser(object)
        res.status(200).json({ isJobApplied: true });
    } catch (errors) {
        res.status(500).json({ error: "Error applying" });
    }
}

module.exports.checkIsLecturerAppllied = async (req, res) => {
    const { userId, institutionId } = req.body;
    try {
        var flag = false;
        var user = await Instructor.findOne({ user: userId }, "institutionsEmployed");
        for (let i = 0; i < user.institutionsEmployed.length; i++) {
            const element = user.institutionsEmployed[i];
            if (element.institutionId[0] == institutionId) {
                flag = true
            }
        }
        res.status(200).json({ isLecture: flag });
    } catch (errors) {
        res.status(500).json({ error: "Error applying" });
    }
}

module.exports.viewCourseForEdit = async (req, res) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId, "_id title category subCategory visibilty user whatYouLearn requirement description secondTitle price updatedAt affiliatedInstitutions");
        res.json(course);
    } catch (errors) {
        res.status(404).json({ errors: errors.message });
    }
}

module.exports.editCourse = async (req, res) => {
    const { courseId, title, whatYouLearn, requirement, description, secondTitle, category, subCategory, price, visibilty, isImagePresent} = req.body;
    var details;
    try {
        if (isImagePresent == 'true') {
            details = await Course.updateOne({ _id: courseId }, {
                $set: {
                    thumbnail: {
                        data: req.files['thumbnail'][0].buffer.toString('base64'),
                        mimetype: req.files['thumbnail'][0].mimetype
                    }
                }
            });
        }
        details = await Course.updateOne({ _id: courseId }, {
            $set: {
                title: title, whatYouLearn: whatYouLearn, requirement: requirement, description: description, secondTitle: secondTitle, category: category, subCategory: subCategory, price: price, visibilty: visibilty
            }
        });

        res.json({ success: true });
    } catch (err) {
        res.status(404).json({err});
    }
}

module.exports.applyCourseAffiliation = async (req, res) => {
    const { courseId, institutionIds } = req.body;
    var flag = false
    var userIns 
    try {
        var cos = await Course.find({ _id: courseId })
        for (let i = 0; i < institutionIds.length; i++) {
            const elementi = institutionIds[i];
            
            
            const details = await Course.updateOne({ _id: courseId }, {
                $push: {
                    affiliatedInstitutions: {
                        institutionId: elementi,
                        accepted: false,
                        rejected: false
                    }
                }
            });
            userIns = await Institution.findById(elementi, "_id user")
            let object = {
                userFrom: cos[0].user[0],
                userTo: userIns.user[0],
                type: 'affiliationRequest',
                itemId: courseId
            }
            Helper.notifyUser(object)
        }
        
        res.json({ isSuccess: true });
    } catch (errors) {
        res.status(500).json({ error: "Error applying" });
    }
}

module.exports.manageTest = async (req, res) => {
    const { courseId, description, time, questionsPerStudent, testId } = req.body;
    var test;
    try {
        if (testId == '') {
            test = await Test.create({ courseId, description, time, questionsPerStudent });
            res.json(test);
        }else{
            test = await Test.updateOne({ _id: testId }, {
                $set: {
                    courseId: courseId, description: description, time: time, questionsPerStudent: questionsPerStudent
                }
            })
            res.json(test);
        }
    } catch (err) {
        res.status(404).json(err);
    }
}

module.exports.fetchCourseTest = async (req, res) => {
    const courseId = req.params.id;
    try{
        const test = await Test.find({courseId: courseId})
        res.json(test)
    }catch (err){
        res.status(400).json(err)
    }
}

module.exports.manageQuestions = async (req, res) => {
    const { testId, content, questionId } = req.body;
    var uptest;
    try {
        if (questionId == '') {
            uptest = await Test.updateOne({ _id: testId }, {
                $push: {
                    questions: {
                        content: content,
                        deleted: false
                    }
                }
            })
            const test = await Test.findById( testId )
            res.json(test);
        } else {
            uptest = await Test.updateOne({ _id: testId, "questions._id": questionId }, {
                $set: {
                    'questions.$.deleted': true
                }
            });
            const testi = await Test.findById(testId)
            res.json(testi);
        }
    } catch (err) {
        res.status(404).json(err);
    }
}

module.exports.addQuestionOption = async (req, res) => {
    const { testId, content, questionId, isCorrect} = req.body;
    var uptest;
    try {
        uptest = await Test.updateOne({ _id: testId, "questions._id": questionId }, {
            $push: {
                'questions.$.options': {
                    content: content,
                    isCorrect: isCorrect
                }
            }
        });
        const testi = await Test.findById(testId)
        res.json(testi);
    } catch (err) {
        res.status(404).json(err);
    }
}

module.exports.setOptionDelete = async (req, res) => {
    const { testId,questionId,optionId } = req.body;
    var uptest;
    try {
        uptest = await Test.updateOne({ _id: testId, "questions._id": questionId, "options._id": optionId }, {
            $set: {
                'questions.options.$.deleted': true
            }
        });
        const testi = await Test.findById(testId)
        res.json(testi);
    } catch (err) {
        console.log(err)
        res.status(404).json(err);
    }
}

const { Router } = require('express');
const router = Router();
const path = require('path');
const instructorController = require('../controllers/instructorController');
//const adminController = require('../controllers/adminController');
const multer = require('multer');
var storage = multer.diskStorage({});
const uploads = multer({
    limits: {
        fileSize: 3000000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.toLowerCase().match(/\.(mp4)$/))
        return cb(new Error('Invalid file format'))
        cb(undefined, true)
    },
    storage: storage
});

const uploadImg = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg)$/))
        return cb(new Error('Invalid file format'))
        cb(undefined, true)
    }
});

const uploadMaterial = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.toLowerCase().match(/\.(pdf)$/))
        return cb(new Error('Invalid file format'))
        cb(undefined, true)
    }
});

const uploadForCourse = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg)$/))
            return cb(new Error('Invalid file format'))
        cb(undefined, true)
    }
})

var uploadFields = uploadForCourse.fields([
    { name: 'thumbnail' }
   // { name: 'previewVideo' }
]);

router.post("/createCourse", uploadImg.single('thumbnail') ,instructorController.createCourse, (err, req, res, next) => {
    console.log(err);
    res.status(400).send({errors: err.message});
});
router.post("/lecture", uploads.single('file'), instructorController.createLecture, (err, req, res, next) => {
    console.log(err);
    res.status(400).send({errors: err.message});
});

router.post("/material", uploadMaterial.single('file'), instructorController.createMaterial, (err, req, res, next) => {
    console.log(err);
    res.status(400).send({errors: err.message});
});
router.post("/playlist", instructorController.createPlaylist);
router.get("/courses/:id/:skip", instructorController.fetchInstructorCourses);
router.get("/course/:id", instructorController.viewCourse);
router.get("/playlistlectures/:id", instructorController.playlistLectures);
router.get("/lecture/:id", instructorController.viewLecture); 
router.get("/material/:id", instructorController.viewLectureMaterial);
router.delete("/lecture/:id", instructorController.deleteLecture);
router.delete("/course/:id", instructorController.deleteCourse);
router.get("/playlists/:id", instructorController.fetchPlaylists);
router.delete("/playlist/:id", instructorController.deletePlaylist);
// router.get("/certificate/:id", adminController.viewCertificate);
// router.get("/licence/:id", adminController.viewLicence);
// router.get("/cv/:id", adminController.viewCV);
router.get("/categories", instructorController.fetchCategories);
router.get("/instructor/:id", instructorController.fetchInstructor); 
router.get("/fetchInstructorDetails/:id", instructorController.fetchInstructorDetails); 
router.get("/allinstructor/:skip", instructorController.fetchAllInstructor); 
router.get("/fetchAllInstructorByCategory/:id/:skip", instructorController.fetchAllInstructorByCategory);
router.get("/fetchClassQuestionForRespond/:id/:skip", instructorController.fetchClassQuestionForRespond); 
router.get("/fetchSingleClassQuestion/:id", instructorController.fetchSingleClassQuestion); 
router.post("/AnswerSingleClassQuestion", instructorController.AnswerSingleClassQuestion );
router.delete("/DeleteSingleClassQuestion/:id", instructorController.DeleteSingleClassQuestion); 
router.get("/fetchInstructorDashboard/:id", instructorController.fetchInstructorDashboard); 
router.post("/applyForEmployment", instructorController.applyForEmployment); 
router.post("/checkIsLecturerAppllied", instructorController.checkIsLecturerAppllied); 
router.get("/viewCourseForEdit/:id", instructorController.viewCourseForEdit); 
router.post("/editCourse", uploadFields, instructorController.editCourse, (err, req, res, next) => {
    console.log(err);
    res.status(400).send({ errors: err.message });
}); 
router.post("/applyCourseAffiliation", instructorController.applyCourseAffiliation); 
router.post("/manageTest", instructorController.manageTest); 
router.get("/fetchCourseTest/:id", instructorController.fetchCourseTest);
router.post("/manageQuestions", instructorController.manageQuestions); 
router.post("/addQuestionOption", instructorController.addQuestionOption);
router.post("/setOptionDelete", instructorController.setOptionDelete);
module.exports = router;
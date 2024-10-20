const { Router } = require('express');
const router = Router();
const multer = require('multer');
const studentController = require('../controllers/studentController');
const feedbackUploads = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg)$/))
            return cb(new Error('Invalid file format'))
        cb(undefined, true)
    }
});
var feedbackField = feedbackUploads.fields([
    { name: 'file' }
]);

router.get("/Allcourses/:skip", studentController.fetchAllCourses);
router.get("/RecentCourses/:skip", studentController.fetchRecentCourses);
router.get("/CoursesByCategory/:cat/:skip", studentController.fetchAllCategoryCourses);
router.get("/myCourses/:id/:skip", studentController.studentPurchasedCourses);
router.get("/courses/:id/:skip", studentController.fetchInstructorCourses);
router.post("/course", studentController.viewCourse);
router.get("/lecture/:id", studentController.viewLecture);
router.post("/search", studentController.searchCourseByTitle); 
router.post("/searchItems", studentController.searchItems);
router.post("/verifyPayment", studentController.verifyPayment);
router.post("/verifyPurcahse", studentController.verifyPurchased);
router.get("/material/:id", studentController.viewLectureMaterial);
router.get("/singleuser/:id", studentController.fetchUser);
// router.post("/submitCourseReview", studentController.submitCourseReview);
// router.get("/fetchCourseReview/:id/:skip", studentController.fetchCourseReviews);
router.post("/AskClassQuestion", studentController.AskClassQuestion);
router.get("/fetchClassQuestions/:id/:skip", studentController.fetchClassQuestions);
router.get("/fetchAllPurchaseForCourse/:id", studentController.fetchAllPurchaseForCourse); 
router.get("/fetchAllUserAskedQuestion/:id/:skip", studentController.fetchAllUserAskedQuestion); 
router.get("/fetchStudentDashboard/:id", studentController.fetchStudentDashboard); 
router.post("/addCategory", studentController.addCategory); 
router.post("/addSubCategory", studentController.addSubCategory); 
router.post("/applyForAdmission", studentController.applyForAdmission);
router.post("/manageSubscription", studentController.manageSubscription);
router.post("/checkIsUserSubscribed", studentController.checkIsUserSubscribed); 
router.post("/checkIsUserInstitutionStudent", studentController.checkIsUserInstitutionStudent);
router.get("/fetchTestForCourseDetails/:id", studentController.fetchTestForCourseDetails); 
router.get("/fetchTestForStudentExamRoom/:id", studentController.fetchTestForStudentExamRoom); 
router.post("/officiallyStartTest", studentController.officiallyStartTest); 
router.post("/manageTestLogResults", studentController.manageTestLogResults);
router.post("/checkIfUserAlreadyStartedTest", studentController.checkIfUserAlreadyStartedTest); 
router.post("/fetchStudentCertificate", studentController.fetchStudentCertificate); 
router.post("/checkIfUserAlreadyReviewedAndFetchAll", studentController.checkIfUserAlreadyReviewedAndFetchAll); 
router.post("/submitReview", studentController.submitReview); 
router.get("/fetchUserNotifications/:id/:skip", studentController.fetchUserNotifications);
router.get("/countUnseenNotifications/:id", studentController.countUnseenNotifications); 
router.get("/countUnseenQuestions/:id", studentController.countUnseenQuestions); 
router.post("/fetchSubscribtionNotification", studentController.fetchSubscribtionNotification);
router.post("/fetchAdmissionRequestNotification", studentController.fetchAdmissionRequestNotification);
router.post("/fetchAdmissionResponseNotification", studentController.fetchAdmissionResponseNotification);
router.post("/fetchEmploymentRequestNotification", studentController.fetchEmploymentRequestNotification);
router.post("/fetchEmploymentResponseNotification", studentController.fetchEmploymentResponseNotification); 
router.post("/fetchAffiliationRequestNotification", studentController.fetchAffiliationRequestNotification);
router.post("/fetchAffiliationResponseNotification", studentController.fetchAffiliationResponseNotification); 
router.post("/fetchPurchasedCourseNotification", studentController.fetchPurchasedCourseNotification); 
router.post("/fetchNewCourseNotification", studentController.fetchNewCourseNotification); 
router.get("/seenAllNotification/:id", studentController.seenAllNotification); 
router.post("/sendStudentFeedback", feedbackField, studentController.sendStudentFeedback);
router.get("/fetchUserCertificates/:id", studentController.fetchUserCertificates);
module.exports = router;
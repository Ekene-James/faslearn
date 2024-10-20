const { Router } = require('express');
const router = Router();
const superAdminController = require('../controllers/superAdminController');
const authController = require('../controllers/authController');

router.post("/addSuperAdmin", superAdminController.addSuperAdmin);
router.post("/loginSuperAdmin", superAdminController.loginSuperAdmin); 
router.get("/fetchSuperDasboard", superAdminController.fetchSuperDasboard);
router.get("/instructors/:skip", superAdminController.fetchAllInstructors);
router.get("/users/:skip", superAdminController.fetchUsers);
router.get("/SA/calculateUserPayouts/:id", authController.calculateUserPayouts);
router.get("/fetchNewPayouts/:skip", superAdminController.fetchNewPayouts);
router.get("/fetchHistoryPayouts/:skip", superAdminController.fetchHistoryPayouts); 
router.post("/markPaidPayout", superAdminController.markPaidPayout); 
router.get("/fetchFeedbacks/:skip", superAdminController.fetchFeedbacks); 
router.get("/fetchUnverifiedInstitution_Admin/:skip", superAdminController.fetchUnverifiedInstitution_Admin);
router.get("/fetchVerifiedInstitution_Admin/:skip", superAdminController.fetchVerifiedInstitution_Admin);
router.get("/fetchSingleInstitution_Admin/:id", superAdminController.fetchSingleInstitution_Admin);
router.get("/viewInstitutionImg_Admin/:id/:type", superAdminController.viewInstitutionImg_Admin); 
router.post("/manageVerifyInstitution_Admin", superAdminController.manageVerifyInstitution_Admin);
router.get("/fetchAllInstructor__Admin/:type/:skip", superAdminController.fetchAllInstructor__Admin);
router.get("/fetchInstructorDetails__Admin/:id", superAdminController.fetchInstructorDetails__Admin);
router.get("/fetchAllCourses__Admin/:type/:skip", superAdminController.fetchAllCourses__Admin);
router.get("/viewCourse__Admin/:courseId", superAdminController.viewCourse__Admin);
router.get("/fetchUserCredential__Admin/:id/:type", superAdminController.fetchUserCredential__Admin);
router.post("/manageVerifyInstructor_Admin", superAdminController.manageVerifyInstructor_Admin);
router.post("/manageVerifyCourse_Admin", superAdminController.manageVerifyCourse_Admin);
router.get("/viewCourseImg_Admin/:id", superAdminController.viewCourseImg_Admin); 
router.get("/fetchLecture__Admin/:id", superAdminController.fetchLecture__Admin); 
router.get("/fetchSingleFeedback__Admin/:id", superAdminController.fetchSingleFeedback__Admin); 
router.get("/markSeenFeedback_Admin/:id", superAdminController.markSeenFeedback_Admin);  
router.get("/viewFeedbackImg_Admin/:id", superAdminController.viewFeedbackImg_Admin);



router.get("/corporates", superAdminController.fetchCorporateInstructors);
router.get("/students", superAdminController.fetchStudents);
router.get("/instructor/:id", superAdminController.fetchInstructor);
router.get("/user/:id", superAdminController.fetchUser);
router.get("/student/:id", superAdminController.fetchStudent);
router.get("/block/:id", superAdminController.blockUser);
router.get("/verify/:id", superAdminController.verifyCorporateInstructor);
router.get("/instructor/certificate/:id", superAdminController.viewCertificate);
router.get("/instructor/licence/:id", superAdminController.viewLicence);
router.post("/addCategory", superAdminController.addCategory);
router.get("/categories", superAdminController.fetchCategories);

// router.post("/register", superAdminController.registerAdmin);


module.exports = router;

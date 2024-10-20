const { Router } = require('express');
const router = Router();
const publicController = require('../controllers/publicController');
const instructorController = require('../controllers/instructorController');
const studentController = require('../controllers/studentController');
const institutionController = require('../controllers/institutionController');
const authController = require('../controllers/authController');

router.get("/courseImage/:id", publicController.viewCourseImg);
router.get("/courses", publicController.fetchAllCourses);
router.post("/course", publicController.viewCourse);
router.post("/fetchReviewedPublic", publicController.fetchReviewedPublic);
router.post("/loginSuperAdmin", publicController.loginSuperAdmin); 

//instructors
router.get("/courses__public/:id/:skip", instructorController.fetchInstructorCourses);
router.get("/course__public/:id", instructorController.viewCourse);
router.get("/playlistlectures__public/:id", instructorController.playlistLectures);
router.get("/instructor__public/:id", instructorController.fetchInstructor);
router.get("/fetchInstructorDetails__public/:id", instructorController.fetchInstructorDetails);
router.get("/allinstructor__public/:skip", instructorController.fetchAllInstructor);
router.get("/fetchAllInstructorByCategory__public/:id/:skip", instructorController.fetchAllInstructorByCategory);
router.get("/categories__public", instructorController.fetchCategories);

//student
router.get("/RecentCourses__public/:skip", studentController.fetchRecentCourses);
router.get("/CoursesByCategory__public/:cat/:skip", studentController.fetchAllCategoryCourses);
router.get("/courses__public/:id/:skip", studentController.fetchInstructorCourses);
router.post("/searchItems__public", studentController.searchItems);
router.get("/checkTotalTimeCourse/:id", publicController.checkTotalTimeCourse); 
router.get("/checkTotalSee/:id", publicController.checkTotalSee);

//institutions
router.get("/getOneInstitution__public/:id", institutionController.fetchSingleInstitution);
router.get("/checkInstitution__public/:id", institutionController.fetchInstitutionAdmin);
router.get("/getAllInstitution__public/:skip", institutionController.fetchAllInstitution);
router.get("/institutionImage__public/:id", institutionController.viewInstitutionImg); 
router.get("/fetchAllInstitutionAffiliatedCourses__public/:id/:skip", institutionController.fetchAllInstitutionAffiliatedCourses);

//authentication
router.post("/registerStudent__public", authController.student_signup_post);
router.post("/login__public", authController.login_post);
router.get("/fetchProfileImage__public/:id", authController.fetchProfileImage);

module.exports = router;
const { Router } = require('express');
const multer = require('multer');
const uploads = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(pdf|png|jpg|jpeg)$/))
            return cb(new Error('Invalid file format'))
        cb(undefined, true)
    }
})


const institutionController = require('../controllers/institutionController');

const router = Router();
var uploadFields = uploads.fields([
    { name: 'institutionLogo' },
    { name: 'institutionLicence' }
]);


router.post("/registerInstitution", uploadFields, institutionController.institution_register, (err, req, res, next) => {
    console.log(err);
    res.status(400).send({ errors: err.message });
}); 
router.post("/update_institutionInfo", institutionController.update_institutionInfo);
router.get("/getOneInstitution/:id", institutionController.fetchSingleInstitution);
router.get("/checkInstitution/:id", institutionController.fetchInstitutionAdmin);
router.get("/getAllInstitution/:skip", institutionController.fetchAllInstitution);
router.get("/institutionImage/:id", institutionController.viewInstitutionImg); 
router.get("/fetchAdminDashboard/:id", institutionController.fetchAdminDashboard); 
router.get("/fetchAllStudentApplications/:id", institutionController.fetchAllStudentApplications);
router.post("/manageAdmission", institutionController.manageAdmission); 
router.get("/fetchAllLecturerApplications/:id", institutionController.fetchAllLecturerApplications);
router.post("/manageEmployment", institutionController.manageEmployment); 
router.get("/fetchAllInstitutionCourseAffiliations/:id", institutionController.fetchAllInstitutionCourseAffiliations);
router.post("/manageCourseAffiliations", institutionController.manageCourseAffiliations); 
router.get("/fetchInstitutionDashboard/:id", institutionController.fetchInstitutionDashboard); 
router.get("/fetchAllInstitutionLecturers/:id", institutionController.fetchAllInstitutionLecturers);
router.get("/fetchAllInstitutionAffiliatedCourses/:id/:skip", institutionController.fetchAllInstitutionAffiliatedCourses);
module.exports = router;
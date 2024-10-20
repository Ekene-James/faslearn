const { Router } = require('express');
const multer = require('multer');
const uploads = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.toLowerCase().match(/\.(pdf)$/))
        return cb(new Error('Invalid file format'))
        cb(undefined, true)
    }
})

const profileUploads = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(pdf|png|jpg|jpeg)$/))
            return cb(new Error('Invalid file format'))
        cb(undefined, true)
    }
})

const authController = require('../controllers/authController');

const router = Router();
var uploadFields = uploads.fields([
    {name: 'cv'},
    {name: 'trainingLicence'},
    {name: 'incorporationCertificate'},
]);
var profileFields = profileUploads.fields([
    { name: 'file' }
]);

router.post("/registerStudent", authController.student_signup_post);
router.post("/registerInstructor", authController.instructor_signup_post);
router.post("/user_update_account", authController.user_update_account);
router.post("/login", authController.login_post);
router.get("/:verifyId", authController.verify_email_get);
router.post("/resendLink", authController.resendVerificationLink);
router.get("/pdf/:id", authController.pdf);
router.post("/getCurrentUser", authController.getCurrentUser);
router.get("/fetchEmptyDetails/:id", authController.fetchEmptyDetails);
router.post("/manageUserDetails", profileFields, authController.manageUserDetails, (err, req, res, next) => {
    console.log(err);
    res.status(400).send({ errors: err.message });
}); 
router.get("/fetchProfileImage/:id", authController.fetchProfileImage);
router.get("/checkEmptyImage/:id", authController.checkEmptyImage);
router.get("/fetchUserCredential/:id/:type", authController.fetchUserCredential); 
router.post("/saveSocialMedialLinks", authController.saveSocialMedialLinks); 
router.post("/manageBankDetails", authController.manageBankDetails);
router.get("/fetchUserBankDetails/:id", authController.fetchUserBankDetails); 
router.post("/apllyPayouts", authController.apllyPayouts);
router.get("/fetchUserPayouts/:id/:skip", authController.fetchUserPayouts);
router.get("/calculateUserPayouts/:id", authController.calculateUserPayouts);
router.post("/fetchPaidOrUnpaidUserPurchase", authController.fetchPaidOrUnpaidUserPurchase);
module.exports = router;
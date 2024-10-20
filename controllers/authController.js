const User = require('../models/User');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const Bank = require('../models/Bank');
const Payout = require('../models/Payout');
const PurchasedCourse = require("../models/PurchasedCourse");
const Institution = require('../models/Institution');
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
const errorController = require('./errorController');
const emailController = require('./emailController');
//console.log(process.env.SECRET_CODE);
// maximum time for jwt
const maxAge = 3 * 24 * 60 * 60;

//Create JWT
const createToken = (id, scopes) => {
    const payload = {
        id: id,
        scopes: scopes
    }
    return jwt.sign( payload, process.env.SECRET_CODE, { expiresIn: maxAge });
}

module.exports.student_signup_post = async (req, res) => {
    const {firstName, lastName, email, password, userType, address, phone} = req.body;
    const verifyId = cryptoRandomString({length: 30});
    let token_name = '';
    let user = null;
   

    try{
        
        
        if(userType === "student"){

            

            //const isValid = errorController.checkStudentErrors(req);
            user = await User.create({firstName, lastName, email, password, verifyId, address, phone, userType })
                
           // console.log(req.body);
           // const {degree, course} = req.body;
           // const student = await Student.create({ user: user._id, course: course, degree: degree });
            token_name = 'user_token';

        } else{
            throw Error("invalid userType");
        }


        const token = createToken(user._id, ["admin", "user"]);
        //remember to add secure when in production
        res.cookie(token_name, token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ user: user._id, token: token });

    }catch(err){
        const errors = errorController.handleAuthErrors(err);
        res.status(400).json({ error: errors });
    }
}

module.exports.user_update_account = async (req, res) => {
    const { userId, firstName, lastName, address, phone } = req.body;
    try {
        const user = await User.updateOne({_id: userId}, {
            $set : { firstName: firstName, lastName: lastName, address: address, phone: phone }
        })
        res.status(201).json({ isSuccess: true, user: user });
    }catch(err){
        res.status(400).json({ error: err });
    }
}

module.exports.instructor_signup_post = async (req, res) => {
    const verifyId = cryptoRandomString({length: 30});
    let token_name = ''; 
    let user = null;
    var instructor 
    token_name = 'instructor_token';

        try{

            const { user_id, category, subCategory, expertise, experience } = req.body;
            const check = await Instructor.find({ user: user_id }, "_id");
            if (check.length==0) {
                instructor = await Instructor.create({
                    user: user_id, category: category, subCategory: subCategory, expertise: expertise, experience: experience, isVerified: false,
                })
            }else{
                instructor = await Instructor.updateOne({ user: user_id }, {
                    $set : {
                        expertise: expertise
                    }
                })
            }
            

            const token = createToken(req.body.user_id, ["admin", "instructor"]);
            //remember to add secure when in production
            res.cookie(token_name, token, { httpOnly: true, maxAge: maxAge * 1000});
            res.status(201).json({ isInstructor: true, token: token });

        }catch(err){
               
            //const errors = errorController.handleAuthErrors(err);
            res.status(400).json({ error: err });
            console.log(err)
        }

}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    let token_name = '';
    let token = '';
    try{
        const user = await User.login(email, password);
        
        if(user.userType === "student"){
            token_name = 'user_token';   
            token = createToken(user._id, ["user"]);         
        }else if(user.userType === "instructor"){
            token_name = 'instructor_token';
            token = createToken(user._id, ["instructor"]);
        } else if(user.userType === "admin"){
            token_name = 'admin_token';
            token = createToken(user._id, ["admin"]);
        }else {
            res.status(400).json({ errors: "Invalid userType" });
        }
        //remember to add secure when in production
        res.cookie(token_name, token, { httpOnly: true, maxAge: maxAge * 1000000});
        res.status(200).json({ token: token, type: user.userType, user: user });
    }catch(err){
        const errors = errorController.handleAuthErrors(err);
        res.status(400).json({ error : errors });
    }
}

module.exports.pdf = async (req, res) => {
    const id = req.params.id;
    const instructor = await Instructor.findOne({ user: id});
        //console.log(instructor);
        var b64string = instructor.incorporationCertificate.get('data');
        var buf = Buffer.from(b64string, 'base64');
        res.writeHead(200, { "Content-type": instructor.incorporationCertificate.get('mimetype')});
        res.end(buf);
}

module.exports.verify_email_get = async (req, res) => {
    const verifyId = req.params.verifyId;
    try{
        const user = await User.findOne({ verifyId });
        if(user){
            try{
                const updatedUser = await User.findByIdAndUpdate(user._id, {isVerified: true } );
                res.json({verified: true});
            }catch(errors){
                res.status(400).json({ errors: errors.message });
            }
        } 
    } catch(err){
        res.status(400).json({ errors: "Unrecognized Link" });
    }
    
}

module.exports.getCurrentUser = async (req, res) => {
    const {id} = req.body;

    try{
        const user = await User.findById(id);
        if(user){
            res.json({ firstName: user.firstName, lastName: user.lastName, email: user.email, address: user.address, phone: user.phone, userType: user.userType});
        } else{
            res.status(404).json({ errors: "User not Found" });
        }
    }catch(err){
        res.status(404).json({ errors: "User not Found" });
    }
}

module.exports.resendVerificationLink = async (req, res) => {
    const { email } = req.body;
    console.log(email)

    try{
        const user = await User.findOne({ email });
        if(!user){
            console.log(user);
            return res.status(404).json({ errors: "User not Found"});
        }
        //console.log(user);
        let link = process.env.BASE_URL + "api/auth/" + user.verifyId;   
        const result = await emailController.sendVerificationEmail(link, user.email, user.firstName);
        res.json({ message: "Verification link sent to email address"});

    }catch(err){
        console.log(err);
        res.status(500).json({ errors: "Error sending verification Link"});
    }
    
}


module.exports.manageUserDetails = async (req, res) => {
    try {
        const { userId, type, file } = req.body;
        var details;
        switch (type) {
            case 'trainingLicence':
                details = await User.updateOne({ _id: userId }, {
                    $set: {
                        trainingLicence: {
                            data: req.files['file'][0].buffer.toString('base64'),
                            mimetype: req.files['file'][0].mimetype
                        }
                    }
                });
                break;
            case 'incorporationCertificate':
                details = await User.updateOne({ _id: userId }, {
                    $set: {
                        incorporationCertificate: {
                            data: req.files['file'][0].buffer.toString('base64'),
                            mimetype: req.files['file'][0].mimetype
                        }
                    }
                });
                break;
            case 'Bsc':
                details = await User.updateOne({ _id: userId }, {
                    $set: {
                        Bsc: {
                            data: req.files['file'][0].buffer.toString('base64'),
                            mimetype: req.files['file'][0].mimetype
                        }
                    }
                });
                break;
            case 'Olevel':
                details = await User.updateOne({ _id: userId }, {
                    $set: {
                        Olevel: {
                            data: req.files['file'][0].buffer.toString('base64'),
                            mimetype: req.files['file'][0].mimetype
                        }
                    }
                });
                break;
            case 'cv':
                details = await User.updateOne({ _id: userId }, {
                    $set: {
                        cv: {
                            data: req.files['file'][0].buffer.toString('base64'),
                            mimetype: req.files['file'][0].mimetype
                        }
                    }
                });
                break;
            case 'signature':
                details = await User.updateOne({ _id: userId }, {
                    $set: {
                        signature: {
                            data: req.files['file'][0].buffer.toString('base64'),
                            mimetype: req.files['file'][0].mimetype
                        }
                    }
                });
                break;
            case 'bio':
                details = await User.updateOne({ _id: userId }, {
                    $set: {
                        bio: file,
                    }
                });
                break; 
            case 'image':
                //console.log('this is file'+req.files['file'][0]);
                details = await User.updateOne({ _id: userId }, {
                    $set: {
                        image: {
                            data: req.files['file'][0].buffer.toString('base64'),
                            mimetype: req.files['file'][0].mimetype
                        }
                    }
                });
                break;
            case 'socialMedia':
                details = await User.updateOne({ _id: userId }, {
                    $set: {
                        socialMedia: file
                    }
                });
                break;

            default:
                console.log('invalid type');
                break;
        }
        var empty = await checkEmptyDetails(userId);
        res.json(empty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.saveSocialMedialLinks = async (req, res) => {
    const { userId, facebook, twitter, linkedin, youtube, website } = req.body;
    try {
        details = await User.updateOne({ _id: userId }, {
            $set: {
                socialMedia: {
                    facebook: facebook, 
                    twitter: twitter, 
                    linkedin: linkedin, 
                    youtube: youtube, 
                    website: website
                }
            }
        });
        const user = await User.findById(userId, "firstName lastName email address phone isBlocked bio admission subscribtion socialMedia").populate({ path: 'admission.institutionId', select: "institutionName institutionType" }).populate({ path: 'subscribtion.instructorUserId', select: "firstName lastName" });
        res.json({ user })
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

module.exports.fetchEmptyDetails = async (req, res) => {
    const userId = req.params.id;
    try {
        var empty = await checkEmptyDetails(userId);
        res.json(empty);
    } catch (errors) {
        res.status(404).json({ errors });
    }
}

const checkEmptyDetails = async (userId) => {
    try {
        var empty = { bio: true, trainingLicence: true, incorporationCertificate: true, Olevel: true, cv: true, image: true, Bsc: true, signature: true};
        const user = await User.findById(userId, "bio trainingLicence incorporationCertificate Olevel cv image Bsc signature");
        if (user.bio == '' || user.bio == null) {
            empty.bio = false;
        }
        if (user.trainingLicence == '' || user.trainingLicence == null) {
            empty.trainingLicence= false;
        }
        if (user.incorporationCertificate == '' || user.incorporationCertificate == null) {
            empty.incorporationCertificate = false;
        }
        if (user.Olevel == '' || user.Olevel == null) {
            empty.Olevel = false;
        }
        if (user.cv == '' || user.cv == null) {
            empty.cv = false;
        }
        if (user.image == '' || user.image == null) {
            empty.image = false;
        }
        if (user.Bsc == '' || user.Bsc == null) {
            empty.Bsc = false;
        }
        if (user.signature == '' || user.signature == null) {
            empty.signature = false;
        } 
        return empty;
    } catch (errors) {
        throw Error(errors.message);
    }
}

module.exports.fetchProfileImage = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    //console.log(course);
    if (user.image == ''|| user.image == null) {
        res.json('../assets/images/hd_dp.jpg')
    }else{
        var b64string = user.image.get('data');
        var buf = Buffer.from(b64string, 'base64');
        res.writeHead(200, { "Content-type": user.image.get('mimetype') });
        res.end(buf);
    }
}

module.exports.checkEmptyImage = async (req, res) => {
    const id = req.params.id;
    var empty = { image: true }; 
    try{
        const user = await User.findById(id, "image");
        if (user.image == '' || user.image == null) {
            empty = { image: false };
        }
        res.json(empty)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.fetchUserCredential = async (req, res) => {
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

module.exports.manageBankDetails = async (req, res) => {
    const { userId, bankName, accountName, accountNumber} = req.body;
    var bank
    try {
        const check = await Bank.find({user: userId}, "_id");
        if (check.length==0) {
            bank = await Bank.create({ user: userId, bankName: bankName, accountName: accountName, accountNumber: accountNumber })
        }else{
            bank = await Bank.updateOne({ user: userId },   {
                $set : {
                    bankName: bankName, 
                    accountName: accountName, 
                    accountNumber: accountNumber 
                }

            });
        }
        res.json({bank, success: true})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.fetchUserBankDetails = async (req, res) => {
    const userId = req.params.id;
    try {
        const bank = await Bank.find({ user: userId }, "_id bankName accountName accountNumber");
        res.json(bank)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.apllyPayouts = async (req, res) => {
    const { userId, bankName, accountName, accountNumber } = req.body;
    var aplly
    try {
        aplly = await Payout.create({ user: userId, bankName: bankName, accountName: accountName, accountNumber: accountNumber, payed: false })
        const payout = await Payout.find({ user: userId }, "_id amount bankName accountName accountNumber payed updatedAt").limit(10);
        res.json({ payout, success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

module.exports.fetchUserPayouts = async (req, res) => {
    const userId = req.params.id;
    const skip = parseInt(req.params.skip);
    try {
        const bank = await Payout.find({ user: userId }, "_id bankName accountName accountNumber amount payed updatedAt").limit(10).skip(skip);
        res.json(bank)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.calculateUserPayouts = async (req, res) => {
    const userId = req.params.id;
    var amount = 0, userType = "user"
    try {
        const instructor = await Instructor.find({ user: userId, isVerified: true }, "_id");
        if (instructor.length!=0) {
            userType = "instructor"
        } 
        const institution = await Institution.find({ user: userId, isVerified: true }, "_id institutionType percent");
        if (institution.length != 0) {
            userType = "admin" + institution[0].institutionType
        } 
        const lastPayout = await Payout.find({ user: userId, payed: true }, "_id bankName accountName accountNumber amount payed updatedAt createdAt").limit(1).sort({ createdAt: -1 });
        
        if (lastPayout.length==0) {
            const purchasedCourse = await PurchasedCourse.find({ instructor: userId }).populate({ path: 'course', select: "affiliatedInstitutions price "})
            for (let i = 0; i < purchasedCourse.length; i++) {
                const element = purchasedCourse[i];
                if (element.course[0].affiliatedInstitutions.length == 0) {
                    if (userType == "instructor") {
                        amount = (element.course[0].price*(30/100 )) + amount
                    } else if (userType == "adminCorperate"){
                        amount = (element.course[0].price * (institution[0].percent / 100)) + amount
                    } else if (userType == "adminUniversity"){
                        amount = (element.course[0].price * (institution[0].percent / 100)) + amount
                    }
                }else{
                    var num = element.course[0].affiliatedInstitutions.length
                    if (userType == "instructor") {
                        amount = (element.course[0].price * ((30 / num) / 100)) + amount
                    } else if (userType == "adminCorperate") {
                        amount = (element.course[0].price * ((institution[0].percent / num) / 100)) + amount
                    } else if (userType == "adminUniversity") {
                        amount = (element.course[0].price * ((institution[0].percent / num) / 100)) + amount
                    }
                }
            }
        } else {
            const purchasedCourse = await PurchasedCourse.find({ instructor: userId, createdAt: { $gte: new Date(lastPayout[0].createdAt) } }).populate({ path: 'course', select: "affiliatedInstitutions price createdAt " })
            
            for (let i = 0; i < purchasedCourse.length; i++) {
                const element = purchasedCourse[i];
                if (element.course[0].affiliatedInstitutions.length == 0) {
                    if (userType == "instructor") {
                        amount = (element.course[0].price * (30 / 100)) + amount
                    } else if (userType == "adminCorperate") {
                        amount = (element.course[0].price * (institution[0].percent / 100)) + amount
                    } else if (userType == "adminUniversity") {
                        amount = (element.course[0].price * (institution[0].percent / 100)) + amount
                    }
                } else {
                    var num = element.course[0].affiliatedInstitutions.length
                    if (userType == "instructor") {
                        amount = (element.course[0].price * ((30 / num) / 100)) + amount
                    } else if (userType == "adminCorperate") {
                        amount = (element.course[0].price * ((institution[0].percent / num) / 100)) + amount
                    } else if (userType == "adminUniversity") {
                        amount = (element.course[0].price * ((institution[0].percent / num) / 100)) + amount
                    }
                }
            }
        }
        res.json({amount: amount, userType: userType})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

module.exports.fetchPaidOrUnpaidUserPurchase = async (req, res) => {
    // const userId = req.params.id;
    // const skip = parseInt(req.params.skip);
    // const type = req.params.type;
    const {userId, skip, type} = req.body
    var purchasedCourse
    try {
        const lastPayout = await Payout.find({ user: userId, payed: true }, "_id bankName accountName accountNumber amount payed updatedAt createdAt").limit(1).sort({ createdAt: -1 });
        if (type=="paid") {
            purchasedCourse = await PurchasedCourse.find({ instructor: userId, createdAt: { $lte: new Date(lastPayout[0].createdAt) } }).populate({ path: 'course', select: "affiliatedInstitutions price createdAt title" }).populate({ path: 'student', select: "firstName lastName "}).limit(10).skip(skip);
        }else{
            purchasedCourse = await PurchasedCourse.find({ instructor: userId, createdAt: { $gte: new Date(lastPayout[0].createdAt) } }).populate({ path: 'course', select: "affiliatedInstitutions price createdAt title" }).populate({ path: 'student', select: "firstName lastName "}).limit(10).skip(skip);
        }
        
        res.json(purchasedCourse)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
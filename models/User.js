const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const admissionSchema = new mongoose.Schema({
    institutionId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "institution"
    }],
    accepted: {
        type: Boolean,
        required: false
    },
    rejected: {
        type: Boolean,
        required: false
    },
})

const subscribtionSchema = new mongoose.Schema({
    unsubscribe: {
        type: Boolean,
        required: false
    },
    instructorUserId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "user",
    }],
})

const userSchema = new mongoose.Schema({
    firstName:{
        required: [true, "Please enter your first name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    lastName:{
        required: [true, "Please enter your last name"],
        type: String,
        max: [255, 'Maximum characters allowed is 255 characters']
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        minlength: [6, 'Minimum password length is 6 characters'],
        required: [true, "Please enter your password"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyId: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: [true, "Please enter your address"],
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone number"],
    },
    userType: {
        type: String,
        required: [true, "Please enter your user type"],
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        required: false
    },
    image: {
        type: Map,
        of: String,
        required: false
    },
    cv: {
        type: Map,
        of: String,
        required: false
    },
    Olevel: {
        type: Map,
        of: String,
        required: false
    },
    Bsc: {
        type: Map,
        of: String,
        required: false
    },
    incorporationCertificate: {
        type: Map,
        of: String,
        required: false
    },
    trainingLicence: {
        type: Map,
        of: String,
        required: false
    },
    signature: {
        type: Map,
        of: String,
        required: false
    },
    socialMedia: {
        type: Object,
        required: false
    },
    admission: [admissionSchema],
    subscribtion: [subscribtionSchema],
}, {timestamps: true});

//hash password before doc is saved
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//send email after doc is saved
userSchema.post('save', async function(doc, next){
    try{    
        let link = process.env.BASE_URL + "api/auth/" + doc.verifyId;
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: "test@goveratech.com", // generated ethereal user
            pass: "govera6068_password", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"FMR E-Learning 👻" <frme-learning@example.com>', // sender address
            to: doc.email, // list of receivers
            subject: "Verify Email Address ✔", // Subject line
            text: "Verify Email Address click the link " + link, // plain text body
            html: '<body style="background-color: lightblue;"><h1 style="text-align: center;">Verify Email Address</h1><p style="text-align: center;">Please click on the button below to verify email address <a href="' + link + '"><button>Verify Email</button></a></p></body>', // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        next();

    }catch(err){
        console.log(err);
        next();
    }
    
})

//static method to login user
userSchema.statics.login = async function(email, password){
    
    const user = await this.findOne({ email });
    
    if(user){

        //if(user.isVerified){
            const auth = await bcrypt.compare(password, user.password);
            //console.log(user);
            if(auth){
                return user;
            }

            throw Error('incorrect login');
        //}

        throw Error('unverified email');
    }

    throw Error('incorrect login');
}

const User = mongoose.model('user', userSchema);

module.exports = User;
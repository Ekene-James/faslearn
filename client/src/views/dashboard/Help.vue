<template>
    <div>
    <!-- Header Start -->
        <Dheader />
	<!-- Header End -->
	<!-- Left Sidebar Start -->
        <Dnav1 />
	<!-- Left Sidebar End -->
	<!-- Body Start -->
        <div class="wrapper _bg4586">
            <div class="_215v12">
                <div class="container-fluid">			
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section3125">							
                                <div class="row justify-content-md-center">						
                                    <div class="col-md-6">					
                                        <div class="help_stitle">					
                                            <h2>How may we help you?</h2>
                                            <div class="explore_search">
                                                <div class="ui search focus">
                                                    <div class="ui left icon input swdh11">
                                                        <!-- <input class="prompt srch_explore" type="text" placeholder="Search for solutions"> -->
                                                        <i class="uil uil-search-alt icon icon2"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>															
                                    </div>															
                                </div>							
                            </div>							
                        </div>															
                    </div>
                </div>
            </div>
            <div class="_215b15">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">						
                            <div class="course_tabs">
                                <nav>
                                    <div class="nav nav-tabs help_tabs tab_crse justify-content-center" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-instructor-tab" data-toggle="tab" href="#nav-instructor" role="tab" aria-selected="true">Instructor</a>
                                        <a class="nav-item nav-link" id="nav-student-tab" data-toggle="tab" href="#nav-student" role="tab" aria-selected="false">Student</a>									
                                    </div>
                                </nav>						
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="_215b17">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="course_tab_content">
                                <div class="tab-content" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="nav-instructor" role="tabpanel">
                                        <div class="tpc152">
                                            <div class="crse_content">
                                                <h3>Select a topic to search for help</h3>																			
                                            </div>
                                            <div class="section3126 mt-20">
                                                <div class="row">
                                                    <div class="col-md-4" @click.prevent="toggleShow('payment')">
                                                        <a href="#" class="value_props50" v-if="focus != 'payment'" >
                                                            <div class="value_icon">
                                                                <i class="uil uil-wallet"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Payments</h4>
                                                                <p>Understand the revenue share and how to receive payments.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="min-height: 30px" v-else>
                                                            <h4>Payments</h4>
                                                            <ul>
                                                                <li style="font-size: 13px"><strong>Requirement:</strong>  You have to be a registered instructor or an admin to an institution in faslearn</li>
                                                                <li style="font-size: 13px"><strong>Process:</strong> click on settings, then billing and payments, then enter your bank details</li>
                                                                <li style="font-size: 13px">If students have been purchasing your courses then you will get paid at the time specified for payments on faslearn</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4" @click.prevent="toggleShow('selling')">
                                                        <a href="#" class="value_props50" v-if="focus != 'selling'">
                                                            <div class="value_icon">
                                                                <i class="uil uil-megaphone"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Selling & Promotion</h4>
                                                                <p>Learn about the announcement and promotional tools.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="height: 220px" v-else>
                                                            <h4>Selling & Promotion</h4>
                                                            <ul>
                                                                <li style="font-size: 13px"><strong>Requirement:</strong> You need to request for an Affiliate Client Link</li>
                                                                <li style="font-size: 13px"><strong>Process:</strong> click on settings, then Affiliate Client Link (ACL), then request</li>
                                                                <li style="font-size: 13px">When this is done faslearn officially knows you help in sales, when ever some one comes to faslearn with your link and purchases a course, you get a percentage</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4" @click.prevent="toggleShow('qualityStandards')">
                                                        <a href="#" class="value_props50" v-if="focus != 'qualityStandards'">
                                                            <div class="value_icon">
                                                                <i class="uil uil-file-check-alt"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Quality Standards</h4>
                                                                <p>Learn what it takes to create a high quality course.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="height: 290px" v-else>
                                                            <h4>Quality Standards</h4>
                                                            <ul>
                                                                <li style="font-size: 13px"><strong>Requirement:</strong> Read faslearn policy</li>
                                                                <li style="font-size: 13px">Add a preview video to explain why people should buy your course</li>
                                                                <li style="font-size: 13px">Arrange your cousre in sections according for better Understanding, do not put all lectures in one section </li>
                                                                <li style="font-size: 13px">Its always better to put a new topic on a new video</li>
                                                                <li style="font-size: 13px">If a topic is too large, break it into smaller topics, so your video does not exceed 5 minutes</li>
                                                                <li style="font-size: 13px">Please make sure you add a test to every course of yours, so students may have Certificates</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4" @click.prevent="toggleShow('instructor')">
                                                        <a href="#" class="value_props50" v-if="focus != 'instructor'">
                                                            <div class="value_icon">
                                                                <i class="uil uil-file-edit-alt"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Be an Instructor</h4>
                                                                <p>Build your Instructor Career in faslearn.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="min-height: 40px" v-else>
                                                            <h4>Be an Instructor</h4>
                                                            <ul>
                                                                <li style="font-size: 13px"><strong>Requirement:</strong> You need a profile picture, cv, signature, bio, BSC, Olevel certs</li>
                                                                <li style="font-size: 13px"><strong>Process:</strong>Go to your profile page, click on credentials, add all the requirements, then go back to home page, click on Become an instructor and fill the form</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4" @click.prevent="toggleShow('Course Management')">
                                                        <a href="#" class="value_props50" v-if="focus != 'Course Management'">
                                                            <div class="value_icon">
                                                                <i class="uil uil-window"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Course Management</h4>
                                                                <p>Maintain your course and engage with students.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="height:400px" v-else>
                                                            <h4>Course Management</h4>
                                                            <ul>
                                                                <li style="font-size: 13px"><strong>Cousre Requirement:</strong> Details, Sections, Affiliation, Tests</li>
                                                                <li style="font-size: 13px"><strong>Details:</strong> This is a few description you give to your course. Can be edited</li>
                                                                <li style="font-size: 13px"><strong>Sections:</strong> This is are course divisions you create for better student Understanding. A preview section is created by default, and anything you add there can be viewed by students before purchase</li>
                                                                <li style="font-size: 13px"><strong>Affiliation:</strong> This is done if you are a registered lecturer on any institution and you wish to register your course under that institution for their students to learn from. can not be edited</li>
                                                                <li style="font-size: 13px"><strong>Tests:</strong> You add this to every course of yours to enable students to be certified</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props50">
                                                            <div class="value_icon">
                                                                <i class="uil uil-file-shield-alt"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Trust & Safety</h4>
                                                                <p>Policy and copyright questions and guidance.</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="tpc152">
                                            <div class="crse_content">
                                                <h3>Frequently Asked Questions</h3>																			
                                            </div>
                                            <div class="section3126 mt-20">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            Promote Your Course With Coupons and Referral Links																													
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            How to Select Your Payout Method And Become a Premium Instructor																													
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            Cursus Course Quality Checklist																												
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            Instructor Revenue Share																													
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            Instructor Promotional Agreements and Cursus Deals																												
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            How to Become an Instructor: FAQ																												
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="tab-pane fade" id="nav-student" role="tabpanel">
                                        <div class="tpc152">
                                            <div class="crse_content">
                                                <h3>Select a topic to search for help</h3>																			
                                            </div>
                                            <div class="section3126 mt-20">
                                                <div class="row">
                                                    <div class="col-md-4" @click.prevent="toggleShow('Getting Started')">
                                                        <a href="#" class="value_props50" v-if="focus != 'Getting Started'">
                                                            <div class="value_icon">
                                                                <i class="uil uil-file-check-alt"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Getting Started</h4>
                                                                <p>Learn how Faslearn works and how to start learning.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="min-height: 30px" v-else>
                                                            <h4>Getting Started</h4>
                                                            <ul>
                                                                <li style="font-size: 13px">  You can learn as a Faslearn user or a student of an institution</li>
                                                                <li style="font-size: 13px"> Some institutions limit their courses to their students only, to access this courses you will have to apply for admission in this institution</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4" @click.prevent="toggleShow('Account/Profile')">
                                                        <a href="#" class="value_props50" v-if="focus != 'Account/Profile'">
                                                            <div class="value_icon">
                                                                <i class="uil uil-user"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Account/Profile</h4>
                                                                <p>Manage your account settings.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="min-height: 30px" v-else>
                                                            <h4>Account/Profile</h4>
                                                            <ul>
                                                                <li style="font-size: 13px"><strong>Credentials:</strong>  You can add all your credentials on your profile page incase you plan to apply on any institution</li>
                                                                <li style="font-size: 13px"> You can always edit other details of your account on settings/accounts</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4" @click.prevent="toggleShow('Troubleshooting')">
                                                        <a href="#" class="value_props50" v-if="focus != 'Troubleshooting'">
                                                            <div class="value_icon">
                                                                <i class="uil uil-desktop-cloud-alt"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Troubleshooting</h4>
                                                                <p>Experiencing a bug? Check here.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="min-height: 30px" v-else>
                                                            <h4>Troubleshooting</h4>
                                                            <ul>
                                                                <li style="font-size: 13px">  Incase you are facing any issues or errors on our platform, we will be happy to hear you out.</li>
                                                                <li style="font-size: 13px">  Take of screenshot of this issue and send to us on the feedback section. We will reply via email, when the issue has been fixed</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4" @click.prevent="toggleShow('Course Taking')">
                                                        <a href="#" class="value_props50" v-if="focus != 'Course Taking'">
                                                            <div class="value_icon">
                                                                <i class="uil uil-book-alt"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Course Taking</h4>
                                                                <p>Everything about taking a course on Udemy.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="min-height: 30px" v-else>
                                                            <h4>Course Taking</h4>
                                                            <ul>
                                                                <li style="font-size: 13px">  All your purchased courses are found on your profile page</li>
                                                                <li style="font-size: 13px"> Incase you do not understand anything in a particular lecture, you can always ask the instructor a question, he will surely clearify you</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4" @click.prevent="toggleShow('Purchase/Refunds')">
                                                        <a href="#" class="value_props50" v-if="focus != 'Purchase/Refunds'">
                                                            <div class="value_icon">
                                                                <i class="uil uil-wallet"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Purchase/Refunds</h4>
                                                                <p>Learn Purchase and refunds.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="min-height: 30px" v-else>
                                                            <h4>Purchase/Refunds</h4>
                                                            <ul>
                                                                <li style="font-size: 13px">  Faslearn uses a secure payment gateway, but incase your payment does not reflect on the course you purchased, please take a screenshot of the payment invoice sent to your mail and send to us on our feedbacks, our admins will resolve this issue</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4" @click.prevent="toggleShow('Mobile')">
                                                        <a href="#" class="value_props50" v-if="focus != 'Mobile'">
                                                            <div class="value_icon">
                                                                <i class="uil uil-mobile-android-alt"></i>
                                                            </div>
                                                            <div class="value_content">
                                                                <h4>Mobile</h4>
                                                                <p>On the go? Learn about our mobile web view.</p>
                                                            </div>
                                                        </a>
                                                        <a href="#" class="value_props50" style="min-height: 30px" v-else>
                                                            <h4>Mobile</h4>
                                                            <ul>
                                                                <li style="font-size: 13px">  Some feautures of faslearn , may not be compatible with the mobile view, please switch to a desktop or laptop computer if you meet any feauture that this</li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tpc152">
                                            <div class="crse_content">
                                                <h3>Frequently Asked Questions</h3>																			
                                            </div>
                                            <div class="section3126 mt-20">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            Lifetime Access																													
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            Cursus FAQ 																													
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            Downloading Courses																													
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            Certificate of Completion																													
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            Refund a Course																													
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="value_props51">																											
                                                            How to Solve Payment Issues																													
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>									
                                    </div>								
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dfooter />
        </div>
	<!-- Body End -->
    </div>
</template>
<script>
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
	name: 'Dteachers',
	data(){
		return{
            focus: ''
		}
	},
    components: {
        Dheader,
		Dnav1,
		Dfooter
	},
	computed: {
	},   
	methods: {
        toggleShow(item){
            if (this.focus == item) {
               this.focus = ''
            }else{
                this.focus = item
            }
        }
	},
    mounted(){
		
           
    }
}
</script>
<style scoped>
    @import url("./assets/css/style.css");
    @import url("http://fonts.googleapis.com/css?family=Roboto:400,700,500");
    @import url("./assets/vendor/unicons-2.0.1/css/unicons.css");
    @import url("./assets/css/instructor-dashboard.css");
    @import url("./assets/css/vertical-responsive-menu.min.css");
    @import url("./assets/css/instructor-dashboard.css");
    @import url("./assets/css/instructor-responsive.css");
    @import url("./assets/css/responsive.css");
    @import url("./assets/css/night-mode.css");
    @import url("./assets/vendor/fontawesome-free/css/all.min.css");
    @import url("./assets/vendor/OwlCarousel/assets/owl.carousel.css");
    @import url("./assets/vendor/OwlCarousel/assets/owl.theme.default.min.css");
    @import url("./assets/vendor/bootstrap/css/bootstrap.min.css");
    @import url("./assets/vendor/semantic/semantic.min.css");

   
	.off{
        display: none;
    }

</style>
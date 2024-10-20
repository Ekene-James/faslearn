<template>
    <div>
    <!-- Header Start -->
        <Dheader />
	<!-- Header End -->
	<!-- Left Sidebar Start -->
        <Dnav1 />
	<!-- Left Sidebar End -->
	<!-- Body Start -->
	<div class="wrapper">
		<div class="sa4d25">
			<div class="container-fluid">			
				<div class="row">
					<div class="col-xl-9 col-lg-8">
						<!-- <div class="section3125">
							<h4 class="item_title">Live Streams</h4>
							<a href="live_streams.html" class="see150">See all</a>
							<div class="la5lo1">
								<div class="live_stream owl-theme">
                                    <div class="scroll">
                                        <div class="item">
                                            <div class="stream_1">
                                                <a href="live_output.html" class="stream_bg">
                                                    <img src="./assets/images/left-imgs/img-1.jpg" alt="">
                                                    <h4>John Doe</h4>
                                                    <p>live<span></span></p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
								</div>
							</div>
						</div> -->
						<div class="section3125 mt-50">
							<h4 class="item_title">Our Newest Courses</h4>
                            <router-link :to="'/Dallcourses/e'">
							<a href="#" class="see150">See all</a>
                            </router-link>
							<div class="la5lo1">
								<div class="featured_courses owl-theme">
                                    <div class="scroll">
                                        <div class="item" v-for="course in recentCourses" :key="course">
                                            <router-link :to="'/Dcoursedetail/'+course._id">
                                            <div class="fcrse_1 mb-20">
                                                <a  class="fcrse_img">
                                                    <img v-bind:src="backEnd+'public/courseImage/'+course._id" alt="">
                                                    <div class="course-overlay">
                                                        <div class="badge_seller">Bestseller</div>
                                                        <Ratings :id="course._id" :type="'course'" />
                                                        <span class="play_btn1"><i class="uil uil-play"></i></span>
                                                        <!-- <div class="crse_timer">
                                                            25 hours
                                                        </div> -->
                                                        <CourseTime :id="course._id" :type="'dashboard'"/>
                                                    </div>
                                                </a>
                                                <div class="fcrse_content">
                                                    <div class="eps_dots more_dropdown">
                                                        <a href="#"><i class='uil uil-ellipsis-v'></i></a>
                                                        <div class="dropdown-content">
                                                            <span><i class='uil uil-share-alt'></i>Share</span>
                                                            <span><i class="uil uil-clock-three"></i>Save</span>
                                                            <span><i class='uil uil-ban'></i>Not Interested</span>
                                                            <span><i class="uil uil-windsock"></i>Report</span>
                                                        </div>																										
                                                    </div>
                                                    <TotalSeenCourse :id="course._id" :type="'dashboard'" />
                                                    <!-- <div class="vdtodt">
                                                        <span class="vdt14">109k views</span>
                                                        <span class="vdt14">15 days ago</span>
                                                    </div> -->
                                                    <a  class="crse14s">{{course.title}}</a>
                                                    <a href="#" class="crse-cate">{{course.category[0].name}}</a>
                                                    <div class="auth1lnkprce">
                                                        <p class="cr1fot">By <a >{{course.user[0].firstName}} {{course.user[0].lastName}}</a></p>
                                                        <div class="prce142">₦{{course.price.$numberDecimal}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </router-link>
                                        </div>
                                    </div>
								</div>
							</div>
						</div>
						<div class="section3125 mt-30">
							<h4 class="item_title">Your Purchased Courses</h4>
                            <router-link :to="'/Dprofile/'+user_id">
							<a href="#" class="see150">See all</a>
                            </router-link>
							<div class="la5lo1">
								<div class="featured_courses owl-theme">
                                    <div class="scroll">
                                        <div class="item" v-for="course in  purchasedCourses" :key="course">
                                            <router-link :to="'/Dcoursedetail/'+course._id">
                                            <div class="fcrse_1 mb-20">
                                                <a class="fcrse_img">
                                                    <img v-bind:src="backEnd+'public/courseImage/'+course._id" alt="">
                                                    <div class="course-overlay">
                                                        <div class="badge_seller">Bestseller</div>
                                                        <Ratings :id="course._id" :type="'course'" />
                                                        <span class="play_btn1"><i class="uil uil-play"></i></span>
                                                        <!-- <div class="crse_timer">
                                                            25 hours
                                                        </div> -->
                                                        <CourseTime :id="course._id" :type="'dashboard'"/>
                                                    </div>
                                                </a>
                                                <div class="fcrse_content">
                                                    <div class="eps_dots more_dropdown">
                                                        <a href="#"><i class='uil uil-ellipsis-v'></i></a>
                                                        <div class="dropdown-content">
                                                            <span><i class='uil uil-share-alt'></i>Share</span>
                                                            <span><i class="uil uil-clock-three"></i>Save</span>
                                                            <span><i class='uil uil-ban'></i>Not Interested</span>
                                                            <span><i class="uil uil-windsock"></i>Report</span>
                                                        </div>																										
                                                    </div>
                                                    <TotalSeenCourse :id="course._id" :type="'dashboard'" />
                                                    <a class="crse14s">{{course.title}}</a>
                                                    <a href="#" class="crse-cate">{{course.category[0].name}}</a>
                                                    <div class="auth1lnkprce">
                                                        <p class="cr1fot">By <a href="#">{{course.user[0].firstName}} {{course.user[0].lastName}}</a></p>
                                                        <div class="prce142">₦{{course.price.$numberDecimal}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            </router-link>
                                        </div>
                                    </div>
								</div>
							</div>
						</div>
						<div class="section3125 mt-50">
							<h4 class="item_title">Popular Instructors</h4>
                            <router-link :to="'/Dteachers/e'">
							<a href="" class="see150">See all</a>
                            </router-link>
							<div class="la5lo1">
								<div class="top_instrutors owl-theme">
                                    <div class="scroll">
                                        <div class="item" v-for="ins in all_Instructors" :key="ins">
                                            <router-link :to="'/Dprofile/'+ins.user[0]._id">
                                            <div class="fcrse_1 mb-20">
                                                <div class="tutor_img">
                                                    <ProfileImage :id="ins.user[0]._id" />
                                                    <!-- <a href=""><img src="./assets/images/left-imgs/img-1.jpg" alt=""></a>												 -->
                                                </div>
                                                <div class="tutor_content_dt">
                                                    <div class="tutor150">
                                                        <a href="" class="tutor_name">{{ins.user[0].firstName}} {{ins.user[0].lastName}}</a>
                                                        <div class="mef78" title="Verify">
                                                            <i class="uil uil-check-circle"></i>
                                                        </div>
                                                    </div>
                                                    <Ratings :id="ins.user[0]._id" :type="'instructor'" />
                                                    <div class="tutor_cate">{{ins.expertise}}</div>
                                                    <ul class="tutor_social_links">
                                                        <li><a href="#" class="fb"><i class="fab fa-facebook-f"></i></a></li>
                                                        <li><a href="#" class="tw"><i class="fab fa-twitter"></i></a></li>
                                                        <li><a href="#" class="ln"><i class="fab fa-linkedin-in"></i></a></li>
                                                        <li><a href="#" class="yu"><i class="fab fa-youtube"></i></a></li>
                                                    </ul>
                                                    <div class="tut1250">
                                                        <span class="vdt15">{{ins.category[0].name}}</span>
                                                        <!-- <span class="vdt15">100K Students</span>
                                                        <span class="vdt15">15 Courses</span> -->
                                                    </div>
                                                </div>
                                            </div>
                                            </router-link>
                                        </div>
                                    </div>
								</div>
							</div>
						</div>	
					</div>
					<div class="col-xl-3 col-lg-4">
						<div class="right_side">
                            <router-link :to="'/Dprofile/'+user._id">
							<div class="fcrse_2 mb-30">
								<div class="tutor_img">
									<img src="./assets/images/left-imgs/img-10.jpg" alt="" v-if="!isProfilePhoto">
                                    <ProfileImage :id="userId" v-if="isProfilePhoto" />
								</div>
								<div class="tutor_content_dt">
									<div class="tutor150">
										<a href="" class="tutor_name">{{user.firstName}} {{user.lastName}}</a>
										<div class="mef78" title="Verify" v-if="user.isVerified">
											<i class="uil uil-check-circle"></i>
										</div>
									</div>
									<div class="tutor_cate" v-if="isInstructor">Instructor</div>
									<ul class="tutor_social_links">
										<li><a href="#" class="fb"><i class="fab fa-facebook-f"></i></a></li>
										<li><a href="#" class="tw"><i class="fab fa-twitter"></i></a></li>
										<li><a href="#" class="ln"><i class="fab fa-linkedin-in"></i></a></li>
										<li><a href="#" class="yu"><i class="fab fa-youtube"></i></a></li>
									</ul>
									<div class="tut1250" v-if="isInstructor">
										<!-- <span class="vdt15">615K Students</span>
										<span class="vdt15">12 Courses</span> -->
									</div>
									<a href="" class="prfle12link">Go To Profile</a>
								</div> 
							</div>
                            </router-link>
							<div class="fcrse_3" v-if="isInstructor">
								<div class="cater_ttle">
									<h4>CREATE COURSE</h4>
								</div>
								<div class="live_text">
									<div class="live_icon"><i class="uil uil-kayak"></i></div>
									<div class="live-content">
										<p>Set up your channel and add courses for your students</p>
                                        <router-link :to="'/Dnewcourse'" >
										<button class="live_link" >Get Started</button>
                                        </router-link>
										<span class="livinfo">Info : This feature only for 'Instructors'.</span>
									</div>
								</div>
							</div>
							<div class="get1452">
								<h4>Get personalized courses</h4>
								<p>Pick courses by categories</p>
                                <router-link :to="'/Dallcourses/e'" >
								<button class="Get_btn">Get Started</button>
                                </router-link>
							</div>
							<div class="fcrse_3">
								<div class="cater_ttle">
									<h4>Top Categories</h4>
								</div>
								<ul class="allcate15">
									<li><a href="#" class="ct_item" ><h4>Categories</h4></a></li>
                                    <router-link :to="'/Dallcourses/'+c._id" v-for="c in categories" :key="c">
                                    <li><a href="#" class="ct_item" ><i class='uil uil-arrow'></i>{{c.name}}</a></li>
                                    </router-link>
								</ul>
							</div>
							<div class="strttech120" v-if="!isInstructor">
								<h4>Become an Instructor</h4>
								<p>Top instructors from around the world teach millions of students on Faslearn. We provide the tools and skills to teach what you love.</p>
								<router-link to="/DregisterTeacher"><button class="Get_btn" type="button">Start Teaching</button></router-link>
							</div>
						</div>
					</div>
					<div class="col-xl-12 col-lg-12">
						<div class="section3125 mt-30">
							<h4 class="item_title">Institutions</h4>
							<div class="la5lo1">
								<div class="Student_says owl-theme">
                                    <div class="scroll">
                                        <div class="item" v-for="institude in allInstitutions" :key="institude">
                                            <router-link :to="'/Dinstitude/'+institude._id">
                                            <div class="fcrse_4 mb-20">
                                                <div class="say_content" style="word-wrap: break-word;">
                                                    <p>@ {{institude.address}}</p>
                                                    <Ratings :id="institude._id" :type="'institution'" />
                                                </div>
                                                
                                                <div class="st_group">
                                                    <div class="stud_img">
                                                        <img :src="backEnd+'public/institutionImage__public/'+institude._id" alt="">												
                                                    </div>
                                                    <h4>{{institude.institutionName}}</h4>
                                                </div>											
                                            </div>
                                            </router-link>
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
import { mapGetters, mapActions } from "vuex";
import ProfileImage from "@/components/ProfileImage";
import CourseTime from "@/components/CourseTime";
import TotalSeenCourse from "@/components/TotalSeenCourse";
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Ratings from '@/components/dashboard/Ratings.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
    name: 'Dhome',
    data() {
        return{
            userId: '',
            all_Instructors: '',
            recentCourses: '',
            allInstitutions: '',
            purchasedCourses: '',
            user: '',
            categories: '',
            isProfilePhoto: false
        }
    },
    components: {
        Dheader,
        Dnav1,
        ProfileImage,
        Ratings,
        CourseTime,
        TotalSeenCourse,
        Dfooter
    },
    computed: {
        ...mapGetters(['isInstructor']),
        ...mapGetters(['backEnd'])
    },
    methods: {
        ...mapActions(['check_user_instructor']),
        ...mapActions(['fetch_recent_courses']),
        ...mapActions(['fetch_all_institutions']),
        ...mapActions(['fetch_purchased_courses']),
        ...mapActions(['fetch_user']),
        ...mapActions(['fetchAllInstructors']),
        ...mapActions(['check_empty_image']),
        ...mapActions(['fetch_categories'])
    },  
    mounted(){
        let user_id = localStorage.getItem('fmruser');
        this.userId = user_id;
        this.fetch_recent_courses(0)
        .then(res => {
            this.recentCourses = res.data
        })
        this.fetch_all_institutions()
        .then(res => {
            this.allInstitutions = res.data
        })
        this.fetch_user(user_id)
        .then(res => {
            this.user = res.data.user
        })
        this.fetch_purchased_courses({user_id,skip: 0})
        .then(res => {
            this.purchasedCourses = res.data
        })
        this.fetchAllInstructors()
        .then(res => {
            this.all_Instructors = res.data
        })
        this.check_empty_image(user_id)
        .then(res => {
            if (res.data.image==true) {
                this.isProfilePhoto = true
            }
        })
        this.fetch_categories()
        .then(res => {
            this.categories = res.data
        })
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
   
    .scroll{
		min-height: 200px;
		min-width: 1500px;
	}

	.live_stream{
		overflow: hidden;
	}

	.featured_courses{
		overflow: hidden;
	}

	.top_instrutors{
		overflow: hidden;
	}

	.Student_says{
		overflow: hidden;
	}

	.featured_courses .scroll{
		min-height: 200px;
		min-width: 3750px;
	}

	.top_instrutors .scroll{
		min-height: 200px;
		min-width: 3750px;
	}

	.Student_says .scroll{
		align-items: left;
		min-height: 200px;
		min-width: 3750px;
	}

	.item{
		width: 150px;
		display: inline-block;
		margin-left: 10px;
	}

	.featured_courses .item{
		width: 350px;
		display: inline-block;
		margin-left: 10px;
	}

	.top_instrutors .item{
		width: 350px;
		display: inline-block;
		margin-left: 10px;
	}

	.Student_says .item{
		width: 350px;
		display: inline-block;
		margin-left: 10px;
	}

	@media (max-width: 575.98px) {
		.live_stream{
			overflow-x: scroll
		}

		.featured_courses{
			overflow-x: scroll;
		}

		.top_instrutors{
			overflow-x: scroll;
		}

		.Student_says{
			overflow-x: scroll;
		}
	}

	.live_stream:hover{
		overflow-x: scroll
	}

	.featured_courses:hover{
		overflow-x: scroll;
	}

	.top_instrutors:hover{
		overflow-x: scroll;
	}

	.Student_says:hover{
		overflow-x: scroll;
	}

    ::-webkit-scrollbar {
        width: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }
        
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: red; 
        border-radius: 10px;
    }
	

</style>
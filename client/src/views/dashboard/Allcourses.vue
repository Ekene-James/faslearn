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
            <div class="sa4d25">
                <div class="container-fluid">			
                    <div class="row">
                        <br><br>
                        <div class="col-lg-3 col-md-4 ">
                            <div class="section3125 hstry142">
                                <!-- <div class="grp_titles pt-0">
                                    <div class="ht_title">Saved Courses</div>
                                    <a href="#" class="ht_clr">Remove All</a>
                                </div> -->
                                <div class="tb_145">
                                    <!-- <div class="wtch125">
                                        <span class="vdt14">4 Courses</span>
                                    </div> -->
                                    <ul class="allcate15">
                                        <li><a class="ct_item" ><h4>Categories</h4></a></li>
                                        <router-link :to="'/Dallcourses/e'">
                                        <li ><a class="ct_item" v-bind:class="{ active: category=='e'}"><i class='uil uil-arrow'></i>All</a></li>
                                        </router-link>
                                        <router-link :to="'/Dallcourses/'+c._id" v-for="c in categories" :key="c">
                                        <li ><a class="ct_item" v-bind:class="{ active: category==c._id}"><i class='uil uil-arrow'></i>{{c.name}}</a></li>
                                        </router-link>
                                    </ul>
                                </div>						
                            </div>							
                        </div>			
                        	
                        <div class="col-md-9">
                            <div class="_14d25 mb-20">
                                <Loading v-if="Loading"/>
                                <div class="row">
                                    <div class="col-md-12" v-if="courses.length>0">
                                        <h4 class="mhs_title">Saved Courses</h4>
                                        <div class="fcrse_1" v-for="cos in courses" :key="cos">
                                            <router-link :to="'/Dcoursedetail/'+cos._id">
                                            <a href="" class="hf_img">
                                                <img v-bind:src="backEnd+'public/courseImage/'+cos._id" alt="">
                                                <div class="course-overlay">
                                                    <div class="badge_seller">Bestseller</div>
                                                    <Ratings :id="cos._id" :type="'course'" />
                                                    <span class="play_btn1"><i class="uil uil-play"></i></span>
                                                    <CourseTime :id="cos._id" :type="'dashboard'"/>
                                                </div>
                                            </a>
                                            <div class="hs_content">
                                                <div class="eps_dots eps_dots10 more_dropdown">
                                                    <a href="#"><i class="uil uil-ellipsis-v"></i></a>
                                                    <div class="dropdown-content">
                                                        <span><i class='uil uil-times'></i>Remove</span>															
                                                    </div>																											
                                                </div>
                                                <TotalSeenCourse :id="cos._id" :type="'dashboard'" />
                                                <a href="" class="crse14s title900">{{cos.title}}</a>
                                                <a href="#" class="crse-cate">{{cos.category[0].name}}</a>
                                                <div class="auth1lnkprce">
                                                    <p class="cr1fot">By <a href="#">{{cos.user[0].firstName}} {{cos.user[0].lastName}}</a></p>
                                                    <div class="prce142">₦{{cos.price.$numberDecimal}}</div>
                                                </div>
                                            </div>
                                            </router-link>
                                        </div>	
                                    </div>
                                    <div class="col-md-12" v-else>
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                        <br>
                                        <center>
                                            <h3>No Course for this category yet</h3>
                                        </center>
                                    </div>								
                                </div>																		
                            </div>	
                            <center>
                                <button class="live_link" type="button" v-if="!Loading" @click="fetchMore">Load More</button>	
                            </center>
                            <br><br><br>							
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
import { mapActions, mapGetters } from 'vuex'
import CourseTime from "@/components/CourseTime";
import TotalSeenCourse from "@/components/TotalSeenCourse";
import Loading from '@/components/Loading.vue'
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Ratings from '@/components/dashboard/Ratings.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
    name: 'Dhome',
    data(){
        return{
            category: '',
            courses: [],
            categories: '',
            skip: 0,
            Loading: false
        }
    },
    watch: {
        $route() {
            this.category = this.$route.params.cat
            this.skip = 0
            this.fetch_courses_by_category({cat: this.category,skip: this.skip})  
            .then(res => {
                this.courses = res.data
            })
        },

        circle: function () {
            if (this.circle == 'loading') {
                this.Loading = true
            }else{
                this.Loading = false
            }
        }
        
    },
    computed: {
        ...mapGetters(['circle']),
        ...mapGetters(['backEnd'])
    },
    methods: {
        ...mapActions(['fetch_courses_by_category']),
        ...mapActions(['fetch_categories']),
        fetchMore(){
            this.skip = this.skip + 10
            this.fetch_courses_by_category({cat: this.category,skip: this.skip})  
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
                    this.courses.push(element)
                }
            })
        }
    },
    components: {
        Dheader,
        Dnav1,
        Loading,
        CourseTime,
        TotalSeenCourse,
        Ratings,
        Dfooter
    },   
    mounted(){
        
        this.category =  this.$route.params.cat
        this.fetch_categories()
        .then(res => {
            this.categories = res.data
        })
        this.fetch_courses_by_category({cat: this.category,skip: this.skip})  
        .then(res => {
            this.courses = res.data
        })
        
        var currentUrl = window.location.pathname+'';
		var page = currentUrl.split('/')[1]
        console.log(page +" this is it")
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

    .active{
        background-color: red;
        width: 100%;
        height: 40px;
        border-radius: 20px;
        color: white;
    }
   
</style>
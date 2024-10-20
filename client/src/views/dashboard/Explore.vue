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
                        <div class="col-xl-12 col-lg-8">
                            <div class="section3125">
                                <div class="explore_search">
                                    <div class="ui search focus">
                                        <div class="ui left icon input swdh11">
                                            <input class="prompt srch_explore" type="text" placeholder="Search for Course, Instructors, Institutions.." v-model="searchItem">
                                            <i class="uil uil-search-alt icon icon2"></i>
                                        </div>
                                    </div>
                                </div>							
                            </div>				
                        </div>
                        <br><br><br><br>
                        <br>
                        <div class="_215b15" v-if="searchItem!=''">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-12">						
                                        <div class="course_tabs">
                                            <nav>
                                                <div class="nav nav-tabs tab_crse" id="nav-tab" role="tablist">
                                                    <a class="nav-item nav-link" :class="{active : type == 'course'}"  @click.prevent="search('course')">Search Courses</a>
                                                    <a class="nav-item nav-link" :class="{active : type == 'institution'}"  @click.prevent="search('institution')">Search Institutions</a>
                                                    <a class="nav-item nav-link" :class="{active : type == 'instructor'}" @click.prevent="search('instructor')">Search Instructors</a>
                                                </div>
                                            </nav>						
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Loading v-if="Loading"/>
                        <div class="col-md-12" v-if="type == 'instructor' && !Loading && results !='' ">
                            <div class="section3125 mb-15 mt-50">
                                <h4 class="item_title">Instructors</h4>
                                <router-link :to="'/Dteachers'">
                                <a  class="see150">See all</a>
                                </router-link>
                                <div class="la5lo1">
                                    <div class="">
                                        <div class="item" v-for="r of results" :key="r">
                                            <router-link :to="'/Dprofile/'+r._id">
                                            <div class="stream_1">
                                                <a class="stream_bg">
                                                    <ProfileImage :id="r._id" /> 
                                                    <h4>{{r.firstName}} {{r.lastName}} </h4>
                                                    <p>Profile</p>
                                                </a>
                                            </div>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br><br><br>
							<center>
								<button class="live_link" type="button" v-if="!Loading" @click="fetchMore">Load More</button>	
							</center>
							<br><br><br>
                        </div>
                        <div class="col-md-12"  v-if="(type == 'course'|| type =='recentCourse') && !Loading && results !=''">
                            <div class="_14d25">
                                <div class="row">
                                    <div class="col-lg-3 col-md-4" v-for="r in results" :key="r">
                                        <router-link :to="'/Dcoursedetail/'+r._id">
                                        <div class="fcrse_1 mt-30">
                                            <a class="fcrse_img">
                                                <img v-bind:src="backEnd+'public/courseImage/'+r._id" alt="">
                                                <div class="course-overlay">
                                                    <div class="badge_seller">Bestseller</div>
                                                    <Ratings :id="r._id" :type="'course'" />
                                                    <span class="play_btn1"><i class="uil uil-play"></i></span>
                                                    <CourseTime :id="r._id" :type="'dashboard'"/>
                                                </div>
                                            </a>
                                            <div class="fcrse_content">
                                                <TotalSeenCourse :id="r._id" :type="'dashboard'" />
                                                <a  class="crse14s">{{r.title}}</a>
                                                <a href="#" class="crse-cate">{{r.category[0].name}}</a>
                                                <div class="auth1lnkprce">
                                                    <p class="cr1fot">By <a >{{r.user[0].firstName}} {{r.user[0].lastName}}</a></p>
                                                    <div class="prce142">₦{{r.price.$numberDecimal}}</div>
                                                </div>
                                            </div>
                                        </div>	
                                        </router-link>												
                                    </div>
                                </div>	
                                <br><br><br>
                                <center>
                                    <button class="live_link" type="button" v-if="!Loading" @click="fetchMore">Load More</button>	
                                </center>
                                <br><br><br>			
                            </div>				
                        </div>	
                        <div class="col-xl-12 col-lg-12" v-if="type == 'institution' && !Loading && results!=''">
                            <div class="section3125 mt-30">
                                <h4 class="item_title">Institutions</h4>
                                <div class="la5lo1">
                                    <div class="Student_says">   
                                        <div class="item" v-for="institude in results" :key="institude">
                                            <router-link :to="'/Dinstitude/'+institude._id">
                                            <div class="fcrse_4 mb-20">
                                                <div class="say_content" style="word-wrap: break-word;">
                                                    <p>@ {{institude.address}}</p>
                                                    <Ratings :id="institude._id" :type="'institution'" />
                                                </div>
                                                
                                                <div class="st_group">
                                                    <div class="stud_img">
                                                        <img :src="backEnd+'institution/institutionImage/'+institude._id" alt="">												
                                                    </div>
                                                    <h4>{{institude.institutionName}}</h4>
                                                </div>											
                                            </div>
                                            </router-link>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <br><br><br>
							<center>
								<button class="live_link" type="button" v-if="!Loading" @click="fetchMore">Load More</button>	
							</center>
							<br><br><br>
                        </div>
                        <div class="col-md-12" v-if="Loading">
                            <div class="main-loader mt-50">													
                                <div class="spinner">
                                    <div class="bounce1"></div>
                                    <div class="bounce2"></div>
                                    <div class="bounce3"></div>
                                </div>																										
                            </div>
                        </div>	
                        <div class="col-md-12" v-if="results=='' && tried ">
                            <center>
                                <div class="noResults">
                                    <h3 class="noResults">No Results For this </h3>
                                </div>
                            </center>
                        </div>		
                    </div>
                </div>
            </div>
            <br><br><br><br><br><br>
            <Dfooter />
        </div>
	<!-- Body End -->
    </div>
</template>
<script>
import CourseTime from "@/components/CourseTime";
import TotalSeenCourse from "@/components/TotalSeenCourse";
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
import Loading from "@/components/Loading.vue";
import Ratings from "@/components/dashboard/Ratings.vue";
import ProfileImage from "@/components/ProfileImage";
import { mapActions, mapGetters } from "vuex";
export default {
    name: 'Dexplore',
    data(){
        return{
            searchItem: '',
            type: 'recentCourse',
            results: '',
            Loading: false,
            tried: false,
            skip : 0
        }
    },
    components: {
        Dheader,
        Dnav1,
        Loading,
        Dfooter,
        CourseTime,
        TotalSeenCourse,
        ProfileImage,
        Ratings
    },
    computed: {
        ...mapGetters(['backEnd'])
    },
    methods: {
        ...mapActions(['search_Items','fetch_recent_courses']),
        search(type){
            this.skip = 0
            this.Loading = true
            this.type = type
            let object = {
                search: this.searchItem,
                type: type,
                skip: this.skip
            }
            this.search_Items(object)
            .then(res => {
                this.results = res.data
                this.Loading = false
                this.tried = true
            })
        },
        fetchMore(){
            this.skip = this.skip + 10
            if (this.searchItem=='') {
                this.fetch_recent_courses(this.skip)
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        const element = res.data[i];
                        this.results.push(element)
                    }
                })
            }else{
                this.Loading = true
                let object = {
                    search: this.searchItem,
                    type: this.type,
                    skip: this.skip
                }
                this.search_Items(object)
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        const element = res.data[i];
                        this.results.push(element)
                    }
                    this.Loading = false
                    this.tried = true
                })
            }
            
            
        }
    },   
    mounted(){
        this.fetch_recent_courses(this.skip)
        .then(res => {
            this.results = res.data
        })
    }
}
</script>
<style >
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
		min-width: 3000px;
	}

	.top_instrutors .scroll{
		min-height: 200px;
		min-width: 3000px;
	}

	.Student_says .scroll{
		align-items: left;
		min-height: 200px;
		min-width: 3000px;
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
    .pageInActive{
        padding: 15px;
        min-width: 30px;
        cursor: pointer
    }

    .pageActive{
        padding: 15px;
        background-color: red;
        color: white;
        border-radius: 10px;
    }

    .noResults{
        padding: 50px;
    }

    .nav-link{
        cursor: pointer;
    }

</style>
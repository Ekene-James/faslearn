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
                                        <router-link :to="'/Dteachers/e'">
                                        <li ><a class="ct_item" v-bind:class="{ active: picked=='e'}"><i class='uil uil-arrow'></i>All</a></li>
                                        </router-link>
                                        <router-link :to="'/Dteachers/'+c._id" v-for="c in categories" :key="c">
                                        <li ><a class="ct_item" v-bind:class="{ active: picked==c._id}"><i class='uil uil-arrow'></i>{{c.name}}</a></li>
                                        </router-link>
                                    </ul>
                                </div>						
                            </div>							
                        </div>
                        	
                        <div class="col-md-9">
                            <div class="_14d25">
                                <div class="row">
									<Loading v-if="Loading"/>
                                    <div class="col-lg-4 col-md-6" v-for="t in teachers" :key="t">
										<router-link :to="'/Dprofile/'+t.user[0]._id">
                                        <div class="fcrse_1 mt-30">
                                            <div class="tutor_img">
                                                <a ><ProfileImage :id="t.user[0]._id" /></a>												
                                            </div>
                                            <div class="tutor_content_dt">
                                                <div class="tutor150">
                                                    <a class="tutor_name">{{t.user[0].firstName}} {{t.user[0].lastName}}</a>
                                                    <div class="mef78" title="Verify">
                                                        <i class="uil uil-check-circle"></i>
                                                    </div>
                                                </div>
                                                <div class="tutor_cate">{{t.expertise}}</div>
												<Ratings :id="t.user[0]._id" :type="'instructor'" />
                                                <!-- <ul class="tutor_social_links">
                                                    <li><a href="#" class="fb"><i class="fab fa-facebook-f"></i></a></li>
                                                    <li><a href="#" class="tw"><i class="fab fa-twitter"></i></a></li>
                                                    <li><a href="#" class="ln"><i class="fab fa-linkedin-in"></i></a></li>
                                                    <li><a href="#" class="yu"><i class="fab fa-youtube"></i></a></li>
                                                </ul> -->
                                                <div class="tut1250">
                                                    <span class="vdt15">{{t.category[0].name}}</span>
                                                    <!-- <span class="vdt15">15 Courses</span> -->
                                                </div>
                                            </div>
                                        </div>
										</router-link>										
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
                                </div>				
                            </div>
							<br><br><br>
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
import Loading from '@/components/Loading.vue'
import ProfileImage from "@/components/ProfileImage";
import Ratings from '@/components/site/Ratings.vue'
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'Dteachers',
	data(){
		return{
			teachers: '',
			category: '',
			picked: 'e',
			categories: '',
			Loading: false,
			skip: 0
		}
	},
    components: {
        Dheader,
		Dnav1,
		ProfileImage,
		Ratings,
		Dfooter,
		Loading
	},
	computed: {
		...mapGetters(['loader'])
	},
	watch: {

        $route() {
			this.picked= this.$route.params.id
			this.skip = 0
            this.fetch_AllInstructorByCategory({catId : this.picked, skip: this.skip})
			.then(res => {
				this.teachers = res.data
			})
		},

		loader: function () {
            if (this.loader == 'loading') {
                this.Loading = true
            }else{
                this.Loading = false
            }
        }
		
        
	},   
	methods: {
		...mapActions(['fetch_categories']),
		...mapActions(['fetch_AllInstructorByCategory']),
		fetchMore(){
            this.skip = this.skip + 10
            this.fetch_AllInstructorByCategory({catId : this.picked, skip: this.skip})  
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
                    this.teachers.push(element)
                }
            })
        }
	},
    mounted(){
		this.picked = this.$route.params.id
		this.fetch_categories()
		.then(res => {
			this.categories = res.data
		})
		
		this.fetch_AllInstructorByCategory({catId: this.picked, skip: this.skip})
		.then(res => {
			this.teachers = res.data
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

	.active{
        background-color: red;
        width: 100%;
        height: 40px;
        border-radius: 20px;
        color: white;
    }
	

</style>
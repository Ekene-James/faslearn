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
					
					<div class="col-xl-12 col-lg-12">
						<div class="section3125 mt-30">
							<h4 class="item_title">Institutions</h4>
							<div class="la5lo1">
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
                            <br><br><br>
							<center>
								<button class="live_link" type="button" v-if="!Loading" @click="fetchMore">Load More</button>	
							</center>
							<br><br><br>
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
import Ratings from '@/components/dashboard/Ratings.vue'
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
    name: 'Dhome',
    data() {
        return{
            all_Instructors: '',
            recentCourses: '',
            allInstitutions: '',
            purchasedCourses: '',
            user: '',
            skip: 0
        }
    },
    components: {
        Dheader,
        Dnav1,
        Ratings,
        Dfooter
    },
    computed: {
        ...mapGetters(['isInstructor']),
        ...mapGetters(['backEnd'])
    },
    methods: {
        ...mapActions(['fetch_all_institutions']),
        fetchMore(){
            this.Loading = true
            this.skip = this.skip + 10
            this.fetch_all_institutions(this.skip)
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
                    this.allInstitutions.push(element)
                }
                this.Loading = false
            })
        }
    },  
    mounted(){
        this.fetch_all_institutions(this.skip)
        .then(res => {
            this.allInstitutions = res.data
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
   
   

</style>
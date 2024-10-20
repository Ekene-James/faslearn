<template>
 <div>
<!-- Header Start -->
	<Dheader />
<!-- Header End -->
<!-- Left Sidebar Start -->
	<Dnav2 />
<!-- Left Sidebar End -->
<!-- Body Start -->
<div class="wrapper">
	<div class="sa4d25">
		<div class="container">			
			<div class="row">
				<div class="col-lg-12">	
					<h2 class="st_title"><i class="uil uil-analysis"></i> Manage Course Affiliations</h2>
				</div>					
			</div>				
			<div class="row">
				<div class="col-12">
					<div class="course_tabs_1">
						<div id="add-course-tab" class="step-app">
							<ul class="step-steps">
								<li class="pageInActive">
									<router-link :to="'/Deditcourse/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name">General Information</span>
									</a>
									</router-link>
								</li>
								<li class="pageInActive">
                                    <router-link :to="'/Dnewcoursecontent/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name">Course Sections</span>
									</a>
                                    </router-link>
								</li>
								<li class="pageActive">
									<router-link :to="'/DnewcourseAffiliation/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name" style="color: white;">Affiliations</span>
									</a>
									</router-link>
								</li>
								<li class="pageInActive">
									<router-link :to="'/DnewcourseTest/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name">Set Test</span>
									</a>
									</router-link>
								</li>
							</ul>
							<div class="step-content" v-if="isAuthor">
								<div class="step-tab-panel step-tab-location" id="tab_step3">
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-film"></i>My Institutions</h3>
										</div>
										<div class="course__form">
											<div class="row">
												<div class="col-lg-12">		
													<div class="extra_info" style="padding: 40px">		
														<h4 class="part__title">Choose Institutions</h4>
														<p><strong>NB</strong><i>Please note that you can only do this once, after now you can not add or remove any institution for this course's Affiliation list</i></p>
													</div>
                                                    <div class="view_info10">
                                                        <div class="row">
                                                            <div class="col-lg-12 col-md-12">															
																<div class="ui search focus mt-30 lbel25" v-if="canProceed">
																	<label>Which institution do you wish to affiliate this course to</label>
																	<div v-for="l in lecturer.institutionsEmployed" :key="l">
																		<input name="unn1" type="checkbox" :value="l.institutionId[0]._id" v-model="institution_Ids" style="display: inline-block; width: 20px; height: 20px;" :disabled="!l.accepted">
																		<label for="unn1" style="display:inline-block">.         {{l.institutionId[0].institutionName}}     .</label>
																	</div>
																	<br>
																	
																</div>
																<div class="ui search focus mt-30 lbel25" v-else>
																	<label>You can add Affiliations just once in one course</label>
																	<div v-for="l in lecturer.institutionsEmployed" :key="l">
																		<input name="unn1" type="checkbox" :value="l.institutionId[0]._id" v-model="institution_Ids" style="display: inline-block; width: 20px; height: 20px;" disabled>
																		<label for="unn1" style="display:inline-block">.         {{l.institutionId[0].institutionName}}     .</label>
																	</div>
																	<br>
																	
																</div>										
															</div>
                                                            <Loading v-if="Loading" />
                                                            <Errors v-if="error">
                                                                <ul>
                                                                    <li v-for="error in error" :key="error">{{error}}</li>	
                                                                </ul>
                                                            </Errors>
                                                            <Success v-if="success">
                                                                <ul>
                                                                    <li>Action Successful</li>	
                                                                </ul>
                                                                <p></p>
                                                            </Success>
                                                            <div class="col-lg-12 col-md-12">
																<div class="save_content" v-if="isInstructor">
																	<button v-if="!Loading&&canProceed&&!success" class="save_content_btn" type="Submit" id="btn" @click.prevent="affiliateCourse()" :disabled="institution_Ids.length==0">Save Affiliations</button>
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
							<div class="step-footer step-tab-pager" v-if="isInstructor" style="opacity: 0">
								<button v-if="!Loading" class="btn btn-default steps_btn"  :disabled="institution_Ids==[]">Submit for Review</button>
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
import { mapActions, mapGetters } from 'vuex'
import Errors from '@/components/Errors.vue'
import Success from '@/components/Success.vue'
import Loading from '@/components/Loading.vue'
import Dheader from '@/components/dashboard/Header.vue'
import Dnav2 from '@/components/dashboard/Nav2.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
	name: 'Dhome',
	data(){
		return{
			courseId: '', 
			userId: '',
			lecturer: '',
			institution_Ids: [],
			Loading: false,
			success : false,
			isAuthor: false,
			courseDetails: '',
			canProceed: false
		}
	},
	computed:{
		...mapGetters(['error']),
        ...mapGetters(['isInstructor'])
	},
    components: {
        Dheader,
        Dnav2,
		Dfooter,
		Errors,
		Success,
		Loading
	},
	methods: {
		...mapActions(['fetchInstructor_Details']),
		...mapActions(['applyCourse_Affiliation']),
		...mapActions(['view_CourseForEdit']),
		affiliateCourse(){
			this.Loading = true
			let object = {
				courseId : this.courseId,
				institutionIds: this.institution_Ids
			}
			this.applyCourse_Affiliation(object)
			.then(res => {
				this.Loading = false
				this.success = res.data.isSuccess
			})
		}
	},  
    mounted(){
		this.courseId = this.$route.params.id
		this.userId = localStorage.getItem('fmruser')
        this.fetchInstructor_Details(this.userId)
        .then(res => {
			this.lecturer = res.data[0]
		})
		this.view_CourseForEdit(this.courseId)
		.then(res => {
			this.courseDetails = res.data
			if (this.courseDetails.user==this.userId) {
				this.isAuthor = true
			}
			if (this.courseDetails.affiliatedInstitutions.length == 0) {
				this.canProceed = true
			}
			let ids = []
			for (let i = 0; i < this.courseDetails.affiliatedInstitutions.length; i++) {
				const element = this.courseDetails.affiliatedInstitutions[i];
				ids.push(element.institutionId[0])
			}
			this.institution_Ids = ids
		})
    }

    //http://localhost:8080/Dnewcoursecontent/606dbb80b1fc8e099c5ff8fc
}
</script>
<style >
    @import url("../assets/css/style.css");
    @import url("http://fonts.googleapis.com/css?family=Roboto:400,700,500");
    @import url("../assets/vendor/unicons-2.0.1/css/unicons.css");
    @import url("../assets/css/instructor-dashboard.css");
    @import url("../assets/css/vertical-responsive-menu.min.css");
    @import url("../assets/css/instructor-dashboard.css");
    @import url("../assets/css/instructor-responsive.css");
    @import url("../assets/css/responsive.css");
    @import url("../assets/css/night-mode.css");
    @import url("../assets/vendor/fontawesome-free/css/all.min.css");
    @import url("../assets/vendor/OwlCarousel/assets/owl.carousel.css");
    @import url("../assets/vendor/OwlCarousel/assets/owl.theme.default.min.css");
    @import url("../assets/vendor/bootstrap/css/bootstrap.min.css");
    @import url("../assets/vendor/semantic/semantic.min.css");

	.pageInActive{
        padding: 10px;
        width: 33%;
    }

    .pageActive{
        padding: 10px;
        background-color: red;
        color: white;
        width: 33%;
        border-radius: 10px;
    }
</style>
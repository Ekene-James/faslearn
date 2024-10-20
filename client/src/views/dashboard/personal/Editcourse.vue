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
					<h2 class="st_title"><i class="uil uil-analysis"></i> Create New Course</h2>
				</div>					
			</div>				
			<div class="row">
				<div class="col-12">
					<div class="course_tabs_1">
						<div id="add-course-tab" class="step-app">
							<ul class="step-steps">
								<li class="pageActive">
									<a >
										<span class="number"></span>
										<span class="step-name" style="color: white;">General Information</span>
									</a>
								</li>
								<li class="pageInActive">
                                    <router-link :to="'/Dnewcoursecontent/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name" >Course Sections</span>
									</a>
                                    </router-link>
								</li>
								<li class="pageInActive">
                                    <router-link :to="'/DnewcourseAffiliation/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name">Affiliations</span>
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
							<div class="step-content">
								<div class="step-tab-panel step-tab-info active" id="tab_step1"> 
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-info-circle"></i>General Information</h3>
										</div>
										<div class="course__form">
											<div class="general_info10">
												<div class="row">
													<div class="col-lg-6 col-md-6">															
														<div class="ui search focus mt-30 lbel25">
															<label>Course Title*</label>
															<div class="ui left icon input swdh19">
																<input class="prompt srch_explore" type="text" placeholder="Insert your course title." name="title" data-purpose="edit-course-title" maxlength="60" v-model="title">															
																<div class="badge_num">60</div>
															</div>
														</div>									
													</div>
													<div class="col-lg-6 col-md-6">															
														<div class="ui search focus mt-30 lbel25">
															<label>Course Subtitle*</label>
															<div class="ui left icon input swdh19">
																<input class="prompt srch_explore" type="text" placeholder="Insert your course Subtitle." name="subtitle" data-purpose="edit-course-title" maxlength="60" v-model="secondTitle">															
																<div class="badge_num2">120</div>
															</div>
														</div>									
													</div>
													<div class="col-lg-12 col-md-12">
														<div class="course_des_textarea mt-30 lbel25">
															<label>Course Description*</label>
															<div class="course_des_bg">
																<div class="textarea_dt">															
																	<div class="ui form swdh339">
																		<div class="field">
																			<textarea rows="5" name="description" id="id_course_description" placeholder="Insert your course description" v-model="description"></textarea>
																		</div>
																	</div>										
																</div>
															</div>
														</div>
													</div>
													<div class="col-lg-6 col-md-6">															
														<div class="ui search focus mt-30 lbel25">
															<label>What Students Learn*</label>
															<div class="ui left icon input swdh19">
																<input class="prompt srch_explore" type="text" placeholder="Insert What students Learn from Course" v-model="whatYouLearn">															
																<div class="badge_num2">120</div>
															</div>
														</div>									
													</div>
													<div class="col-lg-4 col-md-12">
														<div class="mt-30 lbel25">
															<label>Requirement*</label>
														</div>
														<select class="ui hj145 dropdown cntry152 prompt srch_explore" v-model="requirement">
															<option value="">Select requirement</option>
															<option value="None">None</option>
															<option value="O_level">O'level</option>
															<option value="Bachelor degree">Bachelor degree</option>
															<option value="Masters">Masters</option>
														</select>
													</div>
													<div class="col-lg-4 col-md-6">
														<div class="mt-30 lbel25">
															<label>Course Category*</label>
														</div>
														<select class="ui hj145 dropdown cntry152 prompt srch_explore" v-model="category" @change="setSubCat()">
															<option value="" :selected="true">Select Category</option>
															<option :value="c._id" v-for="c in categories" :key="c">{{c.name}}</option>
														</select>
													</div>
													<div class="col-lg-4 col-md-6">
														<div class="mt-30 lbel25">
															<label>Course Subcategory*</label>
														</div>
														<select class="ui hj145 dropdown cntry152 prompt srch_explore" v-model="subCategory">
															<option value="">Select Subcategory</option>
															<option :value="c._id" v-for="c in subCategories" :key="c">{{c.name}}</option>
														</select>
													</div>													
												</div>
											</div>
											<div class="price_course">
												<div class="row">
													<div class="col-lg-12">
														<div class="price_title">
															<h4><i class="uil uil-dollar-sign-alt"></i>Pricing</h4>
														</div>
													</div>
													<div class="col-lg-2 col-md-3 col-sm-6">
														<div class="mt-30 lbel25">
															<label>Currency*</label>
														</div>
														<select class="ui hj145 dropdown cntry152 prompt srch_explore">
															<option value="naira">Naira</option>
														</select>
													</div>
													<!-- <div class="col-lg-6 col-md-6">															
														<div class="ui search focus mt-30 lbel25">
															<label>What is Course Price*</label>
															<div class="ui left icon input swdh19">
																<input class="prompt srch_explore" type="number" placeholder="Insert Course Price" v-model="price">															
																<div class="badge_num2">120</div>
															</div>
														</div>									
													</div> -->
                                                    <div class="col-lg-2 col-md-3 col-sm-6">
														<div class="mt-30 lbel25">
															<label>Who can buy this course*</label>
														</div>
														<select class="ui hj145 dropdown cntry152 prompt srch_explore" v-model="visibilty">
															<option value="Everyone">Everyone</option>
                                                            <option value="Only institution Students">Only institution Students</option>
														</select>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-image-upload"></i>View</h3>
										</div>
										<div class="course__form">
											<div class="view_info10">
												<div class="row">
													<div class="col-lg-12">	
														<div class="view_all_dt">	
															<div class="view_img_left">	
																<div class="view__img">	
																	<img v-bind:src="backEnd+'public/courseImage/'+courseId" alt="" id="previewImage">
																</div>
															</div>
															<div class="view_img_right">	
																<h4>Cover Image</h4>
																<p>Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</p>
																<div class="upload__input">
																	<div class="input-group">
																		<div class="custom-file">
																			<input type="file" class="custom-file-input" id="thumbnail" ref="thumbnail" v-on:change="handleFileUpload()">
																			<label class="custom-file-label" for="inputGroupFile04" id="thumbnaildisplay">No Choose file</label>
																		</div>
																	</div>
																</div>
                                                                <div class="step-footer step-tab-pager" v-if="isInstructor&&thumbnail!=''&&canProceed">
                                                                    <button v-if="!success" class="btn btn-default steps_btn" id="btn">Update thumbnail</button>
                                                                </div>
															</div>
														</div>
														<!-- <div class="view_all_dt">	
															<div class="view_img_left">	
																<div class="view__img">	
																	<img src="../assets/images/courses/add_video.jpg" alt="">
																</div>
															</div>
															<div class="view_img_right">	
																<h4>Promotional Video</h4>
																<p>Students who watch a well-made promo video are 5X more likely to enroll in your course. We've seen that statistic go up to 10X for exceptionally awesome videos. Learn how to make yours awesome!</p>
																<div class="upload__input">
																	<div class="input-group">
																		<div class="custom-file">
																			<input type="file" class="custom-file-input" id="inputGroupFile05">
																			<label class="custom-file-label" for="inputGroupFile05">No Choose file</label>
																		</div>
																	</div>
																</div>
                                                                <div class="step-footer step-tab-pager" v-if="isInstructor&&previewVideo!=''&&canProceed">
                                                                    <button v-if="!success" class="btn btn-default steps_btn"  id="btn">Update Preview Video</button>
                                                                </div>
															</div>
														</div> -->
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<Errors v-if="error!=''">
									<ul>
										<li v-for="error in error" :key="error">{{error}}</li>	
									</ul>
								</Errors>
								<br>
								<Success v-if="success">
									<ul>
										<li>Action Successful</li>
										<li>All changes saved</li>	
									</ul>
									<p></p>
								</Success>	
								
							</div>
							<Loading v-if="Loading" />
                            <br><br><br>
                            <div class="step-footer step-tab-pager" style="margin: 15px" v-if="isInstructor">
                                <button  class="btn btn-default steps_btn" @click.prevent="saveChanges()">Save Changes</button>
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
			userId:'', 
			title:'', 
			whatYouLearn:'',
			requirement:'', 
			description:'', 
			secondTitle:'', 
            category:'', 
            subCategory: '',
			price:'',
            thumbnail:'',
            previewVideo: '',
            isImagePresent: false,
			newCourseId: '',
            success : false,
            categories: '',
            subCategories: '',
            visibilty: '',
            error: '',
            Loading: false
		}
	},
	computed:{
        ...mapGetters(['isInstructor']),
        ...mapGetters(['backEnd'])
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
		...mapActions(['editCourse']),
        ...mapActions(['check_user_instructor']),
        ...mapActions(['fetch_categories']),
        ...mapActions(['view_CourseForEdit']),
		saveChanges(){
			this.Loading = true
			//document.getElementById('btn').style.display = 'none';
			//let id = localStorage.getItem('fmruser');
			let formData = new FormData();
            formData.append('courseId', this.courseId);
			formData.append('title', this.title);
			formData.append('whatYouLearn', this.whatYouLearn);
			formData.append('requirement', this.requirement);
			formData.append('description', this.description);
			formData.append('secondTitle', this.secondTitle);
            formData.append('category', this.category);
            formData.append('subCategory', this.subCategory);
            formData.append('price', this.price);
            formData.append('visibilty', this.visibilty); 
            formData.append('thumbnail', this.thumbnail);
            formData.append('isImagePresent', this.isImagePresent);
			this.editCourse(formData)
            .then(res => {
				this.Loading = false
                this.success = res.data.success;
				
			})
			.catch(err => {
				document.getElementById('btn').style.display = 'block';
				console.log(err)
			})
		},

		handleFileUpload(){
            if (this.validateFile(this.$refs.thumbnail.files[0])) {
                this.thumbnail = this.$refs.thumbnail.files[0];
                const file = this.$refs.thumbnail.files[0];
                const previewImage = document.getElementById('previewImage');
                if (file) {
                    const reader = new FileReader();
                    reader.addEventListener("load", function () {
                        previewImage.setAttribute('src', this.result);
                    });
                    reader.readAsDataURL(file);
                }
                document.getElementById('thumbnaildisplay').innerHTML = this.thumbnail
                this.isImagePresent = true
            }
        },
        setSubCat(){
            this.subCategory = ''
            for (let i = 0; i < this.categories.length; i++) {
                const element = this.categories[i];
                if (element._id == this.category) {
                    this.subCategories = element.subCategory
                }
                
            }
        },
        validateFile(file){
            let flag = true;
            let message = '';
            let error =[];
            const allowedExtensions =  ['jpg','png','jpeg','JPG','PNG','JPEG'];
            //const allowedExtensionsL =  ['jpg','png','jpeg','JPG','PNG','JPEG','pdf','PDF']
            if (!allowedExtensions.includes(file.name.split(".").pop())) {
                message = 'Please insert a valid image file';
                error.push(message)
                flag = false
            }
            
            if (file.name.size > 1000000) {
                message = 'Please insert smaller size image less than 1mb';
                error.push(message)
                flag = false
            }
            if (flag == true) {
                this.error = ''
                return true
            }else{
                this.error = error
                return false
            }
        },
	},  
    mounted(){ 
        this.courseId = this.$route.params.id
		this.userId = localStorage.getItem('fmruser');
        this.fetch_categories()
        .then(res => {
            this.categories = res.data
        }),

        this.view_CourseForEdit(this.courseId)
        .then(res =>{
            //this.course = res.data
            this.title= res.data.title 
			this.whatYouLearn= res.data.whatYouLearn
			this.requirement = res.data.requirement 
			this.description= res.data.description 
			this.secondTitle= res.data.secondTitle 
            this.category= res.data.category[0] 
            this.visibilty = res.data.visibilty
            this.subCategory= res.data.subCategory[0]
            this.price= res.data.price.$numberDecimal
            for (let i = 0; i < this.categories.length; i++) {
                const element = this.categories[i];
                if (element._id == this.category) {
                    this.subCategories = element.subCategory
                }
                
            }
            // this.amount = this.course.price.$numberDecimal
            // this.instructor = res.data.instructor
            // let what = this.course.whatYouLearn+''
            // this.whatYouLearn = what.split(',')
        })
    }
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
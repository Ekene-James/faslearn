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
								<li class="pageInActive" v-if="newCourseId!=''">
									<router-link :to="'/Dnewcoursecontent/'+ this.newCourseId">
									<a >
										<span class="number"></span>
										<span class="step-name" >Course Sections</span>
									</a>
									</router-link>
								</li>
								<li class="pageInActive" v-if="newCourseId!=''">
									<router-link :to="'/DnewcourseAffiliation/'+ this.newCourseId">
									<a >
										<span class="number"></span>
										<span class="step-name">Affiliations</span>
									</a>
									</router-link>
								</li>
								<li class="pageInActive" v-if="newCourseId!=''">
									<router-link :to="'/DnewcourseTest/'+ this.newCourseId">
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
																<input class="prompt srch_explore" type="text" placeholder="differentiate with a comma (,)" v-model="whatYouLearn">															
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
													<div class="col-lg-6 col-md-6">															
														<div class="ui search focus mt-30 lbel25">
															<label>What is Course Price*</label>
															<div class="ui left icon input swdh19">
																<input class="prompt srch_explore" type="number" placeholder="Insert Course Price" v-model="price">															
																<div class="badge_num2">120</div>
															</div>
														</div>									
													</div>
													<div class="col-lg-2 col-md-3 col-sm-6">
														<div class="mt-30 lbel25">
															<label>Who can buy this course*(visibilty)</label>
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
																	<img src="../assets/images/courses/add_img.jpg" alt="" id="previewImage">
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
															</div>
														</div> -->
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								<!-- <div class="step-tab-panel step-tab-gallery" id="tab_step2">
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
																	<img src="assets/images/courses/add_img.jpg" alt="">
																</div>
															</div>
															<div class="view_img_right">	
																<h4>Cover Image</h4>
																<p>Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</p>
																<div class="upload__input">
																	<div class="input-group">
																		<div class="custom-file">
																			<input type="file" class="custom-file-input" id="inputGroupFile04">
																			<label class="custom-file-label" for="inputGroupFile04">No Choose file</label>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="view_all_dt">	
															<div class="view_img_left">	
																<div class="view__img">	
																	<img src="assets/images/courses/add_video.jpg" alt="">
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
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="step-tab-panel step-tab-location" id="tab_step3">
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-film"></i>Course Content</h3>
										</div>
										<div class="course__form">
											<div class="row">
												<div class="col-lg-12">		
													<div class="extra_info">		
														<h4 class="part__title">New Course Content</h4>
													</div>
													<div class="view_info10">
														<div class="row">
															<div class="col-lg-12 col-md-12">															
																<div class="ui search focus mt-30 lbel25">
																	<label>Course Content Title*</label>
																	<div class="ui left icon input swdh19">
																		<input class="prompt srch_explore" type="text" placeholder="Insert your course content title." name="title" data-purpose="edit-course-title" maxlength="60" id="Content[title]" value="">															
																	</div>
																</div>									
															</div>
															<div class="col-lg-12 col-md-12">	
																<div class="lecture_title">
																	<h4>Add Lecture</h4>
																</div>
															</div>
															<div class="col-lg-4 col-md-12">															
																<div class="ui search focus mt-30 lbel25">
																	<label>Lecture Title*</label>
																	<div class="ui left icon input swdh19">
																		<input class="prompt srch_explore" type="text" placeholder="Insert your lecture title." name="title" data-purpose="edit-course-title" maxlength="60" id="lecture[title]" value="">															
																	</div>
																</div>									
															</div>
															<div class="col-lg-4 col-md-6">
																<div class="part_input mt-30 lbel25">
																	<label>File*</label>
																	<div class="input-group">
																		<div class="custom-file">
																			<input type="file" class="custom-file-input" id="inputGroupFile06">
																			<label class="custom-file-label" for="inputGroupFile06">No Choose file - (Pdf, Video)</label>
																		</div>
																	</div>
																</div>
															</div>
															<div class="col-lg-4 col-md-6">	
																<div class="ui search focus mt-30 lbel25">
																	<label>Sort</label>
																	<div class="ui left icon input swdh19">
																		<input class="prompt srch_explore" type="number" name="sort" min="0" max="100" placeholder="0">															
																	</div>
																</div>										
															</div>
															<div class="col-lg-12 col-md-12">	
																<div class="course_des_textarea mt-30 lbel25">
																	<label>Description*</label>
																	<div class="course_des_bg">
																		<ul class="course_des_ttle">
																			<li><a href="#"><i class="uil uil-bold"></i></a></li>
																			<li><a href="#"><i class="uil uil-italic"></i></a></li>
																			<li><a href="#"><i class="uil uil-list-ul"></i></a></li>
																			<li><a href="#"><i class="uil uil-left-to-right-text-direction"></i></a></li>
																			<li><a href="#"><i class="uil uil-right-to-left-text-direction"></i></a></li>
																			<li><a href="#"><i class="uil uil-list-ui-alt"></i></a></li>
																			<li><a href="#"><i class="uil uil-link"></i></a></li>
																			<li><a href="#"><i class="uil uil-text-size"></i></a></li>
																			<li><a href="#"><i class="uil uil-text"></i></a></li>
																		</ul>
																		<div class="textarea_dt">															
																			<div class="ui form swdh339">
																				<div class="field">
																					<textarea rows="5" name="description" id="id_part_description" placeholder="Insert your course part description"></textarea>
																				</div>
																			</div>										
																		</div>
																	</div>
																</div>
															</div>
															<div class="col-lg-5 col-md-6">															
																<div class="ui search focus mt-30 lbel25">
																	<label>Volume*</label>
																	<div class="ui left icon input swdh19 swdh95">
																		<input class="prompt srch_explore" type="number" min="0" name="size" required="" placeholder="0">															
																		<div class="badge_mb">MB</div>
																	</div>
																</div>									
															</div>
															<div class="col-lg-5 col-md-6">															
																<div class="ui search focus mt-30 lbel25">
																	<label>Duration*</label>
																	<div class="ui left icon input swdh19 swdh55">
																		<input class="prompt srch_explore" type="number" min="0" name="duration" required="" placeholder="0">															
																		<div class="badge_min">Minutes</div>
																	</div>
																</div>									
															</div>
															<div class="col-lg-2 col-md-12">
																<button class="part_btn_save prt-sv" type="submit">Save Lecture</button>
															</div>
															<div class="col-lg-12 col-md-12">
																<div class="table-responsive mt-50 mb-0">
																	<table class="table ucp-table">
																		<thead class="thead-s">
																			<tr>
																				<th class="text-center" scope="col">Lecture</th>
																				<th class="cell-ta">Title</th>
																				<th class="text-center" scope="col">Volume</th>
																				<th class="text-center" scope="col">Duration</th>
																				<th class="text-center" scope="col">Page</th>
																				<th class="text-center" scope="col">File</th>
																				<th class="text-center" scope="col">Controls</th>
																			</tr>
																		</thead>
																		<tbody>
																			<tr>
																				<td class="text-center">1</td>
																				<td class="cell-ta">Lecture Content Title</td>
																				<td class="text-center">25</td>
																				<td class="text-center">6</td>
																				<td class="text-center">0</td>
																				<td class="text-center"><a href="#">Video</a></td>
																				<td class="text-center">
																					<a href="#" title="Edit" class="gray-s"><i class="uil uil-edit-alt"></i></a>
																					<a href="#" title="Delete" class="gray-s"><i class="uil uil-trash-alt"></i></a>
																				</td>
																			</tr>
																			<tr>
																				<td class="text-center">2</td>
																				<td class="cell-ta">Lecture Content Title</td>
																				<td class="text-center">25</td>
																				<td class="text-center">0</td>
																				<td class="text-center">3</td>
																				<td class="text-center"><a href="#">File</a></td>
																				<td class="text-center">
																					<a href="#" title="Edit" class="gray-s"><i class="uil uil-edit-alt"></i></a>
																					<a href="#" title="Delete" class="gray-s"><i class="uil uil-trash-alt"></i></a>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>
															<div class="col-lg-12 col-md-12">
																<div class="save_content">
																	<button class="save_content_btn" type="Submit">Save Course Content</button>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="table-responsive mt-30">
											<table class="table ucp-table" id="content-table">
												<thead class="thead-s">
													<tr>
														<th class="text-center" scope="col">Content</th>
														<th class="cell-ta">Title</th>
														<th class="text-center" scope="col">lectures</th>
														<th class="text-center" scope="col">Volume</th>
														<th class="text-center" scope="col">Duration</th>
														<th class="text-center" scope="col">Upload Date</th>
														<th class="text-center" scope="col">Files</th>
														<th class="text-center" scope="col">Controls</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td class="text-center">1</td>
														<td class="cell-ta">Course Content Title</td>
														<td class="text-center">5</td>
														<td class="text-center">50</td>
														<td class="text-center">15</td>
														<td class="text-center">6 April 2019</td>
														<td class="text-center"><a href="#">View</a></td>
														<td class="text-center">
															<a href="#" title="Edit" class="gray-s"><i class="uil uil-edit-alt"></i></a>
															<a href="#" title="Delete" class="gray-s"><i class="uil uil-trash-alt"></i></a>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								
								<div class="step-tab-panel step-tab-amenities" id="tab_step4">
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-file-copy-alt"></i>Extra Information</h3>
										</div>
										<div class="course__form">
											<div class="row">
												<div class="col-lg-12">		
													<div class="extra_info">		
														<h4 class="part__title">Captions</h4>
													</div>
													<div class="view_info10">
														<div class="row">
															<div class="col-md-4">
																<div class="caption__check mt-30">
																	<div class="ui form">
																		<div class="grouped fields">										
																			<div class="ui form checkbox_sign cp_458">
																				<div class="inline field">
																					<div class="ui checkbox mncheck">
																						<input type="checkbox" tabindex="0" class="hidden">
																						<label>English<span class="filter__counter">(300)</span></label>
																					</div>
																				</div>
																			</div>
																			<div class="ui form checkbox_sign cp_458">
																				<div class="inline field">
																					<div class="ui checkbox mncheck">
																						<input type="checkbox" tabindex="0" class="hidden">
																						<label>Español<span class="filter__counter">(210)</span></label>
																					</div>
																				</div>
																			</div>
																			<div class="ui form checkbox_sign cp_458">
																				<div class="inline field">
																					<div class="ui checkbox mncheck">
																						<input type="checkbox" tabindex="0" class="hidden">
																						<label>Português<span class="filter__counter">(170)</span></label>
																					</div>
																				</div>
																			</div>
																			<div class="ui form checkbox_sign cp_458">
																				<div class="inline field">
																					<div class="ui checkbox mncheck">
																						<input type="checkbox" tabindex="0" class="hidden">
																						<label>Italiano<span class="filter__counter">(174)</span></label>
																					</div>
																				</div>
																			</div>
																			<div class="ui form checkbox_sign cp_458">
																				<div class="inline field">
																					<div class="ui checkbox mncheck">
																						<input type="checkbox" tabindex="0" class="hidden">
																						<label>Français<span class="filter__counter">(120)</span></label>
																					</div>
																				</div>
																			</div>
																			<div class="ui form checkbox_sign cp_458">
																				<div class="inline field">
																					<div class="ui checkbox mncheck">
																						<input type="checkbox" tabindex="0" class="hidden">
																						<label>Polski<span class="filter__counter">(130)</span></label>
																					</div>
																				</div>
																			</div>
																			<div class="ui form checkbox_sign cp_458">
																				<div class="inline field">
																					<div class="ui checkbox mncheck">
																						<input type="checkbox" tabindex="0" class="hidden">
																						<label>Deutsch<span class="filter__counter">(30)</span></label>
																					</div>
																				</div>
																			</div>
																			<div class="ui form checkbox_sign cp_458">
																				<div class="inline field">
																					<div class="ui checkbox mncheck">
																						<input type="checkbox" tabindex="0" class="hidden">
																						<label>Bahasa Indonesia<span class="filter__counter">(20)</span></label>
																					</div>
																				</div>
																			</div>
																			<div class="ui form checkbox_sign cp_458">
																				<div class="inline field">
																					<div class="ui checkbox mncheck">
																						<input type="checkbox" tabindex="0" class="hidden">
																						<label>ภาษาไทย<span class="filter__counter">(10)</span></label>
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
										</div>
										</div>
								</div> -->
								
							</div>
							<Errors v-if="error">
								<ul>
									<li v-for="error in error" :key="error">{{error}}</li>	
								</ul>
							</Errors>
							<br>
							<router-link :to="{ path: '/Dnewcoursecontent/'+ this.newCourseId}">
							<Success v-if="success">
								<ul>
									<li>Action Successful</li>
									<li>Click to add course contents</li>	
								</ul>
								<p></p>
							</Success>
							</router-link>
							<Loading v-if="Loading"/>
							<div class="step-footer step-tab-pager" v-if="isInstructor">
								<button v-if="!success" class="btn btn-default steps_btn" @click.prevent="registerCourse()" id="btn">Submit for Review</button>
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
			newCourseId: '',
			categories: '',
			subCategories: '',
			visibilty: '',
			success : false,
			error: '',
			Loading: false
		}
	},
	computed:{
		//...mapGetters(['error']),
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
		...mapActions(['createNewCourse']),
		...mapActions(['check_user_instructor']),
		...mapActions(['fetch_categories']),
		registerCourse(){
			if (this.validateInputs()) {
				this.Loading = true
				document.getElementById('btn').style.display = 'none';
				let id = localStorage.getItem('fmruser');
				let formData = new FormData();
				formData.append('userId', id);
				formData.append('title', this.title);
				formData.append('whatYouLearn', this.whatYouLearn);
				formData.append('requirement', this.requirement);
				formData.append('description', this.description);
				formData.append('secondTitle', this.secondTitle);
				formData.append('category', this.category);
				formData.append('subCategory', this.subCategory);
				formData.append('visibilty', this.visibilty);
				formData.append('price', this.price);
				formData.append('thumbnail', this.thumbnail);

				this.createNewCourse(formData)
				.then(res => {
					if (res.data.success==true || res.data.success=='true') {
						this.newCourseId = res.data._id;
						this.Loading = false
						this.success = true;
					}
					
				})
				.catch(err => {
					document.getElementById('btn').style.display = 'block';
					console.log(err)
				})
				
			}
			
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
		validateInputs(){
            let flag = true;
            let message = '';
			let error =[];
			if (this.thumbnail=='') {
                message = 'Please input image thumbnail ';
                error.push(message)
                flag = false
            }
			if (this.price=='') {
                message = 'Please input price ';
                error.push(message)
                flag = false
            }
			if (this.subCategory=='') {
                message = 'Please input subCategory ';
                error.push(message)
                flag = false
            }
			if (this.category=='') {
                message = 'Please input category ';
                error.push(message)
                flag = false
            }
			if (this.title=='') {
                message = 'Please input title ';
                error.push(message)
                flag = false
            }
			if (this.secondTitle=='') {
                message = 'Please input second Title ';
                error.push(message)
                flag = false
            }
			if (this.requirement=='') {
                message = 'Please input requirements ';
                error.push(message)
                flag = false
            }
            if (this.whatYouLearn=='') {
                message = 'Please input what you learn ';
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
		this.userId = localStorage.getItem('fmruser');
		this.fetch_categories()
        .then(res => {
            this.categories = res.data
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
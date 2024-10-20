<template>
 <div>
	<Modal v-if="isAuthor">
		<div class="container" style="background-color: #b2bdb5">	
			<div class="row">
				<div class="col-12">
					<div class="course_tabs_1">
						<div id="add-course-tab" class="step-app">
							<div class="step-content" style="margin-top: -100px">
								<div class="step-tab-panel step-tab-location" id="tab_step3">
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-film"></i>Question Options</h3>
										</div>
										<Loading v-if="Loading" />
										<div class="course__form">
											<div class="row">
												<div class="col-lg-12">		
													<div class="extra_info">		
														<h4 class="part__title">New Option Content</h4>
													</div>
													<div class="view_info10">
														<div class="row">
															<div class="col-lg-12 col-md-12">	
																<div class="lecture_title">
																	<h5>{{questionsAndOptions.content}}</h5>
																</div>
															</div>
															<div class=" col-md-12">															
																<div class="ui search focus mt-30 lbel25" style="width: 100%">
																	<label>Option content* (Please cross-check option content twice before adding as it can not be edited or deleted)</label>
																	<div class="ui left icon input swdh19 " >
																		<input class="prompt srch_explore" type="text" placeholder="Insert a Question Option." maxlength="100" v-model="optionContent" >																
																	</div>
																	<div>
																		<div class="col-lg-4 col-md-12" style="float: left">
																			<div class="ui search focus mt-30 lbel25">															
																				<label>is this the right answer*</label>
																				<div class="ui left icon input swdh19">
																					<select class="ui hj145 dropdown cntry152 prompt srch_explore" v-model="isCorrect">
																						<option value="" :class="{closed: isCorrectAlreadyPresent}">SELECT</option>
																						<option value="false">NO</option>
																						<option value="true" :class="{closed: isCorrectAlreadyPresent}">YES</option>
																					</select>															
																				</div>
																			</div>									
																		</div>
																		<div class="col-lg-2 col-md-12" style="float: right" v-if="(optionContent!=''&&isCorrect!='')||(isCorrectAlreadyPresent&&optionContent!='')">
																			<button class="part_btn_save prt-sv" type="button" @click.prevent="addOption()"> Save Option</button>
																		</div>
																	</div>
																</div>							
															</div>
														</div>
													</div>
												</div>
                                                <div class="col-lg-12 col-md-12">
                                                    <div class="table-responsive mt-50 mb-0">
                                                        <table class="table ucp-table">
                                                            <thead class="thead-s">
                                                                <tr>
                                                                    <th class="cell-ta">Option</th>
																	<th class="text-center" scope="col">Answer</th>
                                                                    <!-- <th class="text-center" scope="col">Controls</th> -->
                                                                </tr>
                                                            </thead>
                                                            <tbody >
                                                                <tr v-for="o in questionsAndOptions.options" :key="o">
                                                                    <td class="cell-ta">{{o.content}}</td>
																	<td class="text-center">
                                                                        <a title="" class="gray-s"><i class="uil uil-check-circle isCorrect" v-if="o.isCorrect"></i></a>
																		<a title="" class="gray-s"><i class="uil uil-times-circle" v-if="!o.isCorrect" ></i></a>
                                                                    </td>
                                                                    <!-- <td class="text-center">
                                                                        <a title="Delete" class="gray-s" @click.prevent="deleteOption(o._id)"><i class="uil uil-trash-alt"></i></a>
                                                                    </td> -->
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
											</div>
										</div>
									</div>
								</div>	
							</div>
							<div class="step-footer step-tab-pager" style="opacity: 0">
								<button v-if="!Loading" class="btn btn-default steps_btn"  @click.prevent="registerlecture()">Submit for Review</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Modal>
<!-- Header Start -->
	<Dheader />
<!-- Header End -->
<!-- Left Sidebar Start -->
	<Dnav2 />
<!-- Left Sidebar End -->
<!-- Body Start -->
<div class="wrapper">
	<div class="sa4d25" v-if="isAuthor">
		<div class="container">			
			<div class="row">
				<div class="col-lg-12">	
					<h2 class="st_title"><i class="uil uil-analysis"></i> Manage Cousre Sections</h2>
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
								<li class="pageActive">
									<router-link :to="'/DnewcourseTest/'+ this.courseId">
									<a >
										<span class="number"></span>
										<span class="step-name" style="color: white;">Set Test</span>
									</a>
									</router-link>
								</li>
							</ul>
                            <hr>
                            <ul class="step-steps" v-if="testDetails!=null">
								<li :class="{tapInActive : !isEditingTest, tapActive : isEditingTest}" @click="switchTap('edit')">
                                    <center>
                                        <a >
                                            <span class="number"></span>
                                            <span class="step-name" style="color: grey">Edit Test details</span>
                                        </a>
                                    </center>
								</li>
								<li :class="{tapInActive : isEditingTest, tapActive : !isEditingTest}"  @click="switchTap('noEdit')">
                                    <center>
                                        <a >
                                            <span class="number"></span>
                                        <span class="step-name" style="color: grey">Add Questions to Tests</span>
                                        </a>
                                    </center>
								</li>
							</ul>
                            <div class="step-content" v-if="testDetails==null||isEditingTest">
								<div class="step-tab-panel step-tab-info active" id="tab_step1"> 
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-info-circle"></i>General Test Information</h3>
										</div>
										<div class="course__form">
											<div class="general_info10">
												<div class="row">
                                                    <div class="col-lg-12 col-md-12">
														<div class="course_des_textarea mt-30 lbel25">
															<label><b>NB</b> We strongly recommend you upload atleast twice the number of questions for a test</label>
                                                            <label >for example, you plan to give your students a test of 20 questions, we advice you upload 40 and select 50% on questions per student, so we can shuffle this questions and two students dont take exactly the same questions</label>
														</div>
													</div>
													<div class="col-lg-12 col-md-12">
														<div class="course_des_textarea mt-30 lbel25">
															<label>Test Description*</label>
															<div class="course_des_bg">
																<div class="textarea_dt">															
																	<div class="ui form swdh339">
																		<div class="field">
																			<textarea rows="5" name="description" id="id_course_description" placeholder="Any information for your students" v-model="description"></textarea>
																		</div>
																	</div>										
																</div>
															</div>
														</div>
													</div>
													<div class="col-lg-6 col-md-6">															
														<div class="ui search focus mt-30 lbel25">
															<label>Maximum Time(minutes)</label>
															<div class="ui left icon input swdh19">
																<input class="prompt srch_explore" type="number" placeholder="How many minutes should this test last" v-model="time">
															</div>
														</div>									
													</div>
                                                    <div class="col-lg-4 col-md-6">
														<div class="mt-30 lbel25">
															<label>Percentage of questions per student*</label>
														</div>
														<select class="ui hj145 dropdown cntry152 prompt srch_explore" style="width: 100%"  v-model="questionsPerStudent">
															<option value="25">25%</option>
                                                            <option value="50">50%</option>
                                                            <option value="70">70%</option>
                                                            <option value="100">100%</option>
														</select>
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
                                <Loading v-if="Loading&&!success" />
								<Success v-if="success">
									<ul @click="switchTap('edit')">
										<li>Action Successful</li>
										<li >Click here to add questions to test</li>	
									</ul>
									<p></p>
								</Success>	
                                <div class="step-footer step-tab-pager" v-if="!isEditingTest">
                                    <button v-if="!Loading&&!success" class="btn btn-default steps_btn" @click.prevent="manageMytest()">Submit Test</button>
                                </div>
								<div class="step-footer step-tab-pager" v-if="isEditingTest">
                                    <button v-if="!Loading&&!success" class="btn btn-default steps_btn" @click.prevent="manageMytest()">Save changes</button>
                                </div>
							</div>
							<div class="step-content" v-if="testDetails!=null&&!isEditingTest">
								<div class="step-tab-panel step-tab-location" id="tab_step3">
									<div class="tab-from-content">
										<div class="title-icon">
											<h3 class="title"><i class="uil uil-film"></i>Test Content</h3>
										</div>
										<div class="course__form">
											<div class="row">
												<div class="col-lg-12">		
													<div class="extra_info">		
														<h4 class="part__title">Test Content</h4>
													</div>
                                                    <div class="view_info10">
                                                        <div class="row">
                                                            <div class="col-lg-12 col-md-12">															
																<div class="ui search focus mt-30 lbel25">
																	<label>New test question*</label>
																	<div class="ui left icon input swdh19">
																		<input class="prompt srch_explore" type="text" placeholder="Insert your Question." maxlength="60" v-model="questionContent" >															
																	</div>
																</div>									
															</div>
                                                            <br>
                                                            <Loading v-if="Loading" />
                                                            <Errors v-if="error">
                                                                <ul>
                                                                    <li v-for="error in error" :key="error">{{error}}</li>	
                                                                </ul>
                                                            </Errors>
                                                            <div class="col-lg-12 col-md-12">
																<div class="save_content">
																	<button class="save_content_btn" type="Submit" id="btn" @click.prevent="manageMyQuestions('')" :disabled="questionContent==''">Save New Question</button>
																</div>
															</div>
                                                        </div>
                                                    </div>
												</div>
											</div>
										</div>
										<div class="col-lg-12 col-md-12" v-if="isQuestionWithoutAnswerPresent">															
											<div class="ui search focus mt-30 lbel25">
												<label style="color: red">There is a question without answer in this test</label>
											</div>									
										</div>
										<div v-for="q in questions.slice().reverse()" :key="q">
											<div class="course__form questions" v-if="!q.deleted">
												<div class="controls">
													<a title="Expand" class="gray-s" @click="toggleTable(q._id)"><i class="uil uil-eye-slash" :id="'eye'+q._id"></i></a>
													<a title="upload options" class="gray-s" @click="activateModal(q._id)"><i class="uil uil-upload"></i></a>
													<a title="Delete" class="gray-s" @click="manageMyQuestions(q._id)"><i class="uil uil-trash-alt"></i></a>
												</div>
												<div class="questionContent"> 
													<p><strong><i class="uil uil-caret-right"></i></strong><b> {{q.content}}</b></p>
												</div>
												<div class="options" :id="'options'+q._id">
													<div class="optionContent" v-for="o in q.options" :key='o'>
														<p><b><i class="uil uil-arrow-circle-right" :class="{isCorrect : o.isCorrect}"></i></b> {{o.content}}<i class="uil uil-check-circle" v-if="o.isCorrect"></i></p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>	
							</div>
							<div class="step-footer step-tab-pager" style="opacity: 0">
								<button v-if="!success" class="btn btn-default steps_btn" @click="scroll()">Submit for Review</button>
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
import Modal from "@/components/Modal.vue";
export default {
	name: 'Dhome',
	data(){
		return{
            courseId: '',
            questionsPerStudent: '',
            description: '',
            time: '',
			userId: '',
            isAuthor: '',
            courseDetails: '',
			success : false,
			Loading: false,
            error: '',
            testId: '',
            testDetails: null,
            isEditingTest: false,
            questions: '',
			questionContent: '',
			questionsAndOptions: '',
			questionId: '',
			optionContent: '',
			isCorrect: '',
			isCorrectAlreadyPresent : false,
			isQuestionWithoutAnswerPresent: false
		}
	},
	computed:{
		//...mapGetters(['error']),
		...mapGetters(['isInstructor']),
		...mapGetters(['frontEnd'])
	},
    components: {
        Dheader,
        Dnav2,
		Dfooter,
		Errors,
		Success,
		Loading,
		Modal
	},
	methods: {
        ...mapActions(['view_CourseForEdit']),
        ...mapActions(['manage_Test']),
        ...mapActions(['fetch_CourseTest']),
		...mapActions(['manage_Questions']),
		...mapActions(['add_QuestionOption']),
		...mapActions(['set_OptionDelete']),
        manageMytest(){
            if (this.validateTest()) {
                this.Loading = true
               let object = {
                    courseId : this.courseId,
                    description: this.description,
                    time: this.time, 
                    questionsPerStudent: this.questionsPerStudent,
                    testId: this.testId
                }
                this.manage_Test(object)
                .then(res => {
                    this.Loading = false
                    this.success = true
                    this.testDetails = res.data
                    this.testId = res.data._id
                    this.questionsPerStudent = res.data.questionsPerStudent
                    this.description = res.data.description
                    this.time = res.data.time
                    this.questions = res.data.questions
                }) 
            }
        },
        manageMyQuestions(questionId){
            this.Loading = true
            let questionObject = {
                testId : this.testId, 
                content : this.questionContent,
                questionId : questionId
			}
			if (questionId=='') {
				this.manage_Questions(questionObject)
				.then(res => {
					this.Loading = false
					this.success = true
					this.testDetails = res.data
					this.testId = res.data._id
					this.questionsPerStudent = res.data.questionsPerStudent
					this.description = res.data.description
					this.time = res.data.time
					this.questions = res.data.questions
					this.questionContent = ''
					this.checkIfQuestionWithoutAnswerPresent()
				})	
			}else{
				if (confirm('Are you sure you want to delete this question')) {
					this.manage_Questions(questionObject)
					.then(res => {
						this.Loading = false
						this.success = true
						this.testDetails = res.data
						this.testId = res.data._id
						this.questionsPerStudent = res.data.questionsPerStudent
						this.description = res.data.description
						this.time = res.data.time
						this.questions = res.data.questions
						this.questionContent = ''
					})		
				}
			}
            
		},
		addOption(){
			this.Loading = true
			let optionObject = { 
				testId : this.testId, 
				content : this.optionContent, 
				questionId: this.questionId,
				isCorrect: this.isCorrect
			}
			this.add_QuestionOption(optionObject)
			.then(res => {
				this.Loading = false
				this.success = true
				this.testDetails = res.data
				this.testId = res.data._id
				this.questionsPerStudent = res.data.questionsPerStudent
				this.description = res.data.description
				this.time = res.data.time
				this.questions = res.data.questions
				this.optionContent = ''
				this.isCorrect = ''
				for (let i = 0; i < this.questions.length; i++) {
					const element = this.questions[i];
					if (element._id == this.questionId) {
						this.questionsAndOptions = element
						this.checkAnswered()
						this.checkIfQuestionWithoutAnswerPresent()
					}
				}
			})
		},
		deleteOption(optionId){
			if (confirm("Are you sure you want to delete this option")) {
				this.Loading = true
				let object = {
					testId: this.testId,
					questionId: this.questionId,
					optionId: optionId
				}
				this.set_OptionDelete(object)
				.then(res => {
					this.Loading = false
					this.success = true
					this.testDetails = res.data
					this.testId = res.data._id
					this.questionsPerStudent = res.data.questionsPerStudent
					this.description = res.data.description
					this.time = res.data.time
					this.questions = res.data.questions
					this.optionContent = ''
					for (let i = 0; i < this.questions.length; i++) {
						const element = this.questions[i];
						if (element._id == this.questionId) {
							this.questionsAndOptions = element
						}
					}
				})
			}
		},
		checkAnswered(){
			for (let i = 0; i < this.questionsAndOptions.options.length; i++) {
				const element = this.questionsAndOptions.options[i];
				if (element.isCorrect) {
					this.isCorrectAlreadyPresent = true
					this.isCorrect = false
				}
			}
		},
		scroll(){
			window.scrollBy(0, 150)
        },
		toggleTable(id){
			document.getElementById('options'+id).classList.toggle("closed")
			document.getElementById('eye'+id).classList.toggle("uil-eye")
		},
		activateModal(questionId){
			this.isCorrectAlreadyPresent = false
			this.isCorrect = ''
			this.questionId = questionId
			for (let i = 0; i < this.questions.length; i++) {
				const element = this.questions[i];
				if (element._id == questionId) {
					this.questionsAndOptions = element
					this.checkAnswered()
				}
			}
            let modal = document.getElementById('myModal');
            modal.setAttribute("class", "modal vd_mdl fade show");
            modal.style.display = 'block';
        },
        switchTap(type){
			this.success= false
			this.error = ''
            switch (type) {
                case 'edit':
                    this.isEditingTest = true
                    break;
                case 'noEdit':
                    this.isEditingTest = false
                    break;
                default:
                    break;
            }
        },
		validateTest(){
			let flag = true;
            let message = '';
            let error =[];
            if (this.time == '') {
				message = 'Please enter time for test in minutes';
                error.push(message)
                flag = false
			}
			if (this.description == '') {
				message = 'Please insert a description';
                error.push(message)
                flag = false
            }
            if (this.questionsPerStudent == '') {
				message = 'Please select questions per Student';
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
		checkIfQuestionWithoutAnswerPresent(){
			let flag = false
			for (let i = 0; i < this.questions.length; i++) {
				const element = this.questions[i];
				if (!element.deleted) {
					flag = false
					for (let j = 0; j < element.options.length; j++) {
						const elementj = element.options[j];
						if (elementj.isCorrect) {
							flag = true
						}
					}
					if (!flag) {	
						this.isQuestionWithoutAnswerPresent = true
						return true
					}
				}
			}
			this.isQuestionWithoutAnswerPresent = false
			return false
		}
	},  
    mounted(){
		this.courseId = this.$route.params.id
		this.userId = localStorage.getItem('fmruser')
		this.view_CourseForEdit(this.courseId)
		.then(res => {
			this.courseDetails = res.data
			if (this.courseDetails.user==this.userId) {
				this.isAuthor = true
			}
        })
        this.fetch_CourseTest(this.courseId)
        .then(res => {
            this.testDetails = res.data[0]
            this.testId = res.data[0]._id
            this.questionsPerStudent = res.data[0].questionsPerStudent
            this.description = res.data[0].description
            this.time = res.data[0].time
			this.questions = res.data[0].questions
			
			this.checkIfQuestionWithoutAnswerPresent()
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

    .tapInActive{
        padding: 10px;
        width: 49%;
        color: white;
        border: 1px solid red;
        border-radius: 10px;
        cursor: pointer;
    }

    .tapActive{
        cursor: pointer;
        padding: 10px;
        background-color: red;
        color: white;
        width: 49%;
        border-radius: 10px;
    }

	.partss{
		margin: 10px;
	}
	.full{
		width: 100%;
		display: block;
	}
	.closed{
		display: none;
	}
	.open{
		display: block;
	}

    .questions{
        padding: 15px;
    }
    .questionContent p{
        font-size: 15;
    }
    .options{
        padding: 5px;
        width: 95%;
        margin-left: 4%;
    }
    .optionContent{
        font-size: 12;
    }
    .isCorrect{
        color: green;
        font-size: 20px;
        font-weight: bolder;
    }

	.modal-body{
        max-height: 600px;
        overflow-y: scroll;
    }
	a{
		text-decoration: none;
		color: green;
	}
	
</style>
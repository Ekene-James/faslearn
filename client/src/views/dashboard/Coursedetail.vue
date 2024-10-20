<template>
<div>
<div class="modal vd_mdl fade" id="videoModal" tabindex="-1" role="dialog" aria-hidden="true" v-if="coursePreview!=''">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
			<div class="modal-body">
				<iframe :src="'https://player.vimeo.com/video/'+prevewVideoId+'#zoom=85&scrollbar=0&toolbar=0&navpanes=0'" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
			</div>
		</div>
	</div>
</div>
<!-- Header Start -->
	<Dheader />
<!-- Header End -->
<!-- Left Sidebar Start -->
	<Dnav1 />
<!-- Left Sidebar End -->
<!-- Body Start -->
<div class="wrapper _bg4586">
	<div class="_215b01">
		<div class="container-fluid">			
			<div class="row">
				<div class="col-lg-12">
					<div class="section3125">							
						<div class="row justify-content-center">						
							<div class="col-xl-4 col-lg-5 col-md-6">						
								<div class="preview_video">						
									<a href="#" class="fcrse_img" data-toggle="modal" data-target="#videoModal">
										<img v-bind:src="backEnd+'public/courseImage/'+courseId" alt="">
										<!--  v-bind:src="'http://localhost:5000/api/public/courseImage/'+course._id" -->
										<div class="course-overlay">
											<div class="badge_seller">Bestseller</div>
											<span class="play_btn1" v-if="coursePreview!=''"><i class="uil uil-play"></i></span>
											<span class="_215b02" v-if="coursePreview!=''">Preview this course</span>
										</div>
									</a>
								</div>
								<div class="_215b10">										
									<a href="#" class="_215b11">										
										<span><i class='uil uil-heart-alt'></i></span>Wishlist
									</a>
									<a href="#" class="_215b12">										
										<span><i class="uil uil-windsock"></i></span>Report abuse
									</a>
								</div>
							</div>
							<div class="col-xl-8 col-lg-7 col-md-6">
								<div class="_215b03">
									<h2>{{course.title}}</h2>
									<span class="_215b04">{{course.secondTitle}}</span>
								</div>
								<div class="_215b05">
									<div class="crse_reviews mr-2">
										<i class="uil uil-star"></i>{{avrating}}
									</div>
									({{allLikes.like+allLikes.dislike}} ratings)
								</div>
								<div class="_215b05">										
									{{AllPurchased}} students enrolled
								</div>
								<div class="_215b06">										
									<div class="_215b07">										
										<span><i class='uil uil-comment'></i></span>
										English
									</div>
									<div class="_215b08">										
										<span><i class='uil uil-closed-captioning'></i></span>
									</div>
								</div>
								<div class="_215b05">										
									Last updated {{course.updatedAt}}
								</div>
								<ul class="_215b31" v-if="!purchased&&course.user[0]._id!=''">										
									<li v-if="exist"><button class="btn_adcart">Now in Cart</button></li>
									<li v-else><button class="btn_adcart" @click="saveToCart()">Add to Cart</button></li>
									<a><li @click="alert('add to cart then buy from button that will appear bellow')"><button class="btn_buy" id="paymentForm">Buy Now</button></li></a>
									<!-- <a :href="'buy.html?email='+user.email+'&amount='+amount+'&name='+user.firstName+'&title='+course.title+'&courseId='+courseId"><li><button class="btn_buy" id="paymentForm">Buy Now</button></li></a> -->
									<!-- <paystack           
										:amount="100"
										:email="'cosimomichael92@gmail.com'"
										:paystackkey="public_key"
										:reference="reference"
										:callback="processPayment"
										:close="close"
										class="btn btn-dark w-100 mt-5"
									>
										Pay ₦ 50
									</paystack> -->

									
								</ul>
								<div class="_215fgt1">										
									30-Day Money-Back Guarantee
								</div>
							</div>							
						</div>							
					</div>							
				</div>															
			</div>
		</div>
	</div>
	
	<div class="_215b155 _byt1458">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12">
					<div class="user_dt5">
						<div class="user_dt_left">
							<div class="live_user_dt">
								<div class="user_img5">
									<a href="#"><img src="./assets/images/left-imgs/img-1.jpg" alt=""></a>												
								</div>
								<div class="user_cntnt">
									<a href="#" class="_df7852">{{course.user[0].firstName}} {{course.user[0].lastName}}</a>
									<router-link :to="'/Dprofile/'+course.user[0]._id">
									<button class="subscribe-btn">instructor Profile</button>
									</router-link>
								</div>
							</div>
						</div>
						<div class="user_dt_right">
							<ul>
								<li>
									<a class="lkcm152"><i class="uil uil-eye"></i><span>{{AllPurchased}}</span></a>
								</li>
								<li @click.prevent="switchtap('review')">
									<a class="lkcm152"><i class="uil uil-thumbs-up"></i><span>{{allLikes.like}}</span></a>
								</li>
								<li @click.prevent="switchtap('review')">
									<a class="lkcm152"><i class="uil uil-thumbs-down"></i><span>{{allLikes.dislike}}</span></a>
								</li>
								<!-- <li>
									<a href="#" class="lkcm152"><i class="uil uil-share-alt"></i><span>9</span></a>
								</li> -->
							</ul>
						</div>
					</div>
					<div class="course_tabs">
						<nav>
							<div class="nav nav-tabs tab_crse justify-content-center" id="nav-tab" role="tablist">
								<a class="nav-item nav-link" v-bind:class="{ active: about }" @click.prevent="switchtap('about')" aria-selected="true">About</a>
								<a class="nav-item nav-link" v-bind:class="{ active: content }" @click.prevent="switchtap('content')" aria-selected="false">Content</a>
								<a class="nav-item nav-link" v-bind:class="{ active: review }" @click.prevent="switchtap('review')" aria-selected="false">Reviews</a>
								<a class="nav-item nav-link" v-bind:class="{ active: test }" @click.prevent="switchtap('test')" v-if="purchased" aria-selected="false">Test</a>
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
							<div class="tab-pane fade show" v-bind:class="{ active: about }" id="nav-about" role="tabpanel">
								<div class="_htg451">
									<div class="_htg452">
										<h3>Requirements</h3>
										<p>{{course.requirement}}</p>
										<!-- <ul>
											<li><span class="_5f7g11">Have a computer with Internet</span></li>
											<li><span class="_5f7g11">Be ready to learn an insane amount of awesome stuff</span></li>
											<li><span class="_5f7g11">Prepare to build real web apps!</span></li>
										</ul> -->
									</div>
									<div class="_htg452 mt-35">
										<h3>Description</h3>
										<span class="_abc123"></span>
										<p>{{course.description}}</p>
									</div>
									<div class="_htg452 mt-35">
										<h3>Who this course is for :</h3>
										<ul class="_abc124">												
											<li><span class="_5f7g11">Who ever has all the requiremts</span></li>
										</ul>
									</div>	
									<div class="_htgdrt mt-35">
										<h3>What you'll learn</h3>
										<div class="_scd123">
											<div class="row">
												<div class="col-lg-6">
													<ul class="_htg452 _abcd145">												
														<li v-for="what in whatYouLearn" :key="what"><div class="_5f7g15"><i class="fas fa-check-circle"></i><span>{{what}}</span></div></li>
													</ul>
												</div>
											</div>
										</div>
									</div>							
								</div>							
							</div>
							<div class="tab-pane fade show" v-bind:class="{ active: content }" id="nav-courses" role="tabpanel">
								<div class="crse_content">
									<h3>Course content</h3>
									<div class="_112456">
										<ul class="accordion-expand-holder">
											<li><span class="accordion-expand-all _d1452">Expand all</span></li>
											<li><span class="_fgr123"> 402 lectures</span></li>
											<li><span class="_fgr123">47:06:29</span></li>
										</ul>
									</div>
									<div id="accordion" class="ui-accordion ui-widget ui-helper-reset">
										<div v-for="play in playlist" :key="play">
											<a href="javascript:void(0)" class="accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all">												
												<div class="section-header-left">
													<span class="section-title-wrapper">
														<i class='uil uil-presentation-play crse_icon'></i>
														<span class="section-title-text">{{play.sectionTitle}}</span>
													</span>
												</div>
												<div class="section-header-right">
													<span class="num-items-in-section">{{play.videos.length}} lectures</span>
													<span class="section-header-length"></span>
												</div>
											</a>
											<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom">
												<!-- /DlectureRoom/:id -->
												<div class="lecture-container"  v-for="content in play.videos" :key="content">
													<div class="left-content">
														<i class='uil uil-file icon_142' v-if="content.fileType=='application/pdf'"></i>
														<i class='uil uil-play-circle icon_142' v-else></i>
														<div class="top">
															<router-link :to="'/DlectureRoom/'+content._id">
															<a href="" class="preview-text" v-if="purchased">Take lecture</a>
															</router-link>
															<div class="title">{{content.title}}</div>
														</div>
													</div>
													<div class="details">
														<span class="content-summary" v-if="content.duration">{{content.duration.$numberDecimal}}</span>
													</div>
												</div>
												<!-- <div class="lecture-container">
													<div class="left-content">
														<i class='uil uil-file-download-alt icon_142'></i>
														<div class="top">
															<div class="title">Syllabus Download</div>
														</div>
													</div>
													<div class="details">
														<a href="#" class="preview-text">Preview</a>
														<span class="content-summary">2 pages</span>
													</div>
												</div>
												<div class="lecture-container">
													<div class="left-content">
														<i class='uil uil-play-circle icon_142'></i>
														<div class="top">
															<div class="title">Syllabus Walkthrough</div>
														</div>
													</div>
													<div class="details">
														<a href="#" class="preview-text">Preview</a>
														<span class="content-summary">01:42</span>
													</div>
												</div> -->
											</div>
										</div>
									</div>
									<!-- <a class="btn1458" href="#">20 More Sections</a> -->
								</div>
							</div>
							<div class="tab-pane fade show" v-bind:class="{ active: review }" id="nav-reviews" role="tabpanel">
								<div class="student_reviews">
									<div class="row">
										<div class="col-lg-5">
											<div class="reviews_left">
												<h3>Student Feedback</h3>
												<div class="total_rating">
													<div class="_rate001">{{avrating}}</div>														
													<div class="rating-box">
														<span class="rating-star" :class="avrating>0 ? 'full-star' : 'empty-star'"></span>
														<span class="rating-star" :class="avrating>1&&avrating<2 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<2"></span>
														<span class="rating-star" :class="avrating>1&&avrating>=2 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating>2"></span>

														<span class="rating-star" :class="avrating>2&&avrating<3 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<3"></span>
														<span class="rating-star" :class="avrating>2&&avrating>=3 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating>=3"></span>

														<span class="rating-star" :class="avrating>3&&avrating<4 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<4"></span>
														<span class="rating-star" :class="avrating>3&&avrating>=4 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating>=4"></span>

														<span class="rating-star" :class="avrating>4&&avrating<5 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<5"></span>
														<span class="rating-star" :class="avrating>4&&avrating==5 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating==5"></span>
													


														
													</div>
													<div class="_rate002">Course Rating</div>	
												</div>
												<div class="_rate003">
													<div class="_rate004">
														<div class="progress progress1">
															<div class="progress-bar " :style="'width: '+five+'%; background-color: red'"></div>
														</div>
														<div class="rating-box">
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
														</div>
														<div class="_rate002">{{five}}%</div>
													</div>
													<div class="_rate004">
														<div class="progress progress1">
															<div class="progress-bar " :style="'width: '+four+'%; background-color: red'"></div>
														</div>
														<div class="rating-box">
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star empty-star"></span>
														</div>
														<div class="_rate002">{{four}}%</div>
													</div>
													<div class="_rate004">
														<div class="progress progress1">
															<div class="progress-bar " :style="'width: '+three+'%; background-color: red'"></div>
														</div>
														<div class="rating-box">
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star empty-star"></span>
															<span class="rating-star empty-star"></span>
														</div>
														<div class="_rate002">{{three}}%</div>
													</div>
													<div class="_rate004">
														<div class="progress progress1">
															<div class="progress-bar " :style="'width: '+two+'%; background-color: red'"></div>
														</div>
														<div class="rating-box">
															<span class="rating-star full-star"></span>
															<span class="rating-star full-star"></span>
															<span class="rating-star empty-star"></span>
															<span class="rating-star empty-star"></span>
															<span class="rating-star empty-star"></span>
														</div>
														<div class="_rate002">{{two}}%</div>
													</div>
													<div class="_rate004">
														<div class="progress progress1">
															<div class="progress-bar " :style="'width: '+one+'%; background-color: red'"></div>
														</div>
														<div class="rating-box">
															<span class="rating-star full-star"></span>
															<span class="rating-star empty-star"></span>
															<span class="rating-star empty-star"></span>
															<span class="rating-star empty-star"></span>
															<span class="rating-star empty-star"></span>
														</div>
														<div class="_rate002">{{one}}%</div>
													</div>
												</div>
											</div>												
										</div>
										<div class="col-lg-7">
											<div class="review_right">
												<div class="review_right_heading">
													<h3>Reviews</h3>
													<!-- <div class="review_search">
														<input class="rv_srch" type="text" placeholder="Search reviews...">
														<button class="rvsrch_btn"><i class='uil uil-search'></i></button>
													</div> -->
												</div>
											</div>
											<div class="tab-pane fade show active" id="instructor-signup-tab" role="tabpanel" aria-labelledby="instructor-tab" v-if="!alreadyReviewed">
												<p>What do you think?</p>
												<form>
													<div class="ui search focus mt-15">
														<div class="help-block">How many stars does this course deserve</div>																
														<div class="ui form swdh30">
															<div class="field">
																<span class="rating-star" :class="star>0 ? 'full-star' : 'empty-star'" @click="setStar(1)"></span>
																<span class="rating-star" :class="star>1 ? 'full-star' : 'empty-star'" @click="setStar(2)"></span>
																<span class="rating-star" :class="star>2 ? 'full-star' : 'empty-star'" @click="setStar(3)"></span>
																<span class="rating-star" :class="star>3 ? 'full-star' : 'empty-star'" @click="setStar(4)"></span>
																<span class="rating-star" :class="star>4 ? 'full-star' : 'empty-star'" @click="setStar(5)"></span>
															</div>
														</div>
													</div>
													<br>
													<br>
													<div class="ui search focus mt-15">
														<div class="help-block">Do you like this course</div>																
														<div class="ui form swdh30">
															<div class="field">
																<ul>
																	<li class="liking" @click.prevent="setLike(1)">
																		<button class="likeButton" :class=" like=='1' ? 'liked' : 'b'"><i class="uil uil-thumbs-up"></i></button>
																	</li>
																	<li class="liking" @click.prevent="setLike(2)">
																		<button class="likeButton" :class=" like=='2' ? 'liked' : 'b'"><i class="uil uil-thumbs-down"></i></button>
																	</li>
																</ul>
															</div>
														</div>
													</div>
													
													<br>
													<div class="ui search focus mt-15">																
														<div class="ui form swdh30">
															<div class="field">
																<textarea rows="3" name="description" id="id_about" placeholder="Write a little description of what you have in mind after taking this course" v-model="reviewMessage"></textarea>
															</div>
														</div>
														<div class="help-block">Your review should have at least 100 characters.</div>
													</div>
													<!-- <input type="file" v-model="cv" /> -->
													<br>
													<br>
													<Errors v-if="error">
														<ul>
															<li v-for="error in error" :key="error">{{error}}</li>	
														</ul>			
													</Errors>
													<br>
													<Success v-if="success">
														<ul>
															<li>Action Successful</li>
															<li>Thanks for your Review, we will try our best to make new courses better</li>	
														</ul>
														<p></p>
													</Success>
													<Loading v-if="Loading" />
													<!-- <div class="mt-3">Selected file: {{ cv ? cv.name : '' }}</div>							 -->
													<button class="login-btn" type="submit" @click.prevent="submitReview()" >Submit Review</button>
													<br><br>
												</form>
											</div>
											<div class="review_all120">
												<div class="review_item" v-for="v in reviews" :key="v">
													<div class="review_usr_dt">
														<img src="./assets/images/left-imgs/img-2.jpg" alt="">
														<div class="rv1458">
															<h4 class="tutor_name1">{{v.user[0].firstName}} {{v.user[0].lastName}}</h4>
															<span class="time_145">{{v.createdAt}}</span>
														</div>
													</div>
													<div class="rating-box mt-20">
														<span class="rating-star" :class="v.star>0 ? 'full-star' : 'empty-star'"></span>
														<span class="rating-star" :class="v.star>1 ? 'full-star' : 'empty-star'"></span>
														<span class="rating-star" :class="v.star>2 ? 'full-star' : 'empty-star'"></span>
														<span class="rating-star" :class="v.star>3 ? 'full-star' : 'empty-star'"></span>
														<span class="rating-star" :class="v.star>4 ? 'full-star' : 'empty-star'"></span>
													</div>
													<p class="rvds10">{{v.reviewMessage}}</p>
													<!-- <div class="rpt100">
														<span>Was this review helpful?</span>
														<div class="radio--group-inline-container">
															<div class="radio-item">
																<input id="radio-3" name="radio1" type="radio">
																<label for="radio-3" class="radio-label">Yes</label>
															</div>
															<div class="radio-item">
																<input id="radio-4" name="radio1" type="radio">
																<label  for="radio-4" class="radio-label">No</label>
															</div>
														</div>
														<a href="#" class="report145">Report</a>
													</div> -->
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
							<div class="tab-pane fade show" v-bind:class="{ active: test }" v-if="purchased" id="nav-test" role="tabpanel">
								<h1>Test</h1>
								<div class="_htg452" v-if="testDetails.length==0">
									<h3>Sorry the instructor has not uploaded a test yet</h3>
								</div>
								<div class="_htg452" v-if="testDetails.length!=0">
									<h3>Test Description</h3>
									<p>{{testDetails[0].description}}</p>
								</div>
								<div class="_htg452 mt-35" v-if="testDetails.length!=0">
									<h3>Maximum Time</h3>
									<span class="_abc123"></span>
									<p>{{testDetails[0].time}}</p>
								</div>
								<router-link :to="'/Dtestrules/'+courseId">
								<button class="subscribe-btn" v-if="testDetails.length!=0&&userTestStatus==''">Take Test</button>
								<button class="subscribe-btn" v-if="testDetails.length!=0&&userTestStatus=='hasStarted'">Continue Test</button>
								</router-link>
								<a :href="'/DcourseCertificate/'+courseId+'/'+testId">
									<button class="subscribe-btn" v-if="testDetails.length!=0&&userTestStatus=='hasEnded'">Get Certificate</button>
								</a>
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
import { mapGetters, mapActions } from "vuex"
//import paystack from "vue-paystack";
import Errors from '@/components/Errors.vue'
import Success from '@/components/Success.vue'
import Loading from '@/components/Loading.vue'
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
	name: 'Dhome',
	data() {
        return{
			public_key: 'pk_test_b66d0123c39e5274812de14cde47231d2011e8d9',
			course: {user: [{firstName: '',lastName: '',_id: ''}]},
			instructor: '',
			playlist: '',
			courseId: '',
			userId: '',
			whatYouLearn: '',
			about : true,
			content : false,
			review : false,
			test: false,
			amount: 100,
			user: '',
			exist: false,
			purchased: false,
			star: '',
			like: '',
			reviewMessage: '',
			error: '',
			success: false,
			alreadyReviewed: true,
			reviews: '',
			stars: '',
			one: '',
			two: '',
			three: '',
			four: '',
			five: '',
			avrating: '',
			allLikes: '',
			AllPurchased: '',
			Loading: false,
			coursePreview: '',
			prevewVideoId: '',
			testDetails: [{ _id: ''}],
			testId: '',
			userTestStatus: '',
			skip: 0
        }
    },
    components: {
        Dheader,
		Dnav1,
		Errors,
		Loading,
		Success,
		//paystack,
        Dfooter
	},
	watch: {
		circle: function () {
            if (this.circle == 'loading') {
                this.Loading = true
            }else{
                this.Loading = false
            }
        }
	},
	computed: {
		...mapGetters(['isInstructor']),
		...mapGetters(['circle']),
		...mapGetters(['backEnd']),
		reference() {
			let text = "";
			let possible =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for (let i = 0; i < 10; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			return text;
		}
    },
	methods: {
        ...mapActions(['check_user_instructor']),
		...mapActions(['fetch_course_details']),
		...mapActions(['fetch_user']),
		...mapActions(['addCart']),
		...mapActions(['verify_course_payment']),
		...mapActions(['submit_Review']),
		...mapActions(['checkIf_UserAlreadyReviewedAndFetchAll']),
		...mapActions(['fetchAllPurchaseForCourse']),
		...mapActions(['fetch_TestForCourseDetails']),
		...mapActions(['checkIf_UserAlreadyStartedTest']),
		switchtap(tap){
			this.skip = 0
			switch (tap) {
				case 'about':
					this.about = true;
					this.content = false;
					this.review = false;
					this.test = false;
					break;
				case 'content':
					this.about = false;
					this.content = true;
					this.review = false;
					this.test = false;
					break;
				case 'review':
					this.about = false;
					this.content = false;
					this.review = true;
					this.test = false;
					break;
				case 'test':
					this.about = false;
					this.content = false;
					this.review = false;
					this.test = true;
					break;
			
				default:
					break;
			}
		},

		saveToCart(){
			let cart = []
			let ref = localStorage.getItem('fmrcart')
			if (ref == '' || ref == null) {
				cart = [];
			}else{
				cart = JSON.parse(localStorage.getItem('fmrcart'));
			}
			var element = this.course;
			element.email = this.user.email
			cart.push(element);
			this.addCart(cart.length);
			cart = JSON.stringify(cart);
			localStorage.setItem("fmrcart", cart);
			this.exist = true
			//console.log(cart)
			//alert('item successfully added to your cart');
			
		},

		setStar(level){
			this.star = level
		},
		
		setLike(value){
			this.like = value
		},
		validate(){
            let error = [];
            let message = '';
			let flag = true;
            if (this.star == '') {
                message = 'Please tell us the star level of this course';
                error.push(message)
                flag = false
            }
            if (this.like == '') {
                message = 'Please tell us is you like this course';
                error.push(message)
                flag = false
            }
            if (this.reviewMessage == '') {
                message = 'Please insert your review message';
                error.push(message)
                flag = false
            }
            if (flag == true) {
                return true
            }else{
                this.error = error
                return false
            }
		},
		submitReview(){
			if (this.validate()) {
				let object ={
					user: this.userId,
					id: this.courseId,
					star: this.star,
					like: this.like,
					reviewMessage: this.reviewMessage,
					type: 'course'
				}
				this.submit_Review(object)
				.then(res => {
					this.reviews = res.data.Reviews
					this.stars = res.data.stars
					this.alreadyReviewed = res.data.alreadyReviewed
					this.one = this.checkStar(1)
					this.two = this.checkStar(2)
					this.three = this.checkStar(3)
					this.four = this.checkStar(4)
					this.five = this.checkStar(5)
					this.avrating = this.checkAveageStar()
					this.allLikes = this.countlikes()
					this.success = true
				})
			}
		},
		checkStar(star){
			let total = 0;
			let answer = 0;
			if (this.stars.length == 0) {
				answer = 0;
			}else{
				for (let i = 0; i < this.stars.length; i++) {
					const element = this.stars[i];
					if (element.star == star) {
						total++;
					}
				}
				
				answer = (total/this.stars.length)*100;
			}
			return answer.toFixed(1);
		},
		checkAveageStar(){
			let total = 0;
			let answer = 0;
			if (this.stars.length == 0) {
				answer = 0;
			}else{
				for (let i = 0; i < this.stars.length; i++) {
					const element = this.stars[i];
					total = element.star + total
				}
				answer = total/this.stars.length;
			}
			return answer.toFixed(1);
		},
		countlikes(){
			let total = { like : 0, dislike : 0};
			for (let i = 0; i < this.stars.length; i++) {
				const element = this.stars[i];
				if (element.like == 1) {
					total.like++
				}else{
					total.dislike++
				}
			}
			return total;
		},
		checkCoursePreview(){
			for (let i = 0; i < this.playlist.length; i++) {
				const element = this.playlist[i];
				if (element.sectionTitle=='Preview') {
					for (let j = 0; j < element.videos.length; j++) {
						const elementj = element.videos[j];
						if (elementj.isPreview) {
							this.coursePreview = elementj
							let id = this.coursePreview.uri+'';
							let cleanId = id.split('/videos/')[1]
							this.prevewVideoId = cleanId
						}
					}
				}
			}
		},
		fetchMore(){
            this.skip = this.skip + 10
            this.Loading = true
            let reviewObject= {
				user : this.userId, 
				id : this.courseId,
				type : 'course',
				skip : this.skip
			}
			this.checkIf_UserAlreadyReviewedAndFetchAll(reviewObject)
			.then(res => {
				for (let i = 0; i < res.data.Reviews.length; i++) {
					const element = res.data.Reviews[i];
					this.reviews.push(element)
				}
				this.Loading = false
			})
            
            
        },
		processPayment: () => {
			window.alert("Payment recieved")
		},
		close: () => {
			console.log("You closed checkout page")
		}
    },   
    mounted(){
		this.courseId = this.$route.params.id
		this.userId = localStorage.getItem('fmruser');
		let object = {
			courseId: this.courseId,
			userId: this.userId
		}
		let url = this.courseId+''
		let size = url.split('?')
		if (size.length>1) {
			console.log('empty');
		}else{
			this.fetch_course_details(object)
			.then(res =>{
				this.playlist = res.data.modules
				this.course = res.data.course
				this.amount = this.course.price.$numberDecimal
				this.instructor = res.data.instructor
				let what = this.course.whatYouLearn+''
				this.whatYouLearn = what.split(',')
				this.checkCoursePreview()
			})
			.catch(err => {
				console.log(err)
			})
		} 
		this.fetch_user(this.userId)
		.then(res =>{
			this.user = res.data.user
		})
		.catch(err => {
			console.log(err)
		})
		let userObject = {
			userId : this.userId,
			courseId : this.courseId
		}

		this.verify_course_payment(userObject)
		.then(res => {
			this.purchased = res.data.isPurchased
			if (this.purchased) {
				this.fetch_TestForCourseDetails(this.courseId)
				.then(res => {
					this.testDetails = res.data
					if (res.data.length>0) {
						this.testId = this.testDetails[0]._id
						let myObject = {
								user : this.userId,
								test : this.testDetails[0]._id
							}
						this.checkIf_UserAlreadyStartedTest(myObject)
						.then(res=> {
							if (res.data.alreadyStarted) {
								this.userTestStatus = 'hasStarted'
								if (res.data.test[0].completed||res.data.test[0].canceled) {
									this.userTestStatus = 'hasEnded'
								} 
							}
						})
					}
					
				})
			}
		})
		let cart = localStorage.getItem('fmrcart')
		if (cart == '' || cart == null) {
			cart = [];
			this.exist = false
		}else{
			cart = JSON.parse(localStorage.getItem('fmrcart'));
			let courseId = this.$route.params.id
			for (let i = 0; i < cart.length; i++) {
				const item = cart[i];
				if (item._id == courseId) {
					this.exist = true
				}
			}
		}

		let reviewObject= {
			user : this.userId, 
			id : this.courseId,
			type : 'course'
		}
		this.checkIf_UserAlreadyReviewedAndFetchAll(reviewObject)
		.then(res => {
			this.alreadyReviewed = res.data.alreadyReviewed
			this.reviews = res.data.Reviews
			this.stars = res.data.stars
			this.one = this.checkStar(1)
			this.two = this.checkStar(2)
			this.three = this.checkStar(3)
			this.four = this.checkStar(4)
			this.five = this.checkStar(5)
			this.avrating = this.checkAveageStar()
			this.allLikes = this.countlikes()
		})

		this.fetchAllPurchaseForCourse(this.courseId)
		.then(res => {
			this.AllPurchased = res.data.people.length
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
	
	.nav-link{
		cursor: pointer;
	}

	.liked{
		background-color: yellowgreen;
		border: 2px solid yellowgreen;
	}

	.likeButton{
		width: 50px;
		height: 50px;
		border-radius: 10px;
		padding: 10px;
	}

	.liking{
		width: 60px;
		height: 60px;
		display: inline-block;
		margin: 5px;
		padding-top: 10px;
	}

	.darkest{
		background-color: black;
		padding-top: 50px;
		padding-bottom: 50px;
		margin: 0px;
	}

</style>
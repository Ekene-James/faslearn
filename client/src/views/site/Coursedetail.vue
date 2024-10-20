<template>
    <div>
        <Nav />

        <Tittle :type="'courses'">
            <h1 class="fadeInUp"><span></span>{{details.title}}</h1>
        </Tittle>
        <div class="bg_color_1">
			<nav class="secondary_nav sticky_horizontal">
				<div class="container">
					<ul class="clearfix">
						<li><a href="#description" class="active">{{details.secondTitle}}</a></li>
						<!-- <li><a href="#lessons">Lessons</a></li>
						<li><a href="#reviews">Reviews</a></li> -->
					</ul>
				</div>
			</nav>
			<div class="container margin_60_35">
				<div class="row">
					<div class="col-lg-8">
						
						<section id="description">
							<h2>Description</h2>
							<p>{{details.description}}</p>
							<h5>What will you learn</h5>
							<ul class="list_ok">
								<li v-for="what in whatYouLearn" :key="what">
									<h6>{{what}}</h6>
								</li>
							</ul>
							<hr>
							<h2>Requirements</h2>
							<div class="row">
								<div class="col-lg-6">
									<ul class="bullets">
										<li>{{details.requirement}}</li>
									</ul>
								</div>
							</div>
							<!-- /row -->
						</section>
						<!-- /section -->
						
						<section id="lessons">
							<div class="intro_title">
								<h2>Lessons</h2>
								<ul>
									<li>{{lectures.length}} lessons</li>
								</ul>
							</div>
							<div id="accordion_lessons" role="tablist" class="add_bottom_45">
								<div class="card" v-for="lect in lectures" :key="lect">
									<div class="card-header" role="tab" id="headingOne">
										<h5 class="mb-0">
											<a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><i class="indicator ti-minus"></i>{{lect.sectionTitle}}</a>
										</h5>
									</div>

									<div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion_lessons">
										<div class="card-body">
											<div class="list_lessons">
												<ul>
													<li v-for="play in lect.videos" :key="play" >
														<a href="" class="txt_doc" v-if="play.fileType=='application/pdf'">{{play.title}}</a>
														<a href="" class="video" v-else>{{play.title}}</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<!-- /card -->
							</div>
							<!-- /accordion -->
						</section>
						<!-- /section -->
						
						<section id="reviews">
							<h2>Reviews</h2>
							<div class="reviews-container">
								<div class="row">
									<div class="col-lg-3">
										<div id="review_summary">
											<strong>{{avrating}}</strong>
											<div class="rating">
												<i class="icon_star" :class="{ voted: avrating>0||avrating==1 }"></i>
												<i class="icon_star" :class="{ voted: avrating>1||avrating==2 }"></i>
												<i class="icon_star" :class="{ voted: avrating>2||avrating==3 }"></i>
												<i class="icon_star" :class="{ voted: avrating>3||avrating==4 }"></i>
												<i class="icon_star" :class="{ voted: avrating>4||avrating==5 }"></i>
											</div>
											<small>Based on {{stars.length}} reviews</small>
										</div>
									</div>
									<div class="col-lg-9">
										<div class="row">
											<div class="col-lg-10 col-9">
												<div class="progress">
													<div class="progress-bar" role="progressbar" :style="'width: '+five+'%'" :aria-valuenow="five" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div class="col-lg-2 col-3"><small><strong>5 stars</strong></small></div>
										</div>
										<!-- /row -->
										<div class="row">
											<div class="col-lg-10 col-9">
												<div class="progress">
													<div class="progress-bar" role="progressbar" :style="'width: '+four+'%'" :aria-valuenow="four" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div class="col-lg-2 col-3"><small><strong>4 stars</strong></small></div>
										</div>
										<!-- /row -->
										<div class="row">
											<div class="col-lg-10 col-9">
												<div class="progress">
													<div class="progress-bar" role="progressbar" :style="'width: '+three+'%'" :aria-valuenow="three" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div class="col-lg-2 col-3"><small><strong>3 stars</strong></small></div>
										</div>
										<!-- /row -->
										<div class="row">
											<div class="col-lg-10 col-9">
												<div class="progress">
													<div class="progress-bar" role="progressbar" :style="'width: '+two+'%'" :aria-valuenow="two" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div class="col-lg-2 col-3"><small><strong>2 stars</strong></small></div>
										</div>
										<!-- /row -->
										<div class="row">
											<div class="col-lg-10 col-9">
												<div class="progress">
													<div class="progress-bar" role="progressbar" :style="'width: '+one+'%'" :aria-valuenow="one" aria-valuemin="0" aria-valuemax="100"></div>
												</div>
											</div>
											<div class="col-lg-2 col-3"><small><strong>1 stars</strong></small></div>
										</div>
										<!-- /row -->
									</div>
								</div>
								<!-- /row -->
							</div>

							<hr>

							<div class="reviews-container">

								<div class="review-box clearfix" v-for="v in reviews" :key="v">
									<figure class="rev-thumb"><img src="http://via.placeholder.com/150x150/ccc/fff/avatar1.jpg" alt="">
									</figure>
									<div class="rev-content">
										<p>
											{{v.user[0].firstName}} {{v.user[0].lastName}}
										</p>
										<div class="rating">
											<i class="icon_star" :class="{ voted: v.star>0||v.star==1 }"></i>
											<i class="icon_star" :class="{ voted: v.star>1||v.star==2 }"></i>
											<i class="icon_star" :class="{ voted: v.star>2||v.star==3 }"></i>
											<i class="icon_star" :class="{ voted: v.star>3||v.star==4 }"></i>
											<i class="icon_star" :class="{ voted: v.star>4||v.star==5 }"></i>
										</div>
										<div class="rev-info">
											{{v.createdAt}}
										</div>
										<div class="rev-text">
											<p>
												{{v.reviewMessage}}
											</p>
										</div>
									</div>
								</div>
								<!-- /review-box -->
							</div>
							<!-- /review-container -->
						</section>
						<!-- /section -->
					</div>
					<!-- /col -->
					
					<aside class="col-lg-4" id="sidebar">
						<div class="box_detail">
							<figure>
								<a :href="'/Dcoursedetail/'+courseId" class="video"><!--<i class="arrow_triangle-right"></i>--><img v-bind:src="backEnd+'public/courseImage/'+courseId" alt="" class="img-fluid"><!--<span>View course preview</span>--></a>
							</figure>
							<div class="price">
								₦{{price}}<span class="original_price"><em>₦0</em>0% discount price</span>
							</div>
							<a :href="'/Dcoursedetail/'+details._id" class="btn_1 full-width">Purchase</a>
							<a :href="'/Dcoursedetail/'+details._id" class="btn_1 full-width outline"><i class="icon_heart"></i> Add to wishlist</a>
							<div id="list_feat">
								<h3>What's includes</h3>
								<ul>
									<li><i class="icon_mobile"></i>Mobile support</li>
									<li><i class="icon_archive_alt"></i>Lesson archive</li>
									<li><i class="icon_mobile"></i>Mobile support</li>
									<li><i class="icon_chat_alt"></i>Tutor chat</li>
									<li><i class="icon_document_alt"></i>Course certificate</li>
								</ul>
							</div>
						</div>
					</aside>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
		<!-- /bg_color_1 -->
    
        <Footer />

    </div>
</template>
<script>
	import { mapActions, mapGetters } from "vuex";
    import Nav from '@/components/site/Nav.vue'
    import Tittle from '@/components/site/Tittle.vue'
    import Footer from '@/components/site/Footer.vue'
    export default {
		name: 'Coursedetails',
		data(){
			return{
				details: '',
				whatYouLearn: '',
				lectures: '',
				courseId: '',
				price: '',
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
			}
		},
		computed: {
			...mapGetters(['backEnd'])
		},
        components: {
            Nav,
            Tittle,
            Footer
		},
		methods:{
			...mapActions(['fetch_public_course_details__public']),
			...mapActions(['fetchReviewedPublic']),
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
		},
        mounted(){
			let course_id = this.$route.params.id
			this.courseId = course_id
			let object ={
				courseId : course_id
			} 
			this.fetch_public_course_details__public(object)
			.then(res => {
				this.details = res.data.course
				this.lectures = res.data.modules
				let what = this.details.whatYouLearn+''
				this.whatYouLearn = what.split(',')
				this.price = res.data.course.price.$numberDecimal
			}) 
			let reviewObject= { 
				id : this.courseId,
				type : 'course'
			}
			this.fetchReviewedPublic(reviewObject)
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

        }
    }
</script>

<style>
	@import url("./assets/css/bootstrap.min.css");
	@import url("./assets/css/style.css");
	@import url("./assets/css/vendors.css");
	@import url("./assets/css/icon_fonts/css/all_icons.min.css");
	@import url("./assets/css/skins/square/grey.css");
	@import url("./assets/css/wizard.css");
	@import url("./assets/css/blog.css");
	@import url("./assets/css/tables.css");
	@import url("./assets/css/custom.css");

</style>
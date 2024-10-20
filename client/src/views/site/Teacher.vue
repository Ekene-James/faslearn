<template>
    <div>
        <Nav />

        <Tittle :type="'instructor'">
            <h1 class="fadeInUp"><span>{{user.firstName}} {{user.lastName}}</span></h1>
        </Tittle>
	
        <div class="container margin_60_35">
			<div class="row">
				<aside class="col-lg-3" id="sidebar">
					<div class="profile">
						<figure style="border-radius: 20px;">
							<ProfileImage :id="user._id" v-if="user!=''"/>
							<!-- <img src="http://via.placeholder.com/150x150/ccc/fff/teacher_2_small.jpg" alt="Teacher" class="rounded-circle"> -->
						</figure>
						<ul class="social_teacher">
							<li><a href="#"><i class="icon-facebook"></i></a></li>
							<li><a href="#"><i class="icon-twitter"></i></a></li>
							<li><a href="#"><i class="icon-linkedin"></i></a></li>
							<li><a href="#"><i class="icon-email"></i></a></li>
						</ul>
						<ul>
							<li>Name <span class="float-right"></span> {{user.lastName}}</li>
							<li>Courses <span class="float-right">{{instructorCourses.length}}</span></li>
						</ul>
					</div>
				</aside>
				<!--/aside -->

				<div class="col-lg-9">
					<div class="box_teacher">
						<div class="indent_title_in">
							<i class="pe-7s-user"></i>
							<h3>Profile</h3>
						</div>
						<div class="wrapper_indent">
							<h5>Credentials</h5>
							<div class="row">
								<div class="col-md-6">
									<ul class="list_3">
										<li><strong>expertise : {{instructor.expertise}}</strong>
										</li>
										<li><strong>Years of Experience : {{experience}}</strong>
										</li>
									</ul>
								</div>
								<!-- <div class="col-md-6">
									<ul class="list_3">
										<li><strong>Years of Experience - {{instructor.experience}}</strong>
										</li>
									</ul>
								</div> -->
							</div>
							<!-- End row-->
						</div>
						<!--wrapper_indent -->
						<hr class="styled_2">
						<div class="indent_title_in">
							<i class="pe-7s-display1"></i>
							<h3>Teacher's courses</h3>
						</div>
						<div class="wrapper_indent">
							<div class="table-responsive">
								<table class="table table-striped add_bottom_30">
									<thead>
										<tr>
											<th>Category</th>
											<th>Course name</th>
											<th>Rate</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="cos in instructorCourses" :key="cos">
											<td>{{cos.category[0].name}}</td>
											<td><router-link :to="'/coursedetail/'+cos._id">{{cos.title}}</router-link></td>
											<Ratings :id="cos._id" :type="'course'" />
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<!--wrapper_indent -->
					</div>

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
								<figure class="rev-thumb">
									<ProfileImage :id="v.user[0]._id" />
								</figure>
								<div class="rev-content">
									<p>
										{{v.user[0].firstName}} {{v.user[0].lastName}} {{v.user[0]._id}}
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
				</div>
				<!-- /col -->
			</div>
			<!-- /row -->
		</div>
		<!-- /container -->

        <Footer />
    </div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import ProfileImage from "@/components/ProfileImage";
	import Ratings from '@/components/site/Ratings.vue'
    import Nav from '@/components/site/Nav.vue'
    import Tittle from '@/components/site/Tittle.vue'
    import Footer from '@/components/site/Footer.vue'
    export default {
		name: 'Teacher',
		data(){
			return{
				instructorCourses: '',
				user: '',
				instructor : '',
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
				experience: '',
				skip: 0
			}
		},
		computed: {
			...mapGetters(['backEnd'])
		},
        components: {
            Nav,
			Tittle,
			Ratings,
			ProfileImage,
            Footer
		},
		methods: {
			...mapActions(['fetchOneInstructor__public']),
			...mapActions(['fetchInstructorCourse__public']),
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
            let js = document.createElement('script')
            js.setAttribute('src', 'js/main.js')
            document.head.appendChild(js)
            let jsc = document.createElement('script')
            jsc.setAttribute('src', 'js/common_scripts.js')
			document.head.appendChild(jsc)

			let user_id = this.$route.params.id;
			this.fetchOneInstructor__public(user_id) 
            .then(res => {
				this.instructor = res.data[0]
				this.user = res.data[0].user[0]
				let started = this.instructor.experience.split('-')[0]
				var currentTime = new Date()
				var year = currentTime.getFullYear()
				this.experience = year-started
			})
			
			this.fetchInstructorCourse__public({instructor_id: user_id, skip: this.skip})
			.then(res => {
				this.instructorCourses = res.data
			})

			let reviewObject= { 
				id : user_id,
				type : 'instructor'
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
 /* img{
	 border-radius: 10px;
 } */
</style>
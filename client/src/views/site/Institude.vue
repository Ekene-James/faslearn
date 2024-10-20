<template>
    <div>
        <Nav />

        <Tittle :img="institution._id" :type="'institution'">
            <h1 class="fadeInUp"><span></span>{{institution.institutionName}}</h1>
        </Tittle>
        <div class="container margin_60_35">
			<div class="row">
				<aside class="col-lg-3" id="sidebar">
					<div class="profile">
						<figure><img :src="backEnd+'public/institutionImage__public/'+institutionId" alt="Teacher" style="height: 150px; width: 150px" class="rounded-circle"></figure>
						<ul class="social_teacher">
							<li><a href="#"><i class="icon-facebook"></i></a></li>
							<li><a href="#"><i class="icon-twitter"></i></a></li>
							<li><a href="#"><i class="icon-linkedin"></i></a></li>
							<li><a href="#"><i class="icon-email"></i></a></li>
						</ul>
						<ul>
							<li>Name <span class="float-right">{{institution.institutionName}}</span> </li>
							<li>Courses <span class="float-right">{{theCourses.length}}</span></li>
						</ul>
					</div>
				</aside>
				<!--/aside -->

				<div class="col-lg-9">
					<div class="box_teacher">
						<div class="indent_title_in">
							<i class="pe-7s-user"></i>
							<h3>Bio</h3>
							<p>@{{institution.address}}</p>
						</div>
						<div class="wrapper_indent">
							<p>{{institution.bio}}</p>
							<!-- <h5>Credentials</h5>
							<p>Lorem ipsum dolor sit amet, dicta oportere ad est, ea eos partem neglegentur theophrastus. Esse voluptatum duo ne, expetenda corrumpit no per, at mei nobis lucilius. No eos semper aperiri neglegentur, vis noluisse quaestio no. Vix an nostro inimicus, qui ut animal fabellas reprehendunt. In quando repudiare intellegebat sed, nam suas dicta melius ea.</p>
							<div class="row">
								<div class="col-md-6">
									<ul class="list_3">
										<li><strong>September 2009 - Bachelor Degree in Economics</strong>
											<p>University of Cambrige - United Kingdom</p>
										</li>
										<li><strong>December 2012 - Master course in Economics</strong>
											<p>University of Cambrige - United Kingdom</p>
										</li>
										<li><strong>October 2013 - Master's Degree in Statistic</strong>
											<p>University of Oxford - United Kingdom</p>
										</li>
									</ul>
								</div>
								<div class="col-md-6">
									<ul class="list_3">
										<li><strong>September 2009 - Bachelor Degree in Economics</strong>
											<p>University of Cambrige - United Kingdom</p>
										</li>
										<li><strong>December 2012 - Master course in Economics</strong>
											<p>University of Cambrige - United Kingdom</p>
										</li>
									</ul>
								</div>
							</div> -->
							<!-- End row-->
						</div>
						<!--wrapper_indent -->
						<hr class="styled_2">
						<div class="indent_title_in">
							<i class="pe-7s-display1"></i>
							<h3>Institution courses</h3>
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
										<tr v-for="cos in theCourses" :key="cos">
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
	import { mapActions, mapGetters } from "vuex";
	import ProfileImage from "@/components/ProfileImage";
	import Ratings from '@/components/site/Ratings.vue'
    import Nav from '@/components/site/Nav.vue'
    import Tittle from '@/components/site/Tittle.vue'
    import Footer from '@/components/site/Footer.vue'
    export default {
		name: 'Teacher',
		data(){
			return{
				institutionId: '',
				institution: '',
				theCourses: '',
				user_id: '',
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
				skip : 0
			}
		},
        components: {
            Nav,
			Tittle,
			Ratings,
			ProfileImage,
            Footer
		},
		computed:{
			...mapGetters(['backEnd'])
		},
		methods: {
			...mapActions(['fetch_institude_details__public']),
			...mapActions(['fetch_teacher_courses__public']),
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

			this.institutionId = this.$route.params.id
			this.fetch_institude_details__public(this.institutionId )
			.then(res => {
				this.institution = res.data
				this.user_id = res.data.user[0]

				this.fetch_teacher_courses__public({userId: this.user_id, skip : this.skiip})
				.then(res => {
					this.theCourses = res.data
				})
			})

			let reviewObject= { 
				id : this.institutionId,
				type : 'institution'
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
	#sidebar{
		position: sticky;
		top: 50px;
	}
</style>
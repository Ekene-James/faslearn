<template>
    <div>
    <!-- Header Start -->
        <Dheader />
	<!-- Header End -->
		<Dnav1 />
	<!-- Body Start -->
	<div class="wrapper">		
		<div class="_215cd2">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">						
						<div class="course_tabs">
							<nav>
								<div class="nav nav-tabs tab_crse  justify-content-center">
									<a class="nav-item nav-link" v-bind:class="{ active: about }" @click.prevent="switchtap('about')">About</a>
									<!-- <a class="nav-item nav-link" v-bind:class="{ active: blog }" @click.prevent="switchtap('blog')">Blog</a> -->
									<a class="nav-item nav-link" v-bind:class="{ active: general }" @click.prevent="switchtap('general')">Company</a>
									<a class="nav-item nav-link" v-bind:class="{ active: lecturers }" @click.prevent="switchtap('lecturers')">Lecturers</a>
									<a class="nav-item nav-link" v-bind:class="{ active: courses }" @click.prevent="switchtap('courses')">Courses</a>
									<a class="nav-item nav-link" v-bind:class="{ active: review }" @click.prevent="switchtap('review')">Review</a>
									<a class="nav-item nav-link" v-bind:class="{ active: edit }" @click.prevent="switchtap('edit')" v-if="isFounder">Edit</a>
								</div>
							</nav>						
						</div>
						<div class="title129 mt-35 mb-35">	
							<h2>{{institution.institutionName}}</h2>
							<!-- <p>{{institution}}</p> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="_215zd5" v-if="general" id="General">
			<div class="container">
				<div class="row">
					<div class="col-md-6">
						<div class="title484">
							<h2>Our Bio</h2>
							<img class="line-title" src="./assets/images/line.svg" alt="">
							<p>{{institution.bio}}</p >				
						</div>
					</div>
					<div class="col-md-6">
						<div class="story125">
							<img :src="backEnd+'public/institutionImage__public/'+institutionId" style="width: 250px; height: 250px; border-radius: 50%;" alt="">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12">
						<div class="title589 text-center">
							<h2>Join Us</h2>
							<p>On our Institution, you have access to:</p>
							<img class="line-title" src="./assets/images/line.svg" alt="">
						</div>
					</div>
				</div>
				<br><br>
				<router-link :to="'/Dadmission/'+institutionId">
				<div class="row" style="cursor: pointer" v-if="!alreadyApplied">
					<div class="col-lg-12">
						<div class="title589 text-center">
							<h2><i class="uil uil-award"></i></h2>
							<h4>Become A Student in Our Online Institution</h4>
						</div>
					</div>
				</div>
				<br><br>
				</router-link>
				<router-link :to="'/Demployment/'+institutionId">
				<div class="row" style="cursor: pointer" v-if="isInstructor&&!alreadyAppliedInstructor">
					<div class="col-lg-12">
						<div class="title589 text-center">
							<h2><i class="uil uil-users-alt"></i></h2>
							<h4>Become A Lecturer in Our Online Institution</h4>
						</div>
					</div>
				</div>
				</router-link>
			</div>
		</div>
		<div class="_215zd5" v-if="courses" id="course">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">
						<div class="title589 text-center">
							<h2>Our Courses</h2>
							<img class="line-title" src="./assets/images/line.svg" alt="">
						</div>
						<div class="course_tabs">
							<nav>
								<div class="nav nav-tabs tab_crse  justify-content-center">
									<a class="nav-item nav-link" v-bind:class="{ active: focus =='institution' }" @click.prevent="switchFocus('institution')">Institution Coures</a>
									<a class="nav-item nav-link" v-bind:class="{ active: focus =='affiliated' }" @click.prevent="switchFocus('affiliated')">Affiliated Coures</a>
								</div>
							</nav>						
						</div>
					</div>
				</div>
				<div class="branches_all" v-if="focus=='institution'">
					<div class="row">
						<div class="col-lg-4 col-md-4" v-for="cos in theCourses" :key="cos">
							<router-link :to="'/Dcoursedetail/'+cos._id">						
							<div class="blogbg_1 mt-30">
								<a href="#" class="cpy_img">
									<img :src="backEnd+'public/courseImage/'+cos._id" alt="">
									<div class="course-overlay"></div>
                                    <CourseTime :id="cos._id" :type="'dashboard'"/>
								</a>
								<div class="cpy_content">
                                	<TotalSeenCourse :id="cos._id" :type="'dashboard'" />
									<a href="#" class="cmpy14s title900">{{cos.title}}</a>
									<Ratings :id="cos._id" :type="'course'" />
									<p class="blog_des">
									{{cos.secondTitle}}
									</p>
									<p>{{cos.category[0].name}}</p>
									<div class="auth1lnkprce">
										<p class="cr1fot">By <a >{{cos.user[0].firstName}} {{cos.user[0].lastName}}</a></p>
										<div class="prce142">₦{{cos.price.$numberDecimal}}</div>
									</div>
								</div>
							</div>
							</router-link>
						</div>					
					</div>	
					<br><br><br>
					<center>
						<button class="live_link" type="button" v-if="!Loading" @click="fetchMore('own')">Load More</button>	
					</center>
					<br><br><br>				
				</div>
				<div class="branches_all" v-if="focus=='affiliated'">
					<div class="row">
						<div class="col-lg-4 col-md-4" v-for="cos in AllAffiliatedCourses" :key="cos">
							<router-link :to="'/Dcoursedetail/'+cos._id">						
							<div class="blogbg_1 mt-30">
								<a href="#" class="cpy_img">
									<img :src="backEnd+'public/courseImage/'+cos._id" alt="">
									<div class="course-overlay"></div>
                                    <CourseTime :id="cos._id" :type="'dashboard'"/>
								</a>
								<div class="cpy_content">
                                    <TotalSeenCourse :id="cos._id" :type="'dashboard'" />
									<a href="#" class="cmpy14s title900">{{cos.title}}</a>
									<Ratings :id="cos._id" :type="'course'" />
									<p class="blog_des">
									{{cos.secondTitle}}
									</p>
									<p>{{cos.category[0].name}}</p>
									<div class="auth1lnkprce">
										<p class="cr1fot">By <a >{{cos.user[0].firstName}} {{cos.user[0].lastName}}</a></p>
										<div class="prce142">₦{{cos.price.$numberDecimal}}</div>
									</div>
								</div>
							</div>
							</router-link>
						</div>					
					</div>	
					<br><br><br>
					<center>
						<button class="live_link" type="button" v-if="!Loading" @click="fetchMore('affiliate')">Load More</button>	
					</center>
					<br><br><br>				
				</div>
			</div>
		</div>
		<div class="_215zd5" v-if="blog" id="blog">
			<div class="container">
				<div class="row">
					<div class="col-lg-3 col-md-5">
						<div class="fcrse_3 mt-50">
							<ul class="blogleft12">
								<li>
									<div class="explore_search blg152">
										<div class="ui search focus">
											<div class="ui left icon input swdh11 swdh15">
												<input class="prompt srch_explore" type="text" placeholder="Search">
												<i class="uil uil-search-alt icon icon2"></i>
											</div>
										</div>
									</div>
								</li>
								<li>
									<a href="#collapse1" class="category-topics cate-right collapsed" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapse1">Labels</a>
									<div class="collapse" id="collapse1" style="">
										<ul class="category-card">
											<li>
												<a href="#" class="category-item1 active">All</a>																											
												<a href="#" class="category-item1">Students</a>																												
												<a href="#" class="category-item1">Instructors</a>																												
												<a href="#" class="category-item1">Ideas & Opinions</a>																												
												<a href="#" class="category-item1">Edututs+ News</a>																												
												<a href="#" class="category-item1">Social Innovation</a>
											</li>											
										</ul>
									</div>
									<a href="#collapse2" class="category-topics cate-right collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapse2">Archive</a>
									<div class="collapse" id="collapse2" style="">
										<ul class="category-card">
											<li>
												<a href="#" class="category-item1">January 2020</a>																											
												<a href="#" class="category-item1">February 2020</a>																											
												<a href="#" class="category-item1">March 2020</a>																											
												<a href="#" class="category-item1">April 2020</a>																																																																																											
											</li>																												
										</ul>
									</div>
								</li>
								<li>
									<div class="socl148">
										<button class="twiter158" data-href="#" onclick="sharingPopup(this);" id="twitter-share"><i class="uil uil-twitter ic45"></i>Follow</button>
										<button class="facebook158" data-href="#" onclick="sharingPopup(this);" id="facebook-share"><i class="uil uil-facebook ic45"></i>Follow</button>
									</div>
								</li>
								<li>
									<div class="help_link">
										<p>Learn More</p>
										<a href="#">Cursus Help Center</a>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-lg-9 col-md-7">
						<div class="blogbg_1 mt-50">
							<a href="blog_single_view.html" class="hf_img">
								<img src="assets/images/blog/img-1.jpg" alt="">
								<div class="course-overlay"></div>
							</a>
							<div class="hs_content">
								<div class="vdtodt">
									<span class="vdt14">109k views</span>
									<span class="vdt14">March 10, 2020</span>
								</div>
								<a href="blog_single_view.html" class="crse14s title900">Blog Title Here</a>
								<p class="blog_des">Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor, vitae fringilla quam interdum mollis arcu.</p>
								<a href="blog_single_view.html" class="view-blog-link">Read More<i class="uil uil-arrow-right"></i></a>
							</div>
						</div>
						<div class="blogbg_1 mt-30">
							<a href="blog_single_view.html" class="hf_img">
								<img src="assets/images/blog/img-2.jpg" alt="">
								<div class="course-overlay"></div>
							</a>
							<div class="hs_content">
								<div class="vdtodt">
									<span class="vdt14">109k views</span>
									<span class="vdt14">March 10, 2020</span>
								</div>
								<a href="blog_single_view.html" class="crse14s title900">Blog Title Here</a>
								<p class="blog_des">Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor interdum mollis arcu interdum mollis arcu.</p>
								<a href="blog_single_view.html" class="view-blog-link">Read More<i class="uil uil-arrow-right"></i></a>
							</div>
						</div>
						<div class="blogbg_1 mt-30">
							<a href="blog_single_view.html" class="hf_img">
								<img src="assets/images/blog/img-3.jpg" alt="">
								<div class="course-overlay"></div>
							</a>
							<div class="hs_content">
								<div class="vdtodt">
									<span class="vdt14">109k views</span>
									<span class="vdt14">March 10, 2020</span>
								</div>
								<a href="blog_single_view.html" class="crse14s title900">Blog Title Here</a>
								<p class="blog_des">Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor interdum mollis arcu.</p>
								<a href="blog_single_view.html" class="view-blog-link">Read More<i class="uil uil-arrow-right"></i></a>
							</div>
						</div>
						<div class="blogbg_1 mt-30">
							<a href="blog_single_view.html" class="hf_img">
								<img src="assets/images/blog/img-4.jpg" alt="">
								<div class="course-overlay"></div>
							</a>
							<div class="hs_content">
								<div class="vdtodt">
									<span class="vdt14">109k views</span>
									<span class="vdt14">March 10, 2020</span>
								</div>
								<a href="blog_single_view.html" class="crse14s title900">Blog Title Here</a>
								<p class="blog_des">Donec eget arcu vel mauris lacinia vestibulum id eu elit. Nam metus odio, iaculis eu nunc et, interdum mollis arcu. Pellentesque viverra faucibus diam. In sit amet laoreet dolor interdum mollis arcu.</p>
								<a href="blog_single_view.html" class="view-blog-link">Read More<i class="uil uil-arrow-right"></i></a>
							</div>
						</div>
						<div class="main-p-pagination">
							<nav aria-label="Page navigation example">
								<ul class="pagination">
									<li class="page-item disabled">
										<a class="page-link" href="#" aria-label="Previous">
											PREV
										</a>
									</li>
									<li class="page-item"><a class="page-link active" href="#">1</a></li>
									<li class="page-item"><a class="page-link" href="#">2</a></li>
									<li class="page-item"><a class="page-link" href="#">...</a></li>
									<li class="page-item"><a class="page-link" href="#">24</a></li>
									<li class="page-item">
										<a class="page-link" href="#" aria-label="Next">
											NEXT
										</a>
									</li>
								</ul>
							</nav>
						</div>			
					</div>					
				</div>
			</div>
		</div>
		<div class="_215zd5" v-if="lecturers" id="lecturers">
			<div class="container">
				<div class="row">
					<div class="col-xl-3 col-lg-4 col-md-6" v-for="t in AllLecturers" :key="t">
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
				</div>
			</div>
		</div>
		<div class="_215zd5" id="about" v-if="about">
			<div class="_215td5">
				<div class="container">
					<div class="_215td5">
						<div class="container">
							<div class="row">
								<div class="col-lg-12">
									<div class="title589 text-center">
										<h2>About Us</h2>
										<img class="line-title" src="./assets/images/line.svg" alt="">
									</div>
								</div>
								<div class="col-lg-3  col-sm-6">
									<div class="feature125">
										<i class="uil uil-mobile-android-alt"></i>
										<h4>Join Faslearn since</h4>
										<p>{{institution.createdAt}}</p>
									</div>
								</div>
								<div class="col-lg-3  col-sm-6">
									<div class="feature125">
										<i class="uil uil-users-alt"></i>
										<h4>Academic & Technical Support</h4>
										<p>{{institution.email}}</p>
									</div>
								</div>
								<div class="col-lg-3  col-sm-6">
									<div class="feature125">
										<i class="uil uil-award"></i>
										<h4>Sharable Certificates</h4>
										<p>{{institution.institutionType}}</p>
									</div>
								</div>
								<div class="col-lg-3  col-sm-6">
									<div class="feature125">
										<i class="uil uil-globe"></i>
										<h4>Our Address</h4>
										<p>{{institution.address}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="title589 text-center">
								<h2>Our Global Reach</h2>
								<img class="line-title" src="./assets/images/line.svg" alt="">
							</div>
						</div>
						<div class="col-lg-2 col-md-4 col-sm-6">
							<div class="p__metric">
								{{InstitutionDashboard.instructors}}
								<span>Instructors</span>
							</div>
						</div>
						<div class="col-lg-2 col-md-4 col-sm-6">
							<div class="p__metric">
								{{InstitutionDashboard.courses}}
								<span>Courses</span>
							</div>
						</div>
						<div class="col-lg-2 col-md-4 col-sm-6">
							<div class="p__metric">
								{{InstitutionDashboard.saleN}}
								<span>Course enrollments</span>
							</div>
						</div>
						<div class="col-lg-2 col-md-4 col-sm-6">
							<div class="p__metric">
								{{InstitutionDashboard.students}}
								<span>Students</span>
							</div>
						</div>
						<div class="col-lg-2 col-md-4 col-sm-6">
							<div class="p__metric">
								{{InstitutionDashboard.AffiliateCourse}}
								<span>Affiliated courses</span>
							</div>
						</div>
						<div class="col-lg-2 col-md-4 col-sm-6">
							<div class="p__metric">
								{{stars.length}}
								<span>Reviews</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="_215zd5" id="about" v-if="review">
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
								<div class="_rate002">Institution Rating</div>	
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
						<div class="tab-pane fade show active" id="instructor-signup-tab" role="tabpanel" aria-labelledby="instructor-tab" v-if="!alreadyReviewed&&isStudent">
							<p>What do you think?</p>
							<form>
								<div class="ui search focus mt-15">
									<div class="help-block">How many stars does this institution deserve</div>																
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
									<div class="help-block">Do you like this institution</div>																
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
											<textarea rows="3" name="description" id="id_about" placeholder="Write a little description of your experience in this institution" v-model="reviewMessage"></textarea>
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
										<li>Thanks for your Review, we will try our best to make new institution better</li>	
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
							<button class="live_link" type="button" v-if="!Loading" @click="fetchMore('reviews')">Load More</button>	
						</center>
						<br><br><br>	
					</div>
				</div>
			</div>
		</div>
		<div class="_215zd5" v-if="edit">
			<center>
				<div class="col-lg-6 col-md-8">
					<div class="sign_form">
						<div class="tab-content" id="myTabContent">
							<div class="tab-pane fade show active" id="instructor-signup-tab" role="tabpanel" aria-labelledby="instructor-tab">
								
								<form style="margin-top: -70px">
									<div class="ui search focus">
										<div class="ui left icon input swdh11 swdh19">
											<input class="prompt srch_explore" type="text" v-model="institutionName" name="expertise" maxlength="64" placeholder="Institution Name">															
										</div>
									</div> 
									<br>
									<div class="ui search focus">
										<div class="ui left icon input swdh11 swdh19">
											<input class="prompt srch_explore" type="text" v-model="address" name="address" maxlength="204" placeholder="Enter Full Address">															
										</div>
									</div>
									<br>
									<div class="ui search focus">
										<div class="ui left icon input swdh11 swdh19">
											<input class="prompt srch_explore" type="email" v-model="email" name="email" maxlength="204" placeholder="Enter Institution Email">															
										</div>
									</div>
									<br>
									<div class="ui search focus">
										<div class="ui left icon input swdh11 swdh19">
											<input class="prompt srch_explore" type="number" v-model="mobile" name="mobile" maxlength="204" placeholder="Enter Mobile Contact Number">															
										</div>
									</div>
									<br>
									<div class="ui search focus mt-15">																
										<div class="ui form swdh30">
											<div class="field">
												<textarea rows="3" name="description" id="id_about" placeholder="Write a little description about this Institution..." v-model="bio"></textarea>
											</div>
										</div>
										<div class="help-block">Your biography should have at least 100 characters.</div>
									</div>
									<!-- <input type="file" v-model="cv" /> -->
									<br>
									<Errors v-if="error!=''">
										<ul>
											<li v-for="error in error" :key="error">{{error}}</li>	
										</ul>	
									</Errors>
									<br>
									
									<Loading v-if="Loading" />
									<Success v-if="Success" >
										<ul>
											<li>Action Successful</li>	
										</ul>
										<p></p>
									</Success>
									<!-- <div class="mt-3">Selected file: {{ cv ? cv.name : '' }}</div>							 -->
									<button class="login-btn" type="button" @click.prevent="saveChangesInfo" v-if="!Loading">Save Changes</button>
								</form>
							</div>
							<br>
						</div>
						<!-- <p class="mb-0 mt-30">Already have an account? <a href="sign_in.html">Log In</a></p> -->
					</div>
				</div>
			</center>
		</div>
		
		<Dfooter />
	</div>
	<!-- Body End -->
    </div>
</template>
<script>
import CourseTime from "@/components/CourseTime";
import TotalSeenCourse from "@/components/TotalSeenCourse";
import { mapActions, mapGetters } from 'vuex'
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
import Loading from '@/components/Loading.vue'
import Success from '@/components/Success.vue'
import ProfileImage from "@/components/ProfileImage";
import Ratings from '@/components/site/Ratings.vue'
import Errors from '@/components/Errors.vue'
export default {
	name: 'Dhome',
	data() {
		return{
			institutionId: '',
			institution: '',
			general: true,
			courses: false,
			lecturers: false,
			about: false,
			blog: false,
			review: false,
			edit: false,
			theCourses: '',
			user_id: '',
			alreadyApplied: true,
			isStudent: true,
			alreadyAppliedInstructor: true,
			reviews: '',
			stars: '',
			one: '',
			two: '',
			three: '',
			four: '',
			five: '',
			avrating: '',
            allLikes: '',
            star: '',
			like: '',
			error: '',
			reviewMessage: '',
            alreadyReviewed: true,
			Loading: false,
			isFounder: false,
			institutionName: '',
			bio: '',
			address: '',
			email: '',
			mobile: '',
			Success: false,
			InstitutionDashboard: '',
			AllLecturers: '',
			focus: 'institution',
			AllAffiliatedCourses: '',
			skip: 0
		}
	},
    components: {
		Dheader,
		Dnav1,
		Dfooter,
		Loading,
        CourseTime,
        TotalSeenCourse,
		Errors,
		ProfileImage,
		Ratings,
		Success
	},
	computed: {
		...mapGetters(['backEnd']),
		...mapGetters(['isInstructor'])
	},
	methods: {
		...mapActions(['fetch_institude_details']),
		...mapActions(['fetch_teacher_courses']),
		...mapActions(['check_IsUserInstitutionStudent']),
		...mapActions(['check_IsLecturerAppllied']),
		...mapActions(['submit_Review']),
		...mapActions(['checkIf_UserAlreadyReviewedAndFetchAll']),
		...mapActions(['update_institution_Info']),
		...mapActions(['fetch_InstitutionDashboard']),
		...mapActions(['fetch_AllInstitutionLecturers']),
		...mapActions(['fetch_AllInstitutionAffiliatedCourses']),
		switchFocus(to){
			this.skip = 0
			this.focus = to
		},
		switchtap(tap){
			this.skip = 0
			switch (tap) {
				case 'general':
					this.general = true;
					this.about = false;
					this.courses = false;
					this.lecturers = false;
					this.blog = false;
					this.review = false;
					this.edit = false;
					break;
				case 'about':
					this.general = false;
					this.about = true;
					this.courses = false;
					this.lecturers = false;
					this.blog = false;
					this.review = false;
					this.edit = false;
					break;
				case 'courses':
					this.general = false;
					this.about = false;
					this.courses = true;
					this.lecturers = false;
					this.blog = false;
					this.review = false;
					this.edit = false;
					break;
				case 'lecturers':
					this.general = false;
					this.about = false;
					this.courses = false;
					this.lecturers = true;
					this.blog = false;
					this.review = false;
					this.edit = false;
					break;
				case 'blog':
					this.general = false;
					this.about = false;
					this.courses = false;
					this.lecturers = false;
					this.blog = true;
					this.review = false;
					this.edit = false;
					break;
				case 'review':
					this.general = false;
					this.about = false;
					this.courses = false;
					this.lecturers = false;
					this.blog = false;
					this.review = true;
					this.edit = false;
					break;
				case 'edit':
					this.general = false;
					this.about = false;
					this.courses = false;
					this.lecturers = false;
					this.blog = false;
					this.review = false;
					this.edit = true;
					break;
				default:
					break;
			}
		},
		submitReview(){
			if (this.validate()) {
                this.Loading = true
				let object ={
					user : this.user_id, 
					id : this.institutionId,
					star: this.star,
					like: this.like,
					reviewMessage: this.reviewMessage,
					type: 'institution'
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
                    //this.success = true
                    this.Loading = false
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
                message = 'Please tell us the star level of this institution';
                error.push(message)
                flag = false
            }
            if (this.like == '') {
                message = 'Please tell us is you like this institution';
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
		validateInfo(){
            let error = [];
            let message = '';
            let flag = true;
            if (this.institutionName == '') {
                message = 'Please insert Institution Name';
                error.push(message)
                flag = false
            }
            if (this.address == '') {
                message = 'Please insert address';
                error.push(message)
                flag = false
            }
            if (this.email == '') {
                message = 'Please insert email';
                error.push(message)
                flag = false
            }
            if (this.mobile == '') {
                message = 'Please insert mobile';
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
		saveChangesInfo(){
			this.Loading = true
			if (this.validateInfo()) {
				let info = {
					institutionId : this.institutionId,
					institutionName: this.institutionName,
					bio: this.bio,
					address: this.address,
					email: this.email,
					mobile: this.mobile
				}
				this.update_institution_Info(info)
				.then(res => {
					if (res.data.success) {
						this.institution.institutionName= this.institutionName
						this.institution.bio= this.bio
						this.institution.address= this.address
						this.institution.email= this.email
						this.institution.mobile= this.mobile
						this.Loading = false
						this.Success = true
					}
					
				})
				
			}
		},
		fetchMore(type){
            this.Loading = true
			this.skip = this.skip + 10
			let reviewObject= {
				user : this.user_id, 
				id : this.institutionId,
				type : 'institution',
				skip: this.skip
			}
			switch (type) {
				case 'own':
					this.fetch_teacher_courses({userId: this.user_id, skip: this.skip})
					.then(res => {
						for (let i = 0; i < res.data.length; i++) {
							const element = res.data[i];
							this.theCourses.push(element)
						}
						this.Loading = false
					})		
					break;
				case 'affiliate':
					this.fetch_AllInstitutionAffiliatedCourses({institutionId: this.institutionId, skip: this.skip})
					.then(res => {
						for (let i = 0; i < res.data.length; i++) {
							const element = res.data[i];
							this.AllAffiliatedCourses.push(element)
						}
						this.Loading = false
					})
								
					break;
				case 'reviews':
					this.checkIf_UserAlreadyReviewedAndFetchAll(reviewObject)
					.then(res => {
						for (let i = 0; i < res.data.Reviews.length; i++) {
							const element = res.data.Reviews[i];
							this.reviews.push(element)
						}
						this.Loading = false
					})
					break;
				default:
					break;
			}
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
		this.user_id = localStorage.getItem('fmruser')
		this.institutionId = this.$route.params.id
		this.fetch_institude_details(this.institutionId )
		.then(res => {
			this.institution = res.data
			this.institutionName = res.data.institutionName
			this.bio = res.data.bio
			this.address = res.data.address
			this.email = res.data.email
			this.mobile = res.data.mobile
			if (this.institution.user[0]==this.user_id) {
				this.isFounder = true
			}
		})

		this.fetch_teacher_courses({userId: this.user_id, skip: this.skip})
		.then(res => {
			this.theCourses = res.data
		})

		let object = {
			institutionId : this.institutionId,
			userId : this.user_id
		}
		this.check_IsUserInstitutionStudent(object)
		.then(res => {
			this.alreadyApplied = res.data.isApplied
			this.isStudent = res.data.isStudent
			//console.log('this is the '+this.isStudent)
		})
		this.check_IsLecturerAppllied(object)
        .then(res => {
            this.alreadyAppliedInstructor = res.data.isLecture
		})
		let reviewObject= {
			user : this.user_id, 
			id : this.institutionId,
			type : 'institution',
			skip: this.skip
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

		this.fetch_InstitutionDashboard(this.institutionId)
		.then(res => {
			this.InstitutionDashboard = res.data
		})

		this.fetch_AllInstitutionLecturers(this.institutionId)
		.then(res => {
			this.AllLecturers = res.data
		})

		this.fetch_AllInstitutionAffiliatedCourses({institutionId: this.institutionId, skip: this.skip})
		.then(res => {
			this.AllAffiliatedCourses = res.data
		})
		
    }
}
</script>
<style >
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
		border-radius: 50%;
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
	

</style>
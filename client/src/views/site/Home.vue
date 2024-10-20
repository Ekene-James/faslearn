<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div>
  
	<!-- End Preload -->

	<!-- Start Nav -->
	<Nav />
	<!-- End Nav -->

	<main>
		<section class="hero_single version_2" id="bigBackground" >
			<div class="wrapper">
				<div class="container">
					<h3>What would you learn?</h3>
					<p>Increase your expertise in business, technology and personal development</p>
					<!-- <form>
						<div id="custom-search-input">
							<div class="input-group">
								<input type="text" class=" search-query" placeholder="Ex. Architecture, Specialization...">
								<input type="submit" class="btn_search" value="Search">
							</div>
						</div>
					</form> -->
				</div>
			</div>
		</section>
		<!-- /hero_single -->

		<div class="features clearfix">
			<div class="container">
				<ul>
					<router-link :to="'/allcourses/e'">
					<li><i class="pe-7s-study"></i>
						<h4>+200 courses</h4><span style="color: black">Explore a variety of fresh topics</span>
					</li>
					</router-link>
					<router-link :to="'/allinstitudes'">
					<li><i class="pe-7s-cup"></i>
						<h4>Expert teachers</h4><span style="color: black">Find the right instructor for you</span>
					</li>
					</router-link>
					<router-link :to="'/allinstitudes'">
					<li><i class="pe-7s-target"></i>
						<h4>Focus on target</h4><span style="color: black">Increase your personal expertise</span>
					</li>
					</router-link>
				</ul>
			</div>
		</div>
		<!-- /features -->

		<div class="container-fluid margin_120_0">
			<div class="main_title_2">
				<span><em></em></span>
				<h2>Faslearn Popular Courses</h2>
				<p>Learn from the best</p>
			</div>
		
			<div id="reccomended" >
				<center>
					<div class="item" style="width: 350px; display: inline-block; height: 500px" v-for="cos in courses" :key="cos">
						<router-link :to="'/coursedetail/'+cos._id">
						<div class="box_grid">
							<figure>
								<a href="#0" class="wish_bt"></a>
								<a href="">
									<div class="preview"><span>Preview course</span></div><img v-bind:src="backEnd+'public/courseImage/'+cos._id" class="img-fluid" alt=""></a>
								<div class="price">₦{{cos.price.$numberDecimal}}</div>

							</figure>
							<div class="wrapper">
								<small>{{cos.category[0].name}}</small>
								<h3>{{cos.title}}</h3>
								<p>{{cos.secondTitle}}</p>
								<Ratings :id="cos._id" :type="'course'" />
							</div>
							<ul>
								<li><i class="icon_profile"></i> {{cos.user[0].lastName}}</li>
								<!-- <li><i class="icon_like"></i></li> -->
								<li><a >Enroll now</a></li>
							</ul>
						</div>
						</router-link>
					</div>
				</center>
			</div>
			<!-- /carousel -->
			<router-link :to="'/allcourses/e'">
			<div class="container">
				<p class="btn_home_align" ><a href="" class="btn_1 rounded" style="background-color: #EF6421">View all courses</a></p>
			</div>
			</router-link>
			<!-- /container -->
			<hr>
		</div>
		<!-- /container -->

		<div class="container margin_30_95">
			<div class="main_title_2">
				<span><em></em></span>
				<h2>FASLEARN AFFILIATED INSTITUTIONS</h2>
				<p>Some of our verified academic institions</p>
			</div>
			<div class="row">
				<div class="col-lg-4 col-md-6 wow" data-wow-offset="150" v-for="ins in allInstitutions" :key="ins">
					<router-link :to="'/institude/'+ins._id">
					<a href="" class="grid_item">
						<figure class="block-reveal" style="height: 200px">
							<div class="block-horizzontal" ></div>
							<img :src="backEnd+'public/institutionImage__public/'+ins._id" class="img-fluid" alt="" >
							<div class="info" >
								<small><i class="ti-layers"></i>{{ins.address}}</small>
								<h3>{{ins.institutionName}}</h3>
								<Ratings :id="ins._id" :type="'institution'" />
							</div>
						</figure>
					</a>
					</router-link>
				</div>
				
			</div>
			<!-- /row -->
			<router-link :to="'/allinstitudes/e'">
			<div class="container">
				<p class="btn_home_align"><a href="" class="btn_1 rounded" style="background-color: #EF6421">View all Institution</a></p>
			</div>
			</router-link>
		</div>
		<!-- /container -->

		<div class="bg_color_1">
			<div class="container margin_120_95">
				<div class="main_title_2">
					<span><em></em></span>
					<h2>Our Teachers</h2>
				</div>
				<div class="row">
					<div class="col-lg-6" v-for="t in teachers" :key="t">
						<router-link :to="'/teacher/'+t.user[0]._id">
						<a class="box_news" href="#0">
							<figure style="border-radius: 50px">
								<ProfileImage :id="t.user[0]._id" />
								<!-- <img src="http://via.placeholder.com/500x333/ccc/fff/news_home_1.jpg" alt=""> -->
								<!-- <figcaption><strong>28</strong>Dec</figcaption> -->
							</figure>
							<ul>
								<li>{{t.user[0].email}}</li>
								<li>{{t.user[0].address}}</li>
							</ul>
							<h4>{{t.user[0].firstName}} {{t.user[0].lastName}}</h4>
							<p>{{t.expertise}}</p>
							<Ratings :id="t.user[0]._id" :type="'instructor'" />
						</a>
						</router-link>
					</div>
				</div>
				<!-- /row -->
				<router-link :to="'/allteachers/e'">
				<p class="btn_home_align"><a href="" class="btn_1 rounded" style="background-color: #EF6421">View all Teachers</a></p>
				</router-link>
			</div>
			<!-- /container -->
		</div>
		<!-- /bg_color_1 -->

		<div class="call_section">
			<div class="container clearfix">
				<div class="col-lg-5 col-md-6 float-right wow" data-wow-offset="250">
					<div class="block-reveal" >
						<div class="block-vertical"></div>
						<div class="box_1" style="background-color: #EF6421">
							<h3>Enjoy a great students community</h3>
							<p style="color: white">Faslearn e-learning platform, a brilliant new concept in e-learning that especially focuses on human capacity development. Faslearn is an online educational resource where people seeking to expand their knowledge can simply log on, choose the course that they are interested in and learn or build on a new topic or skill.  It doesn’t matter if you are a fresh graduate or an experienced professional, we have adequate resources to cater for your need.</p>
							<a href="/about" class="btn_1 rounded" style="background-color: black">Read more</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Help />
		<!--/call_section-->
	</main>
	<!-- /main -->


	<Footer />
	
	<!--/footer-->
	
	
  </div>
</template>
 
<script>
// @ is an alias to /src
import Help from '@/components/site/Help.vue'
import ProfileImage from "@/components/ProfileImage";
import Ratings from '@/components/site/Ratings.vue'
import {mapActions,mapGetters} from 'vuex'
import Nav from '@/components/site/Nav.vue'
import Footer from '@/components/site/Footer.vue'

export default {
  name: 'Home',
  data(){
	return{
		courses: '',
		allInstitutions: ''	,
		all_Instructors: '',
		teachers: '',
	}
  },
  components: {
	Nav,
	Ratings,
	ProfileImage,
	Help,
    Footer
    //HelloWorld
  },
  computed: {
	...mapGetters(['backEnd'])
  },
  methods: {
	...mapActions(['fetch_recent_courses__public']),
	...mapActions(['fetchAllInstructors__public']),
	...mapActions(['fetch_all_institutions__public'])
    
  },
  mounted(){
			
	this.fetch_recent_courses__public(0)
	.then(res => {
		this.courses = res.data
	})

	this.fetch_all_institutions__public(0)
	.then(res => {
		this.allInstitutions = res.data
	})

	// this.fetchAllInstructors__public(0)
	// .then(res => {
	// 	this.all_Instructors = res.data
	// })

	this.fetchAllInstructors__public(0)
	.then(res => {
		this.teachers = res.data
	})
  }
  
} 
</script>
<style scoped>
	@import url("./assets/css/bootstrap.min.css");
	@import url("./assets/css/style.css");
	@import url("./assets/css/vendors.css");
	@import url("./assets/css/icon_fonts/css/all_icons.min.css");
	@import url("./assets/css/skins/square/grey.css");
	@import url("./assets/css/wizard.css");
	@import url("./assets/css/blog.css");
	@import url("./assets/css/tables.css");
	@import url("./assets/css/custom.css");

	/* .scroll{
		min-height: 200px;
		min-width: 1500px;
	}

	#reccomended{
		overflow: hidden;
		width: 100%;
	}
	 */
	/* @media (max-width: 575.98px) {
		#reccomended{
			overflow-x: scroll
		}

	}

	#reccomended:hover{
		overflow-x: scroll;
	} */
	
</style>

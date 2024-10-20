<template>
    <div>
    <div class="modal vd_mdl fade" id="videoModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<div class="modal-body">
					<iframe  src="https://www.youtube.com/embed/Ohe_JzKksvA" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
				
			</div>
		</div>
	</div>
    <!-- Header Start -->
        <Dheader />
	<!-- Header End -->
	<div class="wrapper _bg4586 _new89">		
		<div class="_215b15">
			<div class="container">
				<div class="row">
					<div class="col-lg-12">						
						<div class="title125">						
							<div class="titleleft">					
								<div class="ttl121">
									<nav aria-label="breadcrumb">
										<ol class="breadcrumb">
											<li class="breadcrumb-item"><a href="index.html">Home</a></li>
											<li class="breadcrumb-item active" aria-current="page">Contact Us</li>
										</ol>
									</nav>
								</div>
							</div>
							<div class="titleright">						
								<a href="index.html" class="blog_link"><i class="uil uil-angle-double-left"></i>Back to Home</a>
							</div>
						</div>
						<div class="title126">	
							<h2>Contact Us</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
        
		<div class="contact1256">
			<div class="container">
				<div class="row">					
					<div class="col-lg-3 col-md-6">
						<a href="help.html" class="contact_link_step">
							<img src="assets/images/help_icon.svg" alt="">
							<h4>Help Center</h4>
						</a>												
					</div>
					<div class="col-lg-3 col-md-6">
						<a href="our_blog.html" class="contact_link_step">
							<img src="assets/images/blog_icon.svg" alt="">
							<h4>Blog</h4>
						</a>												
					</div>
					<div class="col-lg-3 col-md-6">
						<a href="career.html" class="contact_link_step">
							<img src="assets/images/career_icon.svg" alt="">
							<h4>Careers</h4>
						</a>												
					</div>
					<div class="col-lg-3 col-md-6">
						<a href="coming_soon.html" class="contact_link_step">
							<img src="assets/images/developer_icon.svg" alt="">
							<h4>Developer Area</h4>
						</a>												
					</div>
					<div class="col-lg-8">
						<div class="contact_map">
							<div id="map"></div>
						</div>												
					</div>
					<div class="col-lg-4">
						<div class="contact_info">
							<div class="checkout_title">
								<h4>Contact Information</h4>
								<img src="assets/images/line.svg" alt="">
							</div>
							<ul class="contact_list_info">
								<li><div class="txt_cntct"><span class="cntct_895"><i class="uil uil-location-point"></i>Main Address :</span><p>#1235 Sks Nagar St No. 8 Phase 3, Pakhowal Road, 141001, LDH, Punjab, India</p></div></li>
								<li><div class="txt_cntct"><span class="cntct_895"><i class="uil uil-envelope"></i>Email Address :</span><p>Info@edututsplus@gmail.com</p></div></li>
								<li><div class="txt_cntct"><span class="cntct_895"><i class="uil uil-mobile-android-alt"></i>Phone Number :</span><p>+911234567890, 01610000000</p></div></li>
							</ul>
							<div class="edututs_links_social">
								<ul class="tutor_social_links">
									<li><a href="#" class="fb"><i class="fab fa-facebook-f"></i></a></li>
									<li><a href="#" class="tw"><i class="fab fa-twitter"></i></a></li>
									<li><a href="#" class="ln"><i class="fab fa-linkedin-in"></i></a></li>
									<li><a href="#" class="yu"><i class="fab fa-youtube"></i></a></li>
								</ul>
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
import Dheader from '@/components/dashboard/Header.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
    name: 'Dhome',
    components: {
        Dheader,
        Dfooter
    },   
    mounted(){
           
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

    .scroll{
		min-height: 200px;
		min-width: 1500px;
	}

	.live_stream{
		overflow: hidden;
	}

	.featured_courses{
		overflow: hidden;
	}

	.top_instrutors{
		overflow: hidden;
	}

	.Student_says{
		overflow: hidden;
	}

	.featured_courses .scroll{
		min-height: 200px;
		min-width: 3000px;
	}

	.top_instrutors .scroll{
		min-height: 200px;
		min-width: 3000px;
	}

	.Student_says .scroll{
		align-items: left;
		min-height: 200px;
		min-width: 3000px;
	}

	.item{
		width: 150px;
		display: inline-block;
		margin-left: 10px;
	}

	.featured_courses .item{
		width: 350px;
		display: inline-block;
		margin-left: 10px;
	}

	.top_instrutors .item{
		width: 350px;
		display: inline-block;
		margin-left: 10px;
	}

	.Student_says .item{
		width: 350px;
		display: inline-block;
		margin-left: 10px;
	}

	@media (max-width: 575.98px) {
		.live_stream{
			overflow-x: scroll
		}

		.featured_courses{
			overflow-x: scroll;
		}

		.top_instrutors{
			overflow-x: scroll;
		}

		.Student_says{
			overflow-x: scroll;
		}
	}

	.live_stream:hover{
		overflow-x: scroll
	}

	.featured_courses:hover{
		overflow-x: scroll;
	}

	.top_instrutors:hover{
		overflow-x: scroll;
	}

	.Student_says:hover{
		overflow-x: scroll;
	}
	
    .contact1256 {
    float: left;
    width: 100%;
	margin-top: 17px;
	margin-bottom: 64px;
}

.contact_link_step {
	background: #fff;
    border-radius: 10px;
    padding: 30px;
    border: 1px solid #efefef;
    box-shadow: -0.083333333in 0.5pc 1.125pc -7px rgba(25,42,70,.13);
    width: 100%;
    margin-top: 30px;
    text-align: center;
	display: block;
}

.contact_link_step img {
    width: 70px;
}

.contact_link_step h4 {
    font-size: 18px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    line-height: 26px;
    color: #333;
    text-align: center;
	margin-top: 24px;
}

.contact_map {
	background: #fff;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #efefef;
    box-shadow: none;
    width: 100%;
    margin-top: 64px;
    text-align: center;
}

.contact_map #map {
    width: 100%;
    height: 350px;
}

.contact_map #map svg g {
    fill: #ed2a26 !important;
}

.contact1256 .contact_info {
    margin-top: 64px;
}

.contact1256 .contact_list_info {
	float: left;
    width: 100%;
	margin-top: 28px;
}

.contact1256 .contact_list_info li {
	display: block;
	padding-bottom: 10px;
	float: left;
    width: 100%;
}

.contact1256 .contact_list_info .txt_cntct {
	font-size: 14px;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    line-height: 26px;
    color: #686f7a;
    text-align: left;
	float: left;
    width: 100%;
}

.contact1256 .contact_list_info .cntct_895 i {
    font-size: 120%;
}

.edututs_links_social {
	float: left;
    width: 100%;
    margin-top: 24px;
}

.contact_list_info .cntct_895 {
    float: left;
    width: 35%;
    color: #333;
    font-weight: 500;
}

.contact_list_info .txt_cntct p {
    width: 65%;
    float: left;
    line-height: 26px;
}

</style>
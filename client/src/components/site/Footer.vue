<template>
    <div>
    <footer>
		<div class="container margin_120_95">
			<div class="row">
				<div class="col-lg-5 col-md-12 p-r-5">
					<p><img src="../../assets/faslearnBlack.png" width="250" height="70" alt="" ></p>
					<p style="color: white">
						Are you a seasoned Trainer or Facilitator? We are inviting you to sell your COURSES and make Residual income on our e-learning platform.</p>
					<div class="follow_us">
						<ul>
							<li style="color: white">Follow us</li>
							<li style="color: white"><a href="https://web.facebook.com/faslearn"><i class="ti-facebook"></i></a></li>
							<!-- <li><a href="#0"><i class="ti-twitter-alt"></i></a></li>
							<li><a href="#0"><i class="ti-google"></i></a></li>
							<li><a href="#0"><i class="ti-pinterest"></i></a></li> -->
							<li style="color: white"><a href="https://www.instagram.com/invites/contact/?i=1hc6vtkr05fr1&utm_content=mamv4vg"><i class="ti-instagram"></i></a></li>
							<li style="color: white"><a href="https://www.linkedin.com/company/faslearn"><i class="ti-linkedin"></i></a></li>
						</ul>
					</div>
				</div>
				<div class="col-lg-3 col-md-6 ml-lg-auto">
					<h5>Useful links</h5>
					<ul class="links">
						<router-link :to="'/about'">
						<li style="color: white">About</li>
						</router-link>
						<router-link :to="'/login'">
						<li style="color: white">Login</li>
						</router-link>
						<router-link :to="'/register'">
						<li style="color: white">Register</li>
						</router-link>
						<!-- <router-link :to="'/blog'">
						<li>News &amp; Events</li>
						</router-link> -->
						<!-- <router-link :to="'/contact'">
						<li style="color: white">Contacts</li>
						</router-link> -->
					</ul>
				</div>
				<div class="col-lg-3 col-md-6">
					<h5>Contact with Us</h5>
					<ul class="contacts">
						<li style="color: white"><a ><i class="ti-mobile"></i> +2349028896663</a></li>
						<li style="color: white"><a ><i class="ti-email"></i> info@faslearn.com</a></li>
					</ul>
					<div id="newsletter">
					<h6>Newsletter</h6>
					<div id="message-newsletter"></div>
					<!-- <form method="post" action="assets/newsletter.php" name="newsletter_form" id="newsletter_form">
						<div class="form-group">
							<input type="email" name="email_newsletter" id="email_newsletter" class="form-control" placeholder="Your email">
							<input type="submit" value="Submit" id="submit-newsletter">
						</div>
					</form> -->
					</div>
				</div>
			</div>
			<!--/row-->
			<hr>
			<div class="row">
				<div class="col-md-8">
					<ul id="additional_links">
						<router-link :to="'/terms'">
						<li><a href="#0">Terms and conditions</a></li>
						</router-link>
						<router-link :to="'/privacy'">
						<li><a href="#0">Privacy</a></li>
						</router-link>
					</ul>
				</div>
				<div class="col-md-4">
					<div id="copy">© Faslearn</div>
				</div>
			</div>
		</div>
	</footer>

    <!-- Search Menu -->
	<div class="search-overlay-menu">
		<span class="search-overlay-close"><span class="closebt"><i class="ti-close"></i></span></span>
		<form role="search" id="searchform" method="get">
			<input value="" name="q" type="search" placeholder="Search..." />
			<button type="submit" style="background-color: black"><i class="icon_search"></i>
			</button>
		</form>
	</div><!-- End Search Menu -->

    </div>
</template>
<script>
export default {
	name: 'Footer',
	
}
</script>
<style >

</style>
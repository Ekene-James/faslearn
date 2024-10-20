<template>
    <footer class="footer mt-30" style="margin: 0px; padding-top: 50px" id="foo">
			<div class="container">
				<div class="row">
					<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="item_f1">
							<a href="/about">About</a>
							<!-- <a href="/blog">Blog</a> -->
							<a href="/contact">Contact Us</a>
						</div>
					</div>
					<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="item_f1">
							<a href="/Dhelp">Help</a>
							<a href="/Dhelp">Sitemap</a>
						</div>
					</div>
					<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="item_f1">
							<a href="/terms">Copyright Policy</a>
							<a href="/terms">Terms</a>
						</div>
					</div>
					<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="item_f1">
							<a href="/privacy">Privacy Policy</a>
						</div>
					</div>
					<div class="col-lg-12">
						<div class="footer_bottm">
							<div class="row">
								<div class="col-md-6">
									<ul class="fotb_left">
										<li>
											<a href="/">
												<div class="footer_logo">
													<img src="../../assets/wlogo.png" style="height: 200px; width: 200px;" alt="">
												</div>
											</a>
										</li>
										<li>
											<p>© 2020 <strong>Faslearn</strong>. All Rights Reserved.</p>
										</li>
									</ul>
								</div>
								<div class="col-md-6">
									<div class="edu_social_links">
										<a href="https://web.facebook.com/faslearn"><i class="fab fa-facebook-f"></i></a>
										<!-- <a href="#"><i class="fab fa-twitter"></i></a>
										<a href="#"><i class="fab fa-google-plus-g"></i></a> -->
										<a href="https://www.linkedin.com/company/faslearn"><i class="fab fa-linkedin-in"></i></a>
										<a href="https://www.instagram.com/invites/contact/?i=1hc6vtkr05fr1&utm_content=mamv4vg"><i class="fab fa-instagram"></i></a>
										<!-- <a href="#"><i class="fab fa-youtube"></i></a>
										<a href="#"><i class="fab fa-pinterest-p"></i></a> -->
									</div>
									
								</div>		
							</div>
						</div>
					</div>
				</div>
			</div>
			<CartNotice v-if="isCart!=''" :msg="isCart" />
		</footer>
</template>
<script>
import { mapGetters } from "vuex";
import CartNotice from '@/components/CartNotice.vue'
export default {
	name: 'Dfooter',
	components: {
		CartNotice
	},
	computed: {
		...mapGetters(['isCart'])
	},
	watch: {
		isCart: function() {
      		console.log('changed')
    	}
	}
}
</script>
<style>

</style>
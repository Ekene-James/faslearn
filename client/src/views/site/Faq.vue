<template>
    <div>
        <Nav />

        <Tittle :type="'general'">
            <h1 class="fadeInUp"><span></span>Faq Section</h1>
        </Tittle>

        <div class="container margin_60_35">
			<div class="row">
				<aside class="col-lg-3" id="sidebar">
						<div class="box_style_cat" id="faq_box">
							<ul id="cat_nav">
								<li><a href="/faq#payment" class="active"><i class="icon_document_alt"></i>Learner A</a></li>
								<li><a href="/faq#tips"><i class="icon_document_alt"></i>Learner B</a></li>
								<li><a href="/faq#reccomendations"><i class="icon_document_alt"></i>Learner C</a></li>
								<li><a href="/faq#terms"><i class="icon_document_alt"></i>Instructor A</a></li>
								<li><a href="/faq#booking"><i class="icon_document_alt"></i>Instructor B</a></li>
							</ul>
						</div>
						<!--/sticky -->
				</aside>
				<!--/aside -->
				
				<div class="col-lg-9" id="faq">
					<h4 class="nomargin_top">Learner A</h4>
					<div role="tablist" class="add_bottom_45 accordion_2" id="payment">
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a data-toggle="collapse" href="#collapseOne_payment" aria-expanded="true"><i class="indicator ti-minus"></i>How can I start a course?</a>
								</h5>
							</div>

							<div id="collapseOne_payment" class="collapse show" role="tabpanel" data-parent="#payment">
								<div class="card-body">
									<p>Register or Login to Faslearn.com Once you login, you can search for a course of your choice. Select the course you want to study and select Start Now. If you require any further assistance, please email info@elearning.fmragency.com and our team will be happy to assist you in any way we can.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseTwo_payment" aria-expanded="false">
										<i class="indicator ti-plus"></i>What is the course duration?
									</a>
								</h5>
							</div>
							<div id="collapseTwo_payment" class="collapse" role="tabpanel" data-parent="#payment">
								<div class="card-body">
									<p>The duration courses differ, and it is unique. Course duration is in the course outline and information.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_payment" aria-expanded="false">
										<i class="indicator ti-plus"></i>How long would I be in possession of the course I have purchase?
									</a>
								</h5>
							</div>
							<div id="collapseThree_payment" class="collapse" role="tabpanel" data-parent="#payment">
								<div class="card-body">
									<p>A.	The course belongs to you forever once you purchase it. You can access the course at anytime and anywhere. If at any point you wish to revert to the course, you are at liberty to do so.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
					</div>
					<!-- /accordion payment -->
					
					<h4 class="nomargin_top">Learner B</h4>
					<div role="tablist" class="add_bottom_45 accordion_2" id="tips">
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a data-toggle="collapse" href="#collapseOne_tips" aria-expanded="true"><i class="indicator ti-plus"></i>Introdocution</a>
								</h5>
							</div>

							<div id="collapseOne_tips" class="collapse" role="tabpanel" data-parent="#tips">
								<div class="card-body">
									<p>ggg</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseTwo_tips" aria-expanded="false">
										<i class="indicator ti-plus"></i>Invalid Login Details
									</a>
								</h5>
							</div>
							<div id="collapseTwo_tips" class="collapse" role="tabpanel" data-parent="#tips">
								<div class="card-body">
									<p>If you are having a problem logging in to your account or seeing the error message "Invalid Login Details", there may be several reasons for this: The email/ password combination you are entering is incorrect. There is a spelling mistake in the email/ password you have entered. You have registered your account, but you have forgotten your e-mail, kindly reset your password or e-mail us at </p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_tips" aria-expanded="false">
										<i class="indicator ti-plus"></i>How does course assessments work?
									</a>
								</h5>
							</div>
							<div id="collapseThree_tips" class="collapse" role="tabpanel" data-parent="#tips">
								<div class="card-body">
									<p>Assessments are built into each course and are generally in the format of single and/or multiple-choice questions. Courses can have one or more assessments. You will be presented with the assessment after you complete the required course outline. You will be certified when you complete all the course material </p>
									<p>and achieve a result of 50% or more in every assessment, and you have only 3 times to try, if you do not meet up to the required percentage.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
					</div>
					<!-- /accordion suggestions -->
					
					<h4 class="nomargin_top">Learner C</h4>
					<div role="tablist" class="add_bottom_45 accordion_2" id="reccomendations">
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a data-toggle="collapse" href="#collapseOne_reccomendations" aria-expanded="true"><i class="indicator ti-plus"></i>How do I become certified in my Course?</a>
								</h5>
							</div>

							<div id="collapseOne_reccomendations" class="collapse" role="tabpanel" data-parent="#reccomendations">
								<div class="card-body">
									<p>To qualify for a Certificate, you must successfully complete your chosen course by achieving 50% or higher in all assessments. Once you complete the final assessment and pass with a result of 50% or more, the course would automatically update to complete. If you, however, fail an assessment or wish to attain a higher score, you can retake the assessment up to 3 times.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseTwo_reccomendations" aria-expanded="false">
										<i class="indicator ti-plus"></i>Who issues the certificate?
									</a>
								</h5>
							</div>
							<div id="collapseTwo_reccomendations" class="collapse" role="tabpanel" data-parent="#reccomendations">
								<div class="card-body">
									<p>The University or  Faslearn will be issuing the e-certificate. To make learning, mastery and certification more desirable for our learners, we have partnered with A-list Universities in Nigeria; hence, your certificate from us is globally recognized.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_reccomendations" aria-expanded="false">
										<i class="indicator ti-plus"></i>Why you should learn with us?
									</a>
								</h5>
							</div>
							<div id="collapseThree_reccomendations" class="collapse" role="tabpanel" data-parent="#reccomendations">
								<div class="card-body">
									<p>The illiterate of the 21st century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn.” -Alvin Toffler. In today’s fast paced technology driven society, the quest for knowledge is as important as air itself and today’s learners want relevant, mobile, self-paced and personalized content. This need is fulfilled with our e-learning platform; here, students can learn at their own comfort, time, and requirement.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
					</div>
					<!-- /accordion Reccomendations -->
					
					<h4 class="nomargin_top">Instructor A</h4>
					<div role="tablist" class="add_bottom_45 accordion_2" id="terms">
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a data-toggle="collapse" href="#collapseOne_terms" aria-expanded="true"><i class="indicator ti-plus"></i>What is the mode of the course materials?</a>
								</h5>
							</div>

							<div id="collapseOne_terms" class="collapse" role="tabpanel" data-parent="#terms">
								<div class="card-body">
									<p>The course materials Should be a mixture of slides and voiceovers, videos, multimedia or a combination of all as well as other resources relevant to the student learning.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseTwo_terms" aria-expanded="false">
										<i class="indicator ti-plus"></i>If I develop a course in an area, can I still develop another course in another area and launch it on the learning platform?
									</a>
								</h5>
							</div>
							<div id="collapseTwo_terms" class="collapse" role="tabpanel" data-parent="#terms">
								<div class="card-body">
									<p>Yes. But because we don’t want our learners to be overwhelmed, we advise that instructors limit the course to a particular area, rather than being generic. In situation where the trainer has expertise in other areas; areas outside the default industry, we encourage them to launch the course so long as the course remain insightful, engaging and meets out standards.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_terms" aria-expanded="false">
										<i class="indicator ti-plus"></i>How can the course be uploaded?
									</a>
								</h5>
							</div>
							<div id="collapseThree_terms" class="collapse" role="tabpanel" data-parent="#terms">
								<div class="card-body">
									<p>Your course can be uploaded through your instructor account. If you have difficulties uploading, please send an email to info@faslearn.com.  Do not give out your videos to any FMR representative without sending an email to the above provided mail and a go-ahead granted.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
					</div>
					<!-- /accordion Terms -->
					
					<h4 class="nomargin_top">Instructor B</h4>
					<div role="tablist" class="add_bottom_45 accordion_2" id="booking">
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a data-toggle="collapse" href="#collapseOne_booking" aria-expanded="true"><i class="indicator ti-plus"></i>I tried logging into my account but says I cannot. Then tried doing account recovery, it came back with info that I don't have an account.</a>
								</h5>
							</div>

							<div id="collapseOne_booking" class="collapse" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p>If you have issues signing up or logging in, please inform your account manager or email info@faslearn.com for quick support.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseTwo_booking" aria-expanded="false">
										<i class="indicator ti-plus"></i>I am a trained professional in a particular field with significant years of experience, but I do not have a certificate to show for it, what do I do? 
									</a>
								</h5>
							</div>
							<div id="collapseTwo_booking" class="collapse" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p>You can be a trainer without a certificate; however, the course must pass through all the guidelines and quality checks.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_booking" aria-expanded="false">
										<i class="indicator ti-plus"></i>Are we to develop the courses ourselves and upload them for review or we would be given a curriculum to follow that will aid the development of the course?
									</a>
								</h5>
							</div>
							<div id="collapseThree_booking" class="collapse" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p>We would require you to submit your course outline with us, to check its validity and obtain if it is fit for our learner’s purpose. If we are satisfied, you can go ahead to create your course according to how you desire using our guidelines, then it will go through a quality check and if it passes our quality checks.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_booking" aria-expanded="false">
										<i class="indicator ti-plus"></i>Who funds the content Development and Design?
									</a>
								</h5>
							</div>
							<div id="collapseThree_booking" class="collapse" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p>The instructor funds its development and designs</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_booking" aria-expanded="false">
										<i class="indicator ti-plus"></i>How is payment done?
									</a>
								</h5>
							</div>
							<div id="collapseThree_booking" class="collapse" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p>A.	If course is directly launched on the faslearn platform, payment will be made monthly from course sales 
										<br>
										B.	If course is directly developed for the university, Payment for your course is made immediately you course passes our quality assurance checks
									</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_booking" aria-expanded="false">
										<i class="indicator ti-plus"></i>Can I teach other areas?
									</a>
								</h5>
							</div>
							<div id="collapseThree_booking" class="collapse" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p>Yes, you can teach other courses, if the content quality matches the required standards.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
						<div class="card">
							<div class="card-header" role="tab">
								<h5 class="mb-0">
									<a class="collapsed" data-toggle="collapse" href="#collapseThree_booking" aria-expanded="false">
										<i class="indicator ti-plus"></i>Can I have the same course on another E-learning platform? 
									</a>
								</h5>
							</div>
							<div id="collapseThree_booking" class="collapse" role="tabpanel" data-parent="#booking">
								<div class="card-body">
									<p>No, you cannot have the same exact course on another E-learning platform. However, you can have the same course content and title and sell it elsewhere, but it must not be the exact one you sold to us.</p>
								</div>
							</div>
						</div>
						<!-- /card -->
					</div>
					<!-- /accordion Booking -->
				</div>
				<!-- /col -->
			</div>
			<!-- /row -->
		</div>
		<!--/container-->
        <Footer />
    </div>
</template>

<script>
    import Nav from '@/components/site/Nav.vue'
    import Tittle from '@/components/site/Tittle.vue'
    import Footer from '@/components/site/Footer.vue'
    export default {
        name: 'Fag',
        components: {
            Nav,
            Tittle,
            Footer
        },
        mounted(){
            // let js = document.createElement('script')
            // js.setAttribute('src', 'js/main.js')
            // document.head.appendChild(js)
            // let jsc = document.createElement('script')
            // jsc.setAttribute('src', 'js/common_scripts.js')
            // document.head.appendChild(jsc)
        }
    }
</script>

<style>

</style>
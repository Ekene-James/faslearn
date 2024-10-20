<template>
    <div>
        <Nav />

        <Tittle :type="'general'">
            <h1 class="fadeInUp"><span></span>About Faslearn</h1>
        </Tittle>

        <div class="contact_info">
			<div class="container">
				<p>
					Faslearn e-learning platform, a brilliant new concept in e-learning that especially focuses on human capacity development. Faslearn is an online educational resource where people seeking to expand their knowledge can simply log on, choose the course that they are interested in and learn or build on a new topic or skill.  It doesn’t matter if you are a fresh graduate or an experienced professional, we have adequate resources to cater for your need.
					We particularly pride ourselves on high quality and credible content and that’s why we are regarded as one of the most reliable.
					<br>
					Are you a seasoned Trainer or Facilitator? We are inviting you to sell your COURSES and make Residual income on our e-learning platform.
				</p>
			</div>
		</div>
		<!--/contact_info-->
		<br><br>
        <Footer />
    </div>
</template>

<script>
    import Nav from '@/components/site/Nav.vue'
    import Tittle from '@/components/site/Tittle.vue'
    import Footer from '@/components/site/Footer.vue'
    export default {
        name: 'Contact',
        components: {
            Nav,
            Tittle,
            Footer
        },
        mounted(){
            let js = document.createElement('script')
            js.setAttribute('src', 'js/main.js')
            document.head.appendChild(js)
            let jsc = document.createElement('script')
            jsc.setAttribute('src', 'js/common_scripts.js')
            document.head.appendChild(jsc)
        }
    }
</script>

<style>

</style>

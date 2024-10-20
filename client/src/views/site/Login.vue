<template> 
    <div id="login">
		<div class="back">
			<aside>
				<img src="../../assets/flogo.png" width="200" height="200" style="margin-top: -50px" alt="">	
				<form>
					<!-- <div class="access_social">
						<a href="#0" class="social_bt facebook">Login with Facebook</a>
						<a href="#0" class="social_bt google">Login with Google</a>
						<a href="#0" class="social_bt linkedin">Login with Linkedin</a>
					</div>
					<div class="divider"><span>Or</span></div> -->
					<div class="form-group">
						<span class="input">
						<input class="input_field" type="email" autocomplete="off" name="email" v-model="email">
							<label class="input_label">
							<span class="input__label-content">Your email</span>
						</label>
						</span>

						<span class="input">
						<input class="input_field" type="password" autocomplete="new-password" name="password" v-model="password">
							<label class="input_label">
							<span class="input__label-content">Your password</span>
						</label>
						</span>
						<!-- <small><a href="#0">Forgot password?</a></small> -->
					</div>
					<Loading v-if="Loading" />
					<Errors v-if="error">
						<ul>
							<li v-for="error in error" :key="error">{{error}}</li>	
						</ul>
					</Errors>
					<div @click.prevent="loginUser()" v-if="!Loading"><a class="btn_1 rounded full-width add_top_60">Login to faslearn</a></div>
					<router-link :to="'/register'">
					<div class="text-center add_top_10">New to Faslearn? <strong><a >Sign up!</a></strong></div>
					</router-link>
				</form>
				<div class="copy">© 2021 Faslearn</div>
			</aside>
		</div>
	</div>
	<!-- /login -->
</template>

<script>
    // import Nav from '@/components/site/Nav.vue'
	// import Tittle from '@/components/site/Tittle.vue'
	import Loading from '@/components/Loading.vue'
	import Errors from '@/components/Errors.vue'
	import { mapActions, mapGetters } from 'vuex';
    export default {
		name: 'Login',
		data(){
			return{
				email: '',
				password: '',
				Loading: ''
				//error: ''
			}
		},
		computed: {
			...mapGetters(['error'])
		},
		components: {
			Errors,
			Loading
		},
        mounted(){
            let js = document.createElement('script')
            js.setAttribute('src', 'js/main.js')
            document.head.appendChild(js)
            let jsc = document.createElement('script')
            jsc.setAttribute('src', 'js/common_scripts.js')
            document.head.appendChild(jsc)
		},
		methods:{
			...mapActions(['login']),
			loginUser() {
				this.Loading = true
				let user = {
					email: this.email,
					password: this.password
				};
				this.login(user)
				.then(res => {
					this.Loading = false
					if (res.status == 200) {
						this.$router.push('/');
					}
					// this is supposed to redirect to /dashboard but due to change of template, the dashborad headders  still sees the site header causing some errors with documrnt.getElementbyid try 
				})
				// .catch(err => {
				// 	//this.error = err;
				// });
			}
		}
    }
</script>

<style>
	h4{
		display: none;
	}
	.back{
		width: 100%;
		height: 750px;
		background-color: red;
		background: url(../../assets/12.jpg) center center no-repeat fixed;
	}
</style>
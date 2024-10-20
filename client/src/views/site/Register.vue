<template>
    <div id="login">
		<div class="back">
			<aside>
				<img src="../../assets/flogo.png" width="200" height="200" style="margin-top: -100px; margin-bottom: -50px" alt="">	
				<form autocomplete="off">
					<div class="form-group">

						<span class="input">
						<input class="input_field" type="text" v-model="firstName">
							<label class="input_label">
							<span class="input__label-content">Your Name</span>
						</label>
						</span>

						<span class="input">
						<input class="input_field" type="text" v-model="lastName">
							<label class="input_label">
							<span class="input__label-content">Your Last Name</span>
						</label>
						</span>

						<span class="input">
						<input class="input_field" type="email" v-model="email">
							<label class="input_label">
							<span class="input__label-content">Your Email</span>
						</label>
						</span>

						<span class="input">
						<input class="input_field" type="text" v-model="address">
							<label class="input_label">
							<span class="input__label-content">Your Adress</span>
						</label>
						</span>

						<span class="input">
						<input class="input_field" type="text" v-model="phone">
							<label class="input_label">
							<span class="input__label-content">Mobile number</span>
						</label>
						</span>

						<span class="input">
						<input class="input_field" type="password" id="password1" v-model="password">
							<label class="input_label">
							<span class="input__label-content">Your password</span>
						</label>
						</span> 
						<Errors v-if="error">
							<ul>
								<li v-for="error in error" :key="error">{{error}}</li>	
							</ul>
						</Errors>
						<Loading v-if="Loading"/>
						<!-- <span class="input">
						<input class="input_field" type="password" id="password2">
							<label class="input_label">
							<span class="input__label-content">Confirm password</span>
						</label>
						</span> -->
						
						<div id="pass-info" class="clearfix"></div>
					</div>
					<div @click.prevent="registerUser()"><a class="btn_1 rounded full-width add_top_30" v-if="!Loading">Register to Faslearn</a></div>
					<router-link :to="'/login'">
					<div class="text-center add_top_10">Already have an acccount? <strong><a >Sign In</a></strong></div>
					</router-link>
				</form>
				<div class="copy">© 2021 Faslearn</div>
			</aside>
		</div>
	</div>
</template>

<script>
	//import Authservices from '../../services/auth.js'
	import Loading from "@/components/Loading";
	import Errors from '@/components/Errors.vue'
	import { mapActions, mapGetters } from 'vuex';
    export default {
		name: 'Register',
		data(){
			return{
				firstName: '',
				lastName: '', 
				email: '', 
				password: '',
				userType: 'student', 
				address: '', 
				phone: '',
				Loading: false
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
			...mapActions(['register']),
			registerUser(){
				this.Loading = true
				let user = { 
					firstName : this.firstName, 
					lastName : this.lastName, 
					email : this.email, 
					password : this.password, 
					userType : this.userType, 
					address : this.address, 
					phone : this.phone
				};
				this.register(user)
				.then(res => {
					this.Loading = false
					if(res.status == 201){
						this.$router.push('/login')
					}
				})
			}
			// async adduser(){
			// 	let user = { 
			// 		firstName : this.firstName, 
			// 		lastName : this.lastName, 
			// 		email : this.email, 
			// 		password : this.password, 
			// 		userType : this.userType, 
			// 		address : this.address, 
			// 		phone : this.phone
			// 		}

			// 		//console.log(user);
			// 	await Authservices.addUser(user)
			// 	.then(console.log('success'))
			// 	.catch((error) => {
			// 		this.error = error;
			// 	});
			// }
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
		background: url(../../assets/12.jpg) center center no-repeat fixed;
	}
</style>
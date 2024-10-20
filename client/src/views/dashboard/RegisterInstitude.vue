<template>
    <div class="sign_in_up_bg">
		<div class="container">
			<div class="row justify-content-lg-center justify-content-md-center">
				<div class="col-lg-12">
					<div class="main_logo25" id="logo">
						<a href="/"><img src="../../assets/faslearnBlack.png" height="70" width="250" alt=""></a>
						<a href="/"><img class="logo-inverse" src="../../assets/faslearnWhite.png" height="70" width="250" alt=""></a>
					</div>
				</div>
			
				<div class="col-lg-6 col-md-8">
					<div class="sign_form">
						<div class="main-tabs">
							<ul class="nav nav-tabs" id="myTab" role="tablist">
								<li class="nav-item">
									<a href="#instructor-signup-tab" id="instructor-tab" class="nav-link active" data-toggle="tab">Register Corporate Org</a>
								</li>
								<li class="nav-item">
									<a href="#student-signup-tab" id="student-tab" class="nav-link" data-toggle="tab">Register University</a>
								</li>																				
							</ul>									
						</div>
						<div class="tab-content" id="myTabContent">
							<div class="tab-pane fade show active" id="instructor-signup-tab" role="tabpanel" aria-labelledby="instructor-tab">
								<p>Register a Corporate Institution</p>

								<form>
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
                                    <label>Upload Institution Logo (Image file required)</label>
                                    <br>
                                    <input type="file" id="institutionLogo" ref="institutionLogoC" v-on:change="fileChanged"/>

                                    <br>
                                    <br>
                                    <label>Upload Institution Licences (PDF)</label>
                                    <br>
                                    <input type="file" id="institutionLicence" ref="institutionLicenceC" v-on:change="fileChanged2"/>
                                    <br>
                                    
                                    <br>
                                    <Errors v-if="error">
                                        
                                        <ul>
                                            <li v-for="error in error" :key="error">{{error}}</li>	
                                        </ul>		
                                        
                                    </Errors>
                                    <br>
                                    <router-link :to="'/Dinstitude/'+institude._id">
                                    <Success v-if="success">
                                        <ul>
                                            <li>Action Successful</li>
                                            <li>Our admins will verify your Institution and get back to you</li>	
                                        </ul>
                                        <p></p>
                                    </Success>
                                    </router-link>
                                    <!-- <div class="mt-3">Selected file: {{ cv ? cv.name : '' }}</div>							 -->
									<button class="login-btn" type="submit" @click.prevent="registerCorporate()" >Submit Information Now</button>
								</form>
							</div>
							<div class="tab-pane fade" id="student-signup-tab" role="tabpanel" aria-labelledby="student-tab">
								<p>Register an Academic Institution</p>
								<form>
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
                                    <label>Upload Institution Logo (Image file required)</label>
                                    <br>
                                    <input type="file" id="institutionLogo" ref="institutionLogoU" v-on:change="fileChanged"/>

                                    <br>
                                    <br>
                                    <label>Upload Institution Licences (PDF)</label>
                                    <br>
                                    <input type="file" id="institutionLicence" ref="institutionLicenceU" v-on:change="fileChanged2"/>
                                    <br>
                                    
                                    <br>
                                    <Errors v-if="error">
                                        <ul>
                                            <li v-for="error in error" :key="error">{{error}}</li>	
                                        </ul>	
                                    </Errors>
                                    <br>
                                    <router-link :to="'/Dinstitude/'+institude._id">
                                    <Success v-if="success">
                                        <ul>
                                            <li>Action Successful</li>
                                            <li>Our admins will verify your Institution and get back to you</li>	
                                        </ul>
                                        <p></p>
                                    </Success>
                                    </router-link>
                                    <!-- <div class="mt-3">Selected file: {{ cv ? cv.name : '' }}</div>							 -->
									<button class="login-btn" type="submit" @click.prevent="registerUni()" >Submit Information Now</button>
								</form>
							</div>
                            <br>
                            <Loading v-if="Loading"/>
						</div>
						<!-- <p class="mb-0 mt-30">Already have an account? <a href="sign_in.html">Log In</a></p> -->
					</div>
					<div class="sign_footer"><img src="assets/images/sign_logo.png" alt="">© 2020 <strong>Faslearn</strong>. All Rights Reserved.</div>
				</div>				
			</div>				
		</div>				
	</div>
</template>
<script>
import Errors from '@/components/Errors.vue'
import Success from '@/components/Success.vue'
import Loading from '@/components/Loading.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'RegisterTeacher',
    data(){
        return{
            institutionName : '',
            institutionTypeUni : 'University',
            institutionTypeCo : 'Corperate',
            address: '',
            email: '',
            mobile: '',
            bio: '',
            institutionLogo: '',
            institutionLicence: '',
            success: false,
            error: '',
            institude: '',
            Loading: false
            
        }
    },
    components: {
        Errors,
        Success,
        Loading
	},
    computed: {
        ...mapGetters(['isInstructor']),
        ...mapGetters(['circle'])
	},
    methods: {
        ...mapActions(['createNewInstitude']),
        //...mapActions(['check_user_instructor']),
        validate(){
            let error = [];
            let message = '';
            let flag = true;
            const allowedExtensions =  ['jpg','png','jpeg','JPG','PNG','JPEG'];
            const allowedExtensionsL =  ['pdf','PDF']
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
            if (this.institutionLogo == '') {
                message = 'Please insert Logo';
                error.push(message)
                flag = false
            }else{
                if (!allowedExtensions.includes(this.institutionLogo.name.split(".").pop())) {
                    message = 'Please insert valid image file for Logo';
                    error.push(message)
                    flag = false
                }
                
                if (this.institutionLogo.size > 1000000) {
                    message = 'Please insert smaller size logo less than 1mb';
                    error.push(message)
                    flag = false
                }
            }
            if (this.institutionLicence == '') {
                message = 'Please insert licence';
                error.push(message)
                flag = false
            }else{
                if (!allowedExtensionsL.includes(this.institutionLicence.name.split(".").pop())) {
                    message = 'Please insert valid valid PDF file for licence';
                    error.push(message)
                    flag = false
                }
                if (this.institutionLicence.size > 1000000) {
                    message = 'Please insert smaller size licence less than 1mb';
                    error.push(message)
                    flag = false
                }

            }
            
            if (this.mobile == '') {
                message = 'Please insert mobile';
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
        registerCorporate(){
            if (!this.validate()){
                return false
            }
            this.Loading = true
            let id = localStorage.getItem('fmruser');
            let formData = new FormData();
            formData.append('user_id', id);
            formData.append('institutionName', this.institutionName);
            formData.append('institutionType', this.institutionTypeCo);
            formData.append('address', this.address);
            formData.append('email', this.email);
            formData.append('mobile', this.mobile);
            formData.append('bio', this.bio);
            formData.append('institutionLogo', this.institutionLogo);
            formData.append('institutionLicence', this.institutionLicence);

            this.createNewInstitude(formData)
            .then(res => {
                console.log(res)
                this.Loading = false
                this.success = true 
                this.institude = res.data.institution
            })
            .catch(err => {
                console.log(err)
            })
            
        },
        registerUni(){
            if (!this.validate()){
                return false
            }
            this.Loading = true
            let id = localStorage.getItem('fmruser');
            let formData = new FormData();
            formData.append('user_id', id);
            formData.append('institutionName', this.institutionName);
            formData.append('institutionType', this.institutionTypeUni);
            formData.append('address', this.address);
            formData.append('email', this.email);
            formData.append('mobile', this.mobile);
            formData.append('bio', this.bio);
            formData.append('institutionLogo', this.institutionLogo);
            formData.append('institutionLicence', this.institutionLicence);

            this.createNewInstitude(formData)
            .then(res => {
                //console.log(res)
                this.Loading = false
                this.success = true
                this.institude = res.data.institution
            })
            
        },
        fileChanged (e) {
            this.institutionLogo = e.target.files[0]
            //console.log(this.institutionLogo)
        },
        fileChanged2 (e) {
            this.institutionLicence = e.target.files[0]
        },
        //  const allowedExtensions =  ['jpg','png'],
        // sizeLimit = 1000000; // 1 megabyte
        // const fileExtension = fileName.split(".").pop();
        //         if(!allowedExtensions.includes(fileExtension)){
        //     alert("file type not allowed");
        //     this.value = null;
        // }else if(fileSize > sizeLimit){
        //     alert("file size too large")
        //     this.value = null;
        // }
    }, 
    mounted(){
        // let user_id = localStorage.getItem('fmruser');
        // this.check_user_instructor(user_id)
        // .then(res => {
        //     console.log(res)
        // })
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

    select{
        width: 100%;
        border-radius: 10px;
    }

</style>
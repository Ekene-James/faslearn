<template>
    <div class="sign_in_up_bg">
		<div class="container">
			<div class="row justify-content-lg-center justify-content-md-center">
				<div class="col-lg-12">
					<div class="main_logo25" id="logo">
						<a href="/"><img src="../../assets/faslearnBlack.png" height="70" width="250" alt=""></a>
						<a href="/"><img class="logo-inverse" src="../../assets/faslearnWhite.png" height="70" width="250"  alt=""></a>
					</div>
				</div>
			
				<div class="col-lg-6 col-md-8"> 
					<div class="sign_form">
						<div class="tab-content" id="myTabContent">
							<div class="tab-pane fade show active" id="instructor-signup-tab" role="tabpanel" aria-labelledby="instructor-tab">
								<p v-if="canProceed">Become an Instructor!</p>
                                <p v-else>Sorry but you do not have all we require to be an Instructor</p>
								<form v-if="canProceed">
                                    <div class="ui search focus">
                                        <div class="help-block">Areas you are good at, (differentiate with a comma "  ,  "  )</div>
                                        <div class="ui left icon input swdh11 swdh19">
                                            <input class="prompt srch_explore" type="text" v-model="expertise" name="expertise" maxlength="64" placeholder="Expertise">															
                                        </div>
                                    </div>
                                    <br>
                                    <div class="ui search focus">
                                        <div class="help-block">Since when have you been on your field professionally</div>
                                        <div class="ui left icon input swdh11 swdh19">
                                            <input class="prompt srch_explore" type="date" v-model="experience" name="experience" maxlength="64" placeholder=" Years of Experience">															
                                        </div>
                                    </div>
                                    <br>
                                    <div class="help-block">What Category do you fall under</div>
									<select class="ui hj145 dropdown cntry152 prompt srch_explore" v-model="category" @change="setSubCat" required>
										<option value="">Select Category</option>
										<option :value="c._id" v-for="c in categories" :key="c">{{c.name}}</option>
									</select>
                                    <div class="help-block" v-if="subCategories!=''">What Subcategory do you fall under</div>
									<select class="ui hj145 dropdown cntry152 prompt srch_explore" v-if="subCategories!=''" v-model="subCategory" required>
										<option value="">Select Category</option>
										<option :value="c._id" v-for="c in subCategories" :key="c">{{c.name}}</option>
									</select>
                                    <br>
                                    <br>
                                    <Errors v-if="errors">
                                        <ul>
                                            <li v-for="error in errors" :key="error">{{error}}</li>	
                                        </ul>
                                    </Errors>
                                    <br>
                                    <Success v-if="success">
                                        <ul>
                                            <li>Action Successful</li>
                                            <li>You are now an instructor in Faslearn</li>
                                        </ul>
                                        <router-link to="/Dhome">
                                            <button class="login-btn" type="button" style="background-color: darkgreen">Go to instructor Workspace</button>
                                        </router-link>
                                    </Success>
                                    <Loading v-if="loading" />
									<button class="login-btn" type="submit" @click.prevent="registerteacher()" v-if="!isInstructor&&!loading&&!isLocalInstructor">Instructor Sign Up Now</button>
                                    <button class="login-btn" type="button" v-if="(isInstructor||isLocalInstructor)&&!loading">You are already an Instructor</button>
								</form>
                                <Errors v-if="!canProceed">
                                    <p style="margin: 0px">The credentials you need for this are</p>
                                    <ul><li v-for="e in errors" :key="e">>>{{e}}</li></ul>
                                    <p style="margin: 0px">Click on back to profile, then edit profile, then upload the credentials needed</p>
                                </Errors>
                                <router-link :to="'/Dprofile/'+userId">
                                <button class="login-btn" type="button" v-if="!canProceed">Back to profile</button>
                                </router-link>
							</div>
						</div>
						<!-- <p class="mb-0 mt-30">Already have an account? <a href="sign_in.html">Log In</a></p> -->
					</div>
					<div class="sign_footer"><img src="../../assets/faslearnBlack.png" height="70" width="250"  alt="">© 2020 <strong>Faslearn</strong>. All Rights Reserved.</div>
				</div>				
			</div>				
		</div>				
	</div>
</template>
<script>
import Errors from '@/components/Errors.vue'
import Loading from '@/components/Loading.vue'
import Success from '@/components/Success.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'RegisterTeacher',
    data(){
        return{
            categories: '',
            subCategories : '',
            userId : '',
            category: '',
            subCategory: '', 
            instructorType: '',
            expertise: '',
            experience: '',
            errors: '',
            success: false,
            canProceed: false,
            loading: false,
            isLocalInstructor: false
        }
    },
    components: {
        Errors,
        Success,
        Loading
	},
    computed: {
        ...mapGetters(['error']),
        ...mapGetters(['isInstructor']),
        ...mapGetters(['credentials'])
	},
    methods: {
        ...mapActions(['registerInstructor']),
        ...mapActions(['check_user_instructor']),
        ...mapActions(['fetch_categories']),
        registerteacher(){
            if (this.validateData()) {
                this.errors= ''
                this.loading = true
                //document.getElementById('myLoader').style.display = 'block'
                let teacher = {
                    user_id : this.userId,
                    category : this.category,
                    subCategory : this.subCategory,
                    experience : this.experience,
                    expertise: this.expertise,
                }
                this.registerInstructor(teacher)
                .then(res => {
                    if (res.data.isInstructor) {
                       this.success = true,
                       this.isLocalInstructor = true
                       this.loading = false
                       //document.getElementById('myLoader').style.display = 'none'
                       this.check_user_instructor(this.userId)
                    }
                    
                })
            }
            
        },
        setSubCat(){
            this.subCategory = ''
            for (let i = 0; i < this.categories.length; i++) {
                const element = this.categories[i];
                if (element._id == this.category) {
                    this.subCategories = element.subCategory
                }
                
            }
        },
        checkCredentials(){
			let file = this.credentials;
			let flag = true;
			let error = []
			if(file.Olevel == false){
				flag=false;
				error.push('Olevel certificate')
            }
            if(file.cv == false){
				flag=false;
				error.push('CV')
            }
            if(file.signature == false){
				flag=false;
				error.push('signature')
            }
            if(file.Bsc == false){
				flag=false;
				error.push('Bachelor Degree')
			}
            if(file.trainingLicence == false){
				flag=false;
				error.push('trainingLicence certificate')
			}
			if(file.image == false){
				flag=false;
				error.push('Profile picture')
			}
			if(file.bio == false){
				flag=false;
				error.push('About you(BIO)')
			}
			if (flag == true) {
				return true
			}else{
                this.errors = error;
                console.log(error)
				return false
			}
        },
        validateData(){
			let flag = true;
			let error = []
			if(this.category == ''){
				flag=false;
				error.push('Please choose your category')
            }
            if(this.subCategory == ''){
				flag=false;
				error.push('Please choose your subCategory')
            }
            if(this.experience == ''){
				flag=false;
				error.push('Please insert your experience')
            }
            if(this.expertise == ''){
				flag=false;
				error.push('Please insert your expertise')
            }
			if (flag == true) {
				return true
			}else{
                this.errors = error;
				return false
			}
		}
    }, 
    mounted(){
        this.userId = localStorage.getItem('fmruser');
        if (this.checkCredentials()) {
            this.canProceed = true
            
            this.fetch_categories()
            .then(res => {
                this.categories = res.data
            })
        }
        
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
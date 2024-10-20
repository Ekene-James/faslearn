<template>
    <div>
    <!-- Header Start -->
        <Dheader />
	<!-- Header End -->
	<!-- Left Sidebar Start -->
        <Dnav1 />
	<!-- Left Sidebar End -->
	<!-- Body Start -->
        <div class="wrapper _bg4586">
            <div class="sa4d25">
                <div class="container-fluid">			
                    <div class="row">
                        <div class="col-lg-12">
                            <h2 class="st_title"><i class="uil uil-comment-info-alt"></i> Send Feedback</h2>
                            <div class="row">
                                <div class="col-lg-6 col-md-8">
                                    <!-- <div class="ui search focus">
                                        <div class="ui left icon input swdh11 swdh19">
                                            <input class="prompt srch_explore" type="email" name="emailaddress" value="" id="id_email" required="" maxlength="64" placeholder="Email address">															
                                        </div>
                                    </div> -->
                                    <div class="ui search focus mt-30">																
                                        <div class="ui form swdh30">
                                            <div class="field">
                                                <textarea rows="6" name="description" id="id_about" placeholder="Describe your issue or share your ideas" v-model="content"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group1 mt-30">
                                        <label for="file5">Add Screenshots</label>
                                        <div class="image-upload-wrap">
                                            <input class="file-upload-input" id="file5" type="file" @change="handleFile" accept="image/*">
                                            <div class="drag-text">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                            <h4>Select screenshots to upload</h4>
                                            <p v-if="file!=''">{{file.name}}</p>
                                            </div>
                                        </div>															
                                    </div>
                                    <Loading v-if="Loading"/>
                                    <Success v-if="Success">
                                        <ul>
                                            <li>Feedback sent successfully</li>
                                            <li>Thanks for your effort in making faslearn a better place</li>
                                        </ul>
                                    </Success>
                                    <Errors v-if="error!=''">
                                        <ul>
                                            <li v-for="e in error" :key="e">{{e}}</li>
                                        </ul>
                                    </Errors>
                                    <button class="save_btn" v-if="!Loading" type="button" @click.prevent="sendFeedback">Send Feedback</button>
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
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
import Loading from '@/components/Loading.vue'
import Success from "@/components/Success.vue"
import Errors from "@/components/Errors.vue"
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'Dteachers',
	data(){
		return{
            Loading: false,
            Success: false,
            error: '',
            content: '',
            userId: '',
            file: '',
            isFilePresent: false
		}
	},
    components: {
        Dheader,
        Dnav1,
        Errors,
        Success,
        Loading,
		Dfooter
	},
	computed: {
		...mapGetters(['loader'])
	},   
	methods: {
        ...mapActions(['send_StudentFeedback']),
        sendFeedback(){
            if (this.validate()) {
                this.Loading = true
                let formData = new FormData(); 
                formData.append('userId', this.userId);
                formData.append('content', this.content);
                formData.append('file', this.file);
                formData.append('isFilePresent', this.isFilePresent);
                this.send_StudentFeedback(formData)
                .then(res => {
                    if (res.data.success) {
                        this.Loading = false
                        this.Success = true
                        this.content = ''
                        this.userId = ''
                        this.isFilePresent = false
                    }
                })
            }
        },
        handleFile(e){
            this.file = e.target.files[0]
            this.isFilePresent = true
        },
        validate(){
            let error = [];
            let message = '';
            const allowedExtensions =  ['jpg','png','jpeg','JPG','PNG','JPEG'];
			let flag = true;
            if (this.file != '') {
                if (!allowedExtensions.includes(this.file.name.split(".").pop())) {
                    message = 'Please insert a valid image file for ScreenShot';
                    error.push(message)
                    flag = false
                }
                
                if (this.file.name.size > 1000000) {
                    message = 'Please insert smaller size ScreenShot less than 1mb';
                    error.push(message)
                    flag = false
                }
            }
            if (this.content == '') {
                message = 'Please what is the feedback about? type in the space provided';
                error.push(message)
                flag = false
            }
            if (flag == true) {
                this.error = ''
                return true
            }else{
                this.error = error
                return false
            }
		},
	},
    mounted(){
		this.userId = localStorage.getItem('fmruser')
    }
}
</script>
<style scoped>
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

   
	

</style>
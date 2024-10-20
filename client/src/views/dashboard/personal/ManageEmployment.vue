<template>
    <div>
        <Modal>
            <!-- <object width="100%" height="500" type="application/pdf" v-bind:data="backEnd+'auth/fetchUserCredential/'+userId+'/'+itemModal" id="pdf_content" >
                <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
            </object> -->
        </Modal>

        <Dheader />

        <Dnav2 />
        
        <div class="wrapper">
            <div class="sa4d25">
                <div class="container-fluid">
                    		
                    <div class="row">
                        <div class="col-lg-12">	
                            <h2 class="st_title"><i class="uil uil-check-circle"></i> Verification</h2>
                        </div>					
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="all_msg_bg">
                                <div class="row no-gutters">
                                    <div class="" v-if="lecturer_id=='e'" style="width: 100%; display: block">					
                                        <div class="msg_search">
                                            <div class="ui search focus">
                                                <div class="ui left icon input swdh11 swdh15">
                                                    <input class="prompt srch_explore" type="text" placeholder="Search Messages...">
                                                    <i class="uil uil-search-alt icon icon8"></i>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="simplebar-content-wrapper">
                                            <div class="group_messages"  v-if="lecturers!=''">
                                                <div class="chat__message__dt" v-for="s in lecturers" :key="s">
                                                    <div class="user-status">	
                                                        <router-link :to="'/DmanageEmployment/'+s._id">										
                                                        <div class="user-avatar" style="height: 50px; width: 50px;">
                                                            <ProfileImage :id="s.user[0]._id" />
                                                        </div>
                                                        <p class="user-status-title"><span class="bold">{{s.user[0].firstName}} {{s.user[0].lastName}}</span></p>
                                                        <p class="user-status-text">{{s.user[0].email}}</p>
                                                        </router-link>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="group_messages"  v-else>
                                                <div class="chat__message__dt" >
                                                    <div class="user-status">										
                                                        <div class="user-avatar">
                                                            <img src="../assets/images/left-imgs/img-1.jpg" alt="">
                                                            <!-- <div class="msg__badge">2</div> -->
                                                        </div>
                                                        <p class="user-status-title"><span class="bold">No lecturer asked to be admited to your institution recently</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>					
                                    </div>
                                    <div class="" v-if="lecturer_id!='e'" style="width: 100%;">
                                        <router-link :to="'/DmanageEmployment/e'">
                                        <div class="msg_search">
                                            <div class="ui search focus">
                                                <div class="ui left icon input swdh11 swdh15">
                                                    <P><strong>&lt;&lt;&lt;Back</strong></P>
                                                    <!-- <i class="uil uil-search-alt icon icon8"> back to Questions</i> -->
                                                </div>
                                            </div>
                                        </div>
                                        </router-link>			
                                        <div class="chatbox_right">
                                            <div class="chat_header">
                                                <div class="user-status">											
                                                    <div class="user-avatar" id="imageCarrier" style="height: 50px; width: 50px;">
                                                        <!-- <img src="../assets/images/left-imgs/img-1.jpg" alt=""> -->
                                                        <ProfileImage :id="lecturerBody.user[0]._id" />
                                                    </div>
                                                    <p class="user-status-title"><span class="bold">{{lecturerBody.user[0].firstName}} {{lecturerBody.user[0].lastName}}</span></p>
                                                    <p class="user-status-tag online">{{lecturerBody.user[0].email}}</p>													
                                                    <div class="user-status-time floaty eps_dots eps_dots5 more_dropdown">
                                                        <!-- <span style="cursor: pointer" @click="deleteQuestion"><i class="uil uil-trash-alt"></i>Delete</span>																										 -->
                                                    </div>													
                                                </div>
                                            </div>
                                            <div class="chat_header">
                                                <h3>Credentials</h3>
                                                <div class="user-status">												
                                                    <div class="buutt">
                                                        <span style="cursor: pointer" @click="activateModal('Olevel',lecturerBody.user[0]._id)"><h4><i class="uil uil-eye"></i>View Olevel</h4></span>
                                                    </div>	
                                                    <div class="buutt">
                                                        <span style="cursor: pointer" @click="activateModal('cv',lecturerBody.user[0]._id)"><h4><i class="uil uil-eye"></i>View CV</h4></span>
                                                    </div>	
                                                    <div class="buutt">
                                                        <span style="cursor: pointer" @click="activateModal('Bsc',lecturerBody.user[0]._id)"><h4><i class="uil uil-eye"></i>View BSC</h4></span>
                                                    </div>
                                                    <div class="buutt">
                                                        <span style="cursor: pointer" @click="activateModal('trainingLicence',lecturerBody.user[0]._id)"><h4><i class="uil uil-eye"></i>View trainingLicence</h4></span>
                                                    </div>
                                                    <div class="buutt">
                                                        <span style="cursor: pointer" @click="activateModal('image',lecturerBody.user[0]._id)"><h4><i class="uil uil-eye"></i>View Picture</h4></span>
                                                    </div>												
                                                </div>
                                                <h3>About instructor</h3>
                                                <p>{{lecturerBody.user[0].bio}}</p>
                                            </div>
                                            
                                            <div class="messages-line simplebar-content-wrapper2 scrollstyle_4">	
                                                <Success v-if="success">
                                                    <ul>
                                                        <li>Action was successful</li>
                                                    </ul>
                                                </Success>										
                                                <div class="mCustomScrollbar" >										
                                                    <h3>Institions Applied</h3>
                                                    <div class="main-message-box st3" v-for="s in lecturerBody.institutionsEmployed" :key="s">
                                                        <div class="message-dt st3" v-if="s.institutionId[0].user[0]==userId&&s.rejected==false&&s.accepted==false">
                                                            <div class="row">
                                                                <div class="message-inner-dt">
                                                                    <p>{{s.institutionId[0].institutionName}}</p>
                                                                </div><!--message-inner-dt end-->
                                                            </div>
                                                            <br>
                                                            <div class="row">
                                                                <div class="admit">
                                                                    <span style="cursor: pointer" @click="send_employment_responds(lecturerBody._id,'grant',s._id)"><h4><i class="uil  uil-user-plus"></i>Grant Admission</h4></span>
                                                                </div>
                                                                <div class="deny">
                                                                    <span style="cursor: pointer" @click="send_employment_responds(lecturerBody._id,'deny',s._id)"><h4><i class="uil  uil-user-minus"></i>Deny Admission</h4></span>
                                                                </div>
                                                            </div>
                                                        </div><!--message-dt end-->
                                                    </div><!--main-message-box end-->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dfooter />
        </div>
    </div>

</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Modal from "@/components/Modal.vue";
import Success from "@/components/Success.vue";
import Dheader from '@/components/dashboard/Header.vue'
import Dnav2 from '@/components/dashboard/Nav2.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
import ProfileImage from "@/components/ProfileImage";
export default {
    name: 'DmanageAdmissions',
    data(){
        return{
            lecturer_id: '',
            lecturerBody: {user: [{firstName: '', lastName: '', email: '', _id: ''}]},
            lecturers: '',
            userId: '',
            success: false
        }
    },
    components: {
        Dheader,
        Dnav2,
        Modal,
        Dfooter,
        ProfileImage,
        Success
    },
    computed: {
        ...mapGetters(['backEnd'])
    },
    watch: {
		$route() {
            this.lecturer_id = this.$route.params.id
            this.success= false
		},

		lecturer_id: function() {
            if (this.lecturer_id!='e') {
                for (let i = 0; i < this.lecturers.length; i++) {
                    const element = this.lecturers[i];
                    if (element._id == this.lecturer_id) {
                        this.lecturerBody = element
                    }
                }
            }else{
                this.lecturerBody = ''
            }
      		
        },
        
        lecturerBody: function () {
            if (this.lecturer_id!='e') {
                for (let i = 0; i < this.lecturers.length; i++) {
                    const element = this.lecturers[i];
                    if (element._id == this.lecturer_id) {
                        this.lecturerBody = element
                    }
                }
            }else{
                this.lecturerBody = ''
            }
        }
    }, 
    methods: {
        ...mapActions(['fetch_AllLecturer_Applications']),
        ...mapActions(['manage_Employment']),
        activateModal(item,user){
            let modal = document.getElementById('myModal');
            let modalBody = document.getElementById('modal-content-body');
            modal.setAttribute("class", "modal vd_mdl fade show");
            modal.style.display = 'block';
            modalBody.innerHTML = `<object width="100%" height="500" type="application/pdf" data="`+this.backEnd+`auth/fetchUserCredential/`+user+`/`+item+`" id="pdf_content" >
                <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
            </object>`
        },
        send_employment_responds(instructor_id,responds,institutionsEmployedIdd){
            this.success= false
            let object = {
                institutionAdminUserId: this.userId,
                instructorId: instructor_id,
                institutionsEmployedId: institutionsEmployedIdd, 
                type: responds
            }
            this.manage_Employment(object)
            .then(res => {
                this.lecturers = res.data
                let holder = this.lecturer_id
                this.lecturer_id = 'temp'
                this.$route.params.id = 'temp'
                this.lecturer_id = holder
                this.$route.params.id = holder
                for (let i = 0; i < this.lecturers.length; i++) {
                    const element = this.lecturers[i];
                    if (element._id == this.lecturer_id) {
                        this.lecturerBody = element
                    }
                }
                this.success= true
            })
        }
    },  
    mounted(){
        this.lecturer_id = this.$route.params.id;
        this.userId = localStorage.getItem('fmruser');
        this.fetch_AllLecturer_Applications(this.userId)
        .then(res => {
            this.lecturers = res.data
            console.log(this.lecturers)
            if (this.lecturer_id!='e') {
                for (let i = 0; i < this.lecturers.length; i++) {
                    const element = this.lecturers[i];
                    if (element._id == this.lecturer_id) {
                        this.lecturerBody = element
                    }
                }
                
            }else{
                this.lecturerBody = ''
            }
        })
    }
}
</script>
<style>
    @import url("../assets/css/style.css");
    @import url("http://fonts.googleapis.com/css?family=Roboto:400,700,500");
    @import url("../assets/vendor/unicons-2.0.1/css/unicons.css");
    @import url("../assets/css/instructor-dashboard.css");
    @import url("../assets/css/vertical-responsive-menu.min.css");
    @import url("../assets/css/instructor-dashboard.css");
    @import url("../assets/css/instructor-responsive.css");
    @import url("../assets/css/responsive.css");
    @import url("../assets/css/night-mode.css");
    @import url("../assets/vendor/fontawesome-free/css/all.min.css");
    @import url("../assets/vendor/OwlCarousel/assets/owl.carousel.css");
    @import url("../assets/vendor/OwlCarousel/assets/owl.theme.default.min.css");
    @import url("../assets/vendor/bootstrap/css/bootstrap.min.css");
    @import url("../assets/vendor/semantic/semantic.min.css");

    .buutt{
        display: inline-block;
        min-width: 100px;
        height: 40px;
        background-color: green;
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
        font-weight: bolder;
        margin: 10px;
    }

    .admit{
        width: 200px;
        height: 40px;
        background-color: green;
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
        font-weight: bolder;
        display: inline-block;
    }
    .deny{
        width: 200px;
        height: 40px;
        display: inline-block;
        background-color: red;
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
        font-weight: bolder;
    }
</style>
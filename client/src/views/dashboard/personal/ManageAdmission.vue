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
                                    <div class="" v-if="student_id=='e'" style="width: 100%; display: block">					
                                        <div class="msg_search">
                                            <div class="ui search focus">
                                                <div class="ui left icon input swdh11 swdh15">
                                                    <input class="prompt srch_explore" type="text" placeholder="Search Messages...">
                                                    <i class="uil uil-search-alt icon icon8"></i>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="simplebar-content-wrapper">
                                            <div class="group_messages"  v-if="students!=''">
                                                <div class="chat__message__dt" v-for="s in students" :key="s">
                                                    <div class="user-status">	
                                                        <router-link :to="'/DmanageAdmission/'+s._id">										
                                                        <div class="user-avatar">
                                                            <img src="../assets/images/left-imgs/img-1.jpg" alt="">
                                                            <!-- <div class="msg__badge">2</div> -->
                                                        </div>
                                                        <p class="user-status-title"><span class="bold">{{s.firstName}} {{s.lastName}}</span></p>
                                                        <p class="user-status-text">{{s.email}}</p>
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
                                                        <p class="user-status-title"><span class="bold">No student asked to be admited to your institution recently</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>					
                                    </div>
                                    <div class="" v-if="student_id!='e'" style="width: 100%;">
                                        <router-link :to="'/DmanageAdmission/e'">
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
                                                    <div class="user-avatar">
                                                        <img src="../assets/images/left-imgs/img-1.jpg" alt="">
                                                    </div>
                                                    <p class="user-status-title"><span class="bold">{{studentBody.firstName}} {{studentBody.lastName}}</span></p>
                                                    <p class="user-status-tag online">{{studentBody.email}}</p>													
                                                    <div class="user-status-time floaty eps_dots eps_dots5 more_dropdown">
                                                        <!-- <span style="cursor: pointer" @click="deleteQuestion"><i class="uil uil-trash-alt"></i>Delete</span>																										 -->
                                                    </div>													
                                                </div>
                                            </div>
                                            <div class="chat_header">
                                                <h3>Credentials</h3>
                                                <div class="user-status">
                                                    <p class="user-status-title"><span class="bold">Olevel</span></p>												
                                                    <div class="user-status-time floaty eps_dots eps_dots5 buutt">
                                                        <span style="cursor: pointer" @click="activateModal('Olevel',studentBody._id)"><h4><i class="uil uil-eye"></i>View</h4></span>
                                                    </div>													
                                                </div>
                                            </div>
                                            <div class="messages-line simplebar-content-wrapper2 scrollstyle_4">
                                                <Success v-if="success">
                                                    <ul>
                                                        <li>Action was successful</li>
                                                    </ul>
                                                </Success>											
                                                <div class="mCustomScrollbar" >										
                                                    <h3>Institions Applied</h3>
                                                    <div class="main-message-box st3" v-for="s in studentBody.admission" :key="s">
                                                        <div class="message-dt st3" v-if="s.institutionId[0].user[0]==userId&&s.rejected==false&&s.accepted==false">
                                                            <div class="row">
                                                                <div class="message-inner-dt">
                                                                    <p>{{s.institutionId[0].institutionName}}</p>
                                                                </div><!--message-inner-dt end-->
                                                            </div>
                                                            <br>
                                                            <div class="row">
                                                                <div class="admit">
                                                                    <span style="cursor: pointer" @click="send_admission_responds(studentBody._id,'grant',s._id)"><h4><i class="uil  uil-user-plus"></i>Grant Admission</h4></span>
                                                                </div>
                                                                <div class="deny">
                                                                    <span style="cursor: pointer" @click="send_admission_responds(studentBody._id,'deny',s._id)"><h4><i class="uil  uil-user-minus"></i>Deny Admission</h4></span>
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
import Success from "@/components/Success.vue";
import Modal from "@/components/Modal.vue";
import Dheader from '@/components/dashboard/Header.vue'
import Dnav2 from '@/components/dashboard/Nav2.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
    name: 'DmanageAdmissions',
    data(){
        return{
            student_id: '',
            studentBody: '',
            students: '',
            userId: '',
            success: false
        }
    },
    components: {
        Dheader,
        Dnav2,
        Modal,
        Dfooter,
        Success
    },
    computed: {
        ...mapGetters(['backEnd'])
    },
    watch: {
		$route() {
            this.student_id = this.$route.params.id
            this.success= false
		},

		student_id: function() {
            if (this.student_id!='e') {
                for (let i = 0; i < this.students.length; i++) {
                    const element = this.students[i];
                    if (element._id == this.student_id) {
                        this.studentBody = element
                    }
                }
                
            }else{
                this.studentBody = ''
            }
      		
        },
        
        studentBody: function () {
            if (this.student_id!='e') {
                for (let i = 0; i < this.students.length; i++) {
                    const element = this.students[i];
                    if (element._id == this.student_id) {
                        this.studentBody = element
                    }
                }
                
            }else{
                this.studentBody = ''
            }
        }
    }, 
    methods: {
        ...mapActions(['fetch_AllStudent_Applications']),
        ...mapActions(['manage_Admission']),
        activateModal(item,user){
            let modal = document.getElementById('myModal');
            let modalBody = document.getElementById('modal-content-body');
            modal.setAttribute("class", "modal vd_mdl fade show");
            modal.style.display = 'block';
            modalBody.innerHTML = `<object width="100%" height="500" type="application/pdf" data="`+this.backEnd+`auth/fetchUserCredential/`+user+`/`+item+`" id="pdf_content" >
                <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
            </object>`
        },
        send_admission_responds(userIdd,responds,admissionIdd){
            this.success= false
            let object = {
                institutionAdminUserId: this.userId,
                userId: userIdd,
                admissionId: admissionIdd, 
                type: responds
            }
            this.manage_Admission(object)
            .then(res => {
                this.students = res.data
                let holder = this.student_id
                this.student_id = 'temp'
                this.$route.params.id = 'temp'
                this.student_id = holder
                this.$route.params.id = holder
                for (let i = 0; i < this.students.length; i++) {
                    const element = this.students[i];
                    if (element._id == this.student_id) {
                        this.studentBody = element
                    }
                }
                this.success= true
            })
        }
    },  
    mounted(){
        this.student_id = this.$route.params.id;
        this.userId = localStorage.getItem('fmruser');
        this.fetch_AllStudent_Applications(this.userId)
        .then(res => {
            this.students = res.data
            if (this.student_id!='e') {
                for (let i = 0; i < this.students.length; i++) {
                    const element = this.students[i];
                    if (element._id == this.student_id) {
                        this.studentBody = element
                    }
                }
                
            }else{
                this.studentBody = ''
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
        width: 100px;
        height: 40px;
        background-color: green;
        border-radius: 10px;
        padding: 10px;
        font-size: 20px;
        font-weight: bolder;
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
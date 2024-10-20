<template>
    <div>
        <Dheader />

        <Dnav2 />
        
        <div class="wrapper">

            <div class="sa4d25">
                <div class="container-fluid">			
                    <div class="row" v-if="(isInstructor||isAdmin)&&question_id=='e'">
                        <div class="left" :class="{ active: questionPage}" @click="switchtap('questionPage')">	
                            <h2 class="st_title"><i class="uil uil-comments"></i>As Student</h2>
                        </div>
                        <div class="right" :class="{ active: respondPage}" @click="switchtap('respondPage')">	
                            <h2 class="st_title"><i class="uil uil-comments"></i>As Instructor</h2>
                        </div>						
                    </div>				
                    <div class="row" v-if="questionPage">
                        <div class="col-12">
                            <div class="all_msg_bg">
                                <div class="row no-gutters">

                                    <div class="" v-if="question_id=='e'" style="width: 100%; display: block">					
                                        <!-- <div class="msg_search">
                                            <div class="ui search focus">
                                                <div class="ui left icon input swdh11 swdh15">
                                                    <input class="prompt srch_explore" type="text" placeholder="Search Messages...">
                                                    <i class="uil uil-search-alt icon icon8"></i>
                                                </div>
                                            </div>
                                        </div> -->
                                        <div class="simplebar-content-wrapper">
                                            <div class="group_messages"  v-if="studentchats!=''">
                                                <div class="chat__message__dt" :class="{active : question_id == c._id}" v-for="c in studentchats" :key="c">
                                                    <div class="user-status">	
                                                        <router-link :to="'/Dmessage/'+c._id">										
                                                        <div class="user-avatar">
                                                            <img src="../assets/images/left-imgs/img-1.jpg" alt="">
                                                            <!-- <div class="msg__badge">2</div> -->
                                                        </div>
                                                        <p class="user-status-title"><span class="bold">{{c.user[0].firstName}} {{c.user[0].lastName}}</span></p>
                                                        <p class="user-status-text">{{c.question}}.</p>
                                                        </router-link>
                                                        <p class="user-status-time floaty" @click="deleteQuestionFromChats(c._id)"><i class="uil uil-trash-alt"></i>Delete</p>
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
                                                        <p class="user-status-title"><span class="bold">You have not asked any question on any lecture</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>					
                                    </div>
                                    <div class="" v-if="question_id!='e'" style="width: 100%;">
                                        <router-link :to="'e'">
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
                                                    <p class="user-status-title"><span class="bold">{{questionDetails.course[0].title}}</span></p>
                                                    <p class="user-status-tag online">{{questionDetails.lecture[0].title}}</p>													
                                                    <div class="user-status-time floaty eps_dots eps_dots5 more_dropdown">
                                                        <span style="cursor: pointer" @click="deleteQuestion"><i class="uil uil-trash-alt"></i>Delete</span>																										
                                                    </div>													
                                                </div>
                                            </div>
                                            <div class="messages-line simplebar-content-wrapper2 scrollstyle_4">											
                                                <div class="mCustomScrollbar" >										
                                                    <div  style="width: 100%">
                                                        <div class="message-dt" style="width: 100%">
                                                            <div class="message">
                                                                <p>{{questionDetails.question}}</p>
                                                            </div><!--message-inner-dt end-->
                                                            <br>
                                                            <span>{{questionDetails.createdAt}}</span>
                                                        </div><!--message-dt end-->
                                                    </div><!--main-message-box end-->
                                                    <div class="main-message-box st3" v-if="questionDetails.respond!=null">
                                                        <div class="message-dt st3">
                                                            <div class="message-inner-dt">
                                                                <p>{{questionDetails.respond}}</p>
                                                            </div><!--message-inner-dt end-->
                                                            <span>5 minutes ago</span>
                                                        </div><!--message-dt end-->
                                                    </div><!--main-message-box end-->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br><br><br>
                            <center v-if="question_id=='e'">
                                <button class="live_link" type="button" v-if="!Loading" @click="fetchMore('student')">Load More</button>	
                            </center>
                            <br><br><br>
                        </div>
                    </div>
                    <div class="row" v-if="respondPage">
                        <div class="col-12">
                            <div class="all_msg_bg">
                                <div class="row no-gutters">

                                    <div class="" v-if="question_id=='e'" style="width: 100%; display: block">					
                                        <!-- <div class="msg_search">
                                            <div class="ui search focus">
                                                <div class="ui left icon input swdh11 swdh15">
                                                    <input class="prompt srch_explore" type="text" placeholder="Search Messages...">
                                                    <i class="uil uil-search-alt icon icon8"></i>
                                                </div>
                                            </div>
                                        </div> -->
                                        <div class="simplebar-content-wrapper">
                                            <div class="group_messages"  v-if="chats!=''">
                                                <div class="chat__message__dt" :class="{active : question_id == c._id}" v-for="c in chats" :key="c">
                                                    <div class="user-status">	
                                                        <router-link :to="'/Dmessage/'+c._id">										
                                                        <div class="user-avatar">
                                                            <img src="../assets/images/left-imgs/img-1.jpg" alt="">
                                                            <!-- <div class="msg__badge">2</div> -->
                                                        </div>
                                                        <p class="user-status-title"><span class="bold">{{c.user[0].firstName}} {{c.user[0].lastName}}</span></p>
                                                        <p class="user-status-text">{{c.question}}.</p>
                                                        </router-link>
                                                        <p class="user-status-time floaty" @click="deleteQuestionFromChats(c._id)"><i class="uil uil-trash-alt"></i>Delete</p>
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
                                                        <p class="user-status-title"><span class="bold">You do not have any questions to answer</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>					
                                    </div>
                                    <div class="" v-if="question_id!='e'" style="width: 100%;">
                                        <router-link :to="'e'">
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
                                                    <p class="user-status-title"><span class="bold">{{questionDetails.course[0].title}}</span></p>
                                                    <p class="user-status-tag online">{{questionDetails.lecture[0].title}}</p>													
                                                    <div class="user-status-time floaty eps_dots eps_dots5 more_dropdown">
                                                        <span style="cursor: pointer" @click="deleteQuestion"><i class="uil uil-trash-alt"></i>Delete</span>																										
                                                    </div>													
                                                </div>
                                            </div>
                                            <div class="messages-line simplebar-content-wrapper2 scrollstyle_4">											
                                                <div class="mCustomScrollbar" >										
                                                    <div  style="width: 100%">
                                                        <div class="message-dt" style="width: 100%">
                                                            <div class="message">
                                                                <p>{{questionDetails.question}}</p>
                                                            </div><!--message-inner-dt end-->
                                                            <br>
                                                            <span>{{questionDetails.createdAt}}</span>
                                                        </div><!--message-dt end-->
                                                    </div><!--main-message-box end-->
                                                    <div class="main-message-box st3" v-if="questionDetails.respond!=null">
                                                        <div class="message-dt st3">
                                                            <div class="message-inner-dt">
                                                                <p>{{questionDetails.respond}}</p>
                                                            </div><!--message-inner-dt end-->
                                                            <span>5 minutes ago</span>
                                                        </div><!--message-dt end-->
                                                    </div><!--main-message-box end-->
                                                </div>
                                            </div>
                                            <div class="message-send-area">
                                                <form>
                                                    <div class="mf-field">
                                                        <div class="ui search focus input__msg" style="width: 75%">
                                                            <div class="ui left icon input swdh19">
                                                                <input class="prompt srch_explore" v-model="respond" type="text" id="chat-widget-message-text-2" name="chat_widget_message_text_2" placeholder="Whats your answer to this">
                                                            </div>
                                                        </div>
                                                        <button class="add_msg" @click.prevent="respondQuestion()" :disabled="respond==''" type="submit"><i class="uil uil-message"></i></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br><br><br>
                            <center v-if="question_id=='e'">
                                <button class="live_link" type="button" v-if="!Loading" @click="fetchMore('instructor')">Load More</button>	
                            </center>
                            <br><br><br>
                        </div>
                    </div>
                </div>
            </div>
            <br><br><br><br>
            <Dfooter />
        </div>
    </div>

</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Dheader from '@/components/dashboard/Header.vue'
import Dnav2 from '@/components/dashboard/Nav2.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
    name: 'DMessage',
    data(){
        return{
            chats : '',
            user_id: '',
            question_id: '',
            respond: '',
            studentchats: '',
            questionPage: true,
            respondPage: false,
            questionDetails: {course: [{title: ''}], lecture: [{title: ''}]},
            skip: 0,
            Loading: false
        }
    },
    watch: {
		$route() {
		// react to route changes...
			this.question_id = this.$route.params.id
            this.respond = ''
		},

		question_id: function() {
            if (this.question_id!='e') {
                this.fetch_Single_ClassQuestion(this.question_id)
                .then(res => {
                    this.questionDetails = res.data
                })
            }
      		
        }
    },
    computed: {
        ...mapGetters(['isInstructor']),
        ...mapGetters(['isAdmin'])
    },
    components: {
        Dheader,
        Dnav2,
        Dfooter
    },
    methods: {
        ...mapActions(['fetchInstructorQuestionsToAnswer']),
        ...mapActions(['fetch_Single_ClassQuestion']),
        ...mapActions(['Answer_Single_ClassQuestion']),
        ...mapActions(['Delete_Single_ClassQuestion']),
        ...mapActions(['fetch_All_User_Asked_Question']),
        respondQuestion(){
            let object = {
                question_id: this.question_id, 
                respond: this.respond
            }
            this.Answer_Single_ClassQuestion(object)
            .then(res => {
                this.chats = res.data.AllQuestions
                this.questionDetails = res.data.Question
            })
        },
        deleteQuestion(){
            this.Delete_Single_ClassQuestion(this.question_id)
            .then(res => {
                this.chats = res.data.AllQuestions
                this.$router.push('/Dmessage/e')
            }) 
        },
        deleteQuestionFromChats(question_id){
            this.Delete_Single_ClassQuestion(question_id)
            .then(res => {
                this.chats = res.data.AllQuestions
            }) 
        },
        switchtap(tap){
            this.skip = 0
			switch (tap) {
				case 'questionPage':
					this.questionPage = true;
					this.respondPage = false;
					break;
				case 'respondPage':
					this.questionPage = false;
					this.respondPage = true;
					break;
				default:
					break;
			}
		},
        fetchMore(type){
            this.Loading = true
            this.skip = this.skip + 10
            switch (type) {
                case 'student':
                    this.fetch_All_User_Asked_Question({id: this.user_id, skip: this.skip})
                    .then(res =>  {
                        for (let i = 0; i < res.data.length; i++) {
                            const element = res.data[i];
                            this.studentchats.push(element)
                        }
                        this.Loading = false
                    })
                    break;
                case 'instructor':
                    this.fetchInstructorQuestionsToAnswer({instructor_id: this.user_id, skip: this.skip}) 
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            const element = res.data[i];
                            this.chats.push(element)
                        }
                        this.Loading = false
                    })
                    break;
            
                default:
                    break;
            }
        }
    },  
    mounted(){
        this.question_id = this.$route.params.id;
		this.user_id = localStorage.getItem('fmruser');
        if (this.question_id!='e') {
            this.fetch_Single_ClassQuestion(this.question_id)
            .then(res => {
                this.questionDetails = res.data
            })
        }
        this.fetchInstructorQuestionsToAnswer({instructor_id: this.user_id, skip: this.skip}) 
        .then(res => {
            this.chats = res.data
        })

        this.fetch_All_User_Asked_Question({id: this.user_id, skip: this.skip})
        .then(res =>  {
            this.studentchats = res.data
        })
    }
}
</script>
<style scoped>
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

    .message{
        widows: 90%;
        background-color: red;
        border-radius: 10px;
        color: white;
        font-size: 18px;
    }

    .message p{
        color: white;
        font-size: 18px;
    }

    .left{
        width: 49%;
        float: left;
        padding: 10px;
        cursor: pointer;
        margin-left: 1%;
    }

    .right{
        float: right;
        width: 49%;
        padding: 10px;
        cursor: pointer;
    }

    .active{
        color: white;
        background-color: tomato;
        border-radius: 10px;
    }

</style>
<template>
    <div>
    <!-- Header Start -->
    <Dheader />
	<!-- Header End -->
	<!-- Left Sidebar Start -->
        <Dnav1 />
	<!-- Left Sidebar End -->
	<!-- Body Start -->
	<div class="wrapper" >
		<div class="sa4d25">
			<div class="container-fluid">			
				<div class="row" v-if="isPurchased">
					<div class="col-xl-8 col-lg-8">
						<div class="section3125">
							
                            <div class="live1452" v-if="lecture.fileType=='application/pdf'">
                                <!-- <embed v-bind:src="backEnd+'student/material/'+lecture._id" width="100%" height="500px" /> -->
                                <!-- <object width="100%" height="500" type="application/pdf" v-bind:data="backEnd+'student/material/'+lecture._id+'#zoom=40&scrollbar=0&toolbar=0&navpanes=0'" id="pdf_content" style="pointer-events: none;">
                                    <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
                                </object> -->
								<object width="100%" height="500" type="application/pdf" v-bind:data="backEnd+'student/material/'+lecture._id" id="pdf_content">
                                    <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
                                </object>
                            </div>
							<div class="live1452" v-else>
								<iframe :src="'https://player.vimeo.com/video/'+videoId+'#zoom=85&scrollbar=0&toolbar=0&navpanes=0'" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
							</div>
							<div class="user_dt5">
								<div class="user_dt_left">
									<div class="live_user_dt">
										<div class="user_img5">
											<img src="../assets/images/left-imgs/img-4.jpg" alt="">												
										</div>
										<div class="user_cntnt">
											<h4>Jassica William</h4>
											<button class="subscribe-btn">Subscribe</button>
										</div>
									</div>
								</div>
								<!-- <div class="user_dt_right">
									<ul>
										<li>
											<a href="#" class="lkcm152"><i class='uil uil-eye'></i><span>1452</span></a>
										</li>
										<li>
											<a href="#" class="lkcm152"><i class='uil uil-thumbs-up'></i><span>100</span></a>
										</li>
										<li>
											<a href="#" class="lkcm152"><i class='uil uil-thumbs-down'></i><span>20</span></a>
										</li>
										<li>
											<a href="#" class="lkcm152"><i class='uil uil-share-alt'></i><span>9</span></a>
										</li>
									</ul>
								</div> -->
							</div>
							
							
						</div>							
					</div>
					<div class="col-xl-4 col-lg-4">
						<div class="right_side">							
							<div class="fcrse_3">
								<div class="cater_ttle">
									<h4>Questions</h4>
								</div>
								<div class="live_chat">
									<div class="chat1" v-if="lectureQuestions==''">
										<div class="questionbox">
											<center>
												<p class="question">No questions asked on this lecture yet</p>
												<p class="question">Feel free to ask a question</p>
											</center>
										</div>
									</div>
									<div class="chat1" v-else>
										<div class="questionbox" v-for="l in lectureQuestions" :key="l">
											<p class="question"><a>{{l.user[0].firstName}} {{l.user[0].lastName}} </a>{{l.question}}</p>
											<p class="respond"><a>Answer</a>{{l.respond}}</p>
										</div>
									</div>
									<div class="questionbox" v-if="success">
										<p class="question" style="color: green">Your question was sent but no one can see it untill the instructor answers it</p>
									</div>
								</div>
								<div class="live_comment">
									<input class="live_input" type="text" placeholder="Ask a question" v-model="question" />
									<button class="btn_live" @click.prevent="askQuestion" :disabled="question==''"><i class='uil uil-message'></i></button>
								</div>
							</div>													
						</div>
					</div>
					<div class="col-md-12">
						<div class="section3125 mb-15 mt-20">
							<h4 class="item_title">Other lectures in section</h4>
							<a href="live_streams.html" class="see150">See all</a>
							<div class="la5lo1">
								<div class="live_stream owl-theme">
                                    <div class="scroll">
                                        <div class="item" v-for="lecture in otherLectures" :key="lecture">
                                            <div class="stream_1">
												<router-link :to="'/DlectureRoom/'+lecture._id">
                                                <a href="" class="stream_bg">
                                                    <img src="../assets/images/left-imgs/img-9.jpg" alt="">
                                                    <h4>{{lecture.title}}</h4>
                                                    <p>{{lecture.fileType}}<span></span></p>
                                                </a>
												</router-link>
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
	<!-- Body End -->
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
//import { createApp } from 'vue'

export default {
    name: 'DlectureRoom',
    data() {
        return{
            lectureId: '',
            lecture: '',
            next: '',
            previous: '',
            courseId: '',
			videoId: '',
			playlistId: '',
			otherLectures: '',
			lectureQuestions: '',
			userId: '',
			question: '',
			success: false,
			isPurchased: false
        }
	},
	watch: {
		$route() {
		// react to route changes...
			this.lectureId = this.$route.params.id
		
		},
 
		lectureId: function() {
      		this.recieve_lectures(this.lectureId)
        	.then(res => {
				this.lecture = res.data.lecture
				let l = this.lecture.uri+''
				let l1 = l.split('/')
				this.videoId = l1[2]
				this.next = res.data.nextLecture
				this.previous = res.data.previousLecture
				this.courseId = res.data.courseId
				this.playlistId = res.data.lecture.playlist[0]
				//console.log('top '+this.playlistId)
			})
			.catch(err => {
				console.log(err)
			})

			this.fetch_lecture_Questions(this.lectureId)
			.then(res => {
				this.lectureQuestions = res.data
				this.question = ''
				this.success= false
			})
    	}
	},
    components: {
		Dnav1,
		Dheader,
        Dfooter
    },
    computed: {
		...mapGetters(['isInstructor']),
		...mapGetters(['backEnd'])
    },
    methods: {
        ...mapActions(['fetchplaylistlectures','verify_course_payment']),
		...mapActions(['recieve_lectures']),
		...mapActions(['Ask_Question']),
		...mapActions(['fetch_lecture_Questions']),
		askQuestion(){
			let object = {
				user : this.userId,
				lecture : this.lectureId,
				course : this.courseId[0],
				question: this.question
			}
			this.Ask_Question(object)
			.then(res => {
				this.lectureQuestions = res.data
				this.question = ''
				this.success = true
			})
		}
    },  
    mounted(){
		this.lectureId = this.$route.params.id
		this.userId = localStorage.getItem('fmruser');
        //let user_id = localStorage.getItem('fmruser');
        "use strict";var tid=setInterval(function(){if("complete"===document.readyState){clearInterval(tid);var a=document.querySelector.bind(document),b=document.querySelector(".vertical_nav"),c=document.querySelector(".wrapper"),d=document.getElementById("js-menu"),e=d.querySelectorAll(".menu--item__has_sub_menu");a(".toggle_menu").onclick=function(){b.classList.toggle("vertical_nav__opened"),c.classList.toggle("toggle-content")},a(".collapse_menu").onclick=function(){b.classList.toggle("vertical_nav__minify"),c.classList.toggle("wrapper__minify");for(var a=0;a<e.length;a++)e[a].classList.remove("menu--subitens__opened")};for(var f=0;f<e.length;f++)e[f].classList.contains("menu--item__has_sub_menu")&&e[f].querySelector(".menu--link").addEventListener("click",function(a){for(var b=0;b<e.length;b++)a.target.offsetParent!=e[b]&&e[b].classList.remove("menu--subitens__opened");a.target.offsetParent.classList.toggle("menu--subitens__opened")},!1)}},100);
        this.recieve_lectures(this.lectureId)
        .then(res => {
            this.lecture = res.data.lecture
            let l = this.lecture.uri+''
            let l1 = l.split('/')
            this.videoId = l1[2]
            this.next = res.data.nextLecture
            this.previous = res.data.previousLecture
			this.courseId = res.data.courseId
			this.playlistId = res.data.lecture.playlist[0]
			//console.log('top '+this.playlistId)
			
			this.fetchplaylistlectures(this.playlistId)
			.then(res => {
				this.otherLectures = res.data
			})
			
			let userObject = {
				userId : this.userId,
				courseId : this.courseId
			}
			this.verify_course_payment(userObject)
			.then(res => {
				this.isPurchased = res.data.isPurchased
			})
        })
        .catch(err => {
            console.log(err)
		})
		
		this.fetch_lecture_Questions(this.lectureId)
		.then(res => {
			this.lectureQuestions = res.data
			console.log(res)
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
   
    .scroll{
		min-height: 200px;
		min-width: 1500px;
	}

	.live_stream{
		overflow: hidden;
	}

	.featured_courses{
		overflow: hidden;
	}

	.top_instrutors{
		overflow: hidden;
	}

	.Student_says{
		overflow: hidden;
	}

	.featured_courses .scroll{
		min-height: 200px;
		min-width: 3000px;
	}

	.top_instrutors .scroll{
		min-height: 200px;
		min-width: 3000px;
	}

	.Student_says .scroll{
		align-items: left;
		min-height: 200px;
		min-width: 3000px;
	}

	.item{
		width: 150px;
		display: inline-block;
		margin-left: 10px;
	}

	.featured_courses .item{
		width: 350px;
		display: inline-block;
		margin-left: 10px;
	}

	.top_instrutors .item{
		width: 350px;
		display: inline-block;
		margin-left: 10px;
	}

	.Student_says .item{
		width: 350px;
		display: inline-block;
		margin-left: 10px;
	}

	@media (max-width: 575.98px) {
		.live_stream{
			overflow-x: scroll
		}

		.featured_courses{
			overflow-x: scroll;
		}

		.top_instrutors{
			overflow-x: scroll;
		}

		.Student_says{
			overflow-x: scroll;
		}
	}

	.live_stream:hover{
		overflow-x: scroll
	}

	.featured_courses:hover{
		overflow-x: scroll;
	}

	.top_instrutors:hover{
		overflow-x: scroll;
	}

	.Student_says:hover{
		overflow-x: scroll;
	}

	.questionbox{
		width: 100%;
		min-height: 100px;
		padding: 2px;
		margin-bottom: 10px;
	}

	.question{
		width: 100%;
		font-size: 13px;
		line-height: 0.5cm;
		border-radius: 3px;
		margin-bottom: 3px;
	}

	.respond{
		padding-left: 3px;
		padding-right: 3px;
		padding-bottom: 3px;
		background-color: rgb(233, 88, 100);
		font-size: 12px;
		line-height: 0.5cm;
		width: 100%;
		margin-top: -2px;
		border-radius: 3px;
		color: white;
	}
	::-webkit-scrollbar {
        width: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
        border-radius: 10px;
    }
        
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: red; 
        border-radius: 10px;
    }

</style>
<template>
<div>
<!-- Header Start -->
	<header class="header clearfix">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="back_link">
						<a class="hde151" @click.prevent="endTest('submit')" >SUBMIT TEST</a>
						<a class="hde152">Question: <span>{{index+1}}</span></a>
					</div>			
					<div class="header_right pr-0">
						<div class="back_link">
						<a class="hde151" @click.prevent="endTest('cancel')" v-if="!end&&!alreadyEnded">CANCEL TEST</a>
						<a class="hde152" id="timeMobile" v-if="time>0||seconds>0">Time: <span>{{time}} : {{seconds}}</span></a>
                        <a class="hde152" style="background-color: red" v-else>TIME UP</a>
					</div>	
					</div>		
				</div>		
			</div>
		</div>
	</header>
	<!-- Header End -->
	<!-- Body Start -->
	<div class="wrapper _bg4586 _new89" >
		<div class="faq1256">
			<div class="container">
				<div class="row" >
                    <div class="bigrole">
                        <div class="smallrole" :style="'width: '+((index+1)/test.length)*100+'%'"></div>
                    </div>					
					<div class="col-lg-4 col-md-6 nonMobile">
						<div class="certi_form rght1528">
							<div class="test_timer_bg">
								<ul class="test_timer_left">
									<li>
										<div class="timer_time">
											<h4>{{index+1}}</h4>
											<p>Questions</p>
										</div>
									</li>
									<li>
										<div class="timer_time" v-if="time>0||seconds>0">
											<h4 id="timer">{{time}} : {{seconds}}</h4>
											<p>Minutes</p>
										</div>
                                        <div class="timer_time" v-else>
											<h4 style="background-color: red">TIME UP</h4>
											<p>Minutes</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-lg-7 col-md-6" v-if="!end&&!alreadyEnded">
						<div class="certi_form">
							<div class="all_ques_lest">
								<div class="ques_item">
									<div class="ques_title">
										<span>Ques {{index+1}} out of {{test.length}}</span>
										{{test[index].content}}
									</div>
									<div class="form">
										<div class="grouped fields">										
											<div class="field fltr-radio" v-for="o in test[index].options" :key="o">
												<div class="ui nonChoosen" :id="'div'+o._id" @click="choose(o._id)">
													<i class="fas fa-check-circle" :id="'i'+o._id" style="color: green; font-size: 20px; display: none"></i>
													<label style="color: white;"><strong>({{1+(test[index].options.indexOf(o))}})</strong>   {{o.content}}</label>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
                            <Loading v-if="Loading" />
							<button class="test_submit_btn" id="next" @click="next()" type="button" v-if="index+1<test.length">Next Question</button>
                            <button class="test_submit_btn" id="submit" type="button" v-else @click="endTest('submit')">Submit Test</button>
						</div>
					</div>
                    <div class="col-lg-7 col-md-6" v-else>
						<div class="certi_form">
							<div class="all_ques_lest">
								<div class="ques_item">
									<div class="ques_title">
										<span>THANKS FOR TAKING THIS TEST</span>
									</div>
									<div class="form">
										<div class="grouped fields">										
											<div class="field fltr-radio" >
												<div class="ui " >
													<label >Return to the course details for certification</label>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
                            <router-link :to="'/Dcoursedetail/'+courseId">
							<button class="test_submit_btn" id="next" type="button" v-if="courseId!=''">Back to Course Details</button>
                            </router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<footer class="footer mt-30">
			<div class="container">
				<div class="row">
					<div class="col-lg-3 col-md-3 col-sm-6">
						<div class="item_f3" >
							<a class="btn1542" style="margin: 10px" @click.prevent="endTest('submit')" v-if="!end&&!alreadyEnded">SUBMIT TEST</a>
                            <a class="btn1542" style="margin: 10px" @click.prevent="endTest('cancel')" v-if="!end&&!alreadyEnded">CANCEL TEST</a>
						</div>
					</div>
					<div class="col-lg-12">
						<div class="footer_bottm">
							<div class="row">
								<div class="col-md-6">
									<ul class="fotb_left">
										<li>
											<a >
												<div class="footer_logo">
													<img src="./assets/images/logo1.svg" alt="">
												</div>
											</a>
										</li>
										<li>
											<p>© 2020 <strong>Cursus</strong>. All Rights Reserved.</p>
										</li>
									</ul>
								</div>	
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
	<!-- Body End -->

</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
// import Errors from '@/components/Errors.vue'
// import Success from '@/components/Success.vue'
import Loading from '@/components/Loading.vue'
export default {
	name: 'Dhome',
	data() {
        return{
            testId : '',
            userId : '',
            encrypted: '',
            decrypted: '',
            time : '',
            result : '',
            started: '',
            index: 0,
            seconds: 60,
            test : [{content: '', options: [{content: '', _id: ''}]}],
            isCorrect: false,
            Loading: false,
            end: false,
            courseId: '',
            alreadyEnded: false
        }
    },
    components: {
		// Errors,
        // Success,
        Loading
	},
	watch: {
		circle: function () {
            if (this.circle == 'loading') {
                this.Loading = true
            }else{
                this.Loading = false
            }
        }
	},
	computed: {
        ...mapGetters(['circle']),
        ...mapGetters(['myTest']),
        ...mapGetters(['isdarkMode']),
    },
	methods: {
        //updates that i have not testest, when ever the user refreshes, the mount will run next funtion making user fail one question
        //after one minute the system saves test for time sake, i used stopwatch to do this
        ...mapActions(['manage_studentPreparedTest']),
        ...mapActions(['officially_StartTest']),
        ...mapActions(['manage_TestLogResults']),
        decode(string){
            //var encodedString = window.btoa( baseString ); // returns "bXktbmFtZS0x"
            var decodedString = window.atob( string );  // returns "my-name-1"
            var baseString = JSON.parse(decodedString);
            this.decrypted = baseString
        },
        encode(object){
            var baseString = JSON.stringify(object);
            var encodedString = window.btoa( baseString );
            //var decodedString = window.atob( encodedString );  // returns "my-name-1"
            return encodedString
        },
        choose(id){
            var uiDiv = document.getElementsByClassName('ui');
            var iClass = document.getElementsByClassName('fa-check-circle');
            for (let i = 0; i < uiDiv.length; i++) {
                const element = uiDiv[i];
                element.setAttribute('class', 'ui nonChoosen');
            }
            for (let i = 0; i < iClass.length; i++) {
                const element = iClass[i];
                element.style.display = 'none';
            }
            document.getElementById('div'+id).setAttribute('class', 'ui choosen');
            document.getElementById('i'+id).style.display = 'block'
            //marking now
            for (let i = 0; i < this.test[this.index].options.length; i++) {
                const element = this.test[this.index].options[i];
                if (element._id == id) {
                    if (element.isCorrect) {
                        this.isCorrect = true
                    }else{
                       this.isCorrect = false 
                    }
                }
            }
        },
        next(){
            if (this.isCorrect) {
                this.result++
            }
            if (!this.end) {
                this.saveTest()
            }
            if ((this.index+1)<this.test.length) {
                this.index = this.index + 1
            }
            this.isCorrect = false
        },
        submit(){
            if (this.isCorrect) {
                this.result++
            }
            this.isCorrect = false
        },
        saveTest(){
            let object = {
                time : this.time,
                seconds: this.seconds,
                result : this.result,
                started: this.started,
                index: this.index,
                testId: this.testId,
                test : this.test
            }
            this.manage_studentPreparedTest(this.encode(object))
        },
        runStopWatch(){
          setInterval(this.stopWatch, 1000);
        },
        stopWatch() {
            this.seconds = this.seconds - 1;
            if (this.seconds==0) {
                if (this.time>0) {
                    this.saveTest()
                    this.seconds = 60
                    this.time = this.time - 1
                }
            }
            if (this.time<=3&&this.time>0) {
                document.getElementById('timer').style.backgroundColor = 'red'
                document.getElementById('timeMobile').style.backgroundColor = 'red'
            }
            if (this.time==0&&this.seconds==0) {
                this.endTest('submit')
            }
        },
        manageDarkMode(){
			var wrap = document.getElementsByClassName('wrapper')
			if (this.isdarkMode) {
				document.body.setAttribute("class", "night-mode");
				wrap[0].setAttribute("class", "wrapper _bg4586 _new89 night-mode");
				wrap[0].style.paddingBottom = '50px';
			
			}else{
				document.body.setAttribute("class", "day");
				wrap[0].setAttribute("class", "wrapper _bg4586 _new89");
				wrap[0].style.paddingBottom = '50px';
			}
        },
        endTest(type){
            this.Loading = true
            if (this.isCorrect) {
                this.result++
            }
            let object = {
                user: this.userId, 
                test: this.testId, 
                result: this.result, 
                type: type
            }
            this.manage_TestLogResults(object)
            .then(res => {
                this.Loading = false
                this.courseId = res.data.courseId
                this.end=true
            })
        }

    },   
    mounted(){
        this.userId = localStorage.getItem('fmruser');
        this.decode(this.myTest)
        this.manageDarkMode()
        let object = {
            user: this.userId, 
            test: this.decrypted.testId,
            result: 0, 
            total: this.decrypted.test.length,
            completed: false, 
            canceled: false
        }
        this.officially_StartTest(object)
        .then(res=> {
            if (res.data.alreadyStarted) {
                this.next()
                if (res.data.test[0].completed||res.data.test[0].canceled) {
                    this.alreadyEnded = true
                } 
            }
        })
        this.test = this.decrypted.test
        this.time = this.decrypted.time
        this.result = this.decrypted.result
        this.started= true
        this.index= this.decrypted.index
        this.seconds= this.decrypted.seconds
		this.testId = this.decrypted.testId;
        this.runStopWatch()
        //window.addEventListener('blur', this.next())
        window.onblur = () => { this.next() }
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
	
	.nav-link{
		cursor: pointer;
	}

	.liked{
		background-color: yellowgreen;
	}

	.liking{
		width: 60px;
		height: 60px;
		display: inline-block;
		margin: 5px;
		padding-top: 10px;
	}

	.darkest{
		background-color: black;
		padding-top: 50px;
		padding-bottom: 50px;
		margin: 0px;
	}

    .choosen{
        border: 2px solid green;
        padding: 5px;
        border-radius: 5px;
    }
    .nonChoosen{
        border: 1px solid grey;
        padding: 5px;
        border-radius: 5px;
    }
    .bigrole{
        width: 100%;
        height: 3px;
        background-color: grey;
    }
    .smallrole{
        height: 100%;
        background-color: green;
    }
    @media only screen and (max-width: 600px) {
        .nonMobile {
            display: none;
        }
    }

</style>
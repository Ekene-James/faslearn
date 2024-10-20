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
        <div class="_215b17" style="margin-top: -50px">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="course_tab_content">
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-about" role="tabpanel">
                                    <div class="_htg451">	
                                        <div class="_htg452" v-if="testDetails.length!=0">
                                            <h3>Test Description</h3>
                                            <p>{{testDetails[0].description}}</p>
                                        </div>
                                        <div class="_htg452 mt-35" v-if="testDetails.length!=0">
                                            <h3>Maximum Time</h3>
                                            <span class="_abc123"></span>
                                            <p>{{testDetails[0].time}}</p>
                                        </div>
                                        <div class="_htgdrt mt-35">
                                            <h3>Rules For Test</h3>
                                            <div class="_scd123">
                                                <div class="row">
                                                    <div class="col-lg-6">
                                                        <ul class="_htg452 _abcd145">												
                                                            <li ><div class="_5f7g15"><i class="fas fa-check-circle" style="color: red"></i><span>You can not start any other test on FMR Academy if you have not finished or canceled this one</span></div></li>
                                                            <li ><div class="_5f7g15"><i class="fas fa-check-circle" style="color: red"></i><span>If you should cancel this test, you can not take it anymore</span></div></li>
                                                            <li ><div class="_5f7g15"><i class="fas fa-check-circle" style="color: red"></i><span>You can take the test in more than one sitting but you will fail the current question where you stop </span></div></li>
                                                            <li ><div class="_5f7g15"><i class="fas fa-check-circle" style="color: red"></i><span>If you refresh the page, or change tap, or minimize your browser, you will fail the current question</span></div></li>
                                                            <li ><div class="_5f7g15"><i class="fas fa-check-circle" style="color: red"></i><span>You should never try using the back button </span></div></li>
                                                            <li ><div class="_5f7g15"><i class="fas fa-check-circle" style="color: red"></i><span>You can not change the answer of a question after giving an answer </span></div></li>
                                                            <li ><div class="_5f7g15"><i class="fas fa-check-circle" style="color: red"></i><span>It is best if you take this test in one sitting as you loose upto two questions by leaving and coming back  </span></div></li>
                                                            <li ><div class="_5f7g15"><i class="fas fa-check-circle" style="color: red"></i><span>Your results will be displayed in your certificate</span></div></li>
                                                            <li ><div class="_5f7g15"><i class="fas fa-check-circle" style="color: red"></i><span>Please if you are not ready for all this do not click the Prepare test button </span></div></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Loading v-if="Loading"/>
                                        <br>
                                        <button class="subscribe-btn" v-if="testDetails.length!=0&&!canStart&&userTestStatus==''" @click.prevent="prepareTest()">Prepare my Test</button>
                                        <button class="subscribe-btn" v-if="canStart" @click.prevent="openTestInNewTap()">Start my Test</button>
                                        <button class="subscribe-btn" @click.prevent="openTestInNewTap()" v-if="userTestStatus=='hasStarted'">Resume Old Test</button>
                                        <!-- {{allValidQuestions}}					 -->
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
// import Errors from '@/components/Errors.vue'
// import Success from '@/components/Success.vue'
import Loading from '@/components/Loading.vue'
import Dheader from '@/components/dashboard/Header.vue'
import Dnav1 from '@/components/dashboard/Nav1.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
	name: 'Dhome',
	data() {
        return{
            courseId : '',
            userId : '',
            testDetails: '',
            canStart: false,
            Loading: false,
            test: '',
            allValidQuestions: [],
            allQuestions: '',
            randomNumbers: '',
            myQuestions: '',
            userTestStatus: ''
        }
    },
    components: {
        Dheader,
		Dnav1,
		Loading,
		// Errors,
		// Success,
        Dfooter
	},
	watch: {
		circle: function () {
            if (this.circle == 'loading') {
                this.Loading = true
            }else{
                this.Loading = false
            }
        },
        myTest: function () {
            this.canStart = true
        }
	},
	computed: {
		...mapGetters(['circle']),
        ...mapGetters(['myTest']),
        ...mapGetters(['frontEnd'])
    },
	methods: {
        ...mapActions(['fetch_TestForCourseDetails']),
        ...mapActions(['fetch_TestForStudentExamRoom']),
        ...mapActions(['manage_studentPreparedTest']),
        prepareTest(){
            this.Loading = true
            this.fetch_TestForStudentExamRoom(this.courseId)
            .then(res => {
                this.test = res.data[0]
                this.allQuestions = res.data[0].questions
                this.allValidQuestions = this.selectValidQuestions()
                this.randomNumbers = this.getRamdomQuestions(Math.round(this.getTotalQuestionsForStudent()), this.allValidQuestions.length)
                this.myQuestions = this.setStudentQuestions()
                this.saveTest()
                this.Loading = false
            })
        },
        getTotalQuestionsForStudent(){
            return (this.test.questionsPerStudent/100)*this.allValidQuestions.length;
        },
        selectValidQuestions(){
            let myquestions = []
            let isAnswerPresnt = false
            for (let i = 0; i < this.allQuestions.length; i++) {
                const element = this.allQuestions[i];
                if (!element.deleted) {
                    isAnswerPresnt = false
                    for (let j = 0; j < element.options.length; j++) {
                       const elementj = element.options[j];
                       if (elementj.isCorrect) {
                           isAnswerPresnt = true
                       }
                    }
                    if (isAnswerPresnt) {
                        myquestions.push(element) 
                    }
                    
                }
            }
            return myquestions
        },
        getRamdomQuestions(maxSize, maxNum){
            const nums = new Set();
            while(nums.size !== maxSize) {
                nums.add(Math.floor(Math.random() * maxNum) + 1);
            }
            return [...nums];
        },
        setStudentQuestions(){
            let myQuestions = []
            for (let i = 0; i < this.randomNumbers.length; i++) {
                const element = this.randomNumbers[i]-1;
                myQuestions.push(this.allValidQuestions[element])
            }
            return myQuestions
        },
        saveTest(){
            let object = {
                time : this.testDetails[0].time,
                seconds: 60,
                result : 0,
                started: false,
                index: 0,
                testId: this.testDetails[0]._id,
                test : this.myQuestions
            }
            this.manage_studentPreparedTest(this.encode(object))
        },
        encode(object){
            var baseString = JSON.stringify(object);
            var encodedString = window.btoa( baseString );
            //var decodedString = window.atob( encodedString );  // returns "my-name-1"
            return encodedString
        },
        openTestInNewTap(){
            window.open(this.frontEnd+'Dtestroom/test', '_blank');
        }
    },   
    mounted(){
		this.courseId = this.$route.params.id;
        this.userId = localStorage.getItem('fmruser');
        this.fetch_TestForCourseDetails(this.courseId)
        .then(res => {
            this.testDetails = res.data
            let myObject = {
                user : this.userId,
                test : this.testDetails[0]._id
            }
            this.checkIf_UserAlreadyStartedTest(myObject)
            .then(res=> {
                if (res.data.alreadyStarted) {
                    this.userTestStatus = 'hasStarted'
                    if (res.data.test[0].completed||res.data.test[0].canceled) {
                        this.userTestStatus = 'hasEnded'
                    } 
                }
            })
        })
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

</style>
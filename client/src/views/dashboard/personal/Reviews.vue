<template>
    <div>
        <Dheader />

        <Dnav2 />
        
        <div class="wrapper">
            <div class="sa4d25">
                <div class="container-fluid">			
                    <div class="row">
                        <div class="col-lg-12">	
                            <h2 class="st_title"><i class="uil uil-star"></i> All Review</h2>
                        </div>					
                    </div>				
                    <div class="row">
                        <div class="col-12">						
                            <div class="student_reviews">
                                <div class="row">
                                    <div class="col-lg-5">
                                        <div class="reviews_left">
                                            <h3>Student Feedback</h3>
                                            <div class="total_rating">
                                                <div class="_rate001">{{avrating}}</div>														
                                                <div class="rating-box">
                                                    <span class="rating-star" :class="avrating>0 ? 'full-star' : 'empty-star'"></span>
                                                    <span class="rating-star" :class="avrating>1&&avrating<2 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<2"></span>
                                                    <span class="rating-star" :class="avrating>1&&avrating>=2 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating>2"></span>

                                                    <span class="rating-star" :class="avrating>2&&avrating<3 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<3"></span>
                                                    <span class="rating-star" :class="avrating>2&&avrating>=3 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating>=3"></span>

                                                    <span class="rating-star" :class="avrating>3&&avrating<4 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<4"></span>
                                                    <span class="rating-star" :class="avrating>3&&avrating>=4 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating>=4"></span>

                                                    <span class="rating-star" :class="avrating>4&&avrating<5 ? 'half-star' : 'empty-star'" v-if="avrating>1&&avrating<5"></span>
                                                    <span class="rating-star" :class="avrating>4&&avrating==5 ? 'full-star' : 'empty-star'" v-if="avrating>1&&avrating==5"></span>
                                                </div>
                                                <div class="_rate002">Instructor Rating</div>	
                                            </div>
                                            <div class="_rate003">
                                                <div class="_rate004">
                                                    <div class="progress progress1">
                                                        <div class="progress-bar " :style="'width: '+five+'%; background-color: red'"></div>
                                                    </div>
                                                    <div class="rating-box">
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star full-star"></span>
                                                    </div>
                                                    <div class="_rate002">{{five}}%</div>
                                                </div>
                                                <div class="_rate004">
                                                    <div class="progress progress1">
                                                        <div class="progress-bar " :style="'width: '+four+'%; background-color: red'"></div>
                                                    </div>
                                                    <div class="rating-box">
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star empty-star"></span>
                                                    </div>
                                                    <div class="_rate002">{{four}}%</div>
                                                </div>
                                                <div class="_rate004">
                                                    <div class="progress progress1">
                                                        <div class="progress-bar " :style="'width: '+three+'%; background-color: red'"></div>
                                                    </div>
                                                    <div class="rating-box">
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star empty-star"></span>
                                                        <span class="rating-star empty-star"></span>
                                                    </div>
                                                    <div class="_rate002">{{three}}%</div>
                                                </div>
                                                <div class="_rate004">
                                                    <div class="progress progress1">
                                                        <div class="progress-bar " :style="'width: '+two+'%; background-color: red'"></div>
                                                    </div>
                                                    <div class="rating-box">
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star empty-star"></span>
                                                        <span class="rating-star empty-star"></span>
                                                        <span class="rating-star empty-star"></span>
                                                    </div>
                                                    <div class="_rate002">{{two}}%</div>
                                                </div>
                                                <div class="_rate004">
                                                    <div class="progress progress1">
                                                        <div class="progress-bar " :style="'width: '+one+'%; background-color: red'"></div>
                                                    </div>
                                                    <div class="rating-box">
                                                        <span class="rating-star full-star"></span>
                                                        <span class="rating-star empty-star"></span>
                                                        <span class="rating-star empty-star"></span>
                                                        <span class="rating-star empty-star"></span>
                                                        <span class="rating-star empty-star"></span>
                                                    </div>
                                                    <div class="_rate002">{{one}}%</div>
                                                </div>
                                            </div>
                                        </div>												
                                    </div>
                                    <div class="col-lg-7">
                                        <div class="review_right">
                                            <div class="review_right_heading">
                                                <h3>Reviews</h3>
                                            </div>
                                        </div>
                                        <div class="review_all120">
                                            <div class="review_item" v-for="v in reviews" :key="v">
                                                <div class="review_usr_dt">
                                                    <img src="../assets/images/left-imgs/img-2.jpg" alt="">
                                                    <div class="rv1458">
                                                        <h4 class="tutor_name1">{{v.user[0].firstName}} {{v.user[0].lastName}}</h4>
                                                        <span class="time_145">{{v.createdAt}}</span>
                                                    </div>
                                                </div>
                                                <div class="rating-box mt-20">
                                                    <span class="rating-star" :class="v.star>0 ? 'full-star' : 'empty-star'"></span>
                                                    <span class="rating-star" :class="v.star>1 ? 'full-star' : 'empty-star'"></span>
                                                    <span class="rating-star" :class="v.star>2 ? 'full-star' : 'empty-star'"></span>
                                                    <span class="rating-star" :class="v.star>3 ? 'full-star' : 'empty-star'"></span>
                                                    <span class="rating-star" :class="v.star>4 ? 'full-star' : 'empty-star'"></span>
                                                </div>
                                                <p class="rvds10">{{v.reviewMessage}}</p>
                                                <!-- <div class="rpt100">
                                                    <span>Was this review helpful?</span>
                                                    <div class="radio--group-inline-container">
                                                        <div class="radio-item">
                                                            <input id="radio-3" name="radio1" type="radio">
                                                            <label for="radio-3" class="radio-label">Yes</label>
                                                        </div>
                                                        <div class="radio-item">
                                                            <input id="radio-4" name="radio1" type="radio">
                                                            <label  for="radio-4" class="radio-label">No</label>
                                                        </div>
                                                    </div>
                                                    <a href="#" class="report145">Report</a>
                                                </div> -->
                                            </div>
                                            <br><br>
                                            <div class="review_item">
                                                <a href="#" class="more_reviews">See More Reviews</a>
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
import { mapActions } from 'vuex'
import Dheader from '@/components/dashboard/Header.vue'
import Dnav2 from '@/components/dashboard/Nav2.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
export default {
    name: 'Dhome',
    data() {
        return {
            reviews: '',
			stars: '',
			one: '',
			two: '',
			three: '',
			four: '',
			five: '',
			avrating: '',
            allLikes: '',
        }
    },
    components: {
        Dheader,
        Dnav2,
        Dfooter
    },
    methods: {
        ...mapActions(['checkIf_UserAlreadyReviewedAndFetchAll']),
        checkStar(star){
			let total = 0;
			let answer = 0;
			if (this.stars.length == 0) {
				answer = 0;
			}else{
				for (let i = 0; i < this.stars.length; i++) {
					const element = this.stars[i];
					if (element.star == star) {
						total++;
					}
				}
				
				answer = (total/this.stars.length)*100;
			}
			return answer.toFixed(1);
		},
		checkAveageStar(){
			let total = 0;
			let answer = 0;
			if (this.stars.length == 0) {
				answer = 0;
			}else{
				for (let i = 0; i < this.stars.length; i++) {
					const element = this.stars[i];
					total = element.star + total
				}
				answer = total/this.stars.length;
			}
			return answer.toFixed(1);
		},
		countlikes(){
			let total = { like : 0, dislike : 0};
			for (let i = 0; i < this.stars.length; i++) {
				const element = this.stars[i];
				if (element.like == 1) {
					total.like++
				}else{
					total.dislike++
				}
			}
			return total;
        },
    },  
    mounted(){
        let reviewObject= {
            user : localStorage.getItem('fmruser'), 
            id : localStorage.getItem('fmruser'),
            type : 'instructor'
        }
        this.checkIf_UserAlreadyReviewedAndFetchAll(reviewObject)
        .then(res => {
            this.alreadyReviewed = res.data.alreadyReviewed
            this.reviews = res.data.Reviews
            this.stars = res.data.stars
            this.one = this.checkStar(1)
            this.two = this.checkStar(2)
            this.three = this.checkStar(3)
            this.four = this.checkStar(4)
            this.five = this.checkStar(5)
            this.avrating = this.checkAveageStar()
            this.allLikes = this.countlikes()
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

</style>
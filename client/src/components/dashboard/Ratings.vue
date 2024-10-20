<template>
    <div class="crse_reviews">
        <i class='uil uil-star'></i>{{avrating}} 
        <i class='uil uil-thumbs-up'></i>{{allLikes.like}}
    </div>										
</template>
<script>
import { mapActions } from "vuex";
export default {
    name: 'Rating',
	props: {
        id: String,
        type: String,
        like: Boolean
    },
    data(){
		return{
            alreadyReviewed: true,
            reviews: '',
            stars: '',
            avrating: '',
            allLikes: '',
        }
    },
    methods: {
		...mapActions(['fetchReviewedPublic']),
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
        fetchingReviews(type){
            let reviewObject= { 
				id : this.id,
				type : type
			}
			this.fetchReviewedPublic(reviewObject)
			.then(res => {
				this.alreadyReviewed = res.data.alreadyReviewed
				this.reviews = res.data.Reviews
				this.stars = res.data.stars
                this.avrating = this.checkAveageStar()
                this.allLikes = this.countlikes()
			})
        }
    },
    mounted(){
        this.fetchingReviews(this.type)
    }
}
</script>
<style >

</style>
<template>
    <div class="rating">
        <i class="icon_star" :class="{ voted: avrating>0||avrating==1 }"></i>
        <i class="icon_star" :class="{ voted: avrating>1||avrating==2 }"></i>
        <i class="icon_star" :class="{ voted: avrating>2||avrating==3 }"></i>
        <i class="icon_star" :class="{ voted: avrating>3||avrating==4 }"></i>
        <i class="icon_star" :class="{ voted: avrating>4||avrating==5 }"></i>
        <small>  Based on {{stars.length}} reviews (<i class="icon_like"></i> {{allLikes.like}})</small>
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
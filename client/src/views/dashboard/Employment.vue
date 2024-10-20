<template>

<div id="admission_bg">
    <div id="form_container" class="clearfix">
		<figure>
			<a href=""><img src="img/logo.png" width="149" height="42" alt=""></a>
		</figure>
		<div id="wizard_container">
			<div id="top-wizard">
				<div id="progressbar"></div>
			</div>
			<!-- /top-wizard -->
			<form name="example-1" id="wrapped" method="POST">
				<input id="website" name="website" type="text" value="">
				<!-- Leave for security protection, read docs for details -->
				<div id="middle-wizard">
					<div class="step">
						<div id="intro" v-if="isInstructor">
							<strong style="color: black">Affiliate Instructor Apply</strong>
							<figure><img src="./assets/images/verified-account.svg" width="150" height="152" alt=""></figure>
                            <h4>Terms</h4>
                            <ul>
                                <li>On every course affiliated to this institution, this institution will allowed to sell to its students</li>
                                <li>On every course affiliated to this institution, payment will be split 50/50 with this institution</li>
                            </ul>
							<i ><b>NB</b> when you hit apply button we give the institution all your credentials for employment process</i>
						</div>
					</div>
					<Errors v-if="!isInstructor">
						<ul><li>Sorry you need to be an instructor on FMR agency to apply for affiliate instructor</li></ul>
					</Errors>
					<Success v-if="success">Application Successful, we do hope the institution likes what they see, we will notify you if Employment was granted</Success>
		
					<!-- /step-->
				</div>
				<Loading v-if="Loading" />
				<!-- /middle-wizard -->
				<div id="bottom-wizard">
					<router-link :to="'/Dprofile/'+userId">
					<button type="button" name="backward" class="backward" v-if="!isInstructor">Back to Profile </button>
					</router-link>
					<!-- <button type="button" name="forward" class="forward" v-if="canProceed">Forward</button> -->
					<button type="button" name="process" class="submit" v-if="isInstructor&&!success&&!alreadyApplied" @click="apply()">Apply</button>
					<button type="button" class="submit" v-if="alreadyApplied" >You Already Applied</button>
				</div>
				<!-- /bottom-wizard -->
			</form>
		</div>
		<!-- /Wizard container -->
	</div>
	<!-- /Form_container -->
</div>
    
</template>
<script>
import Errors from "@/components/Errors";
import Loading from "@/components/Loading";
import Success from "@/components/Success";
import { mapGetters,mapActions } from "vuex";
export default {
	name: 'Admission',
	data(){
		return{
			institutionId : '',
			userId: '',
			error: '',
			success: '',
			alreadyApplied: false,
			Loading: false
		}
	},
	components: {
		Errors,
		Success,
		Loading
	},
	computed: {
        ...mapGetters(['credentials']),
        ...mapGetters(['isInstructor'])
	},
	methods:{
        ...mapActions(['apply_ForEmployment']),
        ...mapActions(['check_IsLecturerAppllied']),
		apply(){
			this.Loading = true
			let object = {
				userId : this.userId,
				institutionId : this.institutionId
			}
			this.apply_ForEmployment(object)
			.then(res => {
				if (res.data.isJobApplied) {
					this.success = true
				}
				this.Loading = false
			})
		}
	},
    mounted(){
		this.institutionId = this.$route.params.id;
		this.userId = localStorage.getItem('fmruser');

		let object = {
			institutionId : this.institutionId,
			userId : this.userId
        }
        this.check_IsLecturerAppllied(object)
        .then(res => {
            this.alreadyApplied = res.data.isLecture
        })
    }
}
</script>
<style >

</style>
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
						<div id="intro">
							<strong style="color: black">Admission Apply</strong>
							<figure><img src="img/wizard_intro_icon.svg" alt=""></figure>
							<p v-if="canProceed">We have gone through your credentials and we think you are qualified to apply for admission</p>
							<figure v-if="canProceed&&!success"><img src="./assets/images/verified-account.svg" width="150" height="152" alt=""></figure>
							<i v-if="canProceed&&!success"><b>NB</b> when you hit apply button we give the institution all your credentials for admission process</i>
							<p v-if="!canProceed">Sorry you need to upload your details before you seek admission on any institution as this institution may need this information for the admission process</p>
						</div>
					</div>
					<Errors v-if="!canProceed">
						<p style="margin: 0px">The credentials you need for this are</p>
						<ul><li v-for="e in error" :key="e">>>{{e}}</li></ul>
						<p style="margin: 0px">Click on back to profile, then edit profile, then upload the credentials needed</p>
					</Errors>
					<Success v-if="success">Application Successful, we do hope the institution likes what they see, we will notify you if admission was granted</Success>
		
					<!-- /step-->
				</div>
				<Loading v-if="Loading" />
				<!-- /middle-wizard -->
				<div id="bottom-wizard">
					<router-link :to="'/Dprofile/'+userId">
					<button type="button" name="backward" class="backward" v-if="!canProceed">Back to Profile </button>
					</router-link>
					<!-- <button type="button" name="forward" class="forward" v-if="canProceed">Forward</button> -->
					<button type="button" name="process" class="submit" v-if="canProceed&&!success&&!alreadyApplied" @click="apply()">Apply</button>
					<button type="button" class="submit" v-if="alreadyApplied" >You Already Applied</button>
				</div>
				<!-- /bottom-wizard -->
			</form>
		</div>
		<!-- /Wizard container -->
	</div>
	<!-- /Form_container -->

	<!-- Modal terms -->
	<div class="modal fade" id="terms-txt" tabindex="-1" role="dialog" aria-labelledby="termsLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="termsLabel">Terms and conditions</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<p>Lorem ipsum dolor sit amet, in porro albucius qui, in <strong>nec quod novum accumsan</strong>, mei ludus tamquam dolores id. No sit debitis meliore postulant, per ex prompta alterum sanctus, pro ne quod dicunt sensibus.</p>
					<p>Lorem ipsum dolor sit amet, in porro albucius qui, in nec quod novum accumsan, mei ludus tamquam dolores id. No sit debitis meliore postulant, per ex prompta alterum sanctus, pro ne quod dicunt sensibus. Lorem ipsum dolor sit amet, <strong>in porro albucius qui</strong>, in nec quod novum accumsan, mei ludus tamquam dolores id. No sit debitis meliore postulant, per ex prompta alterum sanctus, pro ne quod dicunt sensibus.</p>
					<p>Lorem ipsum dolor sit amet, in porro albucius qui, in nec quod novum accumsan, mei ludus tamquam dolores id. No sit debitis meliore postulant, per ex prompta alterum sanctus, pro ne quod dicunt sensibus.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn_1" data-dismiss="modal">Close</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
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
			canProceed: false,
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
		...mapGetters(['credentials'])
	},
	methods:{
		...mapActions(['apply_for_Admission']),
		...mapActions(['check_IsUserInstitutionStudent']),
		apply(){
			this.Loading = true
			let object = {
				userId : this.userId,
				institutionId : this.institutionId
			}
			this.apply_for_Admission(object)
			.then(res => {
				if (res.status==200) {
					this.success = true
				}
				this.success = true
				this.Loading = false
			})
		},
		checkCredentials(){
			let file = this.credentials;
			let flag = true;
			let error = []
			if(file.Olevel == false){
				flag=false;
				error.push('Olevel certificate')
			}
			if(file.image == false){
				flag=false;
				error.push('Profile picture')
			}
			if(file.bio == false){
				flag=false;
				error.push('About you(BIO)')
			}
			if (flag == true) {
				return true
			}else{
				this.error = error;
				return false
			}
		}
	},
    mounted(){
		this.institutionId = this.$route.params.id;
		this.userId = localStorage.getItem('fmruser');
		if (this.checkCredentials()) {
			this.canProceed = true
		}

		let object = {
			institutionId : this.institutionId,
			userId : this.userId
		}
		this.check_IsUserInstitutionStudent(object)
		.then(res => {
			this.alreadyApplied = res.data.isStudent
		})
    }
}
</script>
<style >

</style>
<template>
<nav class="vertical_nav">
	<div class="left_section menu_left" id="js-menu" >
		<div class="left_section">
			<br>
			<hr>
			<ul>
				<router-link to="/Dhome">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dhome'}" title="Dashboard">
						<i class="uil uil-apps menu--icon"></i>
						<span class="menu--label">Dashboard</span>
					</a>
				</li>
				</router-link>
				<router-link to="/Dcourses">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dcourses'}" title="Courses">
						<i class='uil uil-book-alt menu--icon'></i>
						<span class="menu--label">Courses</span>
					</a>
				</li>
				</router-link>
				<!-- <router-link to="/Danalysis">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Danalysis'}" title="Analyics">
						<i class='uil uil-analysis menu--icon'></i>
						<span class="menu--label">Analyics</span>
					</a>
				</li>
				</router-link> -->
				<router-link to="/Dnewcourse">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dnewcourse'}" title="Create Course">
						<i class='uil uil-plus-circle menu--icon'></i>
						<span class="menu--label">Create Course</span>
					</a>
				</li>
				</router-link>
				<router-link to="/Dmessage/e">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dmessage'}" title="Messages">
						<i class='uil uil-comments menu--icon'></i>
						<span class="menu--label">Messages</span>
					</a>
				</li>
				</router-link>
				<router-link to="/Dnotification">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dnotification'}" title="Notifications">
						<i class='uil uil-bell menu--icon'></i>
						<span class="menu--label">Notifications</span>
					</a>
				</li>
				</router-link>
				<router-link to="/Dcertificate">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dcertificate'}" title="My Certificates">
						<i class='uil uil-award menu--icon'></i>
						<span class="menu--label">My Certificates</span>
					</a>
				</li>
				</router-link>
				<router-link to="/Dreviews">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dreviews'}" title="Reviews">
						<i class='uil uil-star menu--icon'></i>
						<span class="menu--label">Reviews</span>
					</a>
				</li>
				</router-link>
				<router-link to="/Dearning">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dearning'}" title="Earning">
						<i class='uil uil-dollar-sign menu--icon'></i>
						<span class="menu--label">Earning</span>
					</a>
				</li>
				</router-link>
				<router-link to="/Dpayout">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dpayout'}" title="Payout">
						<i class='uil uil-wallet menu--icon'></i>
						<span class="menu--label">Payout</span>
					</a>
				</li>
				</router-link>
				<!-- <router-link to="/Dstatements">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dstatements'}" title="Statements">
						<i class='uil uil-file-alt menu--icon'></i>
						<span class="menu--label">Statements</span>
					</a>
				</li>
				</router-link> -->
			</ul>
		</div>
		<div class="left_section pt-2" v-if="isAdmin||isInstructor">
			<ul>
				<!-- <router-link to="/Dverification">
				<li class="menu--item" v-if="isInstructor">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dverification'}" title="Verification">
						<i class='uil uil-check-circle menu--icon'></i>
						<span class="menu--label">Verification</span>
					</a>
				</li>
				</router-link> -->
				<router-link to="/DmanageAdmission/e">
				<li class="menu--item" v-if="isAdmin">
					<a href="" class="menu--link" v-bind:class="{active: page=='DmanageAdmission'}" title="Verification">
						<i class='uil uil-check-circle menu--icon'></i>
						<span class="menu--label">Admissions</span>
					</a>
				</li>
				</router-link>
				<router-link to="/DmanageEmployment/e">
				<li class="menu--item" v-if="isAdmin">
					<a href="" class="menu--link" v-bind:class="{active: page=='DmanageEmployment'}" title="Verification">
						<i class='uil uil-check-circle menu--icon'></i>
						<span class="menu--label">Employments</span>
					</a>
				</li>
				</router-link>
			</ul>
		</div>
		<div class="left_section pt-2">
			<ul>
				<router-link :to="'/Dsettings'">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dsettings'}" title="Setting">
						<i class='uil uil-cog menu--icon'></i>
						<span class="menu--label">Setting</span>
					</a>
				</li>
				</router-link>
				<router-link :to="'/Dhelp'">
				<li class="menu--item" >
					<a href="" class="menu--link" v-bind:class="{active: page=='Dhelp'}" title="Help">
						<i class='uil uil-question-circle menu--icon'></i>
						<span class="menu--label">Help</span>
					</a>
				</li>
				</router-link>
				<router-link :to="'/Dfeedback'">
				<li class="menu--item" >
					<a href="" class="menu--link" v-bind:class="{active: page=='Dfeedback'}" title="Send Feedback">
						<i class='uil uil-comment-alt-exclamation menu--icon'></i>
						<span class="menu--label">Send Feedback</span>
					</a>
				</li>
				</router-link>
			</ul>
		</div>
	</div>
</nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	name: 'Dnav2',
	data(){
		return {
			home: false,
			page: '',
			user_id: ''
		}
	},
	computed: {
		...mapGetters(['isInstructor']),
		...mapGetters(['isAdmin'])
	},
	created() {
		var currentUrl = window.location.pathname+'';
		this.page = currentUrl.split('/')[1]
		this.user_id = localStorage.getItem('fmruser');
	},
}
</script>
<style>

</style>
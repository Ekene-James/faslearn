<template>
<nav class="vertical_nav">
	<div class="left_section menu_left" id="js-menu" >
		<div class="left_section">
			<br>
			<hr>
			<ul>
				<router-link to="/dashboard">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='dashboard'}" title="Home">
						<i class='uil uil-home-alt menu--icon'></i>
						<span class="menu--label">Home</span>
					</a>
				</li>
				</router-link>
				<router-link :to="'/Dprofile/'+user_id">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dprofile'}" title="Live Streams">
						<i class='uil uil-smile-beam menu--icon'></i>
						<span class="menu--label">Profile</span>
					</a>
				</li>
				</router-link>
				<router-link :to="'/Dexplore'">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dexplore'}" title="Explore">
						<i class='uil uil-search menu--icon'></i>
						<span class="menu--label">Explore</span>
					</a>
				</li>
				</router-link>
				<router-link :to="'/Dteachers/e'">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dteachers'}" title="Dteachers">
						<i class='uil uil-nerd menu--icon'></i>
						<span class="menu--label">Instructors</span>
					</a>
				</li>
				</router-link>
				<router-link :to="'/Dallcourses/e'">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dallcourses'}" title="Dallcourses">
						<i class='uil uil-book-alt menu--icon'></i>
						<span class="menu--label">Courses</span>
					</a>
				</li>
				</router-link>
				<!-- <li class="menu--item  menu--item__has_sub_menu">
					<label class="menu--link" title="Tests">
						<i class='uil uil-clipboard-alt menu--icon'></i>
						<span class="menu--label">Categories</span>
					</label>
					<ul class="sub_menu">
						<router-link :to="'/Dallcourses/Development'">
						<li><a href="#" class="ct_item" ><i class='uil uil-arrow'></i>Development</a></li>
						</router-link>
						<router-link :to="'/Dallcourses/Business'">    
						<li><a href="#" class="ct_item" ><i class='uil uil-graph-bar'></i>Business</a></li>
						</router-link>
						<router-link :to="'/Dallcourses/IT'">    
						<li><a href="#" class="ct_item" ><i class='uil uil-monitor'></i>IT and Software</a></li>
						</router-link>
						<router-link :to="'/Dallcourses/Design'">    
						<li><a href="#" class="ct_item" ><i class='uil uil-ruler'></i>Design</a></li>
						</router-link>
						<router-link :to="'/Dallcourses/Marketing'">    
						<li><a href="#" class="ct_item" ><i class='uil uil-chart-line'></i>Marketing</a></li>
						</router-link>
						<router-link :to="'/Dallcourses/Personal'">    
						<li><a href="#" class="ct_item" ><i class='uil uil-book-open'></i>Personal Development</a></li>
						</router-link>
						<router-link :to="'/Dallcourses/Photography'">    
						<li><a href="#" class="ct_item"  ><i class='uil uil-camera'></i>Photography</a></li>
						</router-link>
						<router-link :to="'/Dallcourses/Music'">    
						<li><a href="#" class="ct_item"  ><i class='uil uil-music'></i>Music</a></li>
						</router-link>
					</ul>
				</li> -->
				<router-link :to="'/Dallinstitutions'">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dallinstitutions'}" title="Saved Courses">
						<i class="uil uil-bell-school menu--icon"></i>
						<span class="menu--label">Institutions</span>
					</a>
				</li>
				</router-link>
				<router-link :to="'/Dinstitude/'+adminDetails[0]._id" v-if="adminDetails!=''&&adminDetails!=null">
				<li class="menu--item">
					<a href="" class="menu--link" v-bind:class="{active: page=='Dinstitude'}" title="My Institution">
						<i class="uil uil-bag menu--icon"></i>
						<span class="menu--label">{{adminDetails[0].institutionName}}</span>
					</a>
				</li>
				</router-link>
				<li class="menu--item  " v-if="subscribtion!=''">
					<label class="menu--link" title="Pages" @click="setFocus('subscribtion')">
						<i class='uil uil-angle-right menu--icon'></i>
						<span class="menu--label">Subscribtion</span>
					</label>
					<ul class="sub_menu" style="display: block" v-if="focus=='subscribtion'">
						<router-link :to="'/Dprofile/'+s.instructorUserId[0]._id" v-for="s in subscribtion" :key="s">
						<li class="sub_menu--item active" >
							<a href="" class="sub_menu--link">{{s.instructorUserId[0].firstName}}</a>
						</li>
						</router-link>
					</ul>
				</li>
				<li class="menu--item  " v-if="admission!=''">
					<label class="menu--link" title="Pages" @click="setFocus('admission')">
						<i class='uil uil-angle-right menu--icon'></i>
						<span class="menu--label">Admission</span>
					</label>
					<ul class="sub_menu" style="display: block" v-if="focus=='admission'">
						<router-link :to="'/Dinstitude/'+a.institutionId[0]._id" v-for="a in admission" :key="a">
						<li class="sub_menu--item active" >
							<a href="" class="sub_menu--link">{{a.institutionId[0].institutionName}}</a>
						</li>
						</router-link>
					</ul>
				</li>
			</ul>
		</div>
		<div class="left_section">
			<ul>
				<router-link :to="'/Dhome'">
				<li class="menu--item">
					<a href="" class="menu--link" title="Browse Instructors">
						<i class='uil uil-apps menu--icon'></i>
						<span class="menu--label">WORK SPACE</span>
					</a>
				</li>
				</router-link>
			</ul>
		</div>
		<div class="night_mode_switch__btn">
			<a id="night-mode" class="btn-night-mode">
				<i class="uil uil-moon"></i> Night mode
				<span class="btn-night-mode-switch" @click="toggleDarkMode">
					<span class="uk-switch-button"></span>
				</span>
			</a>
		</div>
		<div class="left_section pt-2">
			<ul>
				<router-link :to="'/Dsettings'">
				<li class="menu--item" >
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
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'Dnav1',
	data(){
		return {
			home: false,
			page: '',
			user_id: '',
			admission: '',
			subscribtion: '',
			focus : '',
		}
	},
	methods: {
		...mapActions(['toggle_DarkMode']),
		...mapActions(['fetch_user','check_user_admin']),
		toggleDarkMode(){
			this.toggle_DarkMode()
		},
		setFocus(value){
			if (this.focus==value) {
				this.focus = ''
			}else{
				this.focus= value
			}
			
		}
	},
	computed: {
		...mapGetters(['adminDetails'])
	},
	created() {
		var currentUrl = window.location.pathname+'';
		this.page = currentUrl.split('/')[1]
		this.user_id = localStorage.getItem('fmruser');
		
	},
	mounted(){
		this.fetch_user(localStorage.getItem('fmruser'))
        .then(res => {
			this.admission = res.data.user.admission
			this.subscribtion = res.data.user.subscribtion
		})
	}
} 
</script>
<style scoped>
	/* .active{
		background-color: tomato;
	} */
	.logo{
		height: 100px; width: 150px;
		margin-left: 20px;
		margin-top: -20px;
		display: inline-block;
	}
</style>


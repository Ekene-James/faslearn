
<template>
    <header class="header clearfix">
		<button type="button" id="toggleMenu" class="toggle_menu">
		  <i class='uil uil-bars' style="height: 0px; margin-top: -30px"></i>
		</button>
		<button id="collapse_menu" class="collapse_menu">
			<i class="uil uil-bars collapse_menu--icon "></i>
			<span class="collapse_menu--label"></span>
		</button>
		<div class="main_logo" id="logo">
			<!-- <a href="/"><img class="logo-inverse" src="../../assets/flogo.png" width="150" height="150" alt="" style="height: 100px; width:"></a> -->
			<a href="/"><img  src="../../assets/faslearnBlack.png" class="logo"  alt="" v-if="loading!='loading'"></a>
			<a href="/"><img class="logo-inverse logo"  src="../../assets/faslearnWhite.png"  alt="" v-if="loading!='loading'"></a>
			<div class="bigspinner" v-if="loading=='loading'">
				<div class="smallspiner">
					
				</div>
			</div>
		</div>
		<div class="search120" >
			<router-link to="/Dexplore">
			<div class="ui search">
			  <div class="ui left icon input swdh10">
				<input class="prompt srch10" type="text" placeholder="Search for Tuts Videos, Tutors, Tests and more..">
				<i class='uil uil-search-alt icon icon1'></i>
			  </div>
			</div>
			</router-link >
		</div>
		<div class="header_right">
			<ul>
				<li class="ui dropdown" style="">
					<a href="/" class="upload_btn">Site View</a>
					<router-link to="/dashboard">
					<a class="option_links"><i class='uil uil-home-alt'></i><!--<span class="noti_count"></span>--></a>
					</router-link>
					<router-link to="/Dmessage/e">
					<a class="option_links"><i class='uil uil-envelope-alt'></i><span class="noti_count">{{questions}}</span></a>
					</router-link>
				</li>
				<li class="ui dropdown">
					<router-link to="/Dnotification">
					<a class="option_links"><i class='uil uil-bell'></i><span class="noti_count">{{notifications}}</span></a>
					</router-link>
				</li>
				<li class="ui dropdown">
					<router-link to="/Dhome">
					<a class="option_links"><i class='uil uil-apps menu--icon'></i></a>
					</router-link>
					<!-- <a href="#" class="opts_account">
						<img src="assets/images/hd_dp.jpg" alt="">
					</a> -->
				</li>
			</ul>
		</div>
	</header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'Dheader',
	data(){
        return{
			loading: '',
			userId: '',
			notifications: '',
			questions: ''
        }
    },
	watch: {
        circle: function () {
            this.loading = this.circle
        },
        loader: function () {
			this.loading = this.loader
		},
		adminLoader: function () {
			this.loading = this.adminLoader
		},
		authLoader: function () {
			this.loading = this.authLoader
		},
		isdarkMode: function () {
			this.manageDarkMode()
		}
    },
    computed: {
		...mapGetters(['circle']),
		...mapGetters(['loader']),
		...mapGetters(['adminLoader']),
		...mapGetters(['isdarkMode']),
		...mapGetters(['authLoader'])
    },
	methods:{
		...mapActions(['check_user_instructor']),
		...mapActions(['check_user_admin']),
		...mapActions(['count_UnseenQuestions']),
		...mapActions(['count_UnseenNotifications']),
		manageDarkMode(){
			var wrap = document.getElementsByClassName('wrapper')
			var pro = document.getElementsByClassName('_215b17')
			var proll = document.getElementsByClassName('_215b15')
			if (this.isdarkMode) {
				document.body.setAttribute("class", "night-mode");
				wrap[0].setAttribute("class", "wrapper night-mode");
				wrap[0].style.paddingBottom = '50px';
				
				for (let i = 0; i < pro.length; i++) {
					const element = pro[i];
					element.setAttribute("class", "_215b17 darkest");
				}

				for (let i = 0; i < proll.length; i++) {
					const element = proll[i];
					element.setAttribute("class", "_215b15 darkest");
				}
			}else{
				document.body.setAttribute("class", "day");
				wrap[0].setAttribute("class", "wrapper");
				wrap[0].style.paddingBottom = '50px';
				
				for (let i = 0; i < pro.length; i++) {
					const element = pro[i];
					element.setAttribute("class", "_215b17");
				}

				for (let i = 0; i < proll.length; i++) {
					const element = proll[i];
					element.setAttribute("class", "_215b15");
				}
				
			}
		}
	},
	mounted(){
		"use strict";var tid=setInterval(function(){if("complete"===document.readyState){clearInterval(tid);var a=document.querySelector.bind(document),b=document.querySelector(".vertical_nav"),c=document.querySelector(".wrapper"),d=document.getElementById("js-menu"),e=d.querySelectorAll(".menu--item__has_sub_menu");a(".toggle_menu").onclick=function(){b.classList.toggle("vertical_nav__opened"),c.classList.toggle("toggle-content")},a(".collapse_menu").onclick=function(){b.classList.toggle("vertical_nav__minify"),c.classList.toggle("wrapper__minify");for(var a=0;a<e.length;a++)e[a].classList.remove("menu--subitens__opened")};for(var f=0;f<e.length;f++)e[f].classList.contains("menu--item__has_sub_menu")&&e[f].querySelector(".menu--link").addEventListener("click",function(a){for(var b=0;b<e.length;b++)a.target.offsetParent!=e[b]&&e[b].classList.remove("menu--subitens__opened");a.target.offsetParent.classList.toggle("menu--subitens__opened")},!1)}},100);
		
        this.userId = localStorage.getItem('fmruser');
		this.check_user_instructor(this.userId)
		this.check_user_admin(this.userId)
		this.count_UnseenNotifications(this.userId)
		.then(res => {
			this.notifications = res.data
		})
		this.count_UnseenQuestions(this.userId)
		.then(res => {
			this.questions = res.data.asInstructor + res.data.asStudent
		})
		this.manageDarkMode()
	}
}
</script>
<style>
	h3{
        color: red;
        margin-top: -10px;
    }
    .logo{
		height: 60px; width: 200px;
		display: inline-block;
	}
    .bigspinner{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        border-top: 5px solid grey;
        display: inline-block;
        animation-name: spin;
        animation-duration: 3000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
    }

    .smallspiner{
        height: 30px;
        width: 30px;
        margin: 5px;
        border-radius: 50%;
        border-top: 5px solid grey;
        animation-name: spin;
        animation-duration: 2000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }


    @keyframes spin{
        from {
        transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
</style>
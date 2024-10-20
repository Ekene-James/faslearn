<template>
    <div>
        <Nav />

        <Tittle :type="'courses'">
            <h1 class="fadeInUp"><span></span>Online courses</h1>
        </Tittle>

        <div class="filters_listing sticky_horizontal">
			<div class="container">
				<ul class="clearfix">
					<li>
						<div class="switch-field">
							<input type="radio" id="all" name="listing_filter" value="all" checked>
							<label for="all">All</label>
							<input type="radio" id="popular" name="listing_filter" value="popular">
							<label for="popular">Popular</label>
							<input type="radio" id="latest" name="listing_filter" value="latest">
							<label for="latest">Latest</label>
						</div>
					</li>
					<!-- <li>
						<div class="layout_view">
							<a href="#0" class="active"><i class="icon-th"></i></a>
							<a href="courses-list.html"><i class="icon-th-list"></i></a>
						</div>
					</li> -->
					<!-- <li>
						<select name="orderby" class="selectbox">
							<option value="category">Category</option>
							<option value="category 2">Literature</option>
							<option value="category 3">Architecture</option>
							<option value="category 4">Economy</option>
						</select> 
					</li> -->
				</ul>
			</div>
			<!-- /container -->
		</div>
		
		<!-- /filters -->
		<div class="container margin_60_35">
			<div class="row">
				<aside class="col-lg-3" id="sidebar">
					<div id="filters_col"> <a data-toggle="collapse" href="#collapseFilters" aria-expanded="false" aria-controls="collapseFilters" id="filters_col_bt">Filters </a>
						<div class="collapse show" id="collapseFilters">
							<div class="filter_type">
								<h6>Category</h6>
								<router-link :to="'/allcourses/e'">
								<h5 :class="{active : picked == 'e'}" @click="holla"><i class="icon-fixed-width icon-book"></i> All</h5>
								</router-link>
								<router-link :to="'/allcourses/'+c._id" v-for="c in categories" :key="c">	
								<h5 :class="{active : picked == c._id}"><i class="icon-fixed-width icon-book"></i> {{c.name}}</h5>
								</router-link>
							</div>
						</div>
						<!--/collapse -->
					</div>
					<!--/filters col-->
				</aside>
				<!-- /aside -->
				
				<div class="col-lg-9">
					
					<div class="row">
						<Loading v-if="Loading" />
						<div class="col-md-6" v-for="cos in courses" :key="cos">
							<router-link :to="'/coursedetail/'+cos._id">
							<div class="box_grid wow">
								<figure class="block-reveal">
									<div class="block-horizzontal"></div>
									<a href="#0" class="wish_bt"></a>
									<a href=""><img v-bind:src="backEnd+'public/courseImage/'+cos._id" class="img-fluid" alt=""></a>
									<div class="price">₦{{cos.price.$numberDecimal}}</div>
									<div class="preview"><span>Preview course</span></div>
								</figure>
								<div class="wrapper">
									<small>{{cos.category[0].name}}</small>
									<h3>{{cos.title}}</h3>
									<p>{{cos.secondTitle}}</p>
									<Ratings :id="cos._id" :type="'course'" />
								</div>
								<ul>
									<li><i class="icon_profile"></i> {{cos.user[0].lastName}}</li>
									<!-- <li><i class="icon_like"></i></li> -->
									<li><a >Enroll now</a></li>
								</ul>
							</div>
							</router-link>
						</div>
						
					</div>
					<!-- /row -->
					<p class="text-center" @click.prevent="fetchMore" v-if="!Loading"><a href="" class="btn_1 rounded add_top_30">Load more</a></p>
				</div>
				<!-- /col -->
			</div>
			<!-- /row -->
		</div>
		<!-- /container -->
		<!-- <div class="bg_color_1">
			<div class="container margin_60_35">
				<div class="row">
					<div class="col-md-4">
						<a href="#0" class="boxed_list">
							<i class="pe-7s-help2"></i>
							<h4>Need Help? Contact us</h4>
							<p>Cum appareat maiestatis interpretaris et, et sit.</p>
						</a>
					</div>
					<div class="col-md-4">
						<a href="#0" class="boxed_list">
							<i class="pe-7s-wallet"></i>
							<h4>Payments and Refunds</h4>
							<p>Qui ea nemore eruditi, magna prima possit eu mei.</p>
						</a>
					</div>
					<div class="col-md-4">
						<a href="#0" class="boxed_list">
							<i class="pe-7s-note2"></i>
							<h4>Quality Standards</h4>
							<p>Hinc vituperata sed ut, pro laudem nonumes ex.</p>
						</a>
					</div>
				</div>
			</div>
		</div> -->
		<!-- /bg_color_1 -->

        <Footer />
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import Nav from '@/components/site/Nav.vue'
import Ratings from '@/components/site/Ratings.vue'
import Loading from "@/components/Loading";
import Tittle from '@/components/site/Tittle.vue'
import Footer from '@/components/site/Footer.vue'
export default {
	name: 'Allcourses',
	data(){
		return{
			category: '',
			courses: '',
			picked: 'e',
			Loading: false,
			categories: '',
			skip: 0
		}
	},
    watch: {

        $route() {
			this.picked= this.$route.params.cat
			this.skip = 0
			this.Loading = true
            this.fetch_courses_by_category__public({cat: this.picked, skip: this.skip})   
			.then(res => {
				this.courses = res.data
				this.Loading = false
			})

		},
		
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
		...mapGetters(['backEnd'])
	},
    components: {
        Nav,
		Tittle,
		Loading,
		Ratings,
        Footer
	},
	methods: {
		...mapActions(['fetch_courses_by_category__public']),
		...mapActions(['fetch_categories__public']),
		fetchMore(){
			this.skip = this.skip + 10
			this.Loading = true
            this.fetch_courses_by_category__public({cat: this.picked, skip: this.skip})    
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
					this.courses.push(element)
				}
				this.Loading = false
            })
        }
	},
    mounted(){
		let js = document.createElement('script')
		js.setAttribute('src', 'js/main.js')
		document.head.appendChild(js)
		let jsc = document.createElement('script')
		jsc.setAttribute('src', 'js/common_scripts.js')
		document.head.appendChild(jsc)

		this.fetch_categories__public()
        .then(res => {
            this.categories = res.data
        })
	
		this.category =  this.$route.params.cat
		this.picked = this.$route.params.cat
        this.fetch_courses_by_category__public({cat: this.category, skip: this.skip})  
        .then(res => {
            this.courses = res.data
		})

		
		
  	}
}
</script>
<style scoped>
    .active{
		padding: 15px;
		color: white;
		background-color: #EF6421;
		border-radius: 20%;
	}

	
</style>
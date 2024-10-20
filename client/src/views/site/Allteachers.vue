<template>
    <div>
        <Nav />

        <Tittle :type="'instructor'">
            <h1 class="fadeInUp"><span></span>Online Teachers</h1>
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
					<li>
						<div class="layout_view">
							<a href="#0" class="active"><i class="icon-th"></i></a>
							<a href="courses-list.html"><i class="icon-th-list"></i></a>
						</div>
					</li>
					<li>
						<select name="orderby" class="selectbox" v-model="picked">
							<option value="e">All</option>
							<option :value="c._id" v-for="c in categories" :key="c">{{c.name}}</option>
						</select>
					</li>
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
								<router-link :to="'/allteachers/e'">
								<h5 :class="{active : picked == 'e'}" @click="holla"><i class="icon_profile"></i> All</h5>
								</router-link>
								<router-link :to="'/allteachers/'+c._id" v-for="c in categories" :key="c">	
								<h5 :class="{active : picked == c._id}"><i class="icon_profile"></i> {{c.name}}</h5>
								</router-link>
							</div>
						</div>
						<!--/collapse -->
					</div>
					<!--/filters col-->
				</aside>
				<!-- /aside -->
					
				<div class="col-lg-9">
					<Loading v-if="Loading" />
					<div class="row">
						<div class="col-md-6" v-for="t in teachers" :key="t">
							<div class="box_grid wow">
								<figure class="block-reveal" style="max-height: 250px">
									<div class="block-horizzontal"></div>
									<a href="#0" class="wish_bt"></a>
									<ProfileImage :id="t.user[0]._id" />
									<div class="price"></div>
								</figure>
								<router-link :to="'/teacher/'+t.user[0]._id">
								<div class="wrapper">
									<small>{{t.expertise}}</small>
									<h3>{{t.user[0].firstName}} {{t.user[0].lastName}}</h3>
									<p>{{t.category[0].name}}</p>
									<Ratings :id="t.user[0]._id" :type="'instructor'" />
								</div>
								<!-- <ul>
									<li><i class="icon_clock_alt"></i> 1h 30min</li>
									<li><i class="icon_like"></i> 890</li>
									<li><a href="">Enroll now</a></li>
								</ul> -->
								</router-link>
							</div>
						</div>
						<!-- /box_grid -->
						
					</div>
					<!-- /row -->
				<p class="text-center" @click.prevent="fetchMore" v-if="!Loading"><a href="#0" class="btn_1 rounded add_top_30">Load more</a></p>
				</div>
				<!-- /col -->
			</div>
			<!-- /row -->
		</div>
		<!-- /container -->
		<!-- <Help /> -->
		<!-- /bg_color_1 -->

        <Footer />
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProfileImage from "@/components/ProfileImage";
import Ratings from '@/components/site/Ratings.vue'
//import Help from '@/components/site/Help.vue'
import Nav from '@/components/site/Nav.vue'
import Tittle from '@/components/site/Tittle.vue'
import Loading from "@/components/Loading";
import Footer from '@/components/site/Footer.vue'
export default {
	name: 'Allteachers',
	data(){
		return{
			teachers: '',
			category: '',
			picked: 'e',
			categories: '',
			skip: 0,
			Loading: false
		}
	},
    components: {
        Nav,
		Tittle,
		Ratings,
		ProfileImage,
		Loading,
	//	Help,
        Footer
	},
	computed: {
		...mapGetters(['loader'])
	},
	watch: {

        $route() {
			this.picked= this.$route.params.id
			this.skip = 0
			this.Loading = true
            this.fetch_AllInstructorByCategory__public({catId: this.picked, skip: this.skip})
			.then(res => {
				this.teachers = res.data
				this.Loading = false
			})

		},

		loader: function () {
            if (this.loader == 'loading') {
                this.Loading = true
            }else{
                this.Loading = false
            }
        }
		
        
	},
	methods: {
		...mapActions(['fetch_AllInstructorByCategory__public']),
		...mapActions(['fetch_categories__public']),
		fetchMore(){
			this.skip = this.skip + 10
			this.Loading = true
            this.fetch_AllInstructorByCategory__public({catId: this.picked, skip: this.skip})   
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
					this.teachers.push(element)
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

		this.picked = this.$route.params.id
		this.fetch_categories__public()
		.then(res => {
			this.categories = res.data
		})
		
		this.fetch_AllInstructorByCategory__public({catId: this.picked, skip: this.skip})
		.then(res => {
			this.teachers = res.data
		})
  	}
}
</script>
<style>
    .active{
		padding: 15px;
		color: white;
		background-color: #EF6421;
		border-radius: 20%;
	}
</style>
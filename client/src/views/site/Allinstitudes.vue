<template>
    <div>
        <Nav />

        <Tittle :type="'institution'">
            <h1 class="fadeInUp"><span></span>Online Institutions</h1>
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
							<a href="courses-grid.html"><i class="icon-th"></i></a>
							<a href="#0" class="active"><i class="icon-th-list"></i></a>
						</div>
					</li>
					<li>
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
				<div class="box_list wow" v-for="ins in allInstitutions" :key="ins" style="height: 200px">
					<router-link :to="'/institude/'+ins._id">
					<div class="row no-gutters" style="height: 200px">
						<div class="col-lg-5">
							<figure class="block-reveal">
								<div class="block-horizzontal"></div>
								<a href=""><img :src="backEnd+'public/institutionImage__public/'+ins._id" alt="" style="height: 200px; width: 200px; border-radius: 50%"></a>
								<div class="preview"><span>Preview Institution</span></div>
							</figure>
						</div>
						<div class="col-lg-7">
							<div class="wrapper">
								<a href="#0" class="wish_bt"></a>
								<small>{{ins.institutionType}}</small>
								<h3>{{ins.institutionName}}</h3>
								<p>{{ins.address}} </p>
								<Ratings :id="ins._id" :type="'institution'" />
							</div>
							<ul>
								<li><a href="">Enroll now</a></li>
							</ul>
						</div>
					</div>
					</router-link>
				</div>
				<!-- /box_list -->
				<p class="text-center add_top_60" @click.prevent="fetchMore" v-if="!Loading"><a href="#0" class="btn_1 rounded">Load more</a></p>
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
import { mapActions, mapGetters } from "vuex";
import Nav from '@/components/site/Nav.vue'
import Tittle from '@/components/site/Tittle.vue'
import Ratings from '@/components/site/Ratings.vue'
import Footer from '@/components/site/Footer.vue'
export default {
	name: 'Allinstitudes',
	data(){
		return{
			allInstitutions : '',
			Loading: false,
			skip: 0
		}
	},
    components: {
        Nav,
        Tittle,
		Ratings,
        Footer
	},
	computed: {
		...mapGetters(['backEnd'])
	},
	methods: {
		...mapActions(['fetch_all_institutions__public']),
		fetchMore(){
			this.skip = this.skip + 10
			this.Loading = true
            this.fetch_all_institutions__public(this.skip)    
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
					this.allInstitutions.push(element)
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

		this.fetch_all_institutions__public(this.skip)
        .then(res => {
            this.allInstitutions = res.data
        })
  }
}
</script>
<style>
    
</style>
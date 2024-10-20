<template>
    <div class="cartNotice">
		<center>
			<p>You have {{msg}} items on your cart</p>
			<div class="action">
				<!-- <a :href="'http://localhost:8080/Dcoursedetail/buy.html'">
				<p class="b" style="background-color: green;">Buy Now</p>
				</a> -->
				<a :href="frontEnd+'/Dcoursedetail/buy.html'">
					<p class="b" style="background-color: green;">Buy Now</p>
				</a>
				<p class="b" style="background-color: red;" @click="clearCart()">Clear Cart</p>
			</div>
		</center>
	</div>
    
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'HelloWorld',
	data(){
		return{
			domain: ''
		}
	},
    props: {
        msg: Number
	},
	computed: {
		...mapGetters(['frontEnd'])
	},
	methods: {
		...mapActions(['addCart']),
		clearCart(){
			localStorage.setItem("fmrcart", '')
			this.addCart(0)
		}
	},
	mounted(){
		this.domain = window.location.hostname
	}
}
</script>
<style >

	.cartNotice{
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 70px;
		background-color: black;
		opacity: 0.7;
		z-index: 10000000000000000000000000000000000000000000000000000;
	}

	.cartNotice p{
		opacity: 1;
		color: white;
		font-size: 14px;
	}

	.cartNotice .action{
		opacity: 1;
		height: 50px;
	}

	.cartNotice .action p{
		padding: 10px;
		border-radius: 5px;
		display: inline-block;
		color: white;
		font-size: 13px;
		margin: auto;
		font-weight: bolder;
		margin-left: 10px;
		margin-right: 10px;
		cursor: pointer;
	}

</style>
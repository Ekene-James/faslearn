<template>
    <section id="hero_in" :class="type" >
		<div class="wrapper" >
			<div class="container" >
                <slot />
			</div>
		</div>
	</section>
</template>
<script>
export default {
	name: 'Tittle',
	props: {
		img: String,
		type: String
	},
	
}
</script>
<style >
	/* .container{
		background-image: url();
	} */
</style>
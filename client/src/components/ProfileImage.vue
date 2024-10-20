<template>
    <div style="height: 100%; width: 100%">
        <img src="./assets/hd_dp.jpg" alt="" v-if="!isPhoto" style="height: 100%; width: 100%">
        <img v-bind:src="backEnd+'public/fetchProfileImage__public/'+id" alt="" v-else style="height: 100%; width: 100%">
    </div> 
</template>
<script> 
import { mapActions, mapGetters } from "vuex";
export default {
    name: 'ProfileImage',
    data(){
        return{
            isPhoto: true
        }
    },
	props: {
		id: String,
    },
    computed: {
        ...mapGetters(['backEnd'])
    },
    methods: {
        ...mapActions(['check_empty_image']),
        convert(){
            this.isPhoto = false;
        }
    },
    mounted(){
        this.check_empty_image(this.id)
        .then(res => {
            if (res.data.image!=true) {
                this.isPhoto = false
            }
        })
    }
	
}
</script>
<style >
</style>
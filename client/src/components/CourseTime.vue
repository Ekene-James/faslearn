<template>
    <div class="crse_timer" v-if="type=='dashboard'">
        {{total}} minutes
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return{
            total: 0
        }
    },
    props: {
        id: String,
        type: String
    },
    methods: {
        ...mapActions(['checkTotalTimeCourse__public'])
    },
    mounted(){
        this.checkTotalTimeCourse__public(this.id)
        .then(res => {
            this.total = res.data
        })
    }
}
</script>
<style >

</style>
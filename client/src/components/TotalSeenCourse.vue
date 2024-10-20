<template>
    <div class="vdtodt">
        <span class="vdt14">{{seen}} views</span>
        <span class="vdt14">{{created.split('T')[0]}}</span>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
//import TimeFormat from "@/components/TimeFormat";
export default {
    data(){
        return{
            created: '',
            seen: ''
        }
    },
    component: {
//        TimeFormat
    },
    props: {
        id: String,
        type: String
    },
    methods: {
        ...mapActions(['checkTotalSee'])
    },
    mounted(){
        this.checkTotalSee(this.id)
        .then(res => {
            this.created = res.data.timeCreated
            this.seen = res.data.totalPurchased
        })
    }
}
</script>
<style >

</style>
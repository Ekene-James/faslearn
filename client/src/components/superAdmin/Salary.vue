<template>
    <b>{{salary}}</b>
</template>
<script>
import { mapActions } from "vuex";
export default {
    name: 'salary',
    data(){
        return{
            salary: 0
        }
    },
    props: {
        userId: String
    },
    methods: {
        ...mapActions(['calculateUserPayouts__Admin']),
    },
    mounted(){
        this.calculateUserPayouts__Admin(this.userId)
        .then(res => {
            this.salary = res.data.amount
        })
    }
    
}
</script>
<style >

</style>
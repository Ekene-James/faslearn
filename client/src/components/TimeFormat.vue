<template>
    <span >{{realdate}}</span>
</template>
<script>
export default {
    data(){
        return{
            year: '',
            day: '',
            month: '',
            realdate: ''
        }
    },
    props: {
        date: String
    },
    methods: {
    },
    mounted(){
        this.realdate = this.date.split('T')[0]
        // var currentTime = new Date()
        new Date()
        this.year = this.date.getFullYear()
        this.day = this.date.getDay()
        this.month = this.date.getMonth()
    }
}
</script>
<style >

</style>
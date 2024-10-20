<template>
    <div>
        <Dheader />

        <Dnav2 />
        
        <div class="wrapper">
            <div class="sa4d25">
                <div class="container-fluid">			
                    <div class="row">
                        <div class="col-lg-12">	
                            <h2 class="st_title"><i class="uil uil-bell"></i> Notifications</h2>
                        </div>					
                    </div>				
                    <div class="row">
                        <div class="col-12">
                            <!-- <a class="setting_noti">Notification Setting</a> -->
                            <div class="all_msg_bg" v-if="notifications.length!=0">
                                <Notice v-for="n in notifications" :key="n" :notice="n" />
                            </div>
                            <div class="all_msg_bg" v-else>
                                <div class="channel_my item all__noti5">
                                    <div class="profile_link">
                                        <div class="pd_content">
                                            <h6>No Notifications Yet</h6>
                                        </div>							
                                    </div>							
                                </div>
                            </div>
                            
                            <br><br><br>
                            <center>
                                <button class="live_link" type="button" v-if="!Loading" @click="fetchMore">Load More</button>	
                            </center>
                            <br><br><br>
                        </div>
                    </div>
                </div>
            </div>
            <br><br><br>
            <Dfooter />
        </div>
    </div>

</template>
<script>
import { mapActions } from "vuex";
import Dheader from '@/components/dashboard/Header.vue'
import Dnav2 from '@/components/dashboard/Nav2.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
import Notice from '@/components/dashboard/Notice.vue'
export default {
    name: 'Dhome',
    data(){
        return{
            userId: '',
            notifications: '',
            skip: 0
        }
    },
    components: {
        Dheader,
        Dnav2,
        Dfooter,
        Notice
    },  
    methods: {
        ...mapActions(['fetch_UserNotifications']),
        ...mapActions(['seen_AllNotification']),
        fetchMore(){
            this.skip = this.skip + 10
            this.fetch_UserNotifications({userId: this.userId,skip: this.skip})  
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const element = res.data[i];
                    this.notifications.push(element)
                }
            })
        }
    },
    watch: {
		$route() {
			this.seen_AllNotification(this.userId)
		},

	},
    mounted(){
        this.userId = localStorage.getItem('fmruser');
        this.fetch_UserNotifications({userId: this.userId, skip: this.skip})
        .then(res => {
            this.notifications = res.data
        }) 
    }
}
</script>
<style>
    @import url("../assets/css/style.css");
    @import url("http://fonts.googleapis.com/css?family=Roboto:400,700,500");
    @import url("../assets/vendor/unicons-2.0.1/css/unicons.css");
    @import url("../assets/css/instructor-dashboard.css");
    @import url("../assets/css/vertical-responsive-menu.min.css");
    @import url("../assets/css/instructor-dashboard.css");
    @import url("../assets/css/instructor-responsive.css");
    @import url("../assets/css/responsive.css");
    @import url("../assets/css/night-mode.css");
    @import url("../assets/vendor/fontawesome-free/css/all.min.css");
    @import url("../assets/vendor/OwlCarousel/assets/owl.carousel.css");
    @import url("../assets/vendor/OwlCarousel/assets/owl.theme.default.min.css");
    @import url("../assets/vendor/bootstrap/css/bootstrap.min.css");
    @import url("../assets/vendor/semantic/semantic.min.css");

</style>
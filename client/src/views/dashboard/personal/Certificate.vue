<template>
    <div>
        <Dheader />

        <Dnav2 />
        
        <div class="wrapper">
            <div class="sa4d25">
                <div class="container-fluid">			
                    <div class="row">
                        <div class="col-lg-12">	
                            <h2 class="st_title"><i class="uil uil-award"></i> My Certificates</h2>
                        </div>					
                    </div>				
                    <div class="row">
                        <div class="col-12">
                            <div class="mt-10">
                                <div class="card_dash1">
                                    <div class="card_dash_left1">
                                        <i class="uil uil-award"></i>
                                        <h1>Take Tests for your courses to get Certificate</h1>
                                    </div>
                                    <div class="card_dash_right1">
                                        <router-link :to="'/Dprofile/'+userId">
                                        <button class="create_btn_dash">My Courses</button>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="table-cerificate">
                                    <div class="table-responsive">
                                        <table class="table ucp-table" id="content-table">
                                            <thead class="thead-s">
                                                <tr>
                                                    <th class="text-center" scope="col">Item No.</th>
                                                    <th scope="col">Title</th>
                                                    <th class="text-center" scope="col">Marks</th>
                                                    <th class="text-center" scope="col">Out Of</th>
                                                    <th class="text-center" scope="col">Percentage</th>
                                                    <th class="text-center" scope="col">Upload Date</th>
                                                    <th class="text-center" scope="col">Controls</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="certs!=''">
                                                <tr v-for="c in certs" :key="c">
                                                    <td class="text-center">{{1+(certs.indexOf(c))}}</td>
                                                    <td class="cell-ta">{{c.test[0].courseId[0].title}}</td>
                                                    <td class="text-center">{{c.result}}</td>
                                                    <td class="text-center">{{c.total}}</td>
                                                    <td class="text-center">{{((c.result/c.total)*100).toFixed(2)}}</td>
                                                    <td class="text-center">{{c.updatedAt}}</td>
                                                    <td class="text-center">
                                                        <a :href="'/DcourseCertificate/'+c.test[0].courseId[0]._id+'/'+c.test[0]._id" title="view" class="gray-s"><i class="uil uil-eye"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dfooter />
        </div>
    </div>

</template>
<script>
import Dheader from '@/components/dashboard/Header.vue'
import Dnav2 from '@/components/dashboard/Nav2.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
import { mapActions } from 'vuex'
export default {
    name: 'Dcerts',
    data(){
        return{
            userId: '',
            certs: ''
        }
    },
    components: {
        Dheader,
        Dnav2,
        Dfooter
    },  
    methods: {
        ...mapActions(['fetchUserCertificates'])
    },
    mounted(){
        this.userId = localStorage.getItem('fmruser')
        this.fetchUserCertificates(this.userId)
        .then(res => {
            this.certs = res.data
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
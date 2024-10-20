<template>
    <div>
        <Header />

        <div class="content-wrapper">
            <div class="container-fluid">
                <!-- Breadcrumbs-->
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                    <a href="#">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">My Dashboard</li>
                </ol>
                <!-- Icon Cards-->
                <div class="row">
                    <div class="col-xl-3 col-sm-6 mb-3">
                        <div class="card dashboard text-white bg-primary o-hidden h-100">
                            <div class="card-body">
                            <div class="card-body-icon">
                                <i class="fa fa-fw fa-envelope-open"></i>
                            </div>
                            <div class="mr-5"><h5>{{data.users}} Users!</h5></div>
                            </div>
                            <a class="card-footer text-white clearfix small z-1" href="">
                            <span class="float-left">View Details</span>
                            <span class="float-right">
                                <i class="fa fa-angle-right"></i>
                            </span>
                            </a>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 mb-3">
                        <div class="card dashboard text-white bg-warning o-hidden h-100">
                            <div class="card-body">
                            <div class="card-body-icon">
                                <i class="fa fa-fw fa-star"></i>
                            </div>
                                <div class="mr-5"><h5>{{data.instructors}} Instructors</h5></div>
                            </div>
                            <a class="card-footer text-white clearfix small z-1" href="reviews.html">
                            <span class="float-left">View Details</span>
                            <span class="float-right">
                                <i class="fa fa-angle-right"></i>
                            </span>
                            </a>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 mb-3">
                        <div class="card dashboard text-white bg-success o-hidden h-100">
                            <div class="card-body">
                            <div class="card-body-icon">
                                <i class="fa fa-fw fa-calendar-check-o"></i>
                            </div>
                            <div class="mr-5"><h5>{{data.courses}} Courses</h5></div>
                            </div>
                            <a class="card-footer text-white clearfix small z-1" href="bookings.html">
                            <span class="float-left">View Details</span>
                            <span class="float-right">
                                <i class="fa fa-angle-right"></i>
                            </span>
                            </a>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 mb-3">
                        <div class="card dashboard text-white bg-danger o-hidden h-100">
                            <div class="card-body">
                            <div class="card-body-icon">
                                <i class="fa fa-fw fa-heart"></i>
                            </div>
                            <div class="mr-5"><h5>{{data.institutions}} Institutions</h5></div>
                            </div>
                            <a class="card-footer text-white clearfix small z-1" href="bookmarks.html">
                            <span class="float-left">View Details</span>
                            <span class="float-right">
                                <i class="fa fa-angle-right"></i>
                            </span>
                            </a>
                        </div>
                    </div>

                    <div class="col-xl-3 col-sm-6 mb-3">
                        <div class="card dashboard text-white bg-primary o-hidden h-100">
                            <div class="card-body">
                            <div class="card-body-icon">
                                <i class="fa fa-fw fa-envelope-open"></i>
                            </div>
                            <div class="mr-5"><h5>{{data.feedback}} Feedbacks</h5></div>
                            </div>
                            <a class="card-footer text-white clearfix small z-1" href="">
                            <span class="float-left">View Details</span>
                            <span class="float-right">
                                <i class="fa fa-angle-right"></i>
                            </span>
                            </a>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 mb-3">
                        <div class="card dashboard text-white bg-warning o-hidden h-100">
                            <div class="card-body">
                            <div class="card-body-icon">
                                <i class="fa fa-fw fa-star"></i>
                            </div>
                                <div class="mr-5"><h5>{{data.ninstructors}} new Instructors!</h5></div>
                            </div>
                            <a class="card-footer text-white clearfix small z-1" href="reviews.html">
                            <span class="float-left">View Details</span>
                            <span class="float-right">
                                <i class="fa fa-angle-right"></i>
                            </span>
                            </a>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 mb-3">
                        <div class="card dashboard text-white bg-success o-hidden h-100">
                            <div class="card-body">
                            <div class="card-body-icon">
                                <i class="fa fa-fw fa-calendar-check-o"></i>
                            </div>
                            <div class="mr-5"><h5>{{data.ncourses}} new Courses!</h5></div>
                            </div>
                            <a class="card-footer text-white clearfix small z-1" href="bookings.html">
                            <span class="float-left">View Details</span>
                            <span class="float-right">
                                <i class="fa fa-angle-right"></i>
                            </span>
                            </a>
                        </div>
                    </div>
                    <div class="col-xl-3 col-sm-6 mb-3">
                        <div class="card dashboard text-white bg-danger o-hidden h-100">
                            <div class="card-body">
                            <div class="card-body-icon">
                                <i class="fa fa-fw fa-heart"></i>
                            </div>
                            <div class="mr-5"><h5>{{data.ninstitutions}} new Institutions</h5></div>
                            </div>
                            <a class="card-footer text-white clearfix small z-1" href="bookmarks.html">
                            <span class="float-left">View Details</span>
                            <span class="float-right">
                                <i class="fa fa-angle-right"></i>
                            </span>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- /cards -->
                <h2></h2>
                <!-- <div class="box_general padding_bottom">
                    <div class="header_box version_2">
                        <h2><i class="fa fa-bar-chart"></i>Statistic</h2>
                    </div>
                    <canvas id="myAreaChart" width="100%" height="30" style="margin:45px 0 15px 0;"></canvas>
                </div> -->
            </div>
            <!-- /.container-fluid-->
        </div>
        <!-- /.container-wrapper-->
        <Footer />
        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
        <i class="fa fa-angle-up"></i>
        </a>
        <!-- Logout Modal-->
        <Modal />
        
    </div>
</template>
<script>
import Header from '@/components/superAdmin/Header.vue'
import Modal from '@/components/superAdmin/Modal.vue'
import Footer from '@/components/superAdmin/Footer.vue'
import { mapActions } from 'vuex'
export default {
    data(){
        return{
            data: {
                users: '', 
                instructors: '', 
                institutions: '', 
                courses: '',
                ninstructors: '',
                ninstitutions: '',
                ncourses: '',
                feedback: ''
            }
        }
    },
    components: {
        Header,
        Modal,
        Footer
    },
    methods: {
        ...mapActions(['fetch_SuperDasboard'])
    },
    mounted(){
        this.fetch_SuperDasboard()
        .then(res => {
            this.data = res.data
        })
    }
}
</script>
<style >
	@import url("./assets/css/admin.css");
    @import url("./assets/css/custom.css");
    @import url("./assets/vendor/font-awesome/css/font-awesome.min.css");
    @import url("./assets/vendor/datatables/dataTables.bootstrap4.css");
    @import url("./assets/vendor/bootstrap/css/bootstrap.min.css");
</style>
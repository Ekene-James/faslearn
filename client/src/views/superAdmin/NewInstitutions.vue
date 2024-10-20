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
                <li class="breadcrumb-item active">Your Courses</li>
            </ol>
                <div class="box_general">
                    <div class="header_box">
                        <h2 class="d-inline-block">Your Courses</h2>
                        <div class="filter">
                            <select name="orderby" class="selectbox">
                                <option value="Any status">Any status</option>
                                <option value="Approved">Started</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div class="list_general">
                        <ul>
                            <li>
                                <figure><img src="img/course_1.jpg" alt=""></figure>
                                <h4>Course title <i class="pending">Pending</i></h4>
                                <ul class="course_list">
                                    <li><strong>Start date</strong> 11 November 2017</li>
                                    <li><strong>Expire date</strong> 11 April 2018</li>
                                    <li><strong>Category</strong> Science, Economy</li>
                                    <li><strong>Teacher</strong> Mark Twain</li>
                                </ul>
                                <h6>Course description</h6> 
                                <p>Lorem ipsum dolor sit amet, est ei idque voluptua copiosae, pro detracto disputando reformidans at, ex vel suas eripuit. Vel alii zril maiorum ex, mea id sale eirmod epicurei. Sit te possit senserit, eam alia veritus maluisset ei, id cibo vocent ocurreret per. Te qui doming doctus referrentur, usu debet tamquam et. Sea ut nullam aperiam, mei cu tollit salutatus delicatissimi. His appareat perfecto intellegat te. </p>
                                <ul class="buttons">
                                    <li><a href="#0" class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i> Approve</a></li>
                                    <li><a href="#0" class="btn_1 gray delete"><i class="fa fa-fw fa-times-circle-o"></i> Cancel</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /box_general-->
                <nav aria-label="...">
                    <ul class="pagination pagination-sm add_bottom_30">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1">Previous</a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
                <!-- /pagination-->
            </div>
            <!-- /container-fluid-->
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
import { mapActions } from "vuex";
export default {
    data(){
        return{
            feedbacks: '',
            skip: 0
        }
    },
    components: {
        Header,
        Modal,
        Footer
    },
    methods: {
        ...mapActions(['fetchFeedbacks__Admin'])
    },
    mounted(){
        this.fetchFeedbacks__Admin(this.skip)
        .then(res => {
            this.feedbacks = res.data
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
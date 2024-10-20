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
                    <li class="breadcrumb-item active">Tables</li>
                </ol>
                    <!-- Example DataTables Card-->
                <div class="card mb-3">
                    <div class="card-header">
                    <i class="fa fa-table"></i> Data Table Example
                    <p class="verifiedButton" :class="{active : type=='verified'}"  @click="switchVerified('verified')">Verified</p>
                    <p class="verifiedButton" :class="{active : type=='unverified'}" @click="switchVerified('unverified')">Unverified</p>
                    </div>
                    <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Office</th>
                                <th>Start date</th>
                                <th>Controls</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Office</th>
                                <th>Start date</th>
                                <th>Controls</th>
                            </tr>
                        </tfoot>
                        <tbody v-if="institutions!=''">
                            <Loading v-if="Loading" />
                            <tr v-for="i in institutions" :key="i">
                                <td>{{i.institutionName}}</td>
                                <td>{{i.institutionType}}</td>
                                <td>{{i.address}}</td>
                                <td>{{i.createdAt}}</td>
                                <td>
                                    <router-link :to="'/SAinstitution/'+i._id">
                                    View
                                    </router-link>
                                </td>
                            </tr>
                            
                        </tbody>
                        </table>
                    </div>
                    </div>
                    <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                </div>
                <!-- /tables-->
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
import Loading from "@/components/Loading.vue";
import { mapActions } from "vuex";
export default {
    data(){
        return{
            institutions: '',
            type: 'unverified',
            skip: 0
        }
    },
    components: {
        Header,
        Modal,
        Loading,
        Footer
    },
    methods: {
        ...mapActions(['fetchUnverifiedInstitution_Admin','fetchVerifiedInstitution_Admin']),
        switchVerified(type){
            this.type = type
            this.skip = 0
            this.Loading = true
            if (type=="verified") {
                this.fetchVerifiedInstitution_Admin(this.skip)
                .then(res => {
                    this.institutions = res.data
                    this.Loading = false
                })
            }else{
                this.fetchUnverifiedInstitution_Admin(this.skip)
                .then(res => {
                    this.institutions = res.data
                    this.Loading = false
                })
            }
        }
    },
    mounted(){
        this.fetchUnverifiedInstitution_Admin(this.skip)
        .then(res => {
            this.institutions = res.data
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

    .verifiedButton{
        color: white;
        background-color: grey;
        border-radius: 10px;
        padding: 5px;
        display: inline;
        margin-left: 10px;
        cursor: pointer;
    }

    .active{
        background-color: red;
    }
</style>
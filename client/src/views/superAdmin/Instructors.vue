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
                            <th>Expertise</th>
                            <th>Since</th>
                            <th>Category</th>
                            <th>Email</th>
                            <th>Controls</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                            <th>Name</th>
                            <th>Expertise</th>
                            <th>Since</th>
                            <th>Category</th>
                            <th>Email</th>
                            <th>Controls</th>
                            </tr>
                        </tfoot>
                        <tbody v-if="instructors!=''">
                            <tr v-for="i in instructors" :key="i">
                                <td>{{i.user[0].lastName}}</td>
                                <td>{{i.expertise}}</td>
                                <td>{{i.experience}}</td>
                                <td>{{i.category[0].name}}</td>
                                <td>{{i.user[0].email}}</td>
                                <td>
                                    <router-link :to="'/SAinstructor/'+i.user[0]._id">
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
import { mapActions } from "vuex";
export default {
    data(){
        return{
            skip: 0,
            instructors: '',
            type: 'unverified',
        }
    },
    components: {
        Header,
        Modal,
        Footer
    },
    methods: {
        ...mapActions(['fetchAllInstructor__Admin']),
        switchVerified(type){
            this.type = type
            this.skip = 0
            this.Loading = true
            if (type=="verified") {
                this.fetchAllInstructor__Admin(this.type,this.skip)
                .then(res => {
                    this.instructors = res.data
                    this.Loading = false
                })
            }else{
                this.fetchAllInstructor__Admin(this.type,this.skip)
                .then(res => {
                    this.instructors = res.data
                    this.Loading = false
                })
            }
        }
    },
    mounted(){
        this.fetchAllInstructor__Admin(this.type,this.skip)
        .then(res => {
            this.instructors = res.data
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
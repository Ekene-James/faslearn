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
                <li class="breadcrumb-item active">Add listing</li>
            </ol>
                
                <!-- /box_general-->
                <div class="row">
                    <div class="col-md-6">
                        <div class="box_general padding_bottom">
                            <div class="header_box version_2">
                                <h2><i class="fa fa-lock"></i>Admin Login</h2>
                            </div>
                            <div class="form-group">
                                <label>Admin Username</label>
                                <input class="form-control" type="text" v-model="name">
                            </div>
                            <div class="form-group">
                                <label>Admin Email Address</label>
                                <input class="form-control" type="email" v-model="email">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input class="form-control" type="password" v-model="password">
                            </div>
                        </div>
                    </div>
                </div>
                <Loading v-if="Loading" />
                <Errors v-if="errors!=''">
                    <ul>
                        <li >{{errors}}</li>	
                    </ul>
                </Errors>
                <Success v-if="Success">
                    <ul>
                        <li>Admin created successfull</li>
                        <li>Please copy the admins generated login detail below</li>
                        <li>Admin Id address : {{AdminId}}</li>
                        <li>Password : {{password}}</li>
                    </ul>
                </Success>
                <!-- /row-->
                <p @click.prevent="addAdmin" v-if="!Loading&&!Success&&name!=''&&password!=''&&email!=''"><a href="#0" class="btn_1 medium">Login</a></p>
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
import { mapActions } from "vuex";
import Loading from '@/components/Loading.vue'
import Errors from '@/components/Errors.vue'
import Success from '@/components/Success.vue'
import Header from '@/components/superAdmin/Header.vue'
import Modal from '@/components/superAdmin/Modal.vue'
import Footer from '@/components/superAdmin/Footer.vue'
export default {
    data(){
        return {
            name : '',
            email : '',
            password : '',
            Loading : false,
            Success : false,
            errors : "",
            AdminId: ''
        }
    },
    components: {
        Header,
        Modal,
        Footer,
        Loading,
        Errors,
        Success
    },
    methods: {
        ...mapActions(['add_SuperAdmin']),
        addAdmin(){
            this.Loading = true
            let admin = {
                name: this.name,
                email: this.email,
                password : this.password
            }
            this.add_SuperAdmin(admin)
            .then(res => {
                this.Success = true
                this.Loading = false
                this.AdminId = res.data._id
            })
            .catch(err => {
                this.errors = "Something went wrong"
                console.log(err)
            })
        }
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
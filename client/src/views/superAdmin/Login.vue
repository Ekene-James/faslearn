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
                                <label>Admin ID Address</label>
                                <input class="form-control" type="id" v-model="id">
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
                <!-- /row-->
                <p @click.prevent="logAdmin" ><a href="#0" class="btn_1 medium">Login</a></p>
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
import Header from '@/components/superAdmin/Header.vue'
import Modal from '@/components/superAdmin/Modal.vue'
import Footer from '@/components/superAdmin/Footer.vue'
export default {
    data(){
        return {
            id : '',
            password : '',
            Loading : false,
            Success : false,
            errors : ""
        }
    },
    components: {
        Header,
        Modal,
        Footer,
        Loading,
        Errors
    },
    methods: {
        ...mapActions(['loginSuperADmin']),
        logAdmin(){
            this.Loading = true
            let admin = {
                id : this.id,
                password : this.password
            }
            this.loginSuperADmin(admin)
            .then(res => {
                if (res.data.success) {
                    this.Success = true
                    this.Loading = false
                    this.$router.push('/SAhome');
                }else{
                    this.errors = res.data.message
                    this.Loading = false
                }
            })
            .catch(err => {
                this.errors = "Hello stranger, this place is for admin only"
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
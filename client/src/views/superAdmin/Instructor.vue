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
                <div class="box_general padding_bottom">
                    <div class="header_box version_2" v-if="instructor!=''">
                        <h2><i class="fa fa-user"></i>Institution details</h2>
                        <p class="approve" @click.prevent="manageInstructor('verify')" v-if="!Loading">Verify</p>
                        <p class="delete" @click.prevent="manageInstructor('block')" v-if="!Loading">Block</p>
                        <!-- <p class="delete" @click.prevent="manageInstitude('delete')" v-if="!Loading">Delete</p> -->
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <img v-bind:src="backEnd+'superAdmin/fetchUserCredential__Admin/'+instructorId+'/image'" alt="" style="height: 200px; width: 200px; border-radius: 50%">
                            </div>
                        </div>
                        <div class="col-md-8 add_top_30" v-if="instructor!=''">
                            <div class="bigspinner" v-if="Loading">
                                <div class="smallspiner">
                                    
                                </div>
                            </div>
                            <Success v-if="Success">
                                <ul>
                                    <li>Action Successfull</li>
                                </ul>
                            </Success>
                            <div class="row" v-if="instructor!=''">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <p>{{instructor.user[0].firstName}} {{instructor.user[0].lastName}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <p>{{instructor.user[0].address}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-if="instructor!=''">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Expertise</label>
                                        <p>{{instructor.expertise}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Since</label>
                                        <p>{{instructor.experience}}</p>
                                    </div>
                                </div>
                            </div> 
                            <div class="row" v-if="instructor!=''">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Telephone</label>
                                        <p>{{instructor.user[0].phone}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <p>{{instructor.user[0].email}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row" v-if="instructor!=''">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Created At</label>
                                        <p>{{instructor.createdAt}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6" >
                                    <div class="form-group">
                                        <label> Applied in</label>
                                        <p v-for="i in instructor.institutionsEmployed" :key="i">
                                            {{i.institutionName}}
                                        </p>
                                    </div>
                                </div>
                            </div> 
                            
                        </div>
                    </div>
                </div>
                <!-- /box_general-->
                <!-- <div class="box_general padding_bottom">
                    <h1>Institution Licence</h1>
                    <div class="row" style="width:100%">
                        <object width="100%" height="700" type="application/pdf" v-bind:data="backEnd+'superAdmin/fetchUserCredential__Admin/'+instructorId+'/trainingLicence'" id="pdf_content" >
                            <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
                        </object>
                    </div>
                </div> -->
                <div class="row">
                    <div class="col-md-6">
                        <h2>Training Licence</h2>
                        <div class="box_general padding_bottom">
                            <object width="100%" height="500" type="application/pdf" v-bind:data="backEnd+'superAdmin/fetchUserCredential__Admin/'+instructorId+'/trainingLicence'" id="pdf_content" >
                                <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
                            </object>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h2>CV</h2>
                        <div class="box_general padding_bottom">
                            <object width="100%" height="500" type="application/pdf" v-bind:data="backEnd+'superAdmin/fetchUserCredential__Admin/'+instructorId+'/cv'" id="pdf_content" >
                                <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
                            </object>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <h2>O level</h2>
                        <div class="box_general padding_bottom">
                            <object width="100%" height="500" type="application/pdf" v-bind:data="backEnd+'superAdmin/fetchUserCredential__Admin/'+instructorId+'/Olevel'" id="pdf_content" >
                                <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
                            </object>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h2>Bachelors Degree</h2>
                        <div class="box_general padding_bottom">
                            <object width="100%" height="500" type="application/pdf" v-bind:data="backEnd+'superAdmin/fetchUserCredential__Admin/'+instructorId+'/Bsc'" id="pdf_content" >
                                <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
                            </object>
                        </div>
                    </div>
                </div>
                <!-- /row-->
                <p><a href="#0" class="btn_1 medium">Save</a></p>
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
import Success from "@/components/Success.vue";
import { mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return{
            instructor: '',
            instructorId: this.$route.params.id,
            Loading: false,
            Success: false,
            percent: null
        }
    },
    components: {
        Header,
        Modal,
        Success,
        Footer
    },
    computed: {
        ...mapGetters(['backEnd'])
    },
    methods: {
        ...mapActions(['fetchInstructorDetails__Admin','manageVerifyInstructor_Admin']),
        manageInstructor(type){
            this.Loading = true
            let object ={
                instructorId: this.instructor._id, 
                type : type
            }
            this.manageVerifyInstructor_Admin(object)
            .then(res => {
                if (res.data.success) {
                    this.Loading = false
                    this.Success = true
                }
            })
        }
    },
    mounted(){
        this.instructorId = this.$route.params.id
        this.fetchInstructorDetails__Admin(this.instructorId)
        .then(res => {
            this.instructor = res.data[0]
        })
    }
}
</script>
<style scoped>
	@import url("./assets/css/admin.css");
    @import url("./assets/css/custom.css");
    @import url("./assets/vendor/font-awesome/css/font-awesome.min.css");
    @import url("./assets/vendor/datatables/dataTables.bootstrap4.css");
    @import url("./assets/vendor/bootstrap/css/bootstrap.min.css");
    .approve{
        color: white;
        background-color: green;
        border-radius: 15px;
        padding: 10px;
        display: inline;
        margin-left: 10px;
        cursor: pointer;
    }

    .delete{
        color: white;
        background-color: red;
        border-radius: 15px;
        padding: 10px;
        display: inline;
        margin-left: 10px;
        cursor: pointer;
    }

        .bigspinner{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        border-top: 5px solid grey;
        display: inline-block;
        animation-name: spin;
        animation-duration: 3000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear; 
    }
    .saymessage{
        display: inline-block;
        margin-left: 10px;
    }
    .smallspiner{
        height: 30px;
        width: 30px;
        margin: 5px;
        border-radius: 50%;
        border-top: 5px solid grey;
        animation-name: spin;
        animation-duration: 2000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes spin{
        from {
        transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
</style>
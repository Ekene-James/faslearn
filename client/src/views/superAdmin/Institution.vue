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
                    <div class="header_box version_2">
                        <h2><i class="fa fa-user"></i>Institution details</h2>
                        <p class="approve" @click.prevent="manageInstitude('verify')" v-if="!Loading">Save percentage & Verify</p>
                        <p class="delete" @click.prevent="manageInstitude('block')" v-if="!Loading&&institution.isVerified">Block</p>
                        <!-- <p class="delete" @click.prevent="manageInstitude('delete')" v-if="!Loading">Delete</p> -->
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <img v-bind:src="backEnd+'superAdmin/viewInstitutionImg_Admin/'+institutionId+'/logo'" alt="" style="height: 200px; width: 200px; border-radius: 50%">
                            </div>
                        </div>
                        <div class="col-md-8 add_top_30">
                            <div class="bigspinner" v-if="Loading">
                                <div class="smallspiner">
                                    
                                </div>
                            </div>
                            <Success v-if="Success">
                                <ul>
                                    <li>Action Successfull</li>
                                </ul>
                            </Success>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <p>{{institution.institutionName}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <p>{{institution.address}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Initial Percentage</label>
                                        <p v-if="institution.percent==null">00%</p>
                                        <p v-else>{{institution.percent}}%</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Institution Type</label>
                                        <p>{{institution.institutionType}}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- /row-->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Telephone</label>
                                        <p>{{institution.mobile}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Email</label>
                                        <p>{{institution.email}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <!-- <div class="col-md-6" v-if="institution.percent!=null">
                                    <div class="form-group">
                                        <label>Percent</label>
                                        <p>{{institution.percent}}</p>
                                    </div>
                                </div> -->
                                <div class="col-md-6" >
                                    <div class="form-group">
                                        <label>Input Percentage value for Institution</label>
                                        <input class="form-control" type="number" v-model="percent" placeholder="00%">
                                    </div>
                                </div>
                            </div>
                            <!-- /row-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Bio</label>
                                        <p>{{institution.bio}}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- /row-->
                        </div>
                    </div>
                </div>
                <!-- /box_general-->
                <div class="box_general padding_bottom">
                    <h1>Institution Licence</h1>
                    <div class="row" style="width:100%">
                        <object width="100%" height="700" type="application/pdf" v-bind:data="backEnd+'superAdmin/viewInstitutionImg_Admin/'+institutionId+'/licence'" id="pdf_content" >
                            <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
                        </object>
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
            institution: '',
            institutionId: this.$route.params.id,
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
        ...mapActions(['fetchSingleInstitution_Admin','viewInstitutionImg_Admin','manageVerifyInstitution_Admin']),
        manageInstitude(type){
            let object ={
                institutionId : this.institutionId, 
                type : type,
                percent: this.percent
            }
            if (type=='verify') {
                if (!this.verify()) {
                    return false
                }
            }
            this.Loading = true
            this.manageVerifyInstitution_Admin(object)
            .then(res => {
                if (res.data.success) {
                    this.institution.percent = this.percent
                    this.Success = true
                    this.Loading = false
                }
            })
        },
        verify(){
            if (this.percent==null) {
                alert('please insert the percentage value for this institution')
                return false 
            }
            if (this.percent>90||this.percent<10) {
                alert('You can not input a value higher than 90 or lower than 10')
                return false
            }else{
                return true
            }
        }

    },
    mounted(){
        this.institutionId = this.$route.params.id
        this.fetchSingleInstitution_Admin(this.institutionId)
        .then(res => {
            this.institution = res.data
            this.percent = this.institution.percent 
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
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
                        <p class="approve" @click.prevent="markSolved()" v-if="!Loading">Mark as Solved</p>
                        <!-- <p class="delete" @click.prevent="manageInstitude('delete')" v-if="!Loading">Delete</p> -->
                    </div>
                    <div class="row" v-if="feedback!=''">
                        <!-- <div class="col-md-4">
                            <div class="form-group">
                                <img v-bind:src="backEnd+'superAdmin/viewInstitutionImg_Admin/'+institutionId+'/logo'" alt="" style="height: 200px; width: 200px; border-radius: 50%">
                            </div>
                        </div> -->
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
                            <!-- /row-->
                            <div class="row">
                                <div class="col-md-12">
                                    <h3>UserID : {{feedback.user[0]}}</h3>
                                    <div class="form-group">
                                        <label>Content</label>
                                        <p>{{feedback.content}}</p>
                                    </div>
                                </div>
                            </div>
                            <!-- /row-->
                        </div>
                    </div>
                </div>
                <!-- /box_general-->
                <div class="box_general padding_bottom" v-if="feedback.image!=null">
                    <h1>ScreenShot</h1>
                    <div class="row" style="width:100%" >
                        <object width="100%" height="700" type="application/pdf" v-bind:data="backEnd+'superAdmin/viewFeedbackImg_Admin/'+feedbackId" id="pdf_content" >
                            <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
                        </object>
                    </div>
                </div>
                <!-- /row-->
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
            feedback: '',
            feedbackId: this.$route.params.id,
            Loading: false,
            Success: false,
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
        ...mapActions(['fetchSingleFeedback__Admin','markSeenFeedback_Admin']),
        markSolved(){
            this.Loading = true
            this.markSeenFeedback_Admin(this.feedbackId)
            .then(res => {
                if (res.data.success) {
                    this.Success = true
                    this.Loading = false
                }
            })
        }

    },
    mounted(){
        this.feedbackId = this.$route.params.id
        this.fetchSingleFeedback__Admin(this.feedbackId)
        .then(res => {
            this.feedback = res.data
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
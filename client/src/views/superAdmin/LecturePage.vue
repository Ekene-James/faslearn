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
                    
                    <div class="bigspinner" v-if="Loading">
                        <div class="smallspiner">
                            
                        </div>
                    </div>
                    <Success v-if="Success">
                        <ul>
                            <li>Action Successfull</li>
                        </ul>
                    </Success>
                    <div class="row" v-if="lecture!=''">
                        <!-- <div class="col-md-4">
                            <div class="form-group">
                                <img v-bind:src="backEnd+'superAdmin/viewCourseImg_Admin/'+course._id" alt="" style="height: 200px; width: 200px; border-radius: 50%">
                            </div>
                        </div> -->
                        <div class="col-md-8 add_top_30">
                            <div class="bigspinner" v-if="Loading">
                                <div class="smallspiner">
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12" v-if="lecture.fileType!='video/mp4'">
                                    <div class="form-group">
                                        <object width="100%" height="500" type="application/pdf" v-bind:data="backEnd+'student/material/'+lecture._id" id="pdf_content">
                                            <p>Sorry but your browser doesn't support pdf, We cant display pdf on this browser. Try using a desktop or laptop computer</p>
                                        </object>
                                    </div>
                                </div>
                                <div class="col-md-12" v-else>
                                    <div class="form-group">
                                        <iframe :src="'https://player.vimeo.com/video/'+videoId+'#zoom=85&scrollbar=0&toolbar=0&navpanes=0'" width="100%" height="560" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
import { mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return{
            lecture: '',
            lectureId: this.$route.params.id,
            videoId: ''
        }
    },
    components: {
        Header,
        Modal,
        Footer
    },
    computed: {
        ...mapGetters(['backEnd'])
    },
    methods: {
        ...mapActions(['fetchLecture__Admin']),
    },
    mounted(){
        this.lectureId = this.$route.params.id
        this.fetchLecture__Admin(this.lectureId)
        .then(res => { 
            this.lecture= res.data
            let l = this.lecture.uri+''
            let l1 = l.split('/')
            this.videoId = l1[2]
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
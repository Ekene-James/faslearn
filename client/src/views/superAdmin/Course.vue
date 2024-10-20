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
                        <h2><i class="fa fa-user"></i>Course details</h2>
                        <p class="approve" @click.prevent="manageCourse('verify')" v-if="!Loading">Verify</p>
                        <p class="delete" @click.prevent="manageCourse('block')" v-if="!Loading">Block</p>
                        <!-- <p class="delete" @click.prevent="manageInstitude('delete')" v-if="!Loading">Delete</p> -->
                    </div>
                    <div class="bigspinner" v-if="Loading">
                        <div class="smallspiner">
                            
                        </div>
                    </div>
                    <Success v-if="Success">
                        <ul>
                            <li>Action Successfull</li>
                        </ul>
                    </Success>
                    <div class="row" v-if="course!=''">
                        <div class="col-md-4">
                            <div class="form-group">
                                <img v-bind:src="backEnd+'superAdmin/viewCourseImg_Admin/'+course._id" alt="" style="height: 200px; width: 200px; border-radius: 50%">
                            </div>
                        </div>
                        <div class="col-md-8 add_top_30">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <p>{{course.title}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Category</label>
                                        <p>{{course.category[0].name}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Teacher Name</label>
                                        <p>{{course.user[0].firstName}} {{course.user[0].lastName}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Teacher Email</label>
                                        <p>{{course.user[0].email}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>What You Learn</label>
                                        <p>{{course.whatYouLearn}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Requirement</label>
                                        <p>{{course.requirement}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Second Title</label>
                                        <p>{{course.secondTitle}}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Price</label>
                                        <p>{{course.price.$numberDecimal}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Description</label>
                                        <p>{{course.description}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box_general padding_bottom">
                    <h1>Modules</h1>
                    <div class="row" style="width:100%">
                        <div class="col-md-12" v-if="modules!=''">
                            <div class="form-group" v-for="m in modules" :key="m">
                                <label><strong>{{m.sectionTitle}}</strong></label>
                                <router-link v-for="v in m.videos" :key="v" :to="'/SAlecturePage/'+v._id">
                                    <p >{{v.title}} <span style="color: red">{{v.fileType}}</span></p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <p><a href="#0" class="btn_1 medium">Save</a></p>
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
import Success from "@/components/Success.vue";
import { mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return{
            course: '',
            modules: '',
            courseId: this.$route.params.id,
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
        ...mapActions(['viewCourse__Admin','manageVerifyCourse_Admin']),
        manageCourse(type){
            this.Loading = true
            let object ={
                courseId: this.courseId, 
                actionType : type,
                courseType : null
            }
            this.manageVerifyCourse_Admin(object)
            .then(res => {
                if (res.data.success) {
                    this.Loading = false
                    this.Success = true
                        
                }
            })
        }

    },
    mounted(){
        this.courseId = this.$route.params.id
        this.viewCourse__Admin(this.courseId)
        .then(res => { 
            this.course = res.data.course
            this.modules = res.data.modules
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
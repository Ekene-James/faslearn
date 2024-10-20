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
                <div class="box_general" v-if="courses!=''">
                    <div class="header_box">
                        <h2 class="d-inline-block">Your Courses</h2>
                        <div class="card-header">
                        <p class="verifiedButton" :class="{active : type=='verified'}"  @click="switchVerified('verified')">Verified</p>
                        <p class="verifiedButton" :class="{active : type=='unverified'}" @click="switchVerified('unverified')">Unverified</p>
                        </div>
                    </div>
                    <div class="bigspinner" v-if="Loading">
                        <div class="smallspiner">
                        </div>
                    </div>
                    <div class="list_general" v-for="c in courses" :key="c">
                        <ul >
                            <li>
                                <figure><img v-bind:src="backEnd+'superAdmin/viewCourseImg_Admin/'+c._id" alt=""></figure>
                                <!-- <h4>{{c.title}} <i class="pending">Pending</i></h4> -->
                                <h4>{{c.title}}</h4>
                                <ul class="course_list">
                                    <li><strong>Requirement</strong> {{c.requirement}}</li>
                                    <li><strong>What You Learn</strong> {{c.whatYouLearn}}</li>
                                    <li><strong>Category</strong> {{c.category[0].name}}</li>
                                    <li><strong>Teacher</strong> {{c.user[0].firstName}} {{c.user[0].lastName}}</li>
                                </ul>
                                <h6>Course description</h6> 
                                <p>{{c.description}}</p>
                                <ul class="buttons" v-if="type=='unverified'">
                                    <li @click.prevent="manageCourse('verify',c._id)"><a href="#0" class="btn_1 gray approve"><i class="fa fa-fw fa-check-circle-o"></i> Approve</a></li>
                                    <router-link :to="'/SAcourse/'+c._id">
                                    <li><a href="#0" class="btn_1 gray approve"><i></i> View </a></li>
                                    </router-link>
                                </ul>
                                <ul class="buttons" v-else>
                                    <li @click.prevent="manageCourse('block',c._id)"><a href="#0" class="btn_1 gray delete"><i class="fa fa-fw fa-times-circle-o"></i> Block </a></li>
                                    <router-link :to="'/SAcourse/'+c._id">
                                    <li><a href="#0" class="btn_1 gray approve"><i></i> View </a></li>
                                    </router-link>
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
import { mapActions, mapGetters } from "vuex";
export default {
    data(){
        return{
            courses: '',
            skip: 0,
            type: 'unverified',
            Loading: false
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
        ...mapActions(['fetchAllCourses__Admin','manageVerifyCourse_Admin']),
        switchVerified(type){
            this.type = type
            this.skip = 0
            this.Loading = true
            if (type=="verified") {
                this.fetchAllCourses__Admin(this.type,this.skip)
                .then(res => {
                    this.courses = res.data
                    this.Loading = false
                })
            }else{
                this.fetchAllCourses__Admin(this.type,this.skip)
                .then(res => {
                    this.courses = res.data
                    this.Loading = false
                })
            }
        },
        manageCourse(type,courseId){
            this.Loading = true
            let object ={
                courseId: courseId, 
                actionType : type,
                courseType : this.type
            }
            this.manageVerifyCourse_Admin(object)
            .then(res => {
                this.courses = res.data
                this.Loading = false
                this.Success = true
            })
        }
    },
    mounted(){
        this.fetchAllCourses__Admin(this.type,this.skip)
        .then(res => {
            this.courses = res.data
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
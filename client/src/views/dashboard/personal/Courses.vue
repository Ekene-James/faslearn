<template>
    <div>
        <Modal>
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true" style="background-color: #b2bdb5">
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingOne">
                        <div class="panel-title adcrse1250">
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                View Course Affiliation Details
                            </a>
                        </div>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                        <div class="panel-body adcrse_body">
                            <div class="row">
                                <div class="col-lg-6 col-md-6">	
                                    <div class="ui search focus mt-20 lbel25">
                                        <label>Instructor</label>
                                        <div class="ui left icon input swdh19">
                                            <p>{{affiliationObject.user[0].firstName}} {{affiliationObject.user[0].lastName}}</p>
                                            <p>{{affiliationObject.user[0].email}}</p>																
                                        </div>
                                        <label>Instructor Email</label>
                                        <div class="ui left icon input swdh19">
                                            <p>{{affiliationObject.user[0].email}}</p>																
                                        </div>
                                    </div>										
                                </div>
                                <div class="col-lg-6 col-md-6">	
                                    <div class="ui search focus mt-20 lbel25">
                                        <h4>Affiliated Institions for this Course</h4>
                                        <div class="ui left icon input swdh19">
                                            <ol>
                                                <li v-for="a in affiliationObject.affiliatedInstitutions" :key="a"><strong>{{a.institutionId[0].institutionName}}</strong> <span style="color: red; font-size: 10px">{{a.institutionId[0].institutionType}}</span></li>
                                            </ol>														
                                        </div>
                                    </div>
                                    <div class="ui search focus mt-20 lbel25">
                                        <div class="col-lg-6 col-md-6">	
                                            <router-link :to="'/Dcoursedetail/'+affiliationObject._id">
                                            <button class="discount_btn" type="submit">View More Details</button>	
                                            </router-link>								
                                        </div>
                                    </div>										
                                </div>
                                
                                <div class="col-lg-6 col-md-6">
                                    <h4>Course</h4>
                                    <div class="mt-20 lbel25">	
                                        <label>{{affiliationObject.title}}</label>
                                        <p>{{affiliationObject.secondTitle}}</p>
                                    </div>
                                    <div class="mt-20 lbel25">
                                        <i>whatYouLearn</i>	
                                        <p>{{affiliationObject.whatYouLearn}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><br>
                    <Loading v-if="Loading" />
                    <Success v-if="success">
                        <ul>
                            <li>Action Successful</li>
                        </ul>
                    </Success>
                    <div class="responds" v-for="a in affiliationObject.affiliatedInstitutions" :key="a">
                        <div v-if="a.institutionId[0].user[0] == userId&&!a.accepted&&!a.rejected">	
                            <button class="discount_btn" type="button" @click.prevent="manageAffiliation('grant',a._id)" style="background-color: green; display: inline-block; ">Accept Affiliation for {{a.institutionId[0].institutionName}}</button>
                            <button class="discount_btn" type="button" @click.prevent="manageAffiliation('deny',a._id)" style="display: inline-block; ">Deny Affiliation for {{a.institutionId[0].institutionName}}</button>									
                        </div>
                    </div>
                </div>
            </div>
	    </Modal>

        <Dheader />

        <Dnav2 />
        
        <div class="wrapper">
            <div class="sa4d25">
                <div class="container-fluid">			
                    <div class="row">
                        <div class="col-lg-12">	
                            <h2 class="st_title"><i class="uil uil-book-alt"></i>Courses</h2>
                        </div>			
                        <div class="col-md-12" v-if="isInstructor||isAdmin">
                            <div class="card_dash1">
                                <div class="card_dash_left1"> 
                                    <i class="uil uil-book-alt"></i>
                                    <h1>Jump Into Course Creation</h1>
                                </div>
                                <router-link to="/Dnewcourse">
                                <div class="card_dash_right1">
                                    <button class="create_btn_dash" type="button">Create Your Course</button>
                                </div>
                                </router-link>
                            </div>
                        </div>					
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="my_courses_tabs">
                                <ul class="nav nav-pills my_crse_nav" id="pills-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="pills-my-courses-tab" data-toggle="pill" href="#pills-my-courses" role="tab" aria-controls="pills-my-courses" aria-selected="true"><i class="uil uil-download-alt"></i>My Purchases</a>
                                    </li>
                                    <li class="nav-item" v-if="isAdmin||isInstructor">
                                        <a class="nav-link" id="pills-my-purchases-tab" data-toggle="pill" href="#pills-my-purchases" role="tab" aria-controls="pills-my-purchases" aria-selected="false"><i class="uil uil-book-alt"></i>My Courses</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="pills-upcoming-courses-tab" data-toggle="pill" href="#pills-upcoming-courses" role="tab" aria-controls="pills-upcoming-courses" aria-selected="false"><i class="uil uil-upload-alt"></i>Suggested Courses</a>
                                    </li>
                                    <li class="nav-item" v-if="isAdmin">
                                        <a class="nav-link" id="pills-discount-tab" data-toggle="pill" href="#pills-discount" role="tab" aria-controls="pills-discount" aria-selected="false"><i class="uil uil-tag-alt"></i>Affiliations Request</a>
                                    </li>
                                    <li class="nav-item" v-if="isAdmin||isInstructor">
                                        <a class="nav-link" id="pills-promotions-tab" data-toggle="pill" href="#pills-promotions" role="tab" aria-controls="pills-promotions" aria-selected="false"><i class="uil uil-megaphone"></i>Promotions</a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade show active" id="pills-my-courses" role="tabpanel">
                                        <div class="table-responsive mt-30">
                                            <table class="table ucp-table">
                                                <thead class="thead-s">
                                                    <tr>
                                                        <th class="text-center" scope="col">Item No.</th>
                                                        <th>Title</th>
                                                        <th class="text-center" scope="col">2nd Title</th>
                                                        <!-- <th class="text-center" scope="col">Sales</th>
                                                        <th class="text-center" scope="col">Parts</th> -->
                                                        <th class="text-center" scope="col">Category</th>
                                                        <th class="text-center" scope="col">Status</th>
                                                        <th class="text-center" scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="p in purchasedCourses" :key="p">
                                                        <td class="text-center">{{1+(purchasedCourses.indexOf(p))}}</td>
                                                        <td>{{p.title}}</td>
                                                        <td class="text-center">{{p.secondTitle}}</td>
                                                        <!-- <td class="text-center">15</td>
                                                        <td class="text-center">5</td> -->
                                                        <td class="text-center"><a href="#">{{p.category[0].name}}</a></td>
                                                        <td class="text-center"><b class="course_active">Active</b></td>
                                                        <router-link :to="'/Dcoursedetail/'+p._id">
                                                        <td class="text-center">
                                                            <a href="#" title="Edit" class="gray-s"><i class="uil uil-eye"></i></a>
                                                        </td>
                                                        </router-link>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <br><br><br>
                                        <center>
                                            <button class="live_link" type="button" v-if="!Loading" @click="fetchMore('instructorSkip')">Load More</button>	
                                        </center>
                                        <br><br><br>
                                    </div>
                                    <div class="tab-pane fade" id="pills-my-purchases" role="tabpanel">
                                        <div class="table-responsive mt-30">
                                            <table class="table ucp-table">
                                                <thead class="thead-s">
                                                    <tr>
                                                        <th class="text-center" scope="col">Item No.</th>
                                                        <th class="cell-ta" scope="col">Title</th>
                                                        <th class="text-center" scope="col">2nd Title</th>
                                                        <!-- <th class="cell-ta" scope="col">Vendor</th> -->
                                                        <th class="cell-ta" scope="col">Category</th>
                                                        <!-- <th class="text-center" scope="col">Delivery Type</th> -->
                                                        <!-- <th class="text-center" scope="col">Price</th>
                                                        <th class="text-center" scope="col">Purchase Date</th> -->
                                                        <th class="text-center" scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="p in myCourses" :key="p">
                                                        <td class="text-center">{{1+(myCourses.indexOf(p))}}</td>
                                                        <td class="cell-ta">{{p.title}}</td>
                                                        <td class="text-center">{{p.secondTitle}}</td>
                                                        <!-- <td class="cell-ta"><a href="#">Zoena Singh</a></td> -->
                                                        <td class="cell-ta">{{p.category[0].name}}</td>
                                                        <!-- <td class="text-center"><b class="course_active">Download</b></td> -->
                                                        <!-- <td class="text-center">$15</td>
                                                        <td class="text-center">25 March 2020</td> -->
                                                        <td class="text-center">
                                                            <router-link :to="'/Deditcourse/'+p._id">
                                                            <a title="Edit" class="gray-s"><i class="uil uil-edit-alt"></i></a>
                                                            </router-link>
                                                            <a title="Delete" class="gray-s" @click="deleteCourse(p._id,p.title)"><i class="uil uil-trash-alt"></i></a>
                                                            <router-link :to="'/Dcoursedetail/'+p._id">
                                                            <a title="View" class="gray-s"><i class="uil uil-eye"></i></a>
                                                            </router-link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>	
                                        <br><br><br>
                                        <center>
                                            <button class="live_link" type="button" v-if="!Loading" @click="fetchMore('myPurchaseSkip')">Load More</button>	
                                        </center>
                                        <br><br><br>							
                                    </div>
                                    <div class="tab-pane fade" id="pills-upcoming-courses" role="tabpanel">
                                        <div class="table-responsive mt-30">
                                            <table class="table ucp-table">
                                                <thead class="thead-s">
                                                    <tr>
                                                        <th class="text-center" scope="col">Item No.</th>
                                                        <th class="cell-ta" scope="col">Title</th>
                                                        <th class="text-center" scope="col">2nd Title</th>
                                                        <th class="cell-ta" scope="col">Category</th>
                                                        <th class="text-center" scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="p in recentCourses" :key="p">
                                                        <td class="text-center">{{1+(recentCourses.indexOf(p))}}</td>
                                                        <td class="cell-ta">{{p.title}}</td>
                                                        <td class="text-center">{{p.secondTitle}}</td>
                                                        <!-- <td class="cell-ta"><a href="#">Zoena Singh</a></td> -->
                                                        <td class="cell-ta">{{p.category[0].name}}</td>
                                                        <td class="text-center">
                                                            <router-link :to="'/Dcoursedetail/'+p._id">
                                                            <a href="#" title="Edit" class="gray-s"><i class="uil uil-eye"></i></a>
                                                            </router-link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <br><br><br>
                                        <center>
                                            <button class="live_link" type="button" v-if="!Loading" @click="fetchMore('myCourseSkip')">Load More</button>	
                                        </center>
                                        <br><br><br>
                                    </div>
                                    <div class="tab-pane fade" id="pills-discount" role="tabpanel">
                                        <div class="table-responsive mt-30">
                                            <table class="table ucp-table">
                                                <thead class="thead-s">
                                                    <tr>
                                                        <th class="text-center" scope="col">Item No.</th>
                                                        <th class="cell-ta">Course</th>
                                                        <th class="text-center" scope="col">Category</th>
                                                        <th class="text-center" scope="col">Price</th>
                                                        <th class="text-center" scope="col">Percentage</th>
                                                        <th class="text-center" scope="col">Status</th>
                                                        <th class="text-center" scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="a in myAffiliations" :key="a">
                                                        <td class="text-center">{{1+(myAffiliations.indexOf(a))}}</td>
                                                        <td class="cell-ta">{{a.title}}</td>
                                                        <td class="text-center">{{a.category[0].name}}</td>
                                                        <td class="text-center">{{a.price.$numberDecimal}}</td>
                                                        <td class="text-center">{{(1/(a.affiliatedInstitutions.length+1))*100}}%</td>
                                                        <td class="text-center">
                                                            <b class="course_active" v-for="i in a.affiliatedInstitutions" :key="i">
                                                                <i v-if="i.institutionId[0].user[0]==userId && i.accepted" style="color: green">
                                                                    Active
                                                                </i>
                                                                <i v-if="i.institutionId[0].user[0]==userId && !i.accepted">
                                                                    Pending
                                                                </i>
                                                            </b>
                                                        </td>
                                                        <td class="text-center">
                                                            <a title="View Details" class="gray-s" @click="activateModal(a._id)"><i class="uil uil-eye"></i></a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="pills-promotions" role="tabpanel" aria-labelledby="pills-promotions-tab">
                                        <div class="promotion_tab mb-10">
                                            <img src="../assets/images/dashboard/promotion.svg" alt="">
                                            <h4>This feature is not available yet</h4>
                                            <p>We will make sure we bring this feature to you as soon as posible</p>
                                            <button class="plan_link_btn" onclick="window.location.href = '#';">Coming soon</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dfooter />
        </div>
    </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Dheader from '@/components/dashboard/Header.vue'
import Dnav2 from '@/components/dashboard/Nav2.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
import Modal from "@/components/Modal.vue";
import Loading from "@/components/Loading.vue"
import Success from "@/components/Success.vue"
export default {
    name: 'Dhome',
    data(){
        return{
            userId: '',
            purchasedCourses: '',
            myCourses: '',
            myAffiliations: '',
            Loading: false,
            success: false,
            courseId: '',
            recentCourses: '',
            affiliationObject: { user: [{firstName: '', lastName: '', email: ''}] },
            myCourseSkip: 0,
            myPurchaseSkip: 0,
            instructorSkip: 0,
            affiliateSkip : 0
        }
    },
    components: {
        Dheader,
        Dnav2,
        Dfooter,
        Modal,
        Success,
        Loading
    }, 
    computed: {
        ...mapGetters(['isInstructor']),
        ...mapGetters(['isAdmin'])
    }, 
    methods: {
        ...mapActions(['fetch_purchased_courses']),
        ...mapActions(['fetch_recent_courses']),
        ...mapActions(['fetchInstructorCourse']),
        ...mapActions(['delete_course']),
        ...mapActions(['fetchAll_InstitutionCourseAffiliations']),
        ...mapActions(['manage_CourseAffiliations']),
        deleteCourse(id,name){
            if (confirm("Do you REALLY want to delete "+name+" ?")) {
                this.delete_course(id)
				.then(res => {
					this.myCourses = res.data.courses
				})
            }else{
                alert('ok, we will ignore your delete request')
            }
            
        },
        manageAffiliation(typee,affiliationId){
            this.Loading = true
            let object = {
                institutionAdminUserId: this.userId,
                courseId: this.courseId,
                affiliatedInstitutionsId: affiliationId,
                type: typee
            }
            this.manage_CourseAffiliations(object)
            .then(res => {
                this.myAffiliations = res.data,
                this.success= true,
                this.Loading = false,
                this.affiliationObject= { user: [{firstName: '', lastName: '', email: ''}] }
            })
        },
        activateModal(courseId){
            this.courseId = courseId
            this.success= false
            for (let i = 0; i < this.myAffiliations.length; i++) {
                const element = this.myAffiliations[i];
                if (element._id==this.courseId) {
                   this.affiliationObject = element 
                }
            }
            let modal = document.getElementById('myModal');
            modal.setAttribute("class", "modal vd_mdl fade show");
            modal.style.display = 'block';
        },
        fetchMore(type){
            this.Loading = true
            switch (type) {
                case 'myCourseSkip':
                   this.myCourseSkip = this.myCourseSkip + 10
                   this.fetch_recent_courses(this.myCourseSkip)
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            const element = res.data[i];
                            this.recentCourses.push(element)
                        }
                        this.Loading = false
                    })
                    break;
                case 'myPurchaseSkip':
                    this.myPurchaseSkip = this.myPurchaseSkip + 10
                    this.fetch_purchased_courses({user_id: this.userId, skip: this.myPurchaseSkip})
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            const element = res.data[i];
                            this.purchasedCourses.push(element)
                        }
                        this.Loading = false
                    })
                    break;
                case 'instructorSkip':
                    this.instructorSkip = this.instructorSkip + 10
                    this.fetchInstructorCourse({instructor_id: this.userId, skip: this.instructorSkip})
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            const element = res.data[i];
                            this.myCourses.push(element)
                        }
                        this.Loading = false
                    })
                    break;
            
                default:
                    break;
            }
        }
    }, 
    mounted(){
        this.userId = localStorage.getItem('fmruser');
        this.fetch_purchased_courses({user_id: this.userId, skip: this.myPurchaseSkip})
        .then(res => {
            this.purchasedCourses = res.data
        })
        this.fetch_recent_courses(this.myCourseSkip)
        .then(res => {
            this.recentCourses = res.data
        })

        if (this.isInstructor||this.isAmin) {
            this.fetchInstructorCourse({instructor_id: this.userId, skip: this.instructorSkip})
            .then(res => {
                this.myCourses = res.data
            })

            this.fetchAll_InstitutionCourseAffiliations({user_id: this.userId})
            .then(res=> {
                this.myAffiliations = res.data
            })
        }
    }
}
</script>
<style>
    @import url("../assets/css/style.css");
    @import url("http://fonts.googleapis.com/css?family=Roboto:400,700,500");
    @import url("../assets/vendor/unicons-2.0.1/css/unicons.css");
    @import url("../assets/css/instructor-dashboard.css");
    @import url("../assets/css/vertical-responsive-menu.min.css");
    @import url("../assets/css/instructor-dashboard.css");
    @import url("../assets/css/instructor-responsive.css");
    @import url("../assets/css/responsive.css");
    @import url("../assets/css/night-mode.css");
    @import url("../assets/vendor/fontawesome-free/css/all.min.css");
    @import url("../assets/vendor/OwlCarousel/assets/owl.carousel.css");
    @import url("../assets/vendor/OwlCarousel/assets/owl.theme.default.min.css");
    @import url("../assets/vendor/bootstrap/css/bootstrap.min.css");
    @import url("../assets/vendor/semantic/semantic.min.css");

    .modal-body{
        max-height: 600px;
        overflow-y: scroll;
    }
    
</style>
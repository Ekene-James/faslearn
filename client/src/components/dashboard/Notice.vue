<template>
    <div class="channel_my item all__noti5" >
        <router-link :to="routeLink">
            <div class="profile_link">
                <div style="width: 50px; height: 50px; margin-right: 10px">
                <!-- <img src="assets/images/left-imgs/img-1.jpg" alt="">   -->
                    <ProfileImage :id="notice.userFrom" />
                </div>
                <div class="pd_content">
                    <span class="spanNew" v-if="!notice.seen">New</span>
                    <h6>{{name}}</h6> 
                    <p class="noti__text5">{{content}}  <strong> {{item}}</strong>.</p>
                    <span class="nm_time">{{notice.updatedAt}}</span>
                </div>
                                            
            </div>
        </router-link>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import ProfileImage from "@/components/ProfileImage";
export default {
    name: 'notice',
    data(){
        return{
            content: '',
            name: '',
            item: '',
            routeLink: ''
        }
    },
    props: {
        notice : Object
    },
    components: {
        ProfileImage
    },
    methods:{
        ...mapActions(['fetch_SubscribtionNotification']),
        ...mapActions(['fetch_AdmissionRequestNotification']),
        ...mapActions(['fetch_AdmissionResponseNotification']),
        ...mapActions(['fetch_EmploymentRequestNotification']),
        ...mapActions(['fetch_EmploymentResponseNotification']),
        ...mapActions(['fetch_AffiliationResponseNotification']),
        ...mapActions(['fetch_AffiliationRequestNotification']),
        ...mapActions(['fetch_PurchasedCourseNotification']),
        ...mapActions(['fetch_NewCourseNotification'])
    },
    mounted(){
        switch (this.notice.type) {
            case 'purchasedCourse':
                this.fetch_PurchasedCourseNotification(this.notice)
                .then(res => {
                    this.name = res.data.from.firstName+" "+res.data.from.lastName
                    this.content = res.data.from.firstName+" "+res.data.from.lastName+" has recently purchased your course"
                    this.item = res.data.course.title
                    this.routeLink = '/Dcoursedetail/'+res.data.course._id
                })
                break;
            case 'newCourseForSubscribers':
                this.fetch_NewCourseNotification(this.notice)
                .then(res => {
                    this.name = res.data.from.firstName+" "+res.data.from.lastName
                    this.content = res.data.from.firstName+" "+res.data.from.lastName+" recently Added a new course"
                    this.item = res.data.course.title
                    this.routeLink = '/Dcoursedetail/'+res.data.course._id
                })
                break;
            case 'newCourseFroAdmission':
                this.fetch_NewCourseNotification(this.notice)
                .then(res => {
                    this.name = res.data.from.firstName+" "+res.data.from.lastName
                    this.content = res.data.from.firstName+" "+res.data.from.lastName+" recently Added a new course to an institution where you are a student"
                    this.item = res.data.course.title
                    this.routeLink = '/Dcoursedetail/'+res.data.course._id
                })
                break;
            case 'affiliationResponse':
                this.fetch_AffiliationResponseNotification(this.notice)
                .then(res => {
                    this.name = res.data.from.firstName+" "+res.data.from.lastName
                    this.content = res.data.from.firstName+" "+res.data.from.lastName+" has responded to your affiliation request in the course"
                    this.item = res.data.course.title
                    this.routeLink = '/Dcoursedetail/'+res.data.course._id
                })
                break;
            case 'affiliationRequest':
                this.fetch_AffiliationRequestNotification(this.notice)
                .then(res => {
                    this.name = res.data.from.firstName+" "+res.data.from.lastName
                    this.content = res.data.from.firstName+" "+res.data.from.lastName+" has applied for the following course to be affiliated to your institution"
                    this.item = res.data.course.title
                    this.routeLink = '/Dcoursedetail/'+res.data.course._id
                })
                break;
            case 'employmentResponse':
                this.fetch_EmploymentResponseNotification(this.notice)
                .then(res => {
                    this.name = res.data.from.firstName+" "+res.data.from.lastName
                    this.content = res.data.from.firstName+" "+res.data.from.lastName+" has "+res.data.status+" your apllication to be a lecturer in the institution"
                    this.item = res.data.institution.institutionName
                    this.routeLink = '/Dinstitude/'+res.data.institution._id
                })
                break;
            case 'employmentRequest':
                this.fetch_EmploymentRequestNotification(this.notice)
                .then(res => {
                    this.name = res.data.from.firstName+" "+res.data.from.lastName
                    this.content = res.data.from.firstName+" "+res.data.from.lastName+" has applied to be a lecturer in your institution"
                    this.item = res.data.institution.institutionName
                    this.routeLink = '/Dinstitude/'+res.data.institution._id
                })
                break;
            case 'admissionResponse':
                this.fetch_AdmissionResponseNotification(this.notice)
                .then(res => {
                    this.name = res.data.from.firstName+" "+res.data.from.lastName
                    this.content = res.data.from.firstName+" "+res.data.from.lastName+" has "+res.data.status+" your admission to the institution"
                    this.item = res.data.institution.institutionName
                    this.routeLink = '/Dinstitude/'+res.data.institution._id
                })
                break;
            case 'admissionRequest':
                this.fetch_AdmissionRequestNotification(this.notice)
                .then(res => {
                    this.name = res.data.from.firstName+" "+res.data.from.lastName
                    this.content = res.data.from.firstName+" "+res.data.from.lastName+" has requested to be a student in your institution"
                    this.item = res.data.institution.institutionName
                    this.routeLink = '/Dinstitude/'+res.data.institution._id
                })
                break;
            case 'subsciption':
                this.fetch_SubscribtionNotification(this.notice)
                .then(res => {
                    this.name = res.data.from.firstName+" "+res.data.from.lastName
                    this.content = res.data.from.firstName+" "+res.data.from.lastName+" and "+res.data.subscribes+" others are now subscribers"
                    this.routeLink = '/Dprofile/'+res.data.from._id
                })
                break;
        
            default:
                this.content = this.notice
                break;
        }
    }
    
}
</script>
<style >
    .spanNew{
        padding: 2px;
        background-color: green;
        border-radius: 4px;
    }
</style>
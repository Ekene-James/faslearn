<template>
    <div>
        <!-- Header Start -->
        <!-- <header class="invoice_header clearfix">
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-8">
                        <div class="invoice_header_main">
                            <div class="invoice_header_item">
                                <div class="invoice_logo">
                                    <a href="index.html"><img src="assets/images/ct_logo.svg" alt=""></a>
                                </div>
                                <p>Invoice</p>
                            </div>						
                        </div>						
                    </div>		
                </div>
            </div>
        </header> -->
        <!-- Header End -->
        <!-- Body Start -->
        <div class="wrapper _bg4586 _new89 p-0">		
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-md-8">
                        <div class="cert_body">
                            <div class="center_body">
                                <div class="line">
                                    <div class="innerline">

                                    </div>
                                </div>
                                <div class="parts">
                                    <center>
                                        <h1 style="display: block">CERTIFICATE</h1>
                                        <h4 style="display: block">of achievement</h4>
                                    </center>
                                </div>
                                <center>
                                    <div class="divider">
                                        <div class="side"></div>
                                        <div class="middle"></div>
                                        <div class="side"></div>
                                    </div>
                                </center>
                                <div class="parts" style="margin-bottom: 25px">
                                    <center>
                                        <h3>{{certCourse.title}}</h3>
                                        <p style="font-size: 13px;">This is to certify that 
                                            <br><strong style="font-size: 15px;">{{certUser.firstName}} {{certUser.lastName}},</strong><br>
                                             has completed this course 
                                             on faslearn with a tested knowledge of
                                             <br><strong style="font-size: 15px;">{{((certTestLog[0].result/certTestLog[0].total)*100).toFixed(2)}}</strong><br> </p>
                                    </center>
                                </div>
                                <div class="parts">
                                    <div class="left">
                                        <!-- <img src="./assets/images/tags.png" alt=""> -->
                                        <img src="../../assets/faslearnBlack.png" alt="">
                                    </div>
                                    <div class="right">
                                        <div class="signature">
                                            <img :src="backEnd+'auth/fetchUserCredential/'+certCourse.user[0]._id+'/signature'" alt="" v-if="certCourse.user[0]._id!=''">
                                            <p style="font-size: 12px;">{{certCourse.user[0].firstName}} {{certCourse.user[0].lastName}}</p>
                                            <small>Course Instructor</small>
                                        </div>
                                        <div class="signature" v-if="myInstitution!=''">
                                            <img :src="backEnd+'public/institutionImage__public/'+certCourse.affiliatedInstitutions[0].institutionId[0]._id" alt="" v-if="certCourse.affiliatedInstitutions[0].institutionId[0]._id!=''" style="border-radius: 50%;">
                                            <p style="font-size: 12px;">{{certCourse.affiliatedInstitutions[0].institutionId[0].institutionName}}</p>
                                            <small>Institution Admin</small>
                                        </div>
                                        <div class="signature">
                                            <img src="./assets/images/sign.jpg" alt="">
                                            <p style="font-size: 12px;">A. Magabo</p>
                                            <small>Faslearn President</small>
                                        </div>
                                        <p style="font-size: 12px;"><i>DATE : </i><b id="date"></b></p>
                                    </div>
                                </div>
                                <div class="line">
                                    <div class="innerline">
                                        <center><i style="color: grey">token: {{certTestLog[0]._id}}</i></center>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="invoice_date_info">
                                <ul>
                                    <li><div class="vdt-list"><span>Date :</span>10 April 2020</div></li>
                                    <li><div class="vdt-list"><span>Invoice No :</span>IVIP12023598</div></li>
                                    <li><div class="vdt-list"><span>Order ID :</span>1258963487</div></li>
                                </ul>
                            </div>
                            <div class="invoice_dts">
                                <div class="row">
                                    <div class="col-md-12">
                                        <h2 class="invoice_title">Invoice</h2>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="vhls140">
                                            <h4>To</h4>
                                            <ul>
                                                <li><div class="vdt-list">Rock William</div></li>
                                                <li><div class="vdt-list">133, Dracut</div></li>
                                                <li><div class="vdt-list">Massachusetts</div></li>
                                                <li><div class="vdt-list">01826</div></li>
                                                <li><div class="vdt-list">United States</div></li>
                                            </ul>
                                        </div>		
                                    </div>
                                    <div class="col-md-6">
                                        <div class="vhls140">
                                            <h4>Cursus</h4>
                                            <ul>
                                                <li><div class="vdt-list">Cursus LTD</div></li>
                                                <li><div class="vdt-list">#1234, Shahid karnail Singh Nagar,</div></li>
                                                <li><div class="vdt-list">Near MBD Mall,</div></li>
                                                <li><div class="vdt-list">141001</div></li>
                                                <li><div class="vdt-list">Ludhiana </div></li>
                                                <li><div class="vdt-list">Punjab </div></li>
                                                <li><div class="vdt-list">India </div></li>
                                            </ul>
                                        </div>		
                                    </div>
                                </div>
                            </div>
                            <div class="invoice_table">
                                <div class="table-responsive-md">
                                    <table class="table table-borderless">
                                        <thead>
                                            <tr>
                                            <th scope="col">Item</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Vat(20%)</th>
                                            <th scope="col">Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">
                                                    <div class="user_dt_trans">
                                                        <p>Item Title</p>
                                                    </div>
                                                </th>
                                                <td>
                                                    <div class="user_dt_trans">														
                                                        <p>$79.00</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="user_dt_trans">
                                                        <p>$10.00</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="user_dt_trans">														
                                                        <p>$89.00</p>
                                                    </div>
                                                </td>												
                                            </tr>
                                            <tr>
                                                <td colspan="1"></td>
                                                <td colspan="3">
                                                    <div class="user_dt_trans jsk1145">														
                                                        <div class="totalinv2">Invoice Total : USD $220.00</div>
                                                        <p>Paid via Paypal</p>
                                                    </div>
                                                </td>												
                                            </tr>											
                                        </tbody>
                                    </table>														
                                </div>
                            </div> -->
                            
                        </div>
                        <div class="invoice_footer">
                            <div class="leftfooter">
                                <p>please wait till u can see all the signatures before you print Thanks.</p>
                            </div>
                            <div class="righttfooter">
                                <a class="print_btn" href="javascript:window.print();">Print</a> 
                            </div>
                        </div> 
                    </div>
                </div>
            </div>	
        </div>
        <!-- Body End -->
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
//import Loading from '@/components/Loading.vue'
export default {
	name: 'Dcertificate',
	data() {
        return{
            userId: '',
            testId: '',
            courseId: '',
            test : '',
            certUser : {firstName: '', lastName: ''},
            certTestLog :  [{result: '', total: '', _id: ''}],
            certCourse: {title: '', user: [{firstName: '', lastName: '', _id: ''}], affiliatedInstitutions: [{institutionId: [{institutionName: '', _id: ''}]}]},
            myInstitution: ''
        }
    },
    computed: {
        ...mapGetters(['backEnd'])
    },
	methods: {
        ...mapActions(['fetch_StudentCertificate']),
        writeDate(){
            var d = (new Date()).toString().split(' ').splice(1,3).join(' ');
            document.getElementById('date').innerHTML = d
        },
        checkInstitution(){
            if (this.certCourse.affiliatedInstitutions != ''&&this.certCourse.affiliatedInstitutions != null) {
                for (let i = 0; i < this.certCourse.affiliatedInstitutions.length; i++) {
                    const element = this.certCourse.affiliatedInstitutions[i];
                    if (!element.accepted) {
                        for (let j = 0; j < this.certUser.admission.length; j++) {
                            const elementj = this.certUser.admission[j];
                            //this.myInstitution = element
                            if (elementj.accepted&&elementj.institutionId[0]==element.institutionId[0]._id) {
                                this.myInstitution = element
                            }
                        }
                    }
                }
            }
        }
        // checkInstitution(){
        //     if (this.certCourse.affiliatedInstitutions != ''&&this.certCourse.affiliatedInstitutions != null) {
        //         for (let i = 0; i < this.certCourse.affiliatedInstitutions.length; i++) {
        //             const element = this.certCourse.affiliatedInstitutions[i];
        //             if (!element.accepted) {
        //                 for (let j = 0; j < this.certUser.admission.length; j++) {
        //                     const elementj = this.certUser.admission[j];
        //                     //this.myInstitution = element
        //                     if (!elementj.accepted&&elementj.institutionId[0]==element.institutionId[0]._id) {
        //                         this.myInstitution = element
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    },   //
    mounted(){
        this.userId = localStorage.getItem('fmruser');
        this.courseId = this.$route.params.courseId;
        this.testId = this.$route.params.testId;
        this.writeDate();
        let object = {
            user : this.userId, 
            test : this.testId, 
            course : this.courseId
        }
        this.fetch_StudentCertificate(object)
        .then(res => {
            this.certUser = res.data.userDetails
            this.certTestLog = res.data.testLog
            this.certCourse = res.data.courseDetails
            this.checkInstitution()
        })
	}
}
</script>
<style scoped>
	@import url("./assets/css/style.css");
    @import url("http://fonts.googleapis.com/css?family=Roboto:400,700,500");
    @import url("./assets/vendor/unicons-2.0.1/css/unicons.css");
    @import url("./assets/css/instructor-dashboard.css");
    @import url("./assets/css/vertical-responsive-menu.min.css");
    @import url("./assets/css/instructor-dashboard.css");
    @import url("./assets/css/instructor-responsive.css");
    @import url("./assets/css/responsive.css");
    @import url("./assets/css/night-mode.css");
    @import url("./assets/vendor/fontawesome-free/css/all.min.css");
    @import url("./assets/vendor/bootstrap/css/bootstrap.min.css");
    @import url("./assets/vendor/semantic/semantic.min.css");
	
	.cert_body{
        width: 100%;
        height: 850px;
        /* background-color: darkslategray; */
        align-items: center;
        padding-top: 5%;
    }

    h1{
        font-family : Fantasy;
        font-size: 50px;
    }

    h4{
        font-family: cursive;
        margin-top: 0px;
    }
    p{
        font-family: cursive;
        font-size: 16px;
        width: 70%;

    }
/* #EF6421 */
    .center_body{
        width: 95%;
        height: 95%;
        margin-left: 2.5%;
        background-color: white;
        border: 20px solid white;
        box-shadow: 1px 1px 2px #ebe0e7, 0 0 25px darkslategray, 0 0 5px darkblue;
    }
    .divider{
        width: 70%;
        height: 30px;
        background-color: white;
        margin: 0px;
        padding: 0px;
    }
    .side{
        width: 45%;
        display: inline-block;
        height: 2px;
        background-image: linear-gradient(to bottom right, darkslategray, #ebe0e7)
    }
    .middle{
        display: inline-block;
        height: 100%;
        width: 10%;
        border-radius: 50%;
        border: 2px solid red;
    }
    .parts{
        width: 100%;
        height: 24%;
        background-color: white;
        padding: 10px;
    }

    .parts .left{
        float: left;
        width: 40%;
        height: 100%;
    }

    .parts .left img{
        width: 100%;
        height: 70%;
        border-radius: 50%;
    }

    .parts .right{
        float: right;
        width: 60%;
        height: 100%;
    }

    .line{
        width: 100%;
        height: 5%;
        background-color: #ebe0e7;
        border-top: 5px solid #EF6421;
        border-bottom: 5px solid #EF6421;
    }

    .signature{
        width: 30%;
        display: inline-block;
        font-size: 12px;
        margin-right: 3%;
    }
    .signature img{
        height: 70%;
        width: 70%;
    }

</style>
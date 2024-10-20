<template>
    <div>
        <Dheader />

        <Dnav2 />
        <div class="wrapper">
            <div class="sa4d25">
                <div class="container-fluid">			
                    <div class="row">
                        <div class="col-lg-12">	
                            <h2 class="st_title"><i class="uil uil-file-alt"></i>Earning Statements</h2>
                        </div>					
                    </div>				
                    <div class="row">					
                        <div class="col-lg-8 col-md-7">
                            <div class="top_countries mt-30">
                                <div class="top_countries_title">
                                    <h2>₦ Earnings</h2>
                                </div>
                                <div class="statement_content">
                                    <p class="tt-body">Your earnings history</p>
                                    <table class="statement-summary__table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <p class="t-heading">From Courses</p>
                                                </th>
                                                <th>
                                                    <p class="t-heading">Courses Affiliations</p>
                                                </th>
                                                <th>
                                                    <p class="t-heading">From My Affilate links</p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="statement-summary__funds">
                                                    <p class="js-earnings__instructor-funds-wrapper">
                                                        <span class=""></span>
                                                        <span class="js-earnngs__instructor-funds t-currency">₦{{totalBalance}}</span>
                                                    </p>
                                                </td>
                                                <td class="statement-summary__earnings">
                                                    <p class="js-earnings__earnings-wrapper">
                                                        <span class="tt__earning">+</span>
                                                        <span class="js-earnings__earnings t-currency">₦00.00</span>
                                                    </p>
                                                </td>
                                                <td class="statement-summary__fees">
                                                    <p class="js-earnings__fees-wrapper">
                                                        <span class="tt__earning">-</span>
                                                        <span class="js-earnings__fees t-currency">₦00.00</span>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>			
                        </div>
                        <div class="col-lg-4 col-md-5">
                            <div class="top_countries mt-30">
                                <div class="top_countries_title">
                                    <h2>Total Income</h2>
                                </div>
                                <div class="statement_invoice_content">
                                    <div class="date_selector mt-0">
                                        <div class="ui selection dropdown skills-search vchrt-dropdown invoice-dropdown">
                                            <input name="date" type="hidden" value="default">
                                            <i class="dropdown icon d-icon"></i>
                                            <div class="text">₦{{totalBalance}}</div>
                                        </div>
                                        <button class="st_download_btn"><i class="uil uil-download-alt"></i></button>
                                    </div>
                                </div>
                            </div>			
                        </div>
                        <div class="col-lg-12 col-md-12">
                            <ul class="more_options_tt">
                                <li><button class="more_items_14" :class="{ active : type=='unpaid'}" @click.prevent="switchPaidType('unpaid')">Unpaid</button></li>
                                <li><button class="more_items_14" :class="{ active : type=='paid'}" @click.prevent="switchPaidType('paid')">Paid</button></li>
                                
                            </ul>
                        </div>
                        <div class="col-lg-12 col-md-12">
                            <div class="table-responsive mt-30">
                                <table class="table ucp-table earning__table">
                                    <thead class="thead-s">
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Reference ID</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Course</th>
                                            <th scope="col">Amount</th>									
                                            <th scope="col">Affiliations</th>								
                                        </tr>
                                    </thead>
                                    <Loading v-if="Loading"/>
                                    <tbody v-if="!Loading" >
                                        <tr v-for="e in earnings" :key="e">										
                                            <td>{{e.createdAt}}</td>	
                                            <td>{{e.reference}}</td>	
                                            <td>{{e.student[0].firstName}}</td>
                                            <td>{{e.course[0].title}}</td>	
                                            <td>₦{{e.price.$numberDecimal}}</td>	
                                            <td>{{e.course[0].affiliatedInstitutions.length}}</td>		
                                        </tr>
                                    </tbody>				
                                </table>
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
import Dheader from '@/components/dashboard/Header.vue'
import Dnav2 from '@/components/dashboard/Nav2.vue'
import Dfooter from '@/components/dashboard/Footer.vue'
import Loading from '@/components/Loading'
import { mapActions } from 'vuex'
export default {
    name: 'Dhome',
    data(){
        return{
            earnings : 'hhh',
            skip: 0,
            type: 'unpaid',
            userId: '',
            Loading: true,
            totalBalance: ''
        }
    },
    components: {
        Dheader,
        Dnav2,
        Loading,
        Dfooter
    },   
    methods: {
        ...mapActions(['fetchPaidOrUnpaidUserPurchase','calculate_UserPayouts']),
        switchPaidType(type){
            this.skip = 0
            this.Loading=true
            this.type = type
            let object={
                userId: this.userId, 
                skip: this.skip, 
                type: type
            }
            this.fetchPaidOrUnpaidUserPurchase(object)
            .then(res => {
                this.earnings = res.data
                this.Loading=false
            })
        }
    },
    mounted(){
        this.Loading=true
        this.userId = localStorage.getItem('fmruser')
        let object={
            userId: this.userId, 
            skip: this.skip, 
            type: this.type
        }
        this.fetchPaidOrUnpaidUserPurchase(object)
        .then(res => {
            this.earnings = res.data
            this.Loading=false
        })
        this.calculate_UserPayouts(this.userId)
        .then(res => {
            this.totalBalance = res.data.amount
        })
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

</style>
<template>
    <div>
        <Dheader />

        <Dnav2 />
        
        <div class="wrapper">

            <div class="sa4d25" v-if="bank.length!=0">
                <div class="container-fluid">			
                    <div class="row">
                        <div class="col-lg-12">	
                            <h2 class="st_title"><i class="uil uil-wallet"></i> Payout</h2>
                        </div>					
                    </div>				
                    <div class="row">					
                        <div class="col-lg-4 col-md-5">
                            <div class="top_countries mt-30">
                                <div class="top_countries_title">
                                    <h2>Payout Balance</h2>
                                </div>
                                <div class="payout_content">
                                    <span><strong>₦{{totalBalance}}</strong></span>
                                    <div class="payout__via">
                                        <strong>via {{bankName}}</strong>
                                    </div>
                                    <p><small class="payout__small-notification">Your payout will be processed at most 5 days after you applied </small></p>
                                </div>
                            </div>
                            <div class="top_countries mt-30" v-if="canApply&&totalBalance>30">
                                <div class="top_countries_title">
                                    <h2>Apply for Payout</h2>
                                </div>
                                <div class="payout_content">
                                    <img src="../assets/images/payoneer.svg" alt="">
                                    <div class="payout__added">
                                        <strong>Bank Name: {{bankName}}</strong><br>
                                        <strong>Account Number: {{bankAccountNumber}}</strong><br>
                                        <strong>Account Name: {{bankAccountName}}</strong>
                                    </div>
                                    <p @click.prevent="applyPayouts"><a class="payout__btn" v-if="!Loading&&!Success">Apply Now</a></p>
                                    <p @click.prevent="applyPayouts"><a class="payout__btn" v-if="Loading">Please Wait...</a></p>
                                </div>
                            </div>
                            <div class="top_countries mt-30" v-else>
                                <div class="top_countries_title">
                                    <h2>Apply for Payout</h2>
                                </div>
                                <div class="payout_content">
                                    <div class="payout__added">
                                        <strong>You can apply again when the last payout has been completed, and balance is upto 50000</strong><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-7">
                            <div class="table-responsive mt-30">
                                <h1>PayOut history</h1>
                                <table class="table ucp-table earning__table">
                                    <thead class="thead-s">
                                        <tr>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Bank Name</th>
                                            <th scope="col">Account Number</th>
                                            <th scope="col">Date</th>	
                                            <th scope="col">Status</th>								
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="p in payouts" :key="p">										
                                            <td v-if="!p.payed">₦{{totalBalance}}</td>	
                                            <td v-else>₦{{p.amount}}</td>
                                            <td>{{p.bankName}}</td>	
                                            <td>{{p.accountNumber}}</td>	
                                            <th scope="col">{{p.updatedAt}}</th>
                                            <td style="color: orange" v-if="!p.payed">pending</td>
                                            <td style="color: green" v-else>Paid</td>
                                        </tr>											
                                    </tbody>				
                                </table>
                            </div>
                    
                        </div>
                    </div>
                </div>
                <br><br><br>
            </div>
            <div class="sa4d25" v-else>
                <div class="container-fluid">			
                    <div class="row">
                        <div class="col-lg-12">	
                            <h2 class="st_title"><i class="uil uil-wallet"></i>You have not registered your bank details for Payout yet</h2>
                        </div>	
                        <br><br><br><br>
                        <div class="col-lg-12">	
                            <h2 class="st_title">To add payment bank account details, <br> click on setting, <br> then click billing and payouts</h2>
                        </div>
                        <br><br><br><br><br><br><br><br><br>
                        <router-link :to="'/Dsettings'">
                        <p style="width: 200px"><a  class="payout__btn">Goto Setting</a></p>	
                        </router-link>	
                        <br><br><br><br><br><br>		
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
import { mapActions } from 'vuex'
export default {
    name: 'Dhome',
    data(){
        return{
            userId: '',
            bank: {},
            bankName : '',
            bankAccountName : '', 
            bankAccountNumber : '',
            skip: 0,
            payouts: '',
            totalBalance: '',
            canApply: false,
            Loading: false,
            Success: false,
        }
    },
    components: {
        Dheader,
        Dnav2,
        Dfooter
    },   
    methods: {
        ...mapActions(['fetch_UserBankDetails']),
        ...mapActions(['apllyPayouts_user','fetch_UserPayouts','calculate_UserPayouts']),
        applyPayouts(){
            this.Loading = true
            let object = {
                userId: this.userId,
                bankName : this.bankName, accountName: this.bankAccountName, accountNumber: this.bankAccountNumber
            }
            this.apllyPayouts_user(object)
            .then(res =>{
                if (res.data.success) {
                    this.payouts = res.data.payout
                    this.Success = true
                }
                this.Loading = false
            })
        }
    },
    mounted(){
        this.userId = localStorage.getItem('fmruser')
        this.fetch_UserBankDetails(this.userId)
        .then(res => {
            this.bank = res.data
            if (this.bank.length != 0) {
                this.bankName = res.data[0].bankName
                this.bankAccountName = res.data[0].accountName 
                this.bankAccountNumber = res.data[0].accountNumber
            }
        })

        this.fetch_UserPayouts(this.userId, this.skip)
        .then(res => {
            this.payouts = res.data
            let flag = true
            for (let i = 0; i < this.payouts.length; i++) {
                const element = this.payouts[i];
                if (!element.payed) {
                    flag = false
                }
            }
            if (flag) {
                this.canApply = true
            }
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
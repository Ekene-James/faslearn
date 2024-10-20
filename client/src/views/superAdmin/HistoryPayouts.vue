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
                    <li class="breadcrumb-item active">Tables</li>
                </ol>
                    <!-- Example DataTables Card-->
                <div class="card mb-3">
                    <div class="card-header">
                    <i class="fa fa-table"></i> Data Table Example</div>
                    <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                            <th>Bank Name</th>
                            <th>Account Name</th>
                            <th>Account Number</th>
                            <th>Amount</th>
                            <th>Applied date</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                            <th>Bank Name</th>
                            <th>Account Name</th>
                            <th>Account Number</th>
                            <th>Amount</th>
                            <th>Applied date</th>
                            <th>Action</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="p in payouts" :key="p">
                                <td>{{p.bankName}}</td>
                                <td>{{p.accountName}}</td>
                                <td>{{p.accountNumber}}</td>
                                <td :id="'salary'+p._id">{{p.amount}}</td>
                                <td>{{p.updatedAt}}</td>
                                <td><button class="notpayed"  :id="'notpayed'+p._id">View</button></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                    <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                </div>
                <!-- /tables-->
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
import { mapActions } from "vuex";
export default {
    data(){
        return{
            skip: 0,
            payouts: ''
        }
    },
    components: {
        Header,
        Modal,
        Footer
    },
    methods: {
        ...mapActions(['fetchHistoryPayouts__Admin']),
        
    },
    mounted(){
        this.fetchHistoryPayouts__Admin(this.skip)
        .then(res => {
            this.payouts = res.data
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
    .payed{
        color: white;
        background-color: green;
        padding: 5px;
        border-radius: 10px;
        border: none;
    }
    .notpayed{
        color: white;
        background-color: red;
        padding: 8px;
        border-radius: 10px;
        border: none;
    }
</style>
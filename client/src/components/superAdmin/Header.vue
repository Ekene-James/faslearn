<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-default fixed-top" id="mainNav">
            <a class="navbar-brand" href="/SAhome"><img src="../../assets/wlogo.png" data-retina="true" alt="" width="63" height="36"></a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav navbar-sidenav" id="exampleAccordion" v-if="isSuperLoggedIn">
                <li class="nav-item" :class="{active : page=='SAhome'}" data-toggle="tooltip" data-placement="right" title="Dashboard">
                <a class="nav-link board" >
                    <router-link :to="'/SAhome'">
                    <i class="fa fa-fw fa-dashboard" style="color: white"></i>
                    <span class="nav-link-text" style="color: white">Dashboard</span>
                    </router-link>
                </a>
                </li>
                <li class="nav-item" :class="{active : page=='SAinstructors'}" data-toggle="tooltip" data-placement="right" title="Messages">
                <a class="nav-link board" >
                    <router-link :to="'/SAinstructors'">
                    <i class="fa fa-fw fa-envelope-open" style="color: white"></i>
                    <span class="nav-link-text" style="color: white">Instructors</span>
                    </router-link>
                </a>
                </li>
                <li class="nav-item" :class="{active : page=='SAinstitutions'}" data-toggle="tooltip" data-placement="right" title="Bookings">
                <a class="nav-link board" >
                    <router-link :to="'/SAinstitutions'">
                    <i class="fa fa-fw fa-archive" style="color: white"></i>
                    <span class="nav-link-text" style="color: white">Institutions <span class="badge badge-pill badge-primary">6 New</span></span>
                    </router-link>
                </a>
                </li>
                <!-- <li class="nav-item" :class="{active : page=='SAnewinstitutions'}" data-toggle="tooltip" data-placement="right" title="Reviews">
                    <a class="nav-link board" >
                        <router-link :to="'/SAnewinstitutions'">
                        <i class="fa fa-fw fa-star" style="color: white"></i>
                        <span class="nav-link-text" style="color: white">New institutions</span>
                        </router-link>
                    </a>
                </li> -->
                <li class="nav-item" :class="{active : page=='SAcourses'}" data-toggle="tooltip" data-placement="right" title="Bookmarks">
                <a class="nav-link board" >
                    <router-link :to="'/SAcourses'">
                    <i class="fa fa-fw fa-heart" style="color: white"></i>
                    <span class="nav-link-text" style="color: white">Courses</span>
                    </router-link>
                </a>
                </li>
                <li class="nav-item" :class="{active : page=='SAfeedbacks'}" data-toggle="tooltip" data-placement="right" >
                <a class="nav-link board" >
                    <router-link :to="'/SAfeedbacks'">
                    <i class="fa fa-fw fa-heart" style="color: white"></i>
                    <span class="nav-link-text" style="color: white">Feedbacks</span>
                    </router-link>
                </a>
                </li>
                <li class="nav-item" :class="{active : page=='SAaddNewSuperAdmin'}" data-toggle="tooltip" data-placement="right" title="Add listing">
                <a class="nav-link board" >
                    <router-link :to="'/SAaddNewSuperAdmin'">
                    <i class="fa fa-fw fa-plus-circle" style="color: white"></i>
                    <span class="nav-link-text" style="color: white">Add New SuperAdmin</span>
                    </router-link>
                </a>
                </li>
                <li class="nav-item" :class="{active : page=='SApayRequests'||page=='SApaymentHistory'||page=='SAsearchPayments'}" data-toggle="tooltip" data-placement="right" title="My profile">
                <a class="nav-link board nav-link-collapse collapsed" data-toggle="collapse" href="#collapseProfile" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-wrench" style="color: white"></i>
                    <span class="nav-link-text" style="color: white">Payments</span>
                </a>
                <ul class="sidenav-second-level collapse" id="collapseProfile">
                    <li>
                        <router-link :to="'/SAnewPayouts'">
                            <a >Pay Requests</a>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/SAhistoryPayouts'">
                            <a >Payment History</a>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/SAsearchPayouts'">
                            <a >Search payment</a>
                        </router-link>
                    </li>
                </ul>
                </li>
                <!-- <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Components">
                    <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseComponents" data-parent="#exampleAccordion">
                        <i class="fa fa-fw fa-gear"></i>
                        <span class="nav-link-text">Black list</span>
                    </a>
                    <ul class="sidenav-second-level collapse" id="collapseComponents">
                        <li>
                        <a href="/SAhome">Coures</a>
                        </li>
                        <li>
                        <a href="/SAhome">Instructors</a>
                        </li>
                        <li>
                        <a href="/SAhome">Users</a>
                        </li>
                        <li>
                        <a href="/SAhome">Institutions</a>
                        </li>
                    </ul>
                </li> -->
            </ul>
            <ul class="navbar-nav sidenav-toggler" v-if="isSuperLoggedIn">
                <li class="nav-item">
                <a class="nav-link text-center" id="sidenavToggler">
                    <i class="fa fa-fw fa-angle-left"></i>
                </a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto" v-if="isSuperLoggedIn">
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-fw fa-envelope"></i>
                    <span class="d-lg-none">Messages
                    <span class="badge badge-pill badge-primary">12 New</span>
                    </span>
                    <span class="indicator text-primary d-none d-lg-block">
                    <i class="fa fa-fw fa-circle"></i>
                    </span>
                </a>
                <div class="dropdown-menu" aria-labelledby="messagesDropdown">
                    <h6 class="dropdown-header">New Messages:</h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                    <strong>David Miller</strong>
                    <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end of the box so they don't overflow over to the sides!</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                    <strong>Jane Smith</strong>
                    <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                    <strong>John Doe</strong>
                    <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">I've sent the final files over to you for review. When you're able to sign off of them let me know and we can discuss distribution.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item small" href="#">View all messages</a>
                </div>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-fw fa-bell"></i>
                    <span class="d-lg-none">Alerts
                    <span class="badge badge-pill badge-warning">6 New</span>
                    </span>
                    <span class="indicator text-warning d-none d-lg-block">
                    <i class="fa fa-fw fa-circle"></i>
                    </span>
                </a>
                <div class="dropdown-menu" aria-labelledby="alertsDropdown">
                    <h6 class="dropdown-header">New Alerts:</h6>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                    <span class="text-success">
                        <strong>
                        <i class="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                    </span>
                    <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                    <span class="text-danger">
                        <strong>
                        <i class="fa fa-long-arrow-down fa-fw"></i>Status Update</strong>
                    </span>
                    <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                    <span class="text-success">
                        <strong>
                        <i class="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
                    </span>
                    <span class="small float-right text-muted">11:21 AM</span>
                    <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item small" href="#">View all alerts</a>
                </div>
                </li>
                <li class="nav-item">
                <form class="form-inline my-2 my-lg-0 mr-lg-2">
                    <div class="input-group">
                    <input class="form-control search-top" type="text" placeholder="Search for...">
                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="button">
                        <i class="fa fa-search"></i>
                        </button>
                    </span>
                    </div>
                </form>
                </li>
                <li class="nav-item" v-if="isSuperLoggedIn" @click.prevent="logOutAdmin">
                    <a class="nav-link">
                    <i class="fa fa-fw fa-sign-out"></i>Logout</a>
                </li>
            </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data(){
        return{
            page : 'SAhome'
        }
    },
    created() {
		var currentUrl = window.location.pathname+'';
		this.page = currentUrl.split('/')[1]
    },
    computed: {
        ...mapGetters(['isSuperLoggedIn'])
    },
    methods: {
        ...mapActions(['superLogout']),
        logOutAdmin(){
            this.superLogout()
        }
    }
    
}
</script>
<style >
    .active{
        background-color: red;
    }
    .board{
        color: white;
        text-decoration: none;
    }
</style>
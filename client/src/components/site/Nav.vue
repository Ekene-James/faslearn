<template>
    <div>
        <header class="header fadeInDown" id="try" style="height: 100px">
            <div id="logo">
                <a href="/"><img src="../../assets/faslearnBlack.png" width="250" height="70" alt=""></a>
            </div>
            <ul id="top_menu">
                <li v-if="!isLoggedIn">
                  <a href="/login" class="navButton">Login</a>
                </li>
                <li v-if="!isLoggedIn">
                  <a href="/register" class="navButton">Register</a>
                </li>
                <li v-if="isLoggedIn"><a href="" @click.prevent="logOutUser" class="navButton">Logout</a></li>
                <li v-if="isLoggedIn"><a href="/dashboard" class="navButton">Dasboard</a></li>
                <!-- <li><a href="#0" class="search-overlay-menu-btn">Search</a></li>
                <li class="hidden_tablet"><a href="#0">Buy this template</a></li> -->
                <!-- <li class="hidden_tablet"><a href="/dashboard" class="btn_1 rounded">Admission</a></li> -->
                <li>
                    <div class="hamburger hamburger--spin" id="handdii" >
                        <div class="hamburger-box" >
                            <div class="hamburger-inner"></div>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- /top_menu -->
        </header>
        <!-- /header -->
        <div id="main_menu1" >
            <div class="container1" >
                <nav class="version_21" id="nav">
                    <div class="row1">
                        <div class="col-md-3">
                          <router-link :to="'/allcourses/e'">
                          <h3 style="color: black">Courses</h3>
                          </router-link>	
                          <ul>
                            <router-link :to="'/allcourses/'+c._id" v-for="c in categories" :key="c">	
                              <li style="margin: 0px; display: block; font-size: 13px; color: black">{{c.name}}</li>
                            </router-link>
                          </ul>
                        </div>
                        <div class="col-md-3">
                          <router-link :to="'/allteachers/e'">	
                          <h3 style="color: black">Teachers</h3>
                          </router-link>	
                          <ul>
                            <router-link :to="'/allteachers/'+c._id" v-for="c in categories" :key="c">	
                              <li style="margin: 0px; display: block; font-size: 13px; color: black">{{c.name}}</li>
                            </router-link>
                          </ul>
                        </div>
                        <div class="col-md-3">
                          <router-link :to="'/allinstitudes/e'">
                          <h3 style="color: black">Institutes</h3>
                           </router-link>	
                          <ul>
                            <router-link :to="'/allinstitudes/university'">
                            <li style="margin: 0px; display: block; font-size: 13px; color: black">Universities</li>
                             </router-link>	
                            <router-link :to="'/allinstitudes/corporate'">
                            <li style="margin: 0px; display: block; font-size: 13px; color: black">Corporate Org</li>
                             </router-link>	
                          </ul>
                        </div>
                        <div class="col-md-3">
                          <h3 style="color: black">Extra pages</h3>
                          <ul>
                            <router-link :to="'/about'">
                            <li style="margin: 0px; display: block; font-size: 13px; color: black">About Faslearn</li>
                            </router-link>
                            <router-link :to="'/faq'">
                            <li style="margin: 0px; display: block; font-size: 13px; color: black">FAQ</li>
                            </router-link> 
                            <!-- <router-link :to="'/contact'">
                            <li style="margin: 0px; display: block; font-size: 13px; color: black">Contact Us</li>
                            </router-link>
                            <router-link :to="'/blog'">
                            <li style="margin: 0px; display: block; font-size: 13px; color: black">Our Blog</li>
                            </router-link>
                            -->
                          </ul>
                        </div>
                    </div>
                    <!-- /row -->
                </nav>
                <div class="follow_us" style="padding: 10px; border-radius: 10px">
                    <ul>
                        <li style="color: black">Follow us</li>
                        <li style="color: black"><a href="https://web.facebook.com/faslearn"><i style="color: #EF6421" class="ti-facebook"></i></a></li>
                        <!-- <li><a href="#0"><i class="ti-twitter-alt"></i></a></li>
                        <li><a href="#0"><i class="ti-google"></i></a></li>
                        <li><a href="#0"><i class="ti-pinterest"></i></a></li> -->
                        <li style="color: black"><a href="https://www.instagram.com/invites/contact/?i=1hc6vtkr05fr1&utm_content=mamv4vg"><i style="color: #EF6421" class="ti-instagram"></i></a></li>
                        <li style="color: black"><a href="https://www.linkedin.com/company/faslearn"><i style="color: #EF6421" class="ti-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
	<!-- /main_menu 2-->
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Nav',
    data(){
      return{
        categories: ''
      }
    },
    computed: {
      ...mapGetters(['isLoggedIn'])
    },
    methods:{
        ...mapActions(['logout']),
        ...mapActions(['fetch_categories__public']),
        logOutUser(){
            this.logout();
        }
    },
    mounted(){
        window.addEventListener("scroll", function () {
            if (window.scrollY>1) {
                document.getElementById('try').classList.add("sticky");
            }else{
                document.getElementById('try').classList.remove("sticky");
            }
        });

        document.getElementById('handdii').addEventListener('click', function () {
            document.getElementById('main_menu1').classList.toggle("show")
            document.getElementById('try').classList.toggle('sticky_menu_active')
            document.getElementById('main_menu1').style.visibility = 'visible'
        })

        this.fetch_categories__public()
        .then(res => {
          this.categories = res.data
        })
    
    }

}
</script>
<style scoped>
 #main_menu1{
    position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  min-height: 100vh;
  width: 100vw;
  -webkit-transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
  -moz-transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
  -ms-transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
  -o-transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
  transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
  opacity: 1;
  display: none;
  background: rgb(228, 154, 118);
  background: -webkit-linear-gradient(left, white, rgb(238, 220, 211));
  background: linear-gradient(to right, white, rgb(238, 220, 211));
  overflow-y: scroll;
  padding-top: 120px;
 }

 @media (max-width: 767px) {
  #main_menu1 {
    padding-top: 90px;
  }
}
#main_menu1.show {
  display: block
}
#main_menu1 nav {
  animation-delay: 0.6s;
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
}
#main_menu1 nav ul {
  padding: 0;
  width: 100%;
  animation-delay: 0.8s;
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
}
#main_menu1 nav ul li {
  float: left;
  width: 40%;
  margin: 0 100px 30px 0;
}
@media (max-width: 1199px) {
  #main_menu1 nav ul li {
    margin: 0 30px 30px 0;
  }
}
@media (max-width: 575px) {
  #main_menu1 nav ul li {
    float: none;
    width: auto;
  }
}
#main_menu1 nav ul li a {
  position: relative;
  text-decoration: none;
  color: #fff;
  opacity: 0.7;
  font-weight: 500;
}
#main_menu1 nav ul li a:hover {
  opacity: 1;
}
#main_menu1 nav ul li a:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  -moz-transform: scaleX(1);
  -ms-transform: scaleX(1);
  -o-transform: scaleX(1);
  transform: scaleX(1);
}

#main_menu1 nav ul li ul li {
  float: none;
  width: 100%;
  margin: 0 0 10px 0;
}
@media (max-width: 767px) {
  #main_menu1 nav ul li ul li {
    margin-bottom: 8px;
  }
}
#main_menu1 nav ul h3 {
  color: #fff;
  font-weight: 600;
  font-size: 21px;
  font-size: 1.3125rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
@media (max-width: 767px) {
  #main_menu1 nav ul h3 {
    margin-bottom: 10px;
    font-size: 16px;
    font-size: 1rem;
  }
}




.col-md-3{
  display: inline-block;
  width: 300px;
}

.col-md-3 li{
  width: 300px;
  color: white;
}

.navButton{
  /* background-color: rgb(75, 11, 11); */
  border: 2px solid white;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  border-radius: 10px;
}

/* #logo a img{
  margin-top: -100px;
} */

@media (max-width: 900px) {
  .navButton{
    /* background-color: rgb(75, 11, 11); */
    border: 2px solid white;
    color: #fff;
    padding: 7px;
    font-size: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }

  /* #logo a img{
    margin-top: -40px;
    margin-left: -20px;
  } */
}
</style>
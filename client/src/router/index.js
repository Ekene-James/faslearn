import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/site/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/site/About.vue')
  },
  {
    path: '/admission',
    name: 'Admission',
    component: () => import(/* webpackChunkName: "admission" */ '../views/site/Admission.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import(/* webpackChunkName: "terms" */ '../views/site/Terms.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import(/* webpackChunkName: "privacy" */ '../views/site/Privacy.vue')
  },
  {
    path: '/allcourses/:cat',
    name: 'Allcourses',
    component: () => import(/* webpackChunkName: "allcourses" */ '../views/site/Allcourses.vue')
  },
  {
    path: '/coursedetail/:id',
    name: 'Coursedetail',
    component: () => import(/* webpackChunkName: "Coursedetail" */ '../views/site/Coursedetail.vue')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import(/* webpackChunkName: "Pricing" */ '../views/site/Pricing.vue')
  },
  {
    path: '/teacher/:id',
    name: 'Teacher',
    component: () => import(/* webpackChunkName: "Teacher" */ '../views/site/Teacher.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "Cart" */ '../views/site/Cart.vue')
  },
  {
    path: '/cart2',
    name: 'Cart2',
    component: () => import(/* webpackChunkName: "Cart2" */ '../views/site/Cart2.vue')
  },
  {
    path: '/cart3',
    name: 'Cart3',
    component: () => import(/* webpackChunkName: "Cart3" */ '../views/site/Cart3.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "Contact" */ '../views/site/Contact.vue')
  },
  {
    path: '/allteachers/:id',
    name: 'Allteachers',
    component: () => import(/* webpackChunkName: "Allteachers" */ '../views/site/Allteachers.vue')
  },
  {
    path: '/allinstitudes/:type',
    name: 'Allinstitudes',
    component: () => import(/* webpackChunkName: "Allinstitudes" */ '../views/site/Allinstitudes.vue')
  },
  {
    path: '/institude/:id',
    name: 'Institude',
    component: () => import(/* webpackChunkName: "institude" */ '../views/site/Institude.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "Blog" */ '../views/site/Blog.vue')
  },
  {
    path: '/blogpost',
    name: 'Blogpost',
    component: () => import(/* webpackChunkName: "Blogpost" */ '../views/site/Blogpost.vue')
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import(/* webpackChunkName: "Faq" */ '../views/site/Faq.vue')
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import(/* webpackChunkName: "Help" */ '../views/site/Help.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/site/Login.vue'),
    meta:{
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/site/Register.vue'),
    meta: {
      requiresGuest: true
    }
  },

  // dashboard routes starts here
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dteachers/:id',
    name: 'Dteachers',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Teachers.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dapllyteacher',
    name: 'Dapllyteacher',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Apllyteacher.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dcategories',
    name: 'Dcategories',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Categories.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dcheck',
    name: 'Dcheck',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Check.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dcontact',
    name: 'Dcontact',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Contact.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dcoursedetail/:id',
    name: 'Dcoursedetail',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Coursedetail.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dtestrules/:id',
    name: 'Dtestrules',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/TestRules.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dtestroom/:id',
    name: 'Dtestroom',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/TestRoom.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/DcourseCertificate/:courseId/:testId',
    name: 'DcourseCertificate',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Certificate.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dexplore',
    name: 'Dexplore',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Explore.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/DregisterTeacher',
    name: 'DregisterTeacher',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/RegisterTeacher.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/DregisterInstitude',
    name: 'DregisterInstitude',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/RegisterInstitude.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dinstitude/:id',
    name: 'Dinstitude',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Institude.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dallinstitutions',
    name: 'Dallinstitutions',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Allinstitutions.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dadmission/:id',
    name: 'Dadmission',
    component: () => import(/* webpackChunkName: "admission" */ '../views/dashboard/Admission.vue'),
    meta: {
      requiresAuth: true
    }
  }, 
  {
    path: '/Demployment/:id',
    name: 'Demployment',
    component: () => import(/* webpackChunkName: "admission" */ '../views/dashboard/Employment.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dsettings',
    name: 'Dsettings',
    component: () => import(/* webpackChunkName: "admission" */ '../views/dashboard/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dfeedback',
    name: 'Dfeedback',
    component: () => import(/* webpackChunkName: "admission" */ '../views/dashboard/Feedback.vue'),
    meta: {
      requiresAuth: true
    }
  }, 
  {
    path: '/Dhelp',
    name: 'Dhelp',
    component: () => import(/* webpackChunkName: "admission" */ '../views/dashboard/Help.vue'),
    meta: {
      requiresAuth: true
    }
  }, 

  //person dashboard routes
  {
    path: '/Dnewcourse',
    name: 'Dnewcourse',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Newcourse.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Deditcourse/:id',
    name: 'Deditcourse',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Editcourse.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dnewcoursecontent/:id',
    name: 'Dnewcoursecontent',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Newcoursecontent.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dnewcoursecontent2/:id',
    name: 'Dnewcoursecontent2',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Newcoursecontent2.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/DnewcourseAffiliation/:id',
    name: 'DnewcourseAffiliation',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/NewcourseAffiliation.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/DnewcourseTest/:id',
    name: 'DnewcourseTest',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/NewcourseTest.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/DlectureRoom/:id',
    name: 'DlectureRoom',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/LectureRoom.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dreviews',
    name: 'Dreviews',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Reviews.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dcourses',
    name: 'Dcourses',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Courses.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dhome',
    name: 'Dhome',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dcertificate',
    name: 'Dcertificate',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Certificate.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dnotification',
    name: 'Dnotification',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Notification.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dpayout',
    name: 'Dpayout',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Payout.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dprofile/:id',
    name: 'Dprofile',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dallcourses/:cat',
    name: 'Dallcourses',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/Allcourses.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dstatements',
    name: 'Dstatements',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Statements.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dverification',
    name: 'Dverification',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Verification.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/DmanageAdmission/:id',
    name: 'DmanageAdmission',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/ManageAdmission.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/DmanageEmployment/:id',
    name: 'DmanageEmployment',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/ManageEmployment.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dearning',
    name: 'Dearning',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Earning.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Danalysis',
    name: 'Danalysis',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Analysis.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dmessage/:id',
    name: 'Dmessage',
    component: () => import(/* webpackChunkName: "Register" */ '../views/dashboard/personal/Message.vue'),
    meta: {
      requiresAuth: true
    }
  },
  //Super Admin routes
  {
    path: '/SAhome',
    name: 'SAhome',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/Home.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAinstructors',
    name: 'SAinstructors',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/Instructors.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAinstructor/:id',
    name: 'SAinstructor/:id',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/Instructor.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAcourses',
    name: 'SAcourses',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/Courses.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAcourse/:id',
    name: 'SAcourse/:id',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/Course.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAinstitutions',
    name: 'SAinstitutions',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/Institutions.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAnewinstitutions',
    name: 'SAnewinstitutions',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/NewInstitutions.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAinstitution/:id',
    name: 'SAinstitution',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/Institution.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAaddNewSuperAdmin',
    name: 'SAaddNewSuperAdmin',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/AddNewSuperAdmin.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAhistoryPayouts',
    name: 'SAhistoryPayouts',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/HistoryPayouts.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAsearchPayouts',
    name: 'SAsearchPayouts',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/SearchPayouts.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAnewPayouts',
    name: 'SAnewPayouts',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/NewPayouts.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAfeedbacks',
    name: 'SAfeedbacks',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/Feedbacks.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAfeedback/:id',
    name: 'SAfeedback',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/Feedback.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAlecturePage/:id',
    name: 'SAlecturePage',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/LecturePage.vue'),
    meta: {
      requiresSuperAuth: true
    }
  },
  {
    path: '/SAlogin',
    name: 'SAlogin',
    component: () => import(/* webpackChunkName: "Register" */ '../views/superAdmin/Login.vue'),
    meta: {
      requiresSuperGuest: true
    }
  },
  //404 route
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import(/* webpackChunkName: "Register" */ '../views/site/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.isLoggedIn){
      // Redirect to login in
      next('/login');
    }else{
      next();
    }
  }else if (to.matched.some(record => record.meta.requiresGuest)){
    if (store.getters.isLoggedIn) {
      // Redirect to login in
      next('/');
    } else {
      next();
    }
  }else{
    next()
  }

  
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresSuperAuth)) {
    if (!store.getters.isSuperLoggedIn) {
      // Redirect to login in
      next('/SAlogin');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresSuperGuest)) {
    if (store.getters.isSuperLoggedIn) {
      // Redirect to login in
      next('/SAhome');
    } else {
      next();
    }
  } else {
    next()
  }


})


export default router

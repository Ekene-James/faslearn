import axios from 'axios';
//import router from '../../router';

const state = {
    instructor: false,
    admin: false,
    adminDetails: '',
    cooperate_admin: false,
    fmr_admin: false,
    status: '',
    error: null,
    cart: '', 
    defaultUrl: process.env.VUE_APP_SERVICE_URL,
    defaultUrlClient: process.env.VUE_APP_CLIENT_URL,
   // defaultUrl: 'http://localhost:5000/api/',
   // defaultUrlClient: 'http://localhost:8080/',
    darkMode: false
};

const getters = {
    isInstructor: state => state.instructor,
    isAdmin: state => state.admin,
    adminDetails: state => state.adminDetails,
    isCooperateAdmin: state => state.cooperate_admin,
    isFmrAdmin: state => state.fmr_admin,
    isCart: state => state.cart,
    backEnd: state => state.defaultUrl,
    frontEnd: state => state.defaultUrlClient,
    isdarkMode: state => state.darkMode
};

const actions = {
    //add cart 
    async addCart({
        commit
    }, number){
        commit('change_cart', number);
    },
    //checking if user has an instructor account
    async check_user_instructor({
        commit
    }, user_id) {
        commit('checking_instructor_request');
        try {
            let res = await axios.get('instructor/instructor/' + user_id)
            
            if (res.data == '') {
                commit('checking_instructor_unseen');
            }else{
                commit('checking_instructor_seen');
            }
            return res;
        } catch (err) {
            commit('checking_instructor_error');
        }
    },
    async check_profile_instructor({
        commit
    }, user_id) {
        commit('checking_profile_request');
        try {
            let res = await axios.get('instructor/instructor/' + user_id)

            if (res.data == '') {
                commit('checking_profile_unseen');
            } else {
                commit('checking_profile_seen');
            }
            return res;
        } catch (err) {
            commit('checking_profile_error');
        }
    },
    //checking if user has an admin account
    async check_user_admin({
        commit
    }, user_id) {
        commit('checking_admin_request');
        try {
            let res = await axios.get('institution/checkInstitution/' + user_id)
            
            if (res.data == '') {
                commit('checking_admin_unseen');
            } else {
                var adminDetails = res.data
                commit('checking_admin_seen', adminDetails);
            }
            return res;
        } catch (err) {
            commit('checking_admin_error');
        }
    }, 
    async toggle_DarkMode({
        commit
    }) {
        commit('toggle_Dark_Mode')
    },



    //public routes
    async fetch_recent_courses__public({
        commit
    }, skip) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/RecentCourses__public/' + skip)
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error');
        }
    },
    async fetch_all_institutions__public({
        commit
    }, skip) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/getAllInstitution__public/' + skip);
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    },

    async fetchAllInstructors__public({
        commit
    }, skip) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/allinstructor__public/' + skip)
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    }, 

    async fetch_categories__public({
        commit
    }) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/categories__public')
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    }, 

    async fetch_courses_by_category__public({
        commit
    }, object) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/CoursesByCategory__public/' + object.cat + '/' + object.skip)
            commit('fetch_public_seen');
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    },

    async fetchReviewed__public({
        commit
    }, object) {
        commit('fetch_public_request');
        try {
            let res = await axios.post('public/fetchReviewedPublic', object)
            commit('fetch_public_seen');
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    },

    async fetch_public_course_details__public({
        commit
    }, courseId) {
        commit('fetch_public_request');
        try {
            let res = await axios.post('public/course/', courseId)
            commit('fetch_public_seen');
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    },

    async fetch_institude_details__public({
        commit
    }, institude_id) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/getOneInstitution__public/' + institude_id);
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    },

    async fetch_teacher_courses__public({
        commit
    }, object) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/courses__public/' + object.userId + '/' + object.skip);
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    },

    async fetch_AllInstructorByCategory__public({
        commit
    }, object) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/fetchAllInstructorByCategory__public/' + object.catId + '/' + object.skip)
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    },

    async fetchOneInstructor__public({
        commit
    }, instructor_id) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/instructor__public/' + instructor_id)
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    },

    async fetchInstructorCourse__public({
        commit
    }, object) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/courses__public/' + object.instructor_id + '/' + object.skip)
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    },

    async checkTotalTimeCourse__public({
        commit
    }, id) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/checkTotalTimeCourse/' + id )
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    }, 

    async checkTotalSee({
        commit
    }, id) {
        commit('fetch_public_request');
        try {
            let res = await axios.get('public/checkTotalSee/' + id)
            if (res.status == 200) {
                commit('fetch_public_seen');
            }
            return res;
        } catch (err) {
            commit('fetch_public_error', err);
        }
    },





};

const mutations = {
    checking_instructor_request(state) {
        state.error = null
        state.status = 'loading'
    },
    checking_instructor_seen(state) {
        state.instructor = true
        state.status = 'success'
        state.error = null
    },
    checking_instructor_unseen(state) {
        state.instructor = false
        state.status = 'success'
        state.error = null
    },
    checking_instructor_error(state, err) {
        state.error = err.response.data.error
    }, 
    checking_profile_request(state) {
        state.error = null
        state.status = 'loading'
    },
    checking_profile_seen(state) {
        state.status = 'success'
        state.error = null
    },
    checking_profile_unseen(state) {
        state.status = 'success'
        state.error = null
    },
    checking_profile_error(state, err) {
        state.error = err.response.data.error
    },
    checking_admin_request(state) {
        state.error = null
        state.status = 'loading'
    },
    checking_admin_seen(state, adminDetails) {
        state.admin = true
        state.status = 'success'
        state.adminDetails = adminDetails
        state.error = null
    },
    checking_admin_unseen(state) {
        state.admin = false
        state.status = 'success'
        state.error = null
    },
    checking_admin_error(state, err) {
        state.error = err.response.data.error
    },
    change_cart(state, number){
        state.cart = number
    },
    toggle_Dark_Mode(state) {
        state.darkMode = !state.darkMode
    },
    fetch_public_request(state) {
        state.error = null
        state.status = 'loading'
    },
    fetch_public_seen(state) {
        state.status = 'success'
        state.error = null
    },
    fetch_public_error(state, err) {
        state.error = err.response.data
    },
};

export default {
    state,
    actions,
    mutations,
    getters
}
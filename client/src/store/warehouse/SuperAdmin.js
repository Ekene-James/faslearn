import axios from 'axios';
//import router from '../../router';


const state = {
    superLoader : '',
    error: ''
};

const getters = {
    superLoader: state => state.superLoader,
};

const actions = {
    async add_SuperAdmin({
        commit
    }, adminData) {
        try {
            commit('fetch_super_request');
            let res = await axios.post('superAdmin/addSuperAdmin', adminData);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    }, 
    async fetch_SuperDasboard({
        commit
    }) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchSuperDasboard');
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async fetctinstructors__Admin({
        commit
    }, skip) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/instructors/'+ skip);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    }, 
    async fetctusers__Admin({
        commit
    }, skip) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/users/' + skip);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async calculateUserPayouts__Admin({
        commit
    }, id) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/SA/calculateUserPayouts/' + id);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    }, 
    async fetchHistoryPayouts__Admin({
        commit
    }, skip) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchHistoryPayouts/' + skip);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async fetchNewPayouts__Admin({
        commit
    }, skip) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchNewPayouts/' + skip);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async markPaidPayout__Admin({
        commit
    }, object) {
        try {
            commit('fetch_super_request');
            let res = await axios.post('superAdmin/markPaidPayout', object);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    }, 
    async fetchFeedbacks__Admin({
        commit
    }, skip) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchFeedbacks/'+ skip);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async fetchUnverifiedInstitution_Admin({
        commit
    }, skip) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchUnverifiedInstitution_Admin/' + skip);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async fetchVerifiedInstitution_Admin({
        commit
    }, skip) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchVerifiedInstitution_Admin/' + skip);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },

    async fetchSingleInstitution_Admin({
        commit
    }, id) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchSingleInstitution_Admin/' + id);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async viewInstitutionImg_Admin({
        commit
    }, id,type) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/viewInstitutionImg_Admin/' + id +'/' + type);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    }, 
    async manageVerifyInstitution_Admin({
        commit
    }, object) {
        try {
            commit('fetch_super_request');
            let res = await axios.post('superAdmin/manageVerifyInstitution_Admin', object );
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async fetchAllInstructor__Admin({
        commit
    }, type, skip) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchAllInstructor__Admin/' + type + '/' + skip);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async fetchInstructorDetails__Admin({
        commit
    }, id) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchInstructorDetails__Admin/' + id);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async fetchAllCourses__Admin({
        commit
    }, type, skip) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchAllCourses__Admin/' + type + '/' + skip);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async viewCourse__Admin({
        commit
    }, courseId) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/viewCourse__Admin/' + courseId );
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async manageVerifyInstructor_Admin({
        commit
    }, object) {
        try {
            commit('fetch_super_request');
            let res = await axios.post('superAdmin/manageVerifyInstructor_Admin', object);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async manageVerifyCourse_Admin({
        commit
    }, object) {
        try {
            commit('fetch_super_request');
            let res = await axios.post('superAdmin/manageVerifyCourse_Admin', object);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    },
    async fetchLecture__Admin({
        commit
    }, lectureId) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchLecture__Admin/' + lectureId);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    }, 
    async fetchSingleFeedback__Admin({
        commit
    }, feedbackId) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/fetchSingleFeedback__Admin/' + feedbackId);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    }, 
    async markSeenFeedback_Admin({
        commit
    }, feedbackId) {
        try {
            commit('fetch_super_request');
            let res = await axios.get('superAdmin/markSeenFeedback_Admin/' + feedbackId);
            commit('fetch_super_success');
            return res;
        } catch (err) {
            commit('fetch_super_error', err)
        }
    }, 
};

const mutations = {
    fetch_super_request(state) {
        state.error = null
        state.superLoader = 'loading'
    },
    fetch_super_success(state) {
        state.error = null
        state.superLoader = 'success'
    },
    fetch_super_error(state, err) {
        state.superLoader = 'error'
        state.error = err.response.data
    },
    
};

export default {
    state,
    actions,
    mutations,
    getters
}
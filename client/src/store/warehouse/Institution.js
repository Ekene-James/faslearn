import axios from 'axios';
//import router from '../../router';


const state = {
    status: '',
    error: null
};

const getters = {
    adminLoader: state => state.status 
};

const actions = {
    //creating a new Institution
    async createNewInstitude({
        commit
    }, formData) {
        commit('create_institution_request');
        try {
            let res = await axios.post('institution/registerInstitution', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status == 201) {
                commit('create_institution_success');
            }
            return res;
        } catch (err) {
            commit('create_institution_error', err);
        }
    }, 
    async update_institution_Info({
        commit
    }, object) {
        commit('institude_request');
        try {
            let res = await axios.post('institution/update_institutionInfo', object);
            commit('institude_success');
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    },
    //fetching institude details
    async fetch_institude_details({
        commit
    }, institude_id) {
        commit('fetch_institution_request');
        try {
            let res = await axios.get('institution/getOneInstitution/'+institude_id);
            if (res.status == 200) {
                commit('fetch_institution_success');
            }
            return res;
        } catch (err) {
            commit('fetch_institution_error', err);
        }
    },
    //fetching institude details
    async fetch_all_institutions({
        commit
    }, skip) {
        commit('fetch_all_institutions_request');
        try {
            let res = await axios.get('institution/getAllInstitution/'+skip);
            if (res.status == 200) {
                commit('fetch_all_institutions_success');
            }
            return res;
        } catch (err) {
            commit('fetch_all_institutions_error', err);
        }
    },
    //fetching user courses
    async fetch_teacher_courses({
        commit
    }, object) {
        commit('fetch_teacher_courses_request');
        try {
            let res = await axios.get('instructor/courses/'+object.userId+'/'+object.skip);
            if (res.status == 200) {
                commit('fetch_teacher_courses_success');
            }
            return res;
        } catch (err) {
            commit('fetch_teacher_courses_error', err);
        }
    }, 

    async fetch_Admin_Dashboard({
        commit
    }, user_id) {
        commit('institude_request');
        try {
            let res = await axios.get('institution/fetchAdminDashboard/' + user_id);
            if (res.status == 200) {
                commit('institude_success');
            }
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    }, 
    async fetch_AllStudent_Applications({
        commit
    }, user_id) {
        commit('institude_request');
        try {
            let res = await axios.get('institution/fetchAllStudentApplications/'+user_id);
            if (res.status == 200) {
                commit('institude_success');
            }
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    },

    async manage_Admission({
        commit
    }, object) {
        commit('institude_request');
        try {
            let res = await axios.post('institution/manageAdmission/', object);
            if (res.status == 200) {
                commit('institude_success');
            }
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    },

    async fetch_AllLecturer_Applications({
        commit
    }, user_id) {
        commit('institude_request');
        try {
            let res = await axios.get('institution/fetchAllLecturerApplications/' + user_id);
            if (res.status == 200) {
                commit('institude_success');
            }
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    },

    async manage_Employment({
        commit
    }, object) {
        commit('institude_request');
        try {
            let res = await axios.post('institution/manageEmployment', object);
            if (res.status == 200) {
                commit('institude_success');
            }
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    }, 
    async fetchAll_InstitutionCourseAffiliations({
        commit
    }, object) {
        commit('institude_request');
        try {
            let res = await axios.get('institution/fetchAllInstitutionCourseAffiliations/' + object.user_id);
            if (res.status == 200) {
                commit('institude_success');
            }
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    }, 
    async manage_CourseAffiliations({
        commit
    }, object) {
        commit('institude_request');
        try {
            let res = await axios.post('institution/manageCourseAffiliations', object);
            if (res.status == 200) {
                commit('institude_success');
            }
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    }, 
    async fetch_InstitutionDashboard({
        commit
    }, institutionId) {
        commit('institude_request');
        try {
            let res = await axios.get('institution/fetchInstitutionDashboard/' + institutionId);
            if (res.status == 200) {
                commit('institude_success');
            }
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    }, 
    async fetch_AllInstitutionLecturers({
        commit
    }, institutionId) {
        commit('institude_request');
        try {
            let res = await axios.get('institution/fetchAllInstitutionLecturers/' + institutionId);
            if (res.status == 200) {
                commit('institude_success');
            }
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    },
    async fetch_AllInstitutionAffiliatedCourses({
        commit
    }, object) {
        commit('institude_request');
        try {
            let res = await axios.get('institution/fetchAllInstitutionAffiliatedCourses/' + object.institutionId +'/'+object.skip);
            if (res.status == 200) {
                commit('institude_success');
            }
            return res;
        } catch (err) {
            commit('institude_error', err);
        }
    },
};

const mutations = {
    create_institution_request(state) {
        state.error = null
        state.status = 'loading'
    },
    create_institution_success(state) {
        state.status = 'success'
        state.error = null
    },
    create_institution_error(state, err) {
        state.error = err.response.data.error
        state.status = 'failed'
    },
    fetch_institution_request(state) {
        state.error = null
        state.status = 'loading'
    },
    fetch_institution_success(state) {
        state.status = 'success'
        state.error = null
    },
    fetch_institution_error(state, err) {
        state.error = err.response.data.error
        state.status = 'failed'
    },
    fetch_teacher_courses_request(state) {
        state.error = null
        state.status = 'loading'
    },
    fetch_teacher_courses_success(state) {
        state.status = 'success'
        state.error = null
    },
    fetch_teacher_courses_error(state, err) {
        state.error = err.response.data.error
        state.status = 'failed'
    },
    fetch_all_institutions_request(state) {
        state.error = null
        state.status = 'loading'
    },
    fetch_all_institutions_success(state) {
        state.status = 'success'
        state.error = null
    },
    fetch_all_institutions_error(state, err) {
        state.error = err.response.data.error
        state.status = 'failed'
    },
    institude_request(state) {
        state.error = null
        state.status = 'loading'
    },
    institude_success(state) {
        state.status = 'success'
        state.error = null
    },
    institude_error(state, err) {
        state.error = err.response.data.error
        state.status = 'failed'
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
import axios from 'axios';
import router from '../../router';


const state = {
    token: localStorage.getItem('fmrtoken') || '',
    admintoken: localStorage.getItem('fmrsuperadmintoken') || '',
    user: {},
    superAdmin: {},
    status: '',
    profileCredentials: '',
    error: null
};

const getters = {
    isLoggedIn: state => !!state.token,
    isSuperLoggedIn: state => !!state.admintoken,
    authState: state => state.status,
    user: state => state.user,
    superAdmin: state => state.superAdmin,
    error: state => state.error,
    authLoader: state => state.status,
    credentials: state => state.profileCredentials
};

const actions = {
    //login actions
    async login({
        commit
    }, user) {
        commit('auth_request');
        try{
            let res = await axios.post('public/login__public', user)
            if (res.status == 200) {
                const token = res.data.token;
                const user = res.data.user;
                //store the token in local storage
                localStorage.setItem('fmrtoken', token);
                localStorage.setItem('fmruser', user._id);
                //set the axios defaults
                axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
                commit('auth_success', token, user); 
            }
            return res;
        } catch (err){
           commit('auth_error', err); 
        }
    },

    async loginSuperADmin({
        commit
    }, admin) {
        commit('auth_request');
        try {
            let res = await axios.post('public/loginSuperAdmin', admin)
            if (res.data.success) {
                const admintoken = res.data.token;
                const superAdmin = res.data.admin;
                //store the token in local storage
                localStorage.setItem('fmrsuperadmintoken', admintoken);
                localStorage.setItem('fmrsuperadmin', superAdmin[0]._id);
                //set the axios defaults
                axios.defaults.headers.common['authorization'] = `Bearer ${admintoken}`;
                commit('super_auth_success', admintoken, superAdmin);
            }
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },
    // Register User
    async register({
        commit
    }, userData){
        try{
            commit('register_request');
            let res = await axios.post('public/registerStudent__public', userData);
            if (res.status == 201) {
                commit('register_success');
            }
            return res;
        }catch (err){
            commit('register_error', err)
        }
    }, 
    async user_Update_account({
        commit
    }, userData) {
        try {
            commit('fetch_try_request');
            let res = await axios.post('auth/user_update_account', userData);
            commit('fetch_try_success');
            return res;
        } catch (err) {
            commit('fetch_try_error', err)
        }
    },
    // Register Instructor
    async registerInstructor({
        commit
    }, teacher) {
        try {
            commit('register_instructor_request');
            let res = await axios.post('auth/registerInstructor', teacher);
            if (res.status == 201) {
                commit('register_instructor_success');
            }
            return res;
        } catch (err) {
            commit('register_instructor_error', err)
        }
    },
    //Logout User
    async logout({
        commit
    }){
        await localStorage.removeItem('fmrtoken');
        await localStorage.removeItem('fmruser');
        commit('logout');
        delete axios.defaults.headers.common['authorization'];
        router.push('/login');
        return;
    },
    async superLogout({
        commit
    }) {
        await localStorage.removeItem('fmrsuperadmintoken');
        await localStorage.removeItem('fmrsuperadmin');
        commit('superlogout');
        delete axios.defaults.headers.common['authorization'];
        router.push('/SAlogin');
        return;
    },
    async fetch_empty_user_detail({
        commit
    }, user_id) {
        commit('fetch_try_request');
        try {
            let res = await axios.get('auth/fetchEmptyDetails/'+user_id);
            if (res.status == 200) {
                commit('fetch_try_success');
            }
            const cred = res.data;
            commit('save_credentials', cred);
            return res;
        } catch (err) {
            commit('fetch_try_error', err);
        }
    },
    
    async check_empty_image({
        commit
    }, user_id) {
        commit('fetch_try_request');
        try {
            let res = await axios.get('auth/checkEmptyImage/' + user_id);
            if (res.status == 200) {
                commit('fetch_try_success');
            }
            return res;
        } catch (err) {
            commit('fetch_try_error', err);
        }
    },

    //creating a new course
    async manageUser_Details({
        commit
    }, formData) {
        commit('fetch_try_request');
        try {
            let res = await axios.post('auth/manageUserDetails', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status == 200) {
                commit('fetch_try_success');
            }
            const cred = res.data;
            commit('save_credentials', cred);
            return res;
        } catch (err) {
            commit('fetch_try_error', err);
        }
    },

    async save_SocialMedialLinks({
        commit
    }, object) {
        commit('fetch_try_request');
        try {
            let res = await axios.post('auth/saveSocialMedialLinks', object)
            commit('fetch_try_success');
            return res;
        } catch (err) {
            commit('fetch_try_error', err);
        }
    },

    async manage_BankDetails({
        commit
    }, object) {
        commit('fetch_try_request');
        try {
            let res = await axios.post('auth/manageBankDetails', object)
            commit('fetch_try_success');
            return res;
        } catch (err) {
            commit('fetch_try_error', err);
        }
    }, 

    async fetch_UserBankDetails({
        commit
    }, user_id) {
        commit('fetch_try_request');
        try {
            let res = await axios.get('auth/fetchUserBankDetails/' + user_id);
            if (res.status == 200) {
                commit('fetch_try_success');
            }
            return res;
        } catch (err) {
            commit('fetch_try_error', err);
        }
    },

    async apllyPayouts_user({
        commit
    }, object) {
        commit('fetch_try_request');
        try {
            let res = await axios.post('auth/apllyPayouts', object)
            commit('fetch_try_success');
            return res;
        } catch (err) {
            commit('fetch_try_error', err);
        }
    }, 
    async fetch_UserPayouts({
        commit
    }, user_id,skip) {
        commit('fetch_try_request');
        try {
            let res = await axios.get('auth/fetchUserPayouts/' + user_id+'/'+skip);
            if (res.status == 200) {
                commit('fetch_try_success');
            }
            return res;
        } catch (err) {
            commit('fetch_try_error', err);
        }
    },
    async calculate_UserPayouts({
        commit
    }, id) {
        commit('fetch_try_request');
        try {
            let res = await axios.get('auth/calculateUserPayouts/' + id);
            if (res.status == 200) {
                commit('fetch_try_success');
            }
            return res;
        } catch (err) {
            commit('fetch_try_error', err);
        }
    }, 
    async fetchPaidOrUnpaidUserPurchase({
        commit
    }, object) {
        commit('fetch_try_request');
        try {
            let res = await axios.post('auth/fetchPaidOrUnpaidUserPurchase', object);
            if (res.status == 200) {
                commit('fetch_try_success');
            }
            return res;
        } catch (err) {
            commit('fetch_try_error', err);
        }
    },

};

const mutations = {
    auth_request(state){
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user){
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    super_auth_success(state, admintoken, superAdmin){
        state.admintoken = admintoken
        state.superAdmin = superAdmin
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err){
        state.error = err.response.data.error
    },
    register_request(state){
        state.error = null
        state.status = 'loading'
    },
    register_success(state){
        state.error = null
        state.status = 'success'
    },
    register_error(state, err){
        state.error = err.response.data.error
    },
    register_instructor_request(state){
        state.error = null
        state.status = 'loading'
    },
    register_instructor_success(state) {
        state.error = null
        state.status = 'success'
    },
    register_instructor_error(state, err) {
        state.error = err.response.data.error
    },
    logout(state){
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    superlogout(state) {
        state.error = null
        state.status = ''
        state.admintoken = ''
        state.superAdmin = ''
    },
    fetch_try_request(state) {
        state.error = null
        state.status = 'loading'
    },
    fetch_try_success(state) {
        state.error = null
        state.status = 'success'
    },
    fetch_try_error(state, err) {
        state.error = err.response.data.error
    },
    save_credentials(state,cred){
        state.profileCredentials = cred
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
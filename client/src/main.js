import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

//Vue.prototype.$http = axios;

const token = localStorage.getItem('fmrtoken');
const admintoken = localStorage.getItem('fmrsuperadmintoken');
//axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.baseURL = process.env.VUE_APP_SERVICE_URL
if (token) {
    // console.log(token); 
    //Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
    //axios.defaults.baseURL = 'http://localhost:5000/api/';
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    console.log('seen token ohh')
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}

if (admintoken) {
    // console.log(token); 
    //Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
    //axios.defaults.baseURL = 'http://localhost:5000/api/';
    axios.defaults.headers.common['authorization'] = `Bearer ${admintoken}`;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}

createApp(App).use(store).use(router).mount('#app')

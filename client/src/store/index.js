import { createStore } from 'vuex'
import Auth from './warehouse/Auth'
import Utils from './warehouse/Utils'
import Instructor from './warehouse/Instructor'
import Institution from './warehouse/Institution'
import Students from './warehouse/Students'
import SuperAdmin from './warehouse/SuperAdmin'
import createPersistedState from 'vuex-persistedstate'

const store = new createStore({
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  },
  modules: {
    Auth,
    Utils,
    Instructor,
    Institution,
    Students,
    SuperAdmin
  },
  plugins: [createPersistedState()],
});

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
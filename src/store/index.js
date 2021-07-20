import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    createJobAppStatus: {
      show: false,
      message: "",
      icon: "mdi-information",
      color: "#52688F"
    }
  },

  mutations: {
    updateCreateJobAppStatus(state, data) {
      state.createJobAppStatus.show = data.show;
      state.createJobAppStatus.message = data.message;
      state.createJobAppStatus.icon = data.icon;
      state.createJobAppStatus.color = data.color;
    }
  },
  actions: {
    
  },
  getters: {

  }
})

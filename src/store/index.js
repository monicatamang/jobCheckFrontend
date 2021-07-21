import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import cookies from 'vue-cookies';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allJobApps: [],
    createJobAppStatus: {
      show: false,
      message: "",
      icon: "mdi-information",
      color: "#52688F"
    },
    getJobAppStatus: {
      show: false,
      message: "",
      icon: "mdi-information",
      color: "#52688F"
    }
  },

  mutations: {
    updateAllJobApps(state, data) {
      state.allJobApps = data.reverse();
    },

    updateCreateJobAppStatus(state, data) {
      state.createJobAppStatus.show = data.show;
      state.createJobAppStatus.message = data.message;
      state.createJobAppStatus.icon = data.icon;
      state.createJobAppStatus.color = data.color;
    },

    updateGetJobAppStatus(state, data) {
      state.getJobAppStatus.show = data.show;
      state.getJobAppStatus.message = data.message;
      state.getJobAppStatus.icon = data.icon;
      state.getJobAppStatus.color = data.color;
    },

    addNewJobApp(state, data) {
      state.allJobApps.unshift(data);
    }
  },

  actions: {
    getJobApps(context) {
      axios.request({
      url: `${process.env.VUE_APP_API_URL}/job-applications`,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        userId: cookies.get("userData").userId
      }
      }).then((res) => {
        console.log(res);
        context.commit('updateAllJobApps', res.data);
      }).catch((err) => {
        console.log(err);
        let errorStatus = {
          show: true,
          message: "Failed to get all job applications. Please refresh the page and try again.",
          icon: "mdi-alert-circle",
          color: "#B34C59"
        }
        this.$store.commit('updateGetJobAppStatus', errorStatus);
      });
    }
  },

  getters: {

  }
})

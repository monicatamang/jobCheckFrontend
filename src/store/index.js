import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allJobApps: [],

    jobAppStatus: {
      show: false,
      message: "",
      icon: "",
      color: ""
    },

    logoutStatus: {
      show: false,
      message: "",
      icon: "mdi-information",
      color: "#52688F"
    },

    searchJobAppStatus: ""
  },

  mutations: {
    // Storing all the user's job application in reverse chronological order
    updateAllJobApps(state, data) {
      state.allJobApps = data.reverse();
    },

    // Updating the status when the user gets, creates, edits or deletes a new job application
    updateJobAppStatus(state, data) {
      state.jobAppStatus.show = data.show;
      state.jobAppStatus.message = data.message;
      state.jobAppStatus.icon = data.icon;
      state.jobAppStatus.color = data.color;
    },

    // Adding a new job application to the page
    addNewJobApp(state, data) {
      state.allJobApps.unshift(data);
    },

    // Deleting a job application
    deleteJobApp(state, data) {
      state.allJobApps.splice(data, 1);
    },

    // Replacing the old job application with the updated job application
    editJobApp(state, data) {
      state.allJobApps.splice(data.index, 0, data.jobApp)
    },

    // Updating the status when the user logs out
    updateLogoutStatus(state, data) {
      state.logoutStatus.show = data.show;
      state.logoutStatus.message = data.message;
      state.logoutStatus.icon = data.icon;
      state.logoutStatus.color = data.color;
    },

    // Updating the status when the user is searching for specific job applications
    updateSearchJobAppStatus(state, data) {
      state.searchJobAppStatus = data;
    }
  },

  actions: {
    // Creating a GET request to get all the user's job applications
    getJobApps(context, data) {
      // Configuring the request with the url, type and data
      axios.request({
      url: `${process.env.VUE_APP_API_URL}/job-applications`,
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        userId: data
      }
      }).then((res) => {
        // If the network is done and there are no errors, store the user's job applications
        console.log(res);
        context.commit('updateAllJobApps', res.data);
      }).catch((err) => {
        // If the network is done but the page errors, show a error message to the user
        console.log(err);
        let errorStatus = {
          show: true,
          message: "Failed to get all job applications. Please refresh the page and try again.",
          icon: "mdi-alert-circle",
          color: "#B34C59"
        }
        // Updating the error message
        this.$store.commit('updateJobAppStatus', errorStatus);
      });
    }
  },

  getters: {
    // Filtering all job applications that are not applied
    notAppliedJobApps(state) {
      return state.allJobApps.filter((jobApp) => jobApp.status === 'Not Applied');
    },

    // Filtering all job applications that are applied
    appliedJobApps(state) {
      return state.allJobApps.filter((jobApp) => jobApp.status === 'Applied');
    },

    // Filtering all job applications that are closed
    closedJobApps(state) {
      return state.allJobApps.filter((jobApp) => jobApp.status === 'Closed');
    }
  }
})

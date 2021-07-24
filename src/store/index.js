import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allJobApps: [],

    allInterviews: [],

    allNetworkingEvents: [],

    allConnections: [],

    allJobReferences: [],

    jobAppsLength: undefined,

    interviewsLength: undefined,

    networkingEventsLength: undefined,

    connectionsLength: undefined,

    jobRefsLength: undefined,

    searchJobAppStatus: "",

    searchNetworkingEventStatus: "",

    searchJobReferenceStatus: "",

    jobAppStatus: {
      show: false,
      message: "",
      icon: "",
      color: ""
    },

    interviewStatus: {
      show: false,
      message: "",
      icon: "",
      color: ""
    },

    resumeStatus: {
      show: false,
      message: "",
      icon: "",
      color: ""
    },

    coverLetterStatus: {
      show: false,
      message: "",
      icon: "",
      color: ""
    },

    networkingEventStatus: {
      show: false,
      message: "",
      icon: "",
      color: ""
    },

    jobReferenceStatus: {
      show: false,
      message: "",
      icon: "",
      color: ""
    },

    userProfileStatus: {
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
    }
  },

  mutations: {
    // Storing all the user's job applications
    updateAllJobApps(state, data) {
      state.allJobApps = data;
    },

    // Storing all the user's interviews
    updateAllInterviews(state, data) {
      state.allInterviews = data;
    },

    // Storing all the user's networking events
    updateAllNetworkingEvents(state, data) {
      state.allNetworkingEvents = data.reverse();
    },

    // Storing all the user's connections
    updateAllConnections(state, data) {
      state.allConnections = data.reverse();
    },

    // Storing all the user's job references
    updateAllJobReferences(state, data) {
      state.allJobReferences = data;
    },

    // Adding a new job application to the page
    addNewJobApp(state, data) {
      state.allJobApps.unshift(data);
    },

    // Adding a new interview to the page
    addNewInterview(state, data) {
      state.allInterviews.push(data);
    },

    // Adding a new networking event to the page
    addNewNetworkingEvent(state, data) {
      state.allNetworkingEvents.unshift(data);
    },

    // Adding a new connection
    addNewConnection(state, data) {
      state.allConnections.unshift(data);
    },

    // Adding a new job reference
    addNewJobReference(state, data) {
      state.allJobReferences.unshift(data);
    },

    // Deleting a job application
    deleteJobApp(state, data) {
      state.allJobApps.splice(data, 1);
    },

    // Deleting a interview
    deleteInterview(state, data) {
      state.allInterviews.splice(data, 1);
    },

    // Deleting a networking event
    deleteNetworkingEvent(state, data) {
      state.allNetworkingEvents.splice(data, 1);
    },

    // Deleting a connection
    deleteConnection(state, data) {
      state.allConnections.splice(data, 1);
    },

    // Deleting a job reference
    deleteJobReference(state, data) {
      state.allJobReferences.splice(data, 1);
    },

    // Replacing the old job application with the updated job application
    editJobApp(state, data) {
      state.allJobApps.splice(data.index, 0, data.jobApp)
    },

    // Replacing the old interview with the updated interview
    editInterview(state, data) {
      state.allInterviews.splice(data.index, 0, data.interview)
    },

    // Editing a networking event
    editNetworkingEvent(state, data) {
      state.allNetworkingEvents.splice(data.index, 0, data.networkingEvent);
    },

    // Updating a connection
    editConnection(state, data) {
      state.allConnections.splice(data.index, 0, data.connection);
    },

    // Updating a job reference
    editJobReference(state, data) {
      state.allJobReferences.splice(data.index, 0, data.jobRef);
    },

    // Updating the status when the user is searching for specific job applications
    updateSearchJobAppStatus(state, data) {
      state.searchJobAppStatus = data;
    },

    // Updating the status when the user is searching for specific networking events
    updateSearchNetworkingEventStatus(state, data) {
      state.searchNetworkingEventStatus = data;
    },

    // Updating the status when the user is searching for specific job references
    updateSearchJobReferenceStatus(state, data) {
      state.searchJobReferenceStatus = data;
    },

    // Updating the status when the user gets, creates, edits or deletes a new job application
    updateJobAppStatus(state, data) {
      state.jobAppStatus.show = data.show;
      state.jobAppStatus.message = data.message;
      state.jobAppStatus.icon = data.icon;
      state.jobAppStatus.color = data.color;
    },

    // Updating the status when the user gets, creates, edits or deletes a new interview
    updateInterviewStatus(state, data) {
      state.interviewStatus.show = data.show;
      state.interviewStatus.message = data.message;
      state.interviewStatus.icon = data.icon;
      state.interviewStatus.color = data.color;
    },

    // Updating the status when the user uploads, downloads, or deletes their resume
    updateResumeStatus(state, data) {
      state.resumeStatus.show = data.show;
      state.resumeStatus.message = data.message;
      state.resumeStatus.icon = data.icon;
      state.resumeStatus.color = data.color;
    },

    // Updating the status when the user uploads, downloads, or deletes their cover letter
    updateCoverLetterStatus(state, data) {
      state.coverLetterStatus.show = data.show;
      state.coverLetterStatus.message = data.message;
      state.coverLetterStatus.icon = data.icon;
      state.coverLetterStatus.color = data.color;
    },

    // Updating the status when a user gets, creates, edits or deletes their networking event
    updateNetworkingEventStatus(state, data) {
      state.networkingEventStatus.show = data.show;
      state.networkingEventStatus.message = data.message;
      state.networkingEventStatus.icon = data.icon;
      state.networkingEventStatus.color = data.color;
    },

    // Updating the status when a user gets, creates, edits or deletes their job references
    updateJobReferenceStatus(state, data) {
      state.jobReferenceStatus.show = data.show;
      state.jobReferenceStatus.message = data.message;
      state.jobReferenceStatus.icon = data.icon;
      state.jobReferenceStatus.color = data.color;
    },

    // Updating the status when a user updates or deletes their profile
    updateUserProfileStatus(state, data) {
      state.userProfileStatus.show = data.show;
      state.userProfileStatus.message = data.message;
      state.userProfileStatus.icon = data.icon;
      state.userProfileStatus.color = data.color;
    },

    // Updating the status when the user logs out
    updateLogoutStatus(state, data) {
      state.logoutStatus.show = data.show;
      state.logoutStatus.message = data.message;
      state.logoutStatus.icon = data.icon;
      state.logoutStatus.color = data.color;
    },

    updateJobAppsLength(state, data) {
      state.jobAppsLength = data;
    },

    updateInterviewsLength(state, data) {
      state.interviewsLength = data;
    },

    updateNetworkingEventsLength(state, data) {
      state.networkingEventsLength = data;
    },

    updateConnectionsLength(state, data) {
      state.connectionsLength = data;
    },

    updateJobRefsLength(state, data) {
      state.jobRefsLength = data;
    },
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
        context.commit('updateJobAppsLength', res.data.length);
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
    },

    // Creating a GET request to get all the user's interviews
    getInterviews(context, data) {
      // Configuring the request with the url, type and data
      axios.request({
      url: `${process.env.VUE_APP_API_URL}/interviews`,
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      params: {
          userId: data
      }
      }).then((res) => {
          // If the network is done and there are no errors, store the user's interviews
          console.log(res);
          context.commit('updateAllInterviews', res.data);
          context.commit('updateInterviewsLength', res.data.length);
      }).catch((err) => {
          // If the network is done but the page errors, show a error message to the user
          console.log(err);
          let errorStatus = {
          show: true,
          message: "Failed to get interviews. Please refresh the page and try again.",
          icon: "mdi-alert-circle",
          color: "#B34C59"
          }
          // Updating the error message
          this.$store.commit('updateInterviewStatus', errorStatus);
      });
    },

    // Creating a GET request to get all the user's networking events
    getNetworkingEvents(context, data) {
      // Configuring the request with the url, type and data
      axios.request({
      url: `${process.env.VUE_APP_API_URL}/networking-events`,
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      params: {
          userId: data
      }
      }).then((res) => {
          // If the network is done and there are no errors, store the user's networking events
          console.log(res);
          context.commit('updateAllNetworkingEvents', res.data);
          context.commit('updateNetworkingEventsLength', res.data.length);
      }).catch((err) => {
          // If the network is done but the page errors, show a error message to the user
          console.log(err);
          let errorStatus = {
          show: true,
          message: "Failed to get networking events. Please refresh the page and try again.",
          icon: "mdi-alert-circle",
          color: "#B34C59"
          }
          // Updating the error message
          this.$store.commit('updateNetworkingEventStatus', errorStatus);
      });
    },

    // Creating a GET request to get all the user's connections
    getConnections(context, data) {
      // Configuring the request with the url, type and data
      axios.request({
      url: `${process.env.VUE_APP_API_URL}/networking-connections`,
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      params: {
          userId: data
      }
      }).then((res) => {
          // If the network is done and there are no errors, store the user's networking events
          console.log(res);
          context.commit('updateAllConnections', res.data);
          context.commit('updateConnectionsLength', res.data.length);
      }).catch((err) => {
          // If the network is done but the page errors, show a error message to the user
          console.log(err);
          let errorStatus = {
          show: true,
          message: "Failed to get connections. Please refresh the page and try again.",
          icon: "mdi-alert-circle",
          color: "#B34C59"
          }
          // Updating the error message
          this.$store.commit('updateNetworkingEventStatus', errorStatus);
      });
    },

    // Creating a GET request to get all the user's job references
    getJobReferences(context, data) {
      // Configuring the request with the url, type and data
      axios.request({
      url: `${process.env.VUE_APP_API_URL}/job-references`,
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      params: {
          userId: data
      }
      }).then((res) => {
          // If the network is done and there are no errors, store the user's job references
          console.log(res);
          context.commit('updateAllJobReferences', res.data);
          context.commit('updateJobRefsLength', res.data.length);
      }).catch((err) => {
          // If the network is done but the page errors, show a error message to the user
          console.log(err);
          let errorStatus = {
          show: true,
          message: "Failed to get job references. Please refresh the page and try again.",
          icon: "mdi-alert-circle",
          color: "#B34C59"
          }
          // Updating the error message
          this.$store.commit('updateJobReferenceStatus', errorStatus);
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
    },

    // Filtering upcoming networking events from all networking events
    upcomingNetworkingEvents(state) {
      return state.allNetworkingEvents.filter((networkingEvent) => networkingEvent.eventStatus === 'Upcoming');
    },

    // Filtering attended networking events from all networking events
    attendedNetworkingEvents(state) {
      return state.allNetworkingEvents.filter((networkingEvent) => networkingEvent.eventStatus === 'Attended');
    }
  }
})

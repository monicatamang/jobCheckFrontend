import Vue from 'vue';
import VueRouter from 'vue-router';
import CreateAccount from "../views/CreateAccount.vue";
import Login from "../views/Login.vue";
import JobApplications from "../views/JobApplications.vue";
import JobApplicationDetails from "../views/JobApplicationDetails.vue";
import Interviews from "../views/Interviews.vue";
import InterviewDetails from "../views/InterviewDetails.vue";
import JobReferences from "../views/JobReferences.vue";
import NetworkingEvents from "../views/NetworkingEvents.vue";
import NetworkingEventDetails from "../views/NetworkingEventDetails.vue";
import UserProfile from "../views/UserProfile.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/JobApplications',
    name: 'JobApplications',
    component: JobApplications
  },
  {
    path: '/JobApplications/:jobAppId',
    name: 'JobApplicationDetails',
    component: JobApplicationDetails
  },
  {
    path: '/JobApplications/Interviews/:interviewId',
    name: 'InterviewDetails',
    component: InterviewDetails
  },
  {
    path: '/Interviews',
    name: 'Interviews',
    component: Interviews
  },
  {
    path: '/JobReferences',
    name: 'JobReferences',
    component: JobReferences
  },
  {
    path: '/NetworkingEvents',
    name: 'NetworkingEvents',
    component: NetworkingEvents
  },
  {
    path: '/NetworkingEvents/:networkingEventId',
    name: 'NetworkingEventDetails',
    component: NetworkingEventDetails
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: UserProfile
  },
]

const router = new VueRouter({
  routes
})

export default router

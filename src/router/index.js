import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CreateAccount from "../views/CreateAccount.vue";
import Login from "../views/Login.vue";
import JobApplications from "../views/JobApplications.vue";
import JobApplicationDetails from "../views/JobApplicationDetails.vue";
import UserProfile from "../views/UserProfile.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/CreateAccount',
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
    path: '/Profile',
    name: 'Profile',
    component: UserProfile
  },
]

const router = new VueRouter({
  routes
})

export default router

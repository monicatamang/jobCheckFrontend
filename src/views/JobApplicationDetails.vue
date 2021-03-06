<template>
    <section>
        <status-alert :showStatus="showResumeStatus"></status-alert>
        <status-alert :showStatus="showCoverLetterStatus"></status-alert>
        <status-alert :showStatus="showInterviewStatus"></status-alert>
        <mobile-header></mobile-header>
        <view-job-application-details :userInterviews="filteredInterviews" :details="jobAppDetails" @printInterview="appendInterview" @printUpdatedInterview="replaceWithUpdatedInterview" @deleteInterviewFromPage="removeInterview" @notifyDetailsPage="replaceWithUpdatedJobApp"></view-job-application-details>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import StatusAlert from "../components/StatusAlert.vue";
    import MobileHeader from "../components/MobileHeader.vue";
    import ViewJobApplicationDetails from "../components/JobApplicationDetails/ViewJobApplicationDetails.vue";

    export default {
        name: "Job-Application-Details",

        components: {
            StatusAlert,
            MobileHeader,
            ViewJobApplicationDetails
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                jobAppDetails: [
                    {
                        jobAppId: Number(this.$route.params.jobAppId),
                        company: this.$route.params.company,
                        jobPostingUrl: this.$route.params.jobPostingUrl,
                        jobPosition: this.$route.params.jobPosition,
                        jobLocation: this.$route.params.jobLocation,
                        employmentType: this.$route.params.employmentType,
                        salaryType: this.$route.params.salaryType,
                        salaryAmount: this.$route.params.salaryAmount,
                        jobStartDate: this.$route.params.jobStartDate,
                        dueDate: this.$route.params.dueDate,
                        status: this.$route.params.status,
                        appliedDate: this.$route.params.appliedDate,
                        notes: this.$route.params.notes
                    }
                ],
                clearStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                },
                filteredInterviews: [],
            }
        },

        methods: {
            // Creating a GET request to get one of the user's job applications
            getSingleJobApp() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/job-applications`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    userId: cookies.get("userData").userId,
                    jobAppId: Number(this.$route.params.jobAppId)
                }
                }).then((res) => {
                    // If the network is done and there are no errors, replace the undefined data with returned data from the API
                    console.log(res);
                    this.jobAppDetails = res.data;
                }).catch((err) => {
                    // If the network is done but the page errors, show a error message to the user
                    console.log(err);
                    let errorStatus = {
                    show: true,
                    message: "Failed to get all job applications. Please refresh the page and try again.",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                    }
                    // Updating the error message in the store
                    this.$store.commit('updateJobAppStatus', errorStatus);
                });
            },

            // Creating a GET request to get the user's interviews that belong to a job application
            getFilteredInterviews() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/interviews`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    userId: cookies.get("userData").userId,
                    jobAppId: Number(this.$route.params.jobAppId)
                }
                }).then((res) => {
                    // If the network is done and there are no errors, store the user's interviews into the filtered interviews array
                    console.log(res);
                    this.filteredInterviews = res.data;
                }).catch((err) => {
                    // If the network is done but the page errors, updating the store with an error message and displaying it on the page
                    console.log(err);
                    let errorStatus = {
                    show: true,
                    message: "Failed to get interviews. Please refresh the page and try again.",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                    }
                    this.$store.commit('updateInterviewStatus', errorStatus);
                });
            },

            // Listening to the View Job Application Details component for when a user edits their job application
            replaceWithUpdatedJobApp(data) {
                // If the user's job application is edited, get the updated job application from the API
                if(data) {
                    this.getSingleJobApp()
                }
            },

            // Listening to the View Job Application Details component for when a user adds an interview
            appendInterview(data) {
                // Appending the new interview to the filtered interviews array
                this.filteredInterviews.unshift(data);
            },

            // Listening to the View Job Application Details component for when a user edits their interview
            replaceWithUpdatedInterview(data) {
                // If the user edits their interview, get the udpated interview from the API
                if(data) {
                    this.getFilteredInterviews();
                }
            },

            // Listening to the View Job Application Details component for when a user deletes their interview
            removeInterview(data) {
                // If the user deletes their interview, get the current interviews that belong to a job application from the API
                if(data) {
                    this.getFilteredInterviews();
                }
            }
        },

        computed: {
            // Getting the API status from the store when a user adds, edits, deletes or gets their interviews
            showInterviewStatus() {
                return this.$store.state.interviewStatus;
            },

            // Getting all the user's interviews from the store
            currentInterviews() {
                return this.$store.state.allInterviews;
            },

            // Getting the API status from the store when a user uploads, downloads or deletes their resume
            showResumeStatus() {
                return this.$store.state.resumeStatus;
            },

            // Getting the API status from the store when a user uploads, downloads or deletes their cover letter
            showCoverLetterStatus() {
                return this.$store.state.coverLetterStatus;
            }
        },

        mounted() {
            // If the user's filtered interviews are not shown on the page, send an API request to get the user's filtered interviews
            if(this.filteredInterviews.length <= 0) {
                this.getFilteredInterviews();
            }

            // If the user's job application data is undefined, send a GET request to get one of the user's job applications
            if(this.$route.params.jobAppId !== undefined && this.$route.params.company === undefined && this.$route.params.jobPostingUrl === undefined && this.$route.params.jobPosition === undefined && this.$route.params.jobLocation === undefined && this.$route.params.employmentType === undefined && this.$route.params.salaryType === undefined && this.$route.params.salaryAmount === undefined && this.$route.params.jobStartDate === undefined && this.$route.params.dueDate === undefined && this.$route.params.status === undefined && this.$route.params.appliedDate === undefined && this.$route.params.notes === undefined) {
                this.getSingleJobApp();
            }

            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null || this.loginToken === '') {
                this.$router.push("/");
            }

            // Clearing any messages printed to the user
            this.$store.commit('updateInterviewStatus', this.clearStatus);
            this.$store.commit('updateResumeStatus', this.clearStatus);
            this.$store.commit('updateCoverLetterStatus', this.clearStatus);
        }
    }
</script>

<style scoped>
    section {
        background: var(--backgroundColorOne);
    }

    @media only screen and (min-width: 768px) {

        .v-alert {
            width: 100%;
        }
    }

    @media only screen and (min-width: 1024px) {

        .v-alert {
            width: 85%;
            left: 15%;
            font-size: 1rem;
        }
    }
</style>
<template>
    <section>
        <status-alert :showStatus="showJobAppStatus"></status-alert>
        <mobile-header></mobile-header>
        <tablet-side-nav></tablet-side-nav>
        <div id="searchBarContainer">
            <h1>Applications</h1>
            <search-job-application></search-job-application>
        </div>
        <v-chip-group mandatory active-class="black--text">
            <v-chip outlined @click="all = true; notApplied = false; applied = false; closed = false">All</v-chip>
            <v-chip outlined @click="notApplied = true; all = false; applied = false; closed = false">Not Applied</v-chip>
            <v-chip outlined @click="applied = true; all = false; notApplied = false; closed = false">Applied</v-chip>
            <v-chip outlined @click="closed = true; all = false; notApplied = false; applied = false">Closed</v-chip>
        </v-chip-group>
        <h4>{{ showSearchJobAppStatus }}</h4>
        <job-application-card :jobApps="userJobApps"></job-application-card>
        <add-job-application></add-job-application>
        <mobile-bottom-nav :value="0"></mobile-bottom-nav>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import MobileHeader from "../components/MobileHeader.vue";
    import SearchJobApplication from "../components/JobApplications/SearchJobApplication.vue";
    import AddJobApplication from "../components/JobApplications/AddJobApplication.vue";
    import JobApplicationCard from "../components/JobApplications/JobApplicationCard.vue";
    import StatusAlert from "../components/StatusAlert.vue";
    import MobileBottomNav from "../components/MobileBottomNav.vue";
    import TabletSideNav from "../components/TabletSideNav.vue";

    export default {
        name: "Job-Applications",

        components: {
            MobileHeader,
            SearchJobApplication,
            JobApplicationCard,
            AddJobApplication,
            StatusAlert,
            MobileBottomNav,
            TabletSideNav
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                userData: cookies.get("userData"),
                primaryColor: "#52688F",
                tertiaryColor: "#BDC6D9",
                all: false,
                notApplied: false,
                applied: false,
                closed: false,
                clearStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                }
            }
        },

        computed: {
            // Getting the API request status from the store when a user gets, creates, edits or deletes a new job application
            showJobAppStatus() {
                return this.$store.state.jobAppStatus; 
            },

            // Filtering the user's job applications
            userJobApps() {
                // Getting all the user's 'Not Applied' job applications from the store
                if(this.notApplied) {
                    return this.$store.getters.notAppliedJobApps;
                } 
                
                // Getting all the user's 'Applied' job applications from the store
                if(this.applied) {
                    return this.$store.getters.appliedJobApps;
                }
                
                // Getting all the user's 'Closed' job applications from the store
                if(this.closed) {
                    return this.$store.getters.closedJobApps;
                } 

                // Getting all job applications from the store
                return this.$store.state.allJobApps;
            },

            // Getting the API request status from the store when a user searches for a job application
            showSearchJobAppStatus() {
                return this.$store.state.searchJobAppStatus;
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null || this.loginToken === '') {
                this.$router.push("/");
            }

            // If the user's job applications are not shown on the Job Applications page, get all the user's job applications from the store
            if(this.userJobApps.length <= 0) {
                this.$store.dispatch('getJobApps', cookies.get("userData").userId);
            }

            // Clearing any messages printed to the user
            this.$store.commit('updateJobAppStatus', this.clearStatus);
            this.$store.commit('updateSearchJobAppStatus', "");
        },
    }
</script>

<style scoped>
    section, #searchBarContainer {
        display: grid;
        place-items: center;
    }

    #searchBarContainer {
        row-gap: 3vh;
    }

    #searchBarContainer {
        width: 100%;
        background: white;
        position: fixed;
        top: 6%;
        z-index: 1;
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
    }

    h1 {
        font-family: var(--titleFont);
        text-transform: uppercase;
        font-weight: 800;
        color: var(--primaryColor);
        margin-top: 3vh;
        font-size: 1.4rem;
        letter-spacing: 1px;
    }

    h4, .v-chip-group {
        position: relative;
    }

    .v-chip-group {
        top: 27vh;
    }

    h4 {
        top: 22vh;
        font-family: var(--titleFont);
        font-weight: 400;
    }

    @media only screen and (min-width: 768px) {

        h1 {
            font-size: 1.8em;
        }

        #searchBarContainer {
            top: 0;
            padding-bottom: 2%;
            left: 10%;
        }

        .v-chip-group {
            top: 20vh;
            left: 11%;
        }

        .v-chip {
            font-size: 1.05rem;
        }

        h4 {
            left: 10%;
            font-size: 1.2rem;
        }

        .v-alert {
            width: 80%;
            left: 20%;
            font-size: 1.2rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        h1 {
            font-size: 2rem;
        }

        .v-chip-group {
            top: 30vh;
            left: -20%;
        }

        .v-chip {
            font-size: 0.8rem;
        }

        #searchBarContainer {
            padding-bottom: 1%;
            left: 6%;
        }

        h4 {
            left: 5%;
            top: 40vh;
        }

        .v-alert {
            width: 85%;
            left: 15%;
            font-size: 1rem;
        }
    }
</style>
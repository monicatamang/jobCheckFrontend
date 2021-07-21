<template>
    <section>
        <mobile-header></mobile-header>
        <div id="searchBarContainer">
            <h1>Job Applications</h1>
            <v-text-field placeholder="Search Applications" dense outlined single-line :color="tertiaryColor" prepend-inner-icon="mdi-magnify"></v-text-field>
        </div>
        <v-chip-group mandatory active-class="black--text">
            <v-chip outlined @click="all = true; notApplied = false; applied = false; closed = false">All</v-chip>
            <v-chip outlined @click="notApplied = true; all = false; applied = false; closed = false">Not Applied</v-chip>
            <v-chip outlined @click="applied = true; all = false; notApplied = false; closed = false">Applied</v-chip>
            <v-chip outlined @click="closed = true; all = false; notApplied = false; applied = false">Closed</v-chip>
        </v-chip-group>
        <job-application-card :jobApps="userJobApps"></job-application-card>
        <add-job-application></add-job-application>
        <status-alert :showStatus="showJobAppStatus"></status-alert>
        <mobile-bottom-nav></mobile-bottom-nav>
    </section>
</template>

<script>
    import MobileHeader from "../components/MobileHeader.vue";
    import AddJobApplication from "../components/JobApplications/AddJobApplication.vue";
    import JobApplicationCard from "../components/JobApplications/JobApplicationCard.vue";
    import StatusAlert from "../components/StatusAlert.vue";
    import MobileBottomNav from "../components/MobileBottomNav.vue";

    export default {
        name: "Job-Applications",

        components: {
            MobileHeader,
            JobApplicationCard,
            AddJobApplication,
            StatusAlert,
            MobileBottomNav
        },

        data() {
            return {
                primaryColor: "#52688F",
                tertiaryColor: "#BDC6D9",
                all: false,
                notApplied: false,
                applied: false,
                closed: false
            }
        },

        computed: {
            // Getting the API request status from the store when a user creates a new job application
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
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-family: var(--titleFont);
        text-transform: uppercase;
        font-weight: 800;
        color: var(--primaryColor);
        margin-top: 3vh;
        font-size: 1.4rem;
        letter-spacing: 1px;
    }

    section, #searchBarContainer, #searchBar {
        display: grid;
        place-items: center;
    }

    #searchBarContainer, #searchBar {
        row-gap: 3vh;
    }

    #searchBarContainer {
        width: 100%;
        background: white;
        position: fixed;
        top: 6%;
        z-index: 1;
        border-bottom: 1px solid whitesmoke;
    }

    #searchBar {
        grid-template-columns: 1fr auto;
        column-gap: 1vw;
    }

    section {
        margin-top: 7vh;
    }

    .v-chip-group {
        position: relative;
        top: 19vh;
    }
</style>
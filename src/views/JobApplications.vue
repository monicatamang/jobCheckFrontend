<template>
    <section>
        <mobile-header></mobile-header>
        <div id="searchBarContainer">
            <h1>Job Applications</h1>
            <div id="searchBar">
                <v-text-field placeholder="Search Applications" dense outlined single-line :color="tertiaryColor"></v-text-field>
                <v-btn depressed dark :color="primaryColor" id="searchButton">Search</v-btn>
            </div>
        </div>
        <job-application-card :jobApps="userJobApps"></job-application-card>
        <add-job-application></add-job-application>
        <v-alert v-if="showJobAppStatus.show = true" :icon="showJobAppStatus.icon" :color="showJobAppStatus.color" dismissible dark tile :class="{ showAlert: showJobAppStatus.show }">{{ showJobAppStatus.message }}</v-alert>
        <mobile-bottom-nav></mobile-bottom-nav>
    </section>
</template>

<script>
    import MobileHeader from "../components/MobileHeader.vue";
    import AddJobApplication from "../components/JobApplications/AddJobApplication.vue";
    import JobApplicationCard from "../components/JobApplications/JobApplicationCard.vue";
    import MobileBottomNav from "../components/MobileBottomNav.vue";

    export default {
        name: "Job-Applications",

        components: {
            MobileHeader,
            JobApplicationCard,
            AddJobApplication,
            MobileBottomNav
        },

        data() {
            return {
                primaryColor: "#52688F",
                tertiaryColor: "#BDC6D9"
            }
        },

        computed: {
            // Creating a function that gets API request status from the store when a user creates a new job application
            showJobAppStatus() {
                return this.$store.state.jobAppStatus; 
            },

            // Getting all the user's job application from the store
            userJobApps() {
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

    #searchButton {
        align-self: start;
        text-transform: capitalize;
        margin-top: 2px;
    }

    section {
        margin-top: 7vh;
    }
</style>
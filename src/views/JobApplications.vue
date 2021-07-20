<template>
    <section>
        <mobile-header></mobile-header>
        <article>
            <h1>Job Applications</h1>
            <div>
                <v-text-field placeholder="Search Applications" dense outlined single-line :color="primaryColor"></v-text-field>
                <v-btn depressed dark :color="primaryColor" id="searchButton">Search</v-btn>
            </div>
        <add-job-application></add-job-application>
        </article>
        <v-alert :icon="showJobAppStatus.icon" :color="showJobAppStatus.color" dismissible dark tile :class="{ showAlert: showJobAppStatus.show }">{{ showJobAppStatus.message }}</v-alert>
        <mobile-bottom-nav></mobile-bottom-nav>
    </section>
</template>

<script>
    import MobileHeader from "../components/MobileHeader.vue";
    import AddJobApplication from "../components/JobApplications/AddJobApplication.vue";
    import MobileBottomNav from "../components/MobileBottomNav.vue";

    export default {
        name: "Job-Applications",

        components: {
            MobileHeader,
            AddJobApplication,
            MobileBottomNav
        },

        data() {
            return {
                primaryColor: "#52688F"
            }
        },

        computed: {
            // Creating a function that gets API request status from the store when a user creates a new job application
            showJobAppStatus() {
                return this.$store.state.createJobAppStatus; 
            }
        },
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

    article, div {
        display: grid;
        place-items: center;
        row-gap: 3vh;
    }

    article {
        width: 100%;
        background: white;
        position: fixed;
    }

    div {
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

    .v-alert {
        position: absolute;
        bottom: 5%;
        display: none;
    }

    .showAlert {
        display: block;
    }
</style>
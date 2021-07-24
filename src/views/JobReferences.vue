<template>
    <section>
        <status-alert :showStatus="showJobReferenceStatus"></status-alert>
        <mobile-header></mobile-header>
        <div id="searchBarContainer">
            <h1>Job References</h1>
            <search-job-reference></search-job-reference>
        </div>
        <h4>{{ showSearchJobReferenceStatus }}</h4>
        <job-reference-card :jobRefs="currentJobReferences"></job-reference-card>
        <add-job-reference></add-job-reference>
        <mobile-bottom-nav :value="3"></mobile-bottom-nav>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import StatusAlert from "../components/StatusAlert.vue";
    import MobileHeader from "../components/MobileHeader.vue";
    import SearchJobReference from "../components/JobReferences/SearchJobReference.vue";
    import JobReferenceCard from "../components/JobReferences/JobReferenceCard.vue";
    import AddJobReference from "../components/JobReferences/AddJobReference.vue";
    import MobileBottomNav from "../components/MobileBottomNav.vue";

    export default {
        name: "Job-References",

        components: {
            StatusAlert,
            MobileHeader,
            SearchJobReference,
            AddJobReference,
            JobReferenceCard,
            MobileBottomNav
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                clearJobRefStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                }
            }
        },

        computed: {
            currentJobReferences() {
                return this.$store.state.allJobReferences; 
            },

            showJobReferenceStatus() {
                return this.$store.state.jobReferenceStatus;
            },

            showSearchJobReferenceStatus() {
                return this.$store.state.searchJobReferenceStatus;
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null || this.loginToken === '') {
                this.$router.push("/");
            }

            // Clearing any messages printed to the user
            this.$store.commit('updateJobReferenceStatus', this.clearJobRefStatus);
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

    h4 {
        font-weight: 400;
        position: relative;
        top: 22vh;
        font-family: var(--titleFont);
        font-weight: 400;
    }

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
        border-bottom: 1px solid whitesmoke;
    }

    section {
        margin-top: 7vh;
    }
</style>
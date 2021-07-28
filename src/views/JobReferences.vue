<template>
    <section>
        <status-alert :showStatus="showJobReferenceStatus"></status-alert>
        <mobile-header></mobile-header>
        <tablet-side-nav></tablet-side-nav>
        <div id="searchBarContainer">
            <h1>References</h1>
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
    import TabletSideNav from "../components/TabletSideNav.vue";

    export default {
        name: "Job-References",

        components: {
            StatusAlert,
            MobileHeader,
            SearchJobReference,
            AddJobReference,
            JobReferenceCard,
            MobileBottomNav,
            TabletSideNav
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                clearStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                }
            }
        },

        computed: {
            // Getting all the user's job references from the store
            currentJobReferences() {
                return this.$store.state.allJobReferences; 
            },

            // Getting the API request status when a user adds, edits, deletes or gets a job reference
            showJobReferenceStatus() {
                return this.$store.state.jobReferenceStatus;
            },

            // Getting the API request status when a user searches for a job reference
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
            this.$store.commit('updateJobReferenceStatus', this.clearStatus);
            this.$store.commit('updateSearchJobReferenceStatus', "");
        },
    }
</script>

<style scoped>
    section {
        margin-top: 7vh;
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

    @media only screen and (min-width: 768px) {

        section {
            margin-top: 0vh;
        }

        h1 {
            font-size: 1.8em;
        }

        #searchBarContainer {
            top: 0;
            padding-bottom: 2%;
            left: 10%;
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
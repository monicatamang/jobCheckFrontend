<template>
    <section>
        <status-alert :showStatus="showInterviewStatus"></status-alert>
        <mobile-header></mobile-header>
        <tablet-side-nav></tablet-side-nav>
        <div id="searchBarContainer">
            <h1>Interviews</h1>
            <search-interview></search-interview>
        </div>
        <h4>{{ showSearchInterviewStatus }}</h4>
        <div id="interviewCardsComp">
            <interview-card :interviews="userInterviews"></interview-card>
        </div>
        <mobile-bottom-nav :value="1"></mobile-bottom-nav>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import StatusAlert from "../components/StatusAlert.vue";
    import MobileHeader from "../components/MobileHeader.vue";
    import SearchInterview from "../components/Interviews/SearchInterview.vue";
    import InterviewCard from "../components/Interviews/InterviewCard.vue";
    import MobileBottomNav from "../components/MobileBottomNav.vue";
    import TabletSideNav from "../components/TabletSideNav.vue";

    export default {
        name: "Interviews",

        components: {
            StatusAlert,
            MobileHeader,
            SearchInterview,
            InterviewCard,
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

        methods: {
            // Getting all the user's interviews from the API
            getAllUserInterviews() {
                this.$store.dispatch('getInterviews', cookies.get("userData").userId);
            }
        },

        computed: {
            // Getting all the user's interviews from the store
            userInterviews() {
                return this.$store.state.allInterviews; 
            },

            // Getting the API request status when creating, editing, deleting or getting interviews
            showInterviewStatus() {
                return this.$store.state.interviewStatus;
            },

            // Getting the API request status when a user is searching for interviews
            showSearchInterviewStatus() {
                return this.$store.state.searchInterviewStatus;
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null || this.loginToken === '') {
                this.$router.push("/");
            }

            // If the user's interviews are not shown on the Interviews page, get all the user's interviews from the store
            if(this.userInterviews.length <= 0) {
                this.$store.dispatch('getInterviews', cookies.get("userData").userId);
            }

            // Clearing any messages printed to the user
            this.$store.commit('updateInterviewStatus', this.clearStatus);
            this.$store.commit('updateSearchInterviewStatus', "");
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

    #interviewCardsComp {
        margin: 24vh 0vw 5vh 0vw;
        width: 100%;
    }

    h4 {
        position: relative;
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

        #interviewCardsComp {
            margin-left: 20%;
            width: 80%;
            margin-top: 20vh;
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

        #interviewCardsComp {
            margin-left: 15%;
            margin-top: 25vh;
        }

        .v-alert {
            width: 85%;
            left: 15%;
            font-size: 1rem;
        }
    }
</style>
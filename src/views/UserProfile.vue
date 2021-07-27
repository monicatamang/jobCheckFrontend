<template>
    <section>
        <status-alert :showStatus="showUserProfileStatus"></status-alert>
        <status-alert :showStatus="showLogoutStatus"></status-alert>
        <tablet-side-nav></tablet-side-nav>
        <v-app-bar color="white" flat fixed class="pt-sm-5">
            <v-spacer></v-spacer>
                <h1 class="pb-sm-7">Profile</h1>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-container>
            <v-row class="hidden-sm-and-up">
                <v-btn text class="mt-16" @click="goToPreviousPage"><v-icon>mdi-keyboard-backspace</v-icon>Back</v-btn>
            </v-row>
        </v-container>
        <account-information :userData="userData" @sendUpdatedProfileToPage="showUpdatedProfileOnPage"></account-information>
        <stats-overview></stats-overview>
        <div id="hideOnDesktop">
            <logout-user></logout-user>
        </div>
        <delete-profile></delete-profile>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import AccountInformation from "../components/UserProfile/AccountInformation.vue";
    import StatsOverview from "../components/UserProfile/StatsOverview.vue";
    import DeleteProfile from "../components/UserProfile/DeleteProfile.vue";
    import LogoutUser from "../components/LogoutUser.vue";
    import StatusAlert from "../components/StatusAlert.vue";
    import TabletSideNav from "../components/TabletSideNav.vue";

    export default {
        name: "User-Profile",

        components: {
            AccountInformation,
            StatsOverview,
            DeleteProfile,
            LogoutUser,
            StatusAlert,
            TabletSideNav
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                userData: cookies.get("userData"),
                clearStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                }
            }
        },

        methods: {
            // Taking the user to the previous page
            goToPreviousPage() {
                this.$router.go(-1);
            },

            // Listening to the Account Information component for when a user edits their profile
            showUpdatedProfileOnPage(data) {
                // Replacing the old user' profile data with the updated user's profile data
                this.userData = data;
            }
        },

        computed: {
            // Getting the API request status from the store when a user edits or deletes their profile
            showUserProfileStatus() {
                return this.$store.state.userProfileStatus;
            },

            // Getting the API request status from the store when a user logs out
            showLogoutStatus() {
                return this.$store.state.logoutStatus; 
            },
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null || this.loginToken === '') {
                this.$router.push("/");
            }

            // Clearing any messages printed to the user
            this.$store.commit('updateUserProfileStatus', this.clearStatus);
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        row-gap: 3vh;
        width: 100%;
        margin-bottom: 3vh;
        background: var(--backgroundColorOne);
    }

    h1 {
        color: var(--primaryColor);
        font-family: var(--titleFont);
        text-transform: uppercase;
        font-weight: 800;
    }

    h3 {
        font-family: var(--titleFont);
    }

    h4 {
        font-weight: 400;
    }

    .heading {
        font-weight: 600;
    }

    @media only screen and (min-width: 768px) {

        h1 {
            font-size: 1.8em;
            margin-left: 20%;
        }

        .v-alert {
            width: 80%;
            left: 20%;
            font-size: 1.2rem;
        }
    }

    @media only screen and (min-width: 1024px) {
        
        #hideOnDesktop {
            display: none
        }
    }
</style>
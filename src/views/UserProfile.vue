<template>
    <section>
        <status-alert :showStatus="showUserProfileStatus"></status-alert>
        <status-alert :showStatus="showLogoutStatus"></status-alert>
        <v-app-bar color="white" flat fixed>
            <v-spacer></v-spacer>
                <h1>Profile</h1>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-container>
            <v-row>
                <v-btn text class="mt-16" @click="goToPreviousPage"><v-icon>mdi-keyboard-backspace</v-icon>Back</v-btn>
            </v-row>
        </v-container>
        <account-information :userData="userData" @sendUpdatedProfileToPage="showUpdatedProfileOnPage"></account-information>
        <stats-overview></stats-overview>
        <logout-user></logout-user>
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

    export default {
        name: "User-Profile",

        components: {
            AccountInformation,
            StatsOverview,
            DeleteProfile,
            LogoutUser,
            StatusAlert
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
            goToPreviousPage() {
                this.$router.go(-1);
            },

            // Listening to the 'AccountInformation' component and updated the user's data
            showUpdatedProfileOnPage(data) {
                this.userData = data;
            }
        },

        computed: {
            // Getting the API request status from the status when a user logs out
            showLogoutStatus() {
                return this.$store.state.logoutStatus; 
            },

            showUserProfileStatus() {
                return this.$store.state.userProfileStatus;
            }
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

    article {
        width: 90%;
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
</style>
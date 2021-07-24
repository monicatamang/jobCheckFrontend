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
        <article id="userProfileData">
            <v-container>
                <v-row>
                    <v-col cols="10">
                        <h2>Account Information</h2>
                    </v-col>
                    <v-col cols="2">
                        <edit-profile></edit-profile>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12">
                                <h3 class="heading">First Name</h3>
                            </v-col>
                            <v-col cols="12">
                                <h3>{{ userData.firstName }}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12">
                                <h3 class="heading">Last Name</h3>
                            </v-col>
                            <v-col cols="12">
                                <h3>{{ userData.lastName }}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12">
                                <h3 class="heading">Email</h3>
                            </v-col>
                            <v-col cols="12">
                                <h3>{{ userData.email }}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </article>  
        <article id="dashboard">
            <h2>Dashboard</h2>
            <v-divider></v-divider>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <h3>Job Applications</h3>
                            </v-col>
                            <v-col cols="2">
                                <h3>{{ userJobApps }}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <h3>Interviews</h3>
                            </v-col>
                            <v-col cols="2">
                                <h3>{{ userInterviews }}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <h3>Networking Events</h3>
                            </v-col>
                            <v-col cols="2">
                                <h3>{{ userNetworkingEvents }}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <h3>Networking Connections</h3>
                            </v-col>
                            <v-col cols="2">
                                <h3>{{ userConnections }}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <h3>Job References</h3>
                            </v-col>
                            <v-col cols="2">
                                <h3>{{ userJobRefs }}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </article>
        <logout-user></logout-user>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import EditProfile from "../components/UserProfile/EditProfile.vue";
    import LogoutUser from "../components/LogoutUser.vue";
    import StatusAlert from "../components/StatusAlert.vue";

    export default {
        name: "User-Profile",

        components: {
            EditProfile,
            LogoutUser,
            StatusAlert
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                userData: cookies.get("userData"),
                jobApps: undefined,
                interviews: undefined,
                networkingEvents: undefined,
                connections: undefined,
                jobRefs: undefined
            }
        },

        methods: {
            goToPreviousPage() {
                this.$router.go(-1);
            },
        },

        computed: {
            // Getting the API request status from the status when a user logs out
            showLogoutStatus() {
                return this.$store.state.logoutStatus; 
            },

            userJobApps() {
                return this.$store.state.jobAppsLength;
            },

            userInterviews() {
                return this.$store.state.interviewsLength;
            },

            userNetworkingEvents() {
                return this.$store.state.networkingEventsLength;
            },

            userConnections() {
                return this.$store.state.connectionsLength;
            },

            userJobRefs() {
                return this.$store.state.jobRefsLength;
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
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        row-gap: 3vh;
        width: 100%;
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

    h2 {
        font-family: var(--titleFont);
    }

    h3 {
        font-weight: 400;
    }

    .heading {
        font-weight: 600;
    }
</style>
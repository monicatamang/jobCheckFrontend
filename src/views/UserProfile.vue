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
                        <h3>Account Information</h3>
                    </v-col>
                    <v-col cols="2">
                        <edit-profile @userProfileUpdated="handleUpdatedProfile"></edit-profile>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12">
                                <h4 class="heading">First Name</h4>
                            </v-col>
                            <v-col cols="12">
                                <h4>{{ userData.firstName }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12">
                                <h4 class="heading">Last Name</h4>
                            </v-col>
                            <v-col cols="12">
                                <h4>{{ userData.lastName }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12">
                                <h4 class="heading">Email</h4>
                            </v-col>
                            <v-col cols="12">
                                <h4>{{ userData.email }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </article>  
        <article id="dashboard">
            <h3 class="mb-5 mx-3">Dashboard</h3>
            <v-divider></v-divider>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <h4>Job Applications</h4>
                            </v-col>
                            <v-col cols="2">
                                <h4>{{ userJobApps }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <h4>Interviews</h4>
                            </v-col>
                            <v-col cols="2">
                                <h4>{{ userInterviews }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <h4>Networking Events</h4>
                            </v-col>
                            <v-col cols="2">
                                <h4>{{ userNetworkingEvents }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <h4>Networking Connections</h4>
                            </v-col>
                            <v-col cols="2">
                                <h4>{{ userConnections }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="10">
                                <h4>Job References</h4>
                            </v-col>
                            <v-col cols="2">
                                <h4>{{ userJobRefs }}</h4>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </article>
        <logout-user></logout-user>
        <delete-profile></delete-profile>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import EditProfile from "../components/UserProfile/EditProfile.vue";
    import DeleteProfile from "../components/UserProfile/DeleteProfile.vue";
    import LogoutUser from "../components/LogoutUser.vue";
    import StatusAlert from "../components/StatusAlert.vue";

    export default {
        name: "User-Profile",

        components: {
            EditProfile,
            DeleteProfile,
            LogoutUser,
            StatusAlert
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                userData: cookies.get("userData"),
                clearJobAppStatus: {
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

            // Listening to the 'Edit Profile' component and updated the user's data
            handleUpdatedProfile(data) {
                this.userData = data;
            }
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

            if(this.userJobApps === undefined) {
                this.$store.dispatch('getJobApps', this.userData.userId);
            }

            if(this.userInterviews === undefined) {
                this.$store.dispatch('getInterviews', this.userData.userId);
            }

            if(this.userNetworkingEvents === undefined) {
                this.$store.dispatch('getNetworkingEvents', this.userData.userId);
            }

            if(this.userConnections === undefined) {
                this.$store.dispatch('getConnections', this.userData.userId);
            }

            if(this.userJobRefs === undefined) {
                this.$store.dispatch('getJobReferences', this.userData.userId);
            }

            // Clearing any messages printed to the user
            this.$store.commit('updateUserProfileStatus', this.clearJobAppStatus);
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
<template>
    <div id="tabletNavContainer" class="hidden-xs-and-down">
        <img src="../assets/jobCheckLogoIcon.jpg" alt="Job Check's official logo icon which is a cornflower blue coloured checkmark.">
        <div id="tabletNav">
            <v-btn plain depressed @click="goTojobApplicationsPage">
                <div class="tabs">
                    <v-icon large>mdi-file</v-icon>
                    <span>Applications</span>
                </div>
            </v-btn>
            <v-btn plain depressed @click="goToInterviewsPage">
                <div class="tabs">
                    <v-icon large>mdi-briefcase-variant</v-icon>
                    <span>Interviews</span>
                </div>
            </v-btn>
            <v-btn plain depressed @click="goToNetworkingEventsPage">
                <div class="tabs">
                    <v-icon large>mdi-account-group</v-icon>
                    <span>Networking</span>
                </div>
            </v-btn>
            <v-btn plain depressed @click="goToJobReferencesPage">
                <div class="tabs">
                    <v-icon large>mdi-account-supervisor</v-icon>
                    <span>References</span>
                </div>
            </v-btn>
        </div>
        <router-link to="/Profile">
            <v-avatar :color="avatarColor" size="50">
                <span id="initials">{{ userData.firstName.charAt(0) }}{{ userData.lastName.charAt(0) }}</span>
            </v-avatar>
            <span id="profile">Profile</span>
        </router-link>
    </div>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "tablet-side-nav",

        data() {
            return {
                userData: cookies.get("userData"),
                avatarColor: "#7391C8"
            }
        },

        methods: {
            // Taking the user to the Job Applications page
            goTojobApplicationsPage() {
                this.$router.push("/JobApplications");
            },

            // Taking the user to the Interviews page
            goToInterviewsPage() {
                this.$router.push("/Interviews");
            },

            // Taking the user to the Networking Events page
            goToNetworkingEventsPage() {
                this.$router.push("/NetworkingEvents");
            },

            // Taking the user to the Job References page
            goToJobReferencesPage() {
                this.$router.push("/JobReferences");
            },

            // Taking the user to their Profile page
            goToProfilePage() {
                this.$router.push("/Profile");
            }
        },
    }
</script>

<style scoped>
    #tabletNavContainer {
        display: none;
    }

    @media only screen and (min-width: 768px) {

        #tabletNavContainer {
            display: grid;
            place-items: center;
            background: white;
            border-right: 1px solid rgba(211, 211, 211, 0.5);
            height: 100%;
            width: 20%;
            z-index: 10;
            position: fixed;
        }

        #tabletNav {
            display: grid;
            place-items: center;
            row-gap: 6vh;
            height: 100%;
        }

        .tabs {
            display: grid;
            place-items: center;
            row-gap: 5px;
            grid-template-rows: 1fr 1fr;
        }

        img {
            width: 25%;
        }

        .v-application a {
            display: grid;
            place-items: center;
            row-gap: 10px;
            text-decoration: none;
            color: black;
        }

        #initials {
            color: white;
            font-size: 1.3rem;
        }

        span {
            text-transform: capitalize;
            font-size: 1rem;
        }

        #profile {
            letter-spacing: 1px;
        }
    }
</style>
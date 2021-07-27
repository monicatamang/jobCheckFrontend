<template>
    <div id="tabletNavContainer" class="hidden-xs-and-down">
        <img id="tabletSizeLogo" src="../assets/jobCheckLogoIcon.jpg" alt="Job Check's official logo icon which is a cornflower blue coloured checkmark.">
        <div id="desktopSizeLogo">
            <img src="../assets/jobCheckLogoWhiteBackground.jpg" alt="Job Check's official logo which has the words 'Job Check' in a bold, blue grey colour with a cornflower blue-coloured check mark on the left side of the letter 'J' in 'Job Check'.">
        </div>
        <div id="tabletNav">
            <v-btn plain depressed @click="goTojobApplicationsPage">
                <div class="tabs">
                    <v-icon>mdi-file</v-icon>
                    <span>Applications</span>
                </div>
            </v-btn>
            <v-btn plain depressed @click="goToInterviewsPage">
                <div class="tabs">
                    <v-icon>mdi-briefcase-variant</v-icon>
                    <span>Interviews</span>
                </div>
            </v-btn>
            <v-btn plain depressed @click="goToNetworkingEventsPage">
                <div class="tabs">
                    <v-icon>mdi-account-group</v-icon>
                    <span>Networking</span>
                </div>
            </v-btn>
            <v-btn plain depressed @click="goToJobReferencesPage">
                <div class="tabs">
                    <v-icon>mdi-account-supervisor</v-icon>
                    <span>References</span>
                </div>
            </v-btn>
            <v-btn plain depressed @click="goToProfilePage" id="desktopProfileTab">
                <div class="tabs">
                    <v-icon>mdi-account</v-icon>
                    <span>Profile</span>
                </div>
            </v-btn>
        </div>
        <router-link to="/Profile" id="tabletProfileTab">
            <v-avatar :color="avatarColor" size="50">
                <span id="initials">{{ userData.firstName.charAt(0) }}{{ userData.lastName.charAt(0) }}</span>
            </v-avatar>
            <span id="profile">Profile</span>
        </router-link>
        <div id="logoutButton">
            <logout-user></logout-user>
        </div>
    </div>
</template>

<script>
    import cookies from "vue-cookies";
    import LogoutUser from "../components/LogoutUser.vue";

    export default {
        name: "tablet-side-nav",

        components: {
            LogoutUser,
        },

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
            top: 0%;
            left: 0%;
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

        #desktopSizeLogo, #desktopProfileTab, #logoutButton {
            display: none;
        }

        .v-btn .v-icon {
            font-size: 2.1rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        #tabletSizeLogo, #tabletProfileTab {
            display: none;
        }

        #desktopSizeLogo, #logoutButton {
            display: grid;
            place-items: center;
            height: 50%;
            width: 100%;
        }

        #desktopProfileTab {
            display: grid;
        }

        #desktopSizeLogo {
            align-self: start;
            border-bottom: 1px solid rgba(211, 211, 211, 0.5);
        }

        #logoutButton {
            align-self: end;
            border-top: 1px solid rgba(211, 211, 211, 0.5);
        }

        img {
            width: 55%;
        }

        #tabletNavContainer {
            width: 15%;
            height: 100%;
        }

        #tabletNav {
            row-gap: 0px;
        }

        .tabs {
            grid-template-rows: none;
            grid-template-columns: auto 1fr;
            column-gap: 5px;
        }

        span {
            font-size: 0.8rem;
            letter-spacing: 0.5px;
        }

        .v-btn .v-icon {
            font-size: 1.3rem;
        }
    }
</style>
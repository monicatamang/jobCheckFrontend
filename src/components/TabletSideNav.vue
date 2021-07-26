<template>
    <div id="tabletNavContainer" class="hidden-xs-and-down">
        <img src="../assets/jobCheckLogoIcon.jpg" alt="Job Check's official logo icon which is a cornflower blue coloured checkmark.">
        <div id="tabletNav">
            <v-btn plain depressed :color="jobAppsPageColor" @click="goTojobApplicationsPage">
                <div class="tabs">
                    <v-icon large>mdi-file</v-icon>
                    <span>Applications</span>
                </div>
            </v-btn>
            <v-btn plain depressed :color="interviewsPageColor" @click="goToInterviewsPage">
                <div class="tabs">
                    <v-icon large>mdi-briefcase-variant</v-icon>
                    <span>Interviews</span>
                </div>
            </v-btn>
            <v-btn plain depressed :color="networkingEventsPageColor" @click="goToNetworkingEventsPage">
                <div class="tabs">
                    <v-icon large>mdi-account-group</v-icon>
                    <span>Networking</span>
                </div>
            </v-btn>
            <v-btn plain depressed :color="jobRefsPageColor" @click="goToJobReferencesPage">
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
                avatarColor: "#7391C8",
                jobAppsPageColor: "black",
                interviewsPageColor: "black",
                networkingEventsPageColor: "black",
                jobRefsPageColor: "black"
            }
        },

        methods: {
            // highlightCurrentPage(jobAppsColor, interviewsColor, networkingEventsColor, jobRefsColor) {
            //     this.jobAppsPageColor = jobAppsColor;
            //     this.interviewsPageColor = interviewsColor;
            //     this.networkingEventsPageColor = networkingEventsColor;
            //     this.jobReferencesPageColor = jobRefsColor;
            // },

            // Taking the user to the Job Applications page
            goTojobApplicationsPage() {
                this.$router.push("/JobApplications");
                // Hightlighting the current page
                // this.highlightCurrentPage("#7391C8", "black", "black", "black");
                // this.jobAppsPageColor = "#7391C8";
                // this.interviewsPageColor = "black";
                // this.networkingEventsPageColor = "black";
                // this.jobReferencesPageColor = "black";
            },

            // Taking the user to the Interviews page
            goToInterviewsPage() {
                this.$router.push("/Interviews");
                // Hightlighting the current page
                // this.highlightCurrentPage("black", "#7391C8", "black", "black");
                // this.jobAppsPageColor = "black";
                // this.interviewsPageColor = "#7391C8";
                // this.networkingEventsPageColor = "black";
                // this.jobReferencesPageColor = "black";
            },

            // Taking the user to the Networking Events page
            goToNetworkingEventsPage() {
                this.$router.push("/NetworkingEvents");
                // Hightlighting the current page
                // this.highlightCurrentPage("black", "black", "#7391C8", "black");
            },

            // Taking the user to the Job References page
            goToJobReferencesPage() {
                this.$router.push("/JobReferences");
                // Hightlighting the current page
                // this.highlightCurrentPage("black", "black", "black", "#7391C8");
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
            z-index: 5;
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
            width: 30%;
            margin-top: -3vh;
            margin-bottom: 3vh;
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
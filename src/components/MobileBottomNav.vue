<template>
    <v-bottom-navigation :color="navColor" :value="value" fixed>
        <v-btn @click="goTojobApplicationsPage">
            <span>Applications</span>
            <v-icon>mdi-file</v-icon>
        </v-btn>
        <v-btn @click="goToInterviewsPage">
            <span>Interviews</span>
            <v-icon>mdi-briefcase-variant</v-icon>
        </v-btn>
        <v-btn @click="goToNetworkingEventsPage">
            <span>Networking</span>
            <v-icon>mdi-account-group</v-icon>
        </v-btn>
        <v-btn @click="goToJobReferencesPage">
            <span>References</span>
            <v-icon>mdi-account-supervisor</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
    export default {
        name: "mobile-bottom-nav",

        props: {
            value: Number
        },

        data() {
            return {
                navColor: "#7391C8"
            }
        },

        methods: {
            goTojobApplicationsPage() {
                this.$router.push("/JobApplications");
            },

            goToInterviewsPage() {
                this.$router.push("/Interviews");
            },

            goToNetworkingEventsPage() {
                this.$router.push("/NetworkingEvents");
            },

            goToJobReferencesPage() {
                this.$router.push("/JobReferences");
            }
        },
    }
</script>

<style scoped>
    span {
        font-size: 0.6rem;
    }
</style>
<template>
    <article>
            <h3 class="mb-5 mx-3">Overview</h3>
            <v-divider></v-divider>
            <v-container>
                <v-row>
                    <v-col cols="12" class="mt-3">
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
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "stats-overview",

        data() {
            return {
                userData: cookies.get("userData")
            }
        },

        computed: {
            // Getting the total number of job applications the user has from the store
            userJobApps() {
                return this.$store.state.jobAppsLength;
            },

            // Getting the total number of interviews the user has from the store
            userInterviews() {
                return this.$store.state.interviewsLength;
            },

            // Getting the total number of networking event the user has from the store
            userNetworkingEvents() {
                return this.$store.state.networkingEventsLength;
            },

            // Getting the total number of connections the user has from the store
            userConnections() {
                return this.$store.state.connectionsLength;
            },

            // Getting the total number of job references the user has from the store
            userJobRefs() {
                return this.$store.state.jobRefsLength;
            },
        },

        mounted () {
            // If the total number of job applications are not shown on the page, get the user's job applications from the API
            if(this.userJobApps === undefined) {
                this.$store.dispatch('getJobApps', this.userData.userId);
            }

            // If the total number of interviews are not shown on the page, get the user's interviews from the API
            if(this.userInterviews === undefined) {
                this.$store.dispatch('getInterviews', this.userData.userId);
            }

            // If the total number of networking events are not shown on the page, get the user's networking events from the API
            if(this.userNetworkingEvents === undefined) {
                this.$store.dispatch('getNetworkingEvents', this.userData.userId);
            }

            // If the total number of connections are not shown on the page, get the user's connection from the API
            if(this.userConnections === undefined) {
                this.$store.dispatch('getConnections', this.userData.userId);
            }

            // If the total number of job references are not shown on the page, get the user's job references from the API
            if(this.userJobRefs === undefined) {
                this.$store.dispatch('getJobReferences', this.userData.userId);
            }
        },
    }
</script>

<style scoped>
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
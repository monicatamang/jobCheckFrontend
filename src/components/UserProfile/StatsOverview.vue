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
        },

        mounted () {
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
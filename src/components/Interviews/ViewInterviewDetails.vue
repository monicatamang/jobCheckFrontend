<template>
    <article>
        <div v-for="detail in details" :key="detail.interviewId">
            <v-container>
                <v-row>
                    <v-col cols="9" sm="10">
                        <v-btn text class="mt-16 mt-sm-5" @click="goToPreviousPage"><v-icon>mdi-keyboard-backspace</v-icon>Back</v-btn>
                    </v-col>
                    <v-col cols="3" sm="2">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn dark text color="black" v-bind="attrs" v-on="on" class="mt-16 mt-sm-5">
                                    <v-icon class="mr-n5">mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <edit-interview :interviewId="detail.interviewId" @interviewUpdated="handleInterviewUpdated"></edit-interview>
                                </v-list-item>
                                <v-list-item>
                                    <delete-interview :interviewId="detail.interviewId"></delete-interview>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
            <h3 class="company">{{ detail.company }}</h3>
            <h3>{{ detail.jobPosition }}</h3>
            <router-link :to="{ name: 'JobApplicationDetails', params: detail.jobAppId }">View Job Application</router-link>
            <div class="importantDetailsContainer">
                <div>
                    <h4 class="heading">Date</h4>
                    <h4>{{ detail.interviewDate }}</h4>
                </div>
                <div>
                    <h4 class="heading">Time</h4>
                    <h4>{{ detail.interviewTime }} {{ detail.interviewTimePeriod }} ({{ detail.interviewTimeZone }})</h4>
                </div>
            </div>
            <div class="otherDetails">
                <div>
                    <h4 class="heading">Type of Interview</h4>
                    <h4 v-if="detail.interviewType !== '' && detail.interviewType !== null">{{ detail.interviewType }}</h4>
                    <h4 v-else-if="detail.interviewType === '' || detail.interviewType === null">N/A</h4>
                </div>
                <div>
                    <h4 class="heading">Location</h4>
                    <h4 v-if="detail.interviewLocation !== '' && detail.interviewLocation !== null">{{ detail.interviewLocation }}</h4>
                    <h4 v-else-if="detail.interviewLocation === '' || detail.interviewLocation === null">N/A</h4>
                </div>
                <div>
                    <h4 class="heading">Notes</h4>
                    <h4 v-if="detail.notes !== '' && detail.notes !== null">{{ detail.notes }}</h4>
                    <h4 v-else-if="detail.notes === '' || detail.notes === null">N/A</h4>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import EditInterview from "./EditInterview.vue";
    import DeleteInterview from "./DeleteInterview.vue";

    export default {
        name: "view-interview-details",

        components: {
            EditInterview,
            DeleteInterview
        },

        // Receiving an array of one user's interview
        props: {
            details: Array
        },

        methods: {
            // Taking the user to the previous page
            goToPreviousPage() {
                this.$router.go(-1);
            },

            // Listening to the Edit Interview component for when a user updates their interview
            handleInterviewUpdated(data) {
                // Notifying the Intervew Details page that the user updated their interview
                this.$emit('sendUpdatedInterviewToDetailsPage', data);
            }
        },
    }
</script>

<style scoped>
    article {
        background: var(--backgroundColorTwo);
    }

    article > div {
        row-gap: 10px;
        margin-bottom: 3vh;
        width: 100%;
    }

    article, article > div, .importantDetailsContainer, .otherDetails, .otherDetails div, .importantDetailsContainer div {
        display: grid;
    }

    article, article > div, .importantDetailsContainer  {
        place-items: center;
    }

    .otherDetails {
        justify-self: start;
        row-gap: 20px;
        background: var(--backgroundColorTwo);
        margin: 0% 8%;
    }

    .importantDetailsContainer {
        grid-template-columns: repeat(2, 1fr);
        text-align: center;
        background: white;
        width: 100%;
        padding: 5% 3%;
        margin: 2vh 0vw;
    }

    .importantDetailsContainer div, .otherDetails div {
        row-gap: 5px;
    }

    .v-btn {
        text-transform: capitalize;
        justify-self: start;
    }

    .company {
        color: var(--primaryColor);
        font-weight: 700;
        font-size: 1.3rem;
    }

    .heading {
        font-weight: 600;
    }

    h4 {
        font-size: 1rem;
        font-weight: 400;
    }

    h3 {
        font-weight: 400;
        font-size: 1.1rem;
    }

    .v-application a {
        color: var(--primaryColor);
        text-decoration: none;
    }

    @media only screen and (min-width: 768px) {
        
        article > div {
            width: 90%;
            margin: 3vh 0vw 6vh 0vw;
        }

        .company {
            font-size: 1.8rem;
        }

        h3 {
            font-size: 1.6rem;
        }

        h4, .v-application a {
            font-size: 1.4rem;
        }

        .v-tab {
            font-size: 1.15rem;
        }

        .importantDetailsContainer {
            margin: 2vh 0vw;
            row-gap: 20px;
        }

        .v-btn, .v-chip {
            font-size: 1.2rem;
        }

        .v-btn .v-icon {
            font-size: 2.2rem;
        }

        .importantDetailsContainer div, .otherDetails div {
            row-gap: 10px;
        }

        .otherDetails {
            row-gap: 30px;
        }
    }
</style>
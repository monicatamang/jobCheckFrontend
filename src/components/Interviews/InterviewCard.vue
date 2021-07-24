<template>
    <article id="interviewCardsContainer" v-if="jobAppId">
        <div v-for="interview in interviews" :key="interview.interviewId" class="interviewCard">
            <div v-if="jobAppId === interview.jobAppId">
                <v-container>
                    <v-row>
                        <v-col cols="9" class="align-self-center">
                            <h4 class="interviewNum">Interview #{{ interviews.indexOf(interview) + 1 }}</h4>
                        </v-col>
                        <v-col cols="3">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dark text color="black" v-bind="attrs" v-on="on">
                                        <v-icon class="mr-n5">mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item>
                                        <edit-interview :interviewId="interview.interviewId" @interviewUpdated="handleInterviewUpdated"></edit-interview>
                                    </v-list-item>
                                    <v-list-item>
                                        <delete-interview :interviewId="interview.interviewId" @interviewDeleted="handleInterviewDeleted"></delete-interview>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-container>
                <h4 class="company ml-3">{{ interview.company }}</h4>
                <h4 class="ml-3">{{ interview.jobPosition }}</h4>
                <h4 class="ml-3">Date: {{ interview.interviewDate }}</h4>
                <h4 class="ml-3">Time: {{ interview.interviewTime }} {{ interview.interviewTimePeriod }} ({{ interview.interviewTimeZone }})</h4>
                <h4 class="ml-3">{{ interview.interviewLocation }}</h4>
                <router-link :to="{ 
                    name: 'InterviewDetails',
                    params: {
                        interviewId: interview.interviewId,
                        jobAppId: interview.interviewId,
                        company: interview.company,
                        jobPosition: interview.jobPosition,
                        interviewDate: interview.interviewDate,
                        interviewTime: interview.interviewTime,
                        interviewTimePeriod: interview.interviewTimePeriod,
                        interviewTimeZone: interview.interviewTimeZone,
                        interviewLocation: interview.interviewLocation,
                        notes: interview.notes
                    } 
                }" class="ml-3 mt-n3">View Details <v-icon small>mdi-arrow-right</v-icon></router-link>
            </div>
        </div>
    </article>
</template>

<script>
    import EditInterview from "../Interviews/EditInterview.vue";
    import DeleteInterview from "../Interviews/DeleteInterview.vue";

    export default {
        name: "interview-card",

        components: {
            EditInterview,
            DeleteInterview
        },

        props: {
            jobAppId: Number,
            interviews: Array
        },

        data() {
            return {
                primaryColor: "#52688F",
                secondaryColor: "#E3E7F1"
            }
        },

        methods: {
            handleInterviewUpdated(data) {
                this.$emit('sendUpdatedInterview', data);
            },

            handleInterviewDeleted(data) {
                this.$emit('sendIndexOfDeletedInterview', data);
            }
        },
    }
</script>

<style scoped>
    .interviewTime {
        display: grid;
        place-items: center;
    }

    h4 {
        font-weight: 400;
    }

    .interviewNum {
        color: var(--primaryColor);
        font-weight: 700;
    }

    #interviewCardsContainer {
        display: grid;
        place-items: center;
        row-gap: 2vh;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        width: 100%;
        padding: 6% 0% 10% 0%;
        background: var(--backgroundColorTwo);
    }

    .interviewCard {
        background: white;
        box-shadow: 0px 0px 5px rgba(82, 104, 143, 0.251);
        padding: 4% 4% 6% 4%;
        width: 90%;
    }

    .interviewCard > div {
        display: grid;
        justify-items: start;
        align-items: center;
        row-gap: 10px;
        width: 100%;
    }

    .v-btn {
        text-transform: capitalize;
    }

    a {
        text-decoration: none;
    }

    .v-application a {
        color: black;
    }

    .v-list-item__title {
        font-family: var(--bodyFont);
    }

    .v-list {
        z-index: -1;
    }
</style>
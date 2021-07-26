<template>
    <article id="interviewCardsContainer">
        <div v-for="interview in interviews" :key="interview.interviewId" class="interviewCard px-sm-6 pb-sm-9 pt-sm-7">
            <v-container>
                <v-row>
                    <v-col cols="9" class="align-self-center">
                        <h4 class="company">{{ interview.company }}</h4>
                    </v-col>
                    <v-col cols="3">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn dark text color="black" v-bind="attrs" v-on="on">
                                    <v-icon class="mr-n5 mr-sm-n12">mdi-dots-horizontal</v-icon>
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
            <h4 class="ml-3">{{ interview.jobPosition }}</h4>
            <h4 class="ml-3">Date: {{ interview.interviewDate }}</h4>
            <h4 class="ml-3">Time: {{ interview.interviewTime }} {{ interview.interviewTimePeriod }} ({{ interview.interviewTimeZone }})</h4>
            <h4 class="ml-3">{{ interview.interviewLocation }}</h4>
            <router-link :to="{ 
                name: 'InterviewDetails',
                params: {
                    interviewId: Number(interview.interviewId),
                    jobAppId: Number(interview.jobAppId),
                    company: interview.company,
                    jobPosition: interview.jobPosition,
                    interviewDate: interview.interviewDate,
                    interviewTime: interview.interviewTime,
                    interviewTimePeriod: interview.interviewTimePeriod,
                    interviewTimeZone: interview.interviewTimeZone,
                    interviewType: interview.interviewType,
                    interviewLocation: interview.interviewLocation,
                    notes: interview.notes
                } 
            }" class="ml-3 mt-n3">View Details <v-icon small>mdi-arrow-right</v-icon></router-link>
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

        // Receiving the user's interviews from the View Job Application Details component and Interview page
        props: {
            interviews: Array
        },

        data() {
            return {
                primaryColor: "#52688F",
                secondaryColor: "#E3E7F1"
            }
        },

        methods: {
            // Listening to the Edit Interview component for when an interview has been updated
            handleInterviewUpdated(data) {
                // Notifying the View Job Application Details component that an interview has been updated
                this.$emit('sendUpdatedInterview', data);
            },

            // Listening to the Delete Interview component for when an interview has been deleted
            handleInterviewDeleted(data) {
                // Notifying the View Job Application Details component that an interview was deleted
                this.$emit('notifyJobAppDetailsInterviewDeleted', data);
            }
        },
    }
</script>

<style scoped>
    h4 {
        font-weight: 400;
    }

    .company {
        color: var(--primaryColor);
        font-weight: 700;
    }

    #interviewCardsContainer {
        display: grid;
        place-items: center;
        row-gap: 2vh;
        width: 100%;
        padding: 6% 0% 10% 0%;
        background: var(--backgroundColorTwo);
    }

    .interviewCard {
        display: grid;
        justify-items: start;
        align-items: center;
        row-gap: 10px;
        background: white;
        box-shadow: 0px 0px 5px rgba(82, 104, 143, 0.251);
        padding: 4% 4% 7% 4%;
        width: 90%;
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

    @media only screen and (min-width: 768px) {

        .interviewCard {
            height: 100%;
            width: 70%;
        }

        h4, a {
            font-size: 1.2rem;
        }
    }
</style>
<template>
    <article id="interviewCardsContainer" v-if="jobAppId">
        <div v-for="interview in interviews" :key="interview.interviewId" class="interviewCard">
            <v-container>
                <v-row>
                    <v-col cols="9">
                        <h4>{{ interview.date }}</h4>
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
                                    <edit-interview :interviewId="interview.interviewId"></edit-interview>
                                </v-list-item>
                                <v-list-item>
                                    <delete-interview :interviewId="interview.interviewId"></delete-interview>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
            <h4 class="ml-3">{{ interview.interviewTime }}</h4>
            <h4 class="ml-3">{{ interview.interviewTimePeriod }}</h4>
            <h4 class="ml-3">{{ interview.interviewTimeZone }}</h4>
            <!-- <router-link :to="{ 
                name: 'JobApplicationDetails',
                params: {
                    jobAppId: jobApp.jobAppId,
                    company: jobApp.company,
                    jobPostingUrl: jobApp.jobPostingUrl,
                    jobPosition: jobApp.jobPosition,
                    jobLocation: jobApp.jobLocation,
                    employmentType: jobApp.employmentType,
                    salaryType: jobApp.salaryType,
                    salaryAmount: jobApp.salaryAmount,
                    jobStartDate: jobApp.jobStartDate,
                    dueDate: jobApp.dueDate,
                    status: jobApp.status,
                    appliedDate: jobApp.appliedDate,
                    notes: jobApp.notes
                } 
            }" class="ml-3">View Details <v-icon small>mdi-arrow-right</v-icon></router-link> -->
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
        }
    }
</script>

<style scoped>
    h4 {
        font-weight: 400;
    }

    #interviewCardsContainer {
        display: grid;
        place-items: center;
        row-gap: 2vh;
        margin: 20vh 0vw 15vh 0vw;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        width: 90%;
        background: var(--backgroundColorTwo);
    }

    .interviewCard {
        display: grid;
        justify-items: start;
        align-items: center;
        row-gap: 10px;
        background: white;
        box-shadow: 0px 0px 5px rgba(82, 104, 143, 0.251);
        padding: 5% 5% 7% 5%;
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
</style>
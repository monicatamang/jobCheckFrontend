<template>
    <article id="jobAppCardsContainer">
        <div v-for="jobApp in jobApps" :key="jobApp.jobAppId" class="jobAppCard px-sm-6 pb-sm-9 pt-sm-7 px-md-3 pb-md-4 pt-md-2">
            <v-container>
                <v-row>
                    <v-col cols="9" v-if="jobApp.status === 'Not Applied'">
                        <v-chip label :color="secondaryColor" :text-color="primaryColor">{{ jobApp.status.toUpperCase() }}</v-chip>
                    </v-col>
                    <v-col cols="9" v-if="jobApp.status === 'Applied' && jobApp.appliedDate !== '' & jobApp.appliedDate !== null">
                        <v-chip label :color="secondaryColor" :text-color="primaryColor">{{ jobApp.status.toUpperCase() }} ON {{ jobApp.appliedDate }}</v-chip>
                    </v-col>
                    <v-col cols="9" v-if="jobApp.status === 'Applied' && (jobApp.appliedDate === '' || jobApp.appliedDate === null)">
                        <v-chip label :color="secondaryColor" :text-color="primaryColor">{{ jobApp.status.toUpperCase() }}</v-chip>
                    </v-col>
                    <v-col cols="9" v-if="jobApp.status === 'Closed'">
                        <v-chip label :color="secondaryColor" :text-color="primaryColor">{{ jobApp.status.toUpperCase() }}</v-chip>
                    </v-col>
                    <v-col cols="3">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn dark text color="black" v-bind="attrs" v-on="on">
                                    <v-icon class="mr-n3 mr-sm-n12 mr-md-n5">mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <edit-job-application :jobAppId="jobApp.jobAppId"></edit-job-application>
                                </v-list-item>
                                <v-list-item>
                                    <delete-job-application :jobAppId="jobApp.jobAppId"></delete-job-application>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
            <h4 class="company ml-3" >{{ jobApp.company }}</h4>
            <h4 class="ml-3">{{ jobApp.jobPosition }}</h4>
            <h4 class="ml-3" v-if="jobApp.jobLocation !== '' && jobApp.jobLocation !== null">{{ jobApp.jobLocation }}</h4>
            <h4 class="ml-3" v-if="jobApp.dueDate !== '' && jobApp.dueDate !== null">Due Date: {{ jobApp.dueDate }}</h4>
            <router-link :to="{ 
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
            }" class="ml-3">View Details <v-icon small>mdi-arrow-right</v-icon></router-link>
        </div>
    </article>
</template>

<script>
    import EditJobApplication from "./EditJobApplication.vue";
    import DeleteJobApplication from "./DeleteJobApplication.vue";

    export default {
        name: "job-application-card",

        components: {
            EditJobApplication,
            DeleteJobApplication
        },

        // Receiving the user's job applications from the View Job Application Details component
        props: {
            jobApps: Array
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
    .company {
        color: var(--primaryColor);
        font-weight: 700;
    }

    .v-chip {
        letter-spacing: 1px;
    }

    h4 {
        font-weight: 400;
    }

    #jobAppCardsContainer {
        display: grid;
        place-items: center;
        row-gap: 2vh;
        margin: 29vh 0vw 15vh 0vw;
        width: 100%;
    }

    .jobAppCard {
        display: grid;
        justify-items: start;
        align-items: center;
        row-gap: 10px;
        background: white;
        box-shadow: 0px 0px 5px rgba(82, 104, 143, 0.251);
        padding: 4% 4% 6% 4%;
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

        .jobAppCard {
            height: 100%;
            width: 100%;
            row-gap: 15px;
        }

        #jobAppCardsContainer {
            margin-left: 20%;
            width: 55%;
            margin-top: 22vh;
            margin-bottom: 8vh;
        }

        h4, a {
            font-size: 1.15rem;
        }

        .v-chip {
            font-size: 1rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        #jobAppCardsContainer {
            grid-template-columns: repeat(3, 1fr);
            width: 80%;
            margin-left: 15%;
            column-gap: 12px;
            margin-top: 33vh;
            margin-bottom: 5vh;
            z-index: 10;
        }

        .jobAppCard {
            row-gap: 5px;
        }

        h4, a {
            font-size: 0.8rem;
        }

        .v-chip {
            font-size: 0.7rem;
        }
    }
</style>
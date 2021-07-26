<template>
    <article>
        <div v-for="detail in details" :key="detail.jobAppId">
            <v-container>
                <v-row>
                    <v-col cols="9" sm="10">
                        <v-btn text class="mt-16 mt-sm-5" @click="goToJobApplicationsPage"><v-icon>mdi-keyboard-backspace</v-icon>Back</v-btn>
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
                                    <edit-job-application :jobAppId="detail.jobAppId" @jobAppUpdated="handleJobAppUpdated"></edit-job-application>
                                </v-list-item>
                                <v-list-item>
                                    <delete-job-application :jobAppId="detail.jobAppId"></delete-job-application>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
            <h3 class="company">{{ detail.company }}</h3>
            <h3>{{ detail.jobPosition }}</h3>
            <v-chip-group>
                <v-chip label v-if="detail.jobLocation !== '' && detail.jobLocation !== null" :color="secondaryColor" :text-color="primaryColor">{{ detail.jobLocation }}</v-chip>
                <v-chip label v-if="detail.employmentType !== '' && detail.employmentType !== null" :color="secondaryColor" :text-color="primaryColor">{{ detail.employmentType }}</v-chip>
            </v-chip-group>
            <div class="importantDetailsContainer">
                <div>
                    <h4 class="heading">Due Date</h4>
                    <h4 v-if="detail.dueDate !== '' && detail.dueDate !== null">{{ detail.dueDate }}</h4>
                    <h4 v-else-if="detail.dueDate === '' || detail.dueDate === null">N/A</h4>
                </div>
                <div>
                    <h4 class="heading">Status</h4>
                    <h4>{{ detail.status }}</h4>
                </div>
                <div>
                    <h4 class="heading">Applied Date</h4>
                    <h4 v-if="detail.appliedDate !== '' && detail.appliedDate !== null && detail.status === 'Applied'">{{ details.appliedDate }}</h4>
                    <h4 v-else-if="(detail.appliedDate === '' || detail.appliedDate === null) || (detail.status === 'Not Applied')">N/A</h4>
                </div>
            </div>
            <v-tabs centered center-active background-color="transparent" :color="primaryColor" class="mt-3">
                <v-tab>Details</v-tab>
                <v-tab>Documents</v-tab>
                <v-tab>Interviews</v-tab>
                <v-tab-item>
                    <div class="otherDetails px-8 pt-5 px-sm-0 pt-sm-10">
                        <div>
                            <h4 class="heading">Job Posting</h4>
                            <a v-if="detail.jobPostingUrl !== '' && detail.jobPostingUrl !== null" target="_blank" :href="detail.jobPostingUrl">View Original Job Post</a>
                            <h4 v-else-if="detail.jobPostingUrl === '' || detail.jobPostingUrl === null">N/A</h4>
                        </div>
                        <div>
                            <h4 class="heading">Salary</h4>
                            <h4 v-if="detail.salaryAmount !== '' && detail.salaryAmount !== null && detail.salaryType !== '' && detail.salaryType !== null">${{ detail.salaryAmount }}/{{ detail.salaryType }}</h4>
                            <h4 v-else-if="(detail.salaryAmount !== '' && detail.salaryAmount !== null) && (detail.salaryType === '' || detail.salaryType === null)">${{ detail.salaryAmount }}</h4>
                            <h4 v-else-if="(detail.salaryAmount === '' || detail.salaryAmount === null) && (detail.salaryType !== '' && detail.salaryType !== null)">{{ detail.salaryType }}</h4>
                            <h4 v-else-if="(detail.salaryAmount === '' || detail.salaryAmount === null) && (detail.salaryType === '' || detail.salaryType === null)">N/A</h4>
                        </div>
                        <div>
                            <h4 class="heading">Start Date</h4>
                            <h4 v-if="detail.jobStartDate !== '' && detail.jobStartDate !== null">{{ detail.jobStartDate }}</h4>
                            <h4 v-else-if="detail.jobStartDate === '' || detail.jobStartDate === null">N/A</h4>
                        </div>
                        <div>
                            <h4 class="heading">Notes</h4>
                            <h4 v-if="detail.notes !== '' && detail.notes !== null">{{ detail.notes }}</h4>
                            <h4 v-else-if="detail.notes === '' || detail.notes === null">N/A</h4>
                        </div>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <upload-resume :jobAppId="detail.jobAppId"></upload-resume>
                    <upload-cover-letter :jobAppId="detail.jobAppId"></upload-cover-letter>
                </v-tab-item>
                <v-tab-item>
                    <interview-card :interviews="userInterviews" :jobAppId="detail.jobAppId" @sendUpdatedInterview="notifyJobAppDetails" @notifyJobAppDetailsInterviewDeleted="sendDeletedJobAppToJobAppDetails"></interview-card>
                    <add-interview :jobAppId="detail.jobAppId" @newInterviewCreated="passInterviewToDetailsPage"></add-interview>
                </v-tab-item>
            </v-tabs>
        </div>
    </article>
</template>

<script>
    import EditJobApplication from "../JobApplications/EditJobApplication.vue";
    import DeleteJobApplication from "../JobApplications/DeleteJobApplication.vue";
    import UploadResume from "../JobApplicationDetails/Resumes/UploadResume.vue";
    import UploadCoverLetter from "../JobApplicationDetails/CoverLetters/UploadCoverLetter.vue";
    import AddInterview from "../Interviews/AddInterview.vue";
    import InterviewCard from "../Interviews/InterviewCard.vue";

    export default {
        name: "view-job-application-details",

        components: {
            EditJobApplication,
            DeleteJobApplication,
            UploadResume,
            UploadCoverLetter,
            AddInterview,
            InterviewCard
        },

        props: {
            details: Array,
            userInterviews: Array
        },

        data() {
            return {
                primaryColor: "#52688F",
                secondaryColor: "#E3E7F1",
                newInterview: {}
            }
        },

        methods: {
            // Creating a function that takes the user to the Job Applications page after deleting a job application
            goToJobApplicationsPage() {
                this.$router.push('/JobApplications');
            },

            // Listening to the Edit Job Application componet for when a user updates a job application
            handleJobAppUpdated(data) {
                // Notifying the Job Application Details page that a job application was updated
                this.$emit('notifyDetailsPage', data);
            },

            // Listening to the Delete Job Application component for when a user deletes a job application
            sendDeletedJobAppToJobAppDetails(data) {
                // Notifying the Job Application Details page that a job application was deleted
                this.$emit('deleteInterviewFromPage', data);
            },

            // Listening to the Add Interview component for when a user adds an interview
            passInterviewToDetailsPage(data) {
                // Notifying the Job Application Details page that an interview was added
                this.$emit("printInterview", data);
            },

            // Listening to the Interview Card component for when a user updates an interview
            notifyJobAppDetails(data) {
                // Notifying the Job Application Details page that an interview was updated
                this.$emit('printUpdatedInterview', data);
            }
        }
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

    .v-btn {
        text-transform: capitalize;
        justify-self: start;
    }

    .company {
        color: var(--primaryColor);
        font-weight: 700;
        font-size: 1.3rem;
    }

    .otherDetails {
        justify-items: start;
        row-gap: 20px;
        background: var(--backgroundColorTwo);
    }

    .importantDetailsContainer {
        grid-template-columns: repeat(3, 1fr);
        text-align: center;
        background: white;
        width: 100%;
        padding: 5% 3%;
    }

    .importantDetailsContainer div, .otherDetails div {
        row-gap: 5px;
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

        .otherDetails div {
            margin: 0% 5%;
        }

        .v-chip {
            padding: 20px;
        }
    }
</style>
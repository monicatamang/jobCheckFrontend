<template>
    <article id="jobRefsCardsContainer">
        <div v-for="jobRef in jobRefs" :key="jobRef.jobRefId" class="jobRefCard px-sm-6 pb-sm-9 pt-sm-7 px-md-3 pb-md-5 pt-md-1">
            <v-container>
                    <v-row>
                        <v-col cols="10" class="align-self-center">
                            <h4 class="name">{{ jobRef.name }}</h4>
                        </v-col>
                        <v-col cols="2">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dark text color="black" v-bind="attrs" v-on="on">
                                        <v-icon class="ml-n7 mr-sm-n6 mr-md-1">mdi-dots-horizontal</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item>
                                        <edit-job-reference :jobRefId="jobRef.jobRefId"></edit-job-reference>
                                    </v-list-item>
                                    <v-list-item>
                                        <delete-job-reference :jobRefId="jobRef.jobRefId"></delete-job-reference>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-container>
            <h4 class="ml-3">{{ jobRef.position }}</h4>
            <h4 class="ml-3" v-if="jobRef.companyName !== '' && jobRef.companyName !== null">{{ jobRef.companyName }}</h4>
            <h4 class="ml-3" v-if="jobRef.jobLocation !== '' && jobRef.jobLocation !== null">{{ jobRef.companyAddress }}</h4>
            <h4 class="ml-3" v-if="jobRef.postalCode !== '' && jobRef.postalCode !== null">{{ jobRef.city }}, {{ jobRef.province }}, {{ jobRef.postalCode }}</h4>
            <h4 class="ml-3" v-if="jobRef.postalCode === '' || jobRef.postalCode === null">{{ jobRef.city }}, {{ jobRef.province }}</h4>
            <a :href="jobRef.email" class="ml-3" v-if="jobRef.email !== '' && jobRef.email === null" target="_blank">{{ jobRef.email }}</a>
            <h4 class="ml-3" v-if="jobRef.phoneNumber !== '' && jobRef.phoneNumber === null">{{ jobRef.phoneNumber }}</h4>
            <h4 class="heading ml-3 mt-5" v-if="jobRef.notes !== '' && jobRef.notes !== null">Notes</h4>
            <h4 class="ml-3" v-if="jobRef.notes !== '' && jobRef.notes !== null">{{ jobRef.notes }}</h4>
        </div>
    </article>
</template>

<script>
    import EditJobReference from "./EditJobReference.vue";
    import DeleteJobReference from "./DeleteJobReference.vue";

    export default {
        name: "job-reference-card",

        components: {
            EditJobReference,
            DeleteJobReference
        },

        // Receiving the user's job references from the Job References page
        props: {
            jobRefs: Array
        },

        data() {
            return {
                primaryColor: "#52688F",
                secondaryColor: "#E3E7F1"
            }
        },
    }
</script>

<style scoped>
    .name {
        color: var(--primaryColor);
        font-weight: 700;
    }

    .heading {
        font-weight: 600;
    }

    h4 {
        font-weight: 400;
    }

    #jobRefsCardsContainer {
        display: grid;
        place-items: center;
        row-gap: 2vh;
        margin: 20vh 0vw 15vh 0vw;
        width: 100%;
    }

    .jobRefCard {
        display: grid;
        justify-items: start;
        align-items: center;
        row-gap: 5px;
        background: white;
        box-shadow: 0px 0px 5px rgba(82, 104, 143, 0.25);
        padding: 3% 4% 7% 4%;
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

        .jobRefCard {
            height: 100%;
            width: 100%;
        }

        #jobRefsCardsContainer {
            margin-left: 20%;
            width: 55%;
            margin-top: 22vh;
            margin-bottom: 8vh;
        }

        h4, a {
            font-size: 1.15rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        #jobRefsCardsContainer {
            grid-template-columns: repeat(3, 1fr);
            width: 80%;
            margin-left: 15%;
            column-gap: 12px;
            margin-top: 40vh;
            margin-bottom: 5vh;
            z-index: 10;
        }

        .jobRefCard {
            row-gap: 5px;
        }

        h4, a {
            font-size: 0.8rem;
        }
    }
</style>
<template>
    <article id="jobRefsContainer">
        <div v-for="jobRef in jobRefs" :key="jobRef.jobRefId" class="jobRefCard">
            <v-container>
                    <v-row>
                        <v-col cols="10" class="align-self-center">
                            <h4 class="name">{{ jobRef.name }}</h4>
                        </v-col>
                        <v-col cols="2">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dark text color="black" v-bind="attrs" v-on="on">
                                        <v-icon class="ml-n7">mdi-dots-horizontal</v-icon>
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
            <a :href="jobRef.email" class="ml-3" v-if="jobRef.email !== '' && jobRef.email === null">{{ jobRef.email }}</a>
            <h4 class="ml-3" v-if="jobRef.phoneNumber !== '' && jobRef.phoneNumber === null">{{ jobRef.phoneNumber }}</h4>
            <h4 class="ml-3" v-if="jobRef.notes !== '' && jobRef.notes === null">{{ jobRef.notes }}</h4>
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

    h4 {
        font-weight: 400;
    }

    #jobRefsContainer {
        display: grid;
        place-items: center;
        row-gap: 2vh;
        margin: 20vh 0vw 15vh 0vw;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        width: 100%;
    }

    .jobRefCard {
        display: grid;
        justify-items: start;
        align-items: center;
        row-gap: 5px;
        background: white;
        box-shadow: 0px 0px 5px rgba(82, 104, 143, 0.251);
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
</style>
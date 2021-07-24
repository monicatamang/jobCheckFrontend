<template>
    <v-dialog v-model="dialog" width="500px" v-if="coverLetterId !== undefined">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text outlined v-bind="attrs" v-on="on">Delete</v-btn>
        </template>
        <v-card>
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-subtitle class="mt-5">Are you sure you want to permanently delete this cover letter?</v-card-subtitle>
            <v-card-actions>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <v-btn text color="#B34C59" @click="deleteCoverLetterFile(); dialog = false">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-cover-letter",

        props: {
            coverLetterId: Number
        },

        data() {
            return {
                dialog: false,
                errorStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                },
                successStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-check-circle",
                    color: "#53AC84"
                },
            }
        },

        methods: {
            deleteCoverLetterFile() {
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/upload-cover-letter`,
                    method: "DELETE",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    data: { 
                        loginToken: cookies.get("loginToken"),
                        coverLetterId: this.coverLetterId
                    }
                }).then((res) => {
                    console.log(res);
                    this.successStatus.message = "Your cover letter was succesfully deleted.";
                    this.$store.commit('updateCoverLetterStatus', this.successStatus);
                    this.$emit('coverLetterIsDeleted', true);
                }).catch((err) => {
                    console.log(err);
                    this.errorStatus.message = "Failed to delete cover letter. Please refresh the page and try again.";
                    this.$store.commit('updateCoverLetterStatus', this.errorStatus);
                });
            },
        },
    }
</script>

<style scoped>
    .v-btn {
        text-transform: capitalize;
    }
</style>
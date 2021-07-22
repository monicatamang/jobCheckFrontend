<template>
    <v-bottom-navigation :color="navColor" :value="value" fixed>
        <v-btn>
            <span>Applications</span>
            <v-icon>mdi-file</v-icon>
        </v-btn>
        <v-btn>
            <span>Interviews</span>
            <v-icon>mdi-briefcase-variant</v-icon>
        </v-btn>
        <v-btn>
            <span>Networking</span>
            <v-icon>mdi-account-group</v-icon>
        </v-btn>
        <v-btn>
            <span>References</span>
            <v-icon>mdi-account-supervisor</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
    export default {
        name: "mobile-bottom-nav",

        data() {
            return {
                navColor: "#7391C8",
                value: 0
            }
        },
    }
</script>

<style scoped>
    span {
        font-size: 0.6rem;
    }
</style>
<template>
    <v-app-bar color="white" elevate-on-scroll fixed>
        <img src="../assets/jobCheckLogoIcon.jpg" alt="">
        <v-spacer></v-spacer>
        <router-link to="/Profile">
            <v-avatar :color="avatarColor" size="35">
                <span>{{ userData.firstName.charAt(0) }}{{ userData.lastName.charAt(0) }}</span>
            </v-avatar>
        </router-link>
    </v-app-bar>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "mobile-header",

        data() {
            return {
                userData: cookies.get("userData"),
                avatarColor: "#7391C8"
            }
        },
    }
</script>

<style scoped>
    img {
        width: 6vw;
    }

    span {
        color: white;
        letter-spacing: 1px;
        font-size: 0.9rem;
    }

    a {
        text-decoration: none;
    }
</style>
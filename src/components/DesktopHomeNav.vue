<template>
    <nav>
        <job-check-logo></job-check-logo>
        <div></div>
        <router-link to="/Login" id="loginLink">Login</router-link>
        <router-link to="/CreateAccount" id="createAccountLink">Create Account</router-link>
    </nav>
</template>

<script>
    import JobCheckLogo from "./JobCheckLogo.vue";

    export default {
        name: "desktop-home-nav",

        components: {
            JobCheckLogo
        }
    }
</script>

<style scoped>
    nav {
        display: none;
    }

    @media only screen and (min-width: 1024px) {

        nav {
            position: fixed;
            top: 0%;
            left: 0%;
            width: 100%;
            padding: 2% 0%;
            background: var(--backgroundColorTwo);

            display: grid;
            place-items: center;
            grid-template-columns: 1fr 3fr 1fr 1fr;
        }

        #createAccountLink {
            background: var(--primaryColor);
            padding: 3% 5%;
            color: white;
            border-radius: 5px;
        }

        .v-application a {
            text-decoration: none;
            color: var(--primaryColor);
            font-family: var(--titleFont);
        }

        #loginLink {
            margin-right: -60%;
        }
    }
</style>
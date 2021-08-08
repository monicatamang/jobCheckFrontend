<template>
    <section>
        <article>
            <div class="hideOnDesktop">
                <job-check-logo></job-check-logo>
            </div>
            <desktop-home-nav></desktop-home-nav>
            <h2>Document your job hunt all in one place</h2>
            <div id="screenshotsContainer">
                <div>
                    <div class="screenshots">
                        <img src="../assets/jobCheckApplicationsPage.jpg" alt="Screenshot of Job Check's 'Applications' page.">
                    </div>
                    <h3>Organize your applications, interviews, networking events, and more</h3>
                </div>
                <div>
                    <div class="screenshots">
                        <img src="../assets/jobCheckDetailsPage.jpg" alt="Screenshot of Job Check's 'Application page' showing the application details.">
                    </div>
                    <h3>Upload and manage your resumes and cover letters for each application</h3>
                </div>
                <div>
                    <div class="screenshots">
                        <img src="../assets/jobCheckProfilePage.jpg" alt="Screenshot of Job Check's 'Profile' page.">
                    </div>
                    <h3>Manage your profile and keep track of your job opportunities</h3>
                </div>
            </div>
            <img id="laptop" src="../assets/laptopImage.jpg" alt="A vector image of a sliver grey laptop with a thick black border around the screen which has Job Check's logo on the screen.">
            <div class="hideOnDesktop">
                <v-btn class="d-flex d-sm-none" large block depressed dark :color="buttonColor" @click="goToCreateAccountPage">Create Account</v-btn>
                <v-btn class="d-none d-sm-flex d-md-none hidden-md-and-up" width="35vw" height="6vh" large block depressed dark :color="buttonColor" @click="goToCreateAccountPage">Create Account</v-btn>
                <v-btn class="hidden-sm-and-down" width="12vw" height="7vh" large block depressed dark :color="buttonColor" @click="goToCreateAccountPage">Create Account</v-btn>

                <v-btn class="d-flex d-sm-none" large block depressed outlined :color="buttonColor" @click="goToLoginPage">Login</v-btn>
                <v-btn class="d-none d-sm-flex d-md-none hidden-md-and-up" width="35vw" height="6vh" large block depressed outlined :color="buttonColor" @click="goToLoginPage">Login</v-btn>
                <v-btn class="hidden-sm-and-down" width="12vw" height="7vh" large block depressed outlined :color="buttonColor" @click="goToLoginPage">Login</v-btn>
            </div>
            <copyright-statement></copyright-statement>
        </article>
    </section>
</template>

<script>
    import JobCheckLogo from "../components/JobCheckLogo.vue";
    import DesktopHomeNav from "../components/DesktopHomeNav.vue";
    import CopyrightStatement from "../components/CopyrightStatement.vue";

    export default {
        name: "Home",

        components: {
            JobCheckLogo,
            DesktopHomeNav,
            CopyrightStatement
        },

        data() {
            return {
                buttonColor: "#52688F"
            }
        },

        methods: {
            // Taking the user to the Create Account page
            goToCreateAccountPage() {
                this.$router.push('/CreateAccount');
            },

            // Taking the user to the Login page
            goToLoginPage() {
                this.$router.push('/Login');
            }
        },
    }
</script>

<style scoped>
    section, article, div {
        display: grid;
        place-items: center;
    }

    article {
        row-gap: 5vh;
        min-height: 80vh;
        margin-top: 10vh;
    }

    div {
        row-gap: 2vh;
    }

    #laptop {
        width: 65vw;
    }

    .v-btn {
        text-transform: capitalize;
        font-weight: 400;
    }

    h4 {
        font-family: var(--titleFont);
        text-align: center;
        font-weight: 400;
    }

    img {
        width: 100%;
    }

    #screenshotsContainer, h2 {
        display: none;
    }

    @media only screen and (min-width: 768px) {

        #laptop {
            width: 50vw;
        }

        .v-btn.v-size--large {
            font-size: 1.4rem;
            letter-spacing: 1px;
        }
    }

    @media only screen and (min-width: 1024px) {

        .hideOnDesktop {
            display: none;
        }

        article {
            margin-top: 15vh;
        }

        #laptop {
            display: none;
        }

        .v-btn.v-size--large {
            font-size: 0.8rem;
            letter-spacing: 1px;
        }

        h2 {
            display: block;
            font-family: var(--titleFont);
            font-size: 1.5rem;
            font-weight: 400;
            letter-spacing: 0.5px;
        }

        h3 {
            text-align: center;
            font-weight: 400;
            font-size: 0.9rem;
        }

        #screenshotsContainer {
            display: grid;
            place-items: center;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 15px;
            width: 90%;
        }

        #screenshotsContainer > div {
            height: 100%;
        }

        .screenshots {
            box-shadow: 0px 0px 5px lightgrey;
            width: 100%;
        }

        .textContainer {
            display: grid;
            place-items: center;
            grid-template-columns: auto 1fr;
        }
    }
</style>
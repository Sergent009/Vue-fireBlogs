<template>

<div class="reset-password">
    <Modal v-if="modalActive" :modalMessage="modalMessage" @close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="form-wrap">
        <form class="reset">

            <p class="login-register">
                Back to
                <router-link class="router-link" :to="{name: 'Login'}">Login</router-link>
            </p>

            <h2>Reset Password</h2>
            <p>Forgot your password? Enter your email to reset it</p>
            
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                    <email class="icon"/>
                </div>
            </div>

            <button @click.prevent="resetPassword">Reset</button>
            <div class="angle"></div>
        </form>

        <div class="background"></div>
    </div>
</div>

</template>

<script>
import Modal from "../components/Modal.vue"
import Loading from "../components/Loading.vue"
import email from "../assets/Icons/envelope-regular.svg"

// firebase packages
import firebase from "firebase/app"
import "firebase/auth"

    export default {
        name: 'ForgotPassword',
        components: {
            email,
            Modal,
            Loading
        },
        data(){
            return{
                email: "",
                modalActive: false,
                modalMessage: "",
                loading: null
            }
        },
        methods: {
            closeModal(){
                this.modalActive = !this.modalActive
                this.email = ""
            },
            resetPassword(){
                this.loading = true
                firebase.auth().sendPasswordResetEmail(this.email)
                .then(() => {
                    this.modalMessage = "If your account exists you will recieve a email"
                    this.loading = false
                    this.modalActive = true
                })
                .catch((err) => {
                    this.modalMessage = err.message 
                    this.loading = false
                    this.modalActive = true
                })
            }
        }
    }
</script>

<style scoped>

.reset-password{
    position: relative;
}

h2{
    margin-bottom: 8px;
}

p{
    text-align: center;
    margin-bottom: 32px;
}

</style>
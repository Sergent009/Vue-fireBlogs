<template>

<div class="reset-password">
    <Modal v-if="modalActive" @close-modal="closeModal" />
    <!-- <Loading /> -->
    <div class="form-wrap">
        <form class="reset">
            <h2>Reset Password</h2>
            <p>Forgot your password? Enter your email to reset it</p>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                    <email class="icon"/>
                </div>
            </div>
            <button>Reset</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</div>

</template>

<script>
import Modal from "../components/Modal.vue"
// import Loading from "../components/Loading.vue"
import email from "../assets/Icons/envelope-regular.svg"

    export default {
        name: 'ForgotPassword',
        components: {
            email,
            Modal,
            // Loading
        },
        data(){
            return{
                email: null,
                modalActive: false,
                modalMessage: ""
            }
        },
        methods: {
            closeModal(){
                this.modalActive = !this.modalActive
                this.email = ""
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
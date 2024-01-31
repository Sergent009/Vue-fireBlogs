<template>
 
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an acccount ?
                <router-link class="router-link" :to="{name: 'Login'}">Login</router-link>
            </p>
            <h2>Create Your FireBlog Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstName">
                    <user class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName">
                    <user class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Username" v-model="username">
                    <user class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                    <email class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Password" v-model="password">
                    <password class="icon" />
                </div>

                <div v-show="error" class="error">{{errorMsg}}</div>

            </div>
            <button @click.prevent="register()">Sign Up</button>
            <div class="angle"></div>
        </form>

        <div class="background"></div>
    </div>

</template>

<script>
import email from "../assets/Icons/envelope-regular.svg"
import password from "../assets/Icons/lock-alt-solid.svg"
import user from "../assets/Icons/user-alt-light.svg"

// firebase packages
import firebase from "firebase/app"
import "firebase/auth"
import db from "../firebase/firebaseInit"

    export default {
        name: "Register",
           components: {
            email,
            password,
            user
        },
        data(){
            return{
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                error: null,
                errorMsg: ""
            }
        },
        methods: {
            async register(){
                // checking that any input field should not be empty / adding a validation.
                if(
                    this.email !== "" &&
                    this.password !== "" &&
                    this.firstName !== "" &&
                    this.lastName !== "" &&
                    this.username !== ""
                ){
                    // No validation error, proceed with user registration

                // Firebase authentication
                const firebaseAuth = await firebase.auth()

                // Creating a new user with email and password
                const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)

                // Obtaining user information from the registration result
                const result = await createUser

                // Accessing Firestore to store additional user information
                const database = db.collection("users").doc(result.user.uid)

                // Storing user data in Firestore
                await database.set({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    email: this.email
                })
                    this.$router.push({name: "Home" })
                    return
                }
                this.error = true
                this.errorMsg = "Please fill all the fields!"
                return
            }
        }
    }
</script>

<style scoped>

h2{
    max-width: 350px;
}

</style>
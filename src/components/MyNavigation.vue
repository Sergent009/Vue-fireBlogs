<template>

<header>
    <nav class="container">
        <div class="branding">
            <router-link class="header" :to="{name: 'Home'}">FireBlogs</router-link>
        </div>
        <div class="nav-links">
            <ul v-show="!mobile">
                <router-link class="link" :to="{name: 'Home'}">Home</router-link>
                <router-link class="link" :to="{name: 'Blogs'}">Blogs</router-link>
                <router-link class="link" :to="{name: 'CreatePost'}">Create Post</router-link>
                <router-link v-show="!user" class="link" :to="{name: 'Login'}">Login/Register</router-link>
            </ul>

            <div v-if="user" @click="ShowOrClose_profileMenu" class="profile" ref="profile">
                <span>{{$store.state.profileInitials}}</span>
                <div v-show="profileMenu" class="profile-menu">
                    <div class="info">
                        <p class="initials">{{$store.state.profileInitials}}</p>
                        <div class="right">
                            <p>{{$store.state.profileFirstName}} {{$store.state.profileLastName}}</p>
                            <p>{{$store.state.profileUsername}}</p>
                            <p>{{$store.state.profileEmail}}</p>
                        </div>
                    </div>
                    <div class="options">
                        <div class="option">
                            <router-link class="option" :to="{name: 'Profile'}">
                                <userIcon class="icon" />
                                <p>Profile</p>
                            </router-link>
                        </div>
                        <div class="option">
                            <router-link class="option" :to="{name: 'Admin'}">
                                <adminIcon class="icon" />
                                <p>Admin</p>
                            </router-link>
                        </div>
                            <div @click="signOut" class="option">
                                <signOutIcon class="icon" />
                                <p>Sign Out</p>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />

    <transition name="mobile-nav">
        <ul class="mobile-nav" v-show="mobileNav">
            <router-link class="link" :to="{name: 'Home'}">Home</router-link>
            <router-link class="link" :to="{name: 'Blogs'}">Blogs</router-link>
            <router-link class="link" :to="{name: 'CreatePost'}">Create Post</router-link>
            <router-link v-show="!user" class="link" :to="{name: 'Login'}">Login/Register</router-link>
        </ul>
    </transition>
</header>

</template>

<script>
import menuIcon from '../assets/Icons/bars-regular.svg'
import userIcon from '../assets/Icons/user-alt-light.svg'
import adminIcon from '../assets/Icons/user-crown-light.svg'
import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg'

import firebase from "firebase/app"
import "firebase/auth"

    export default {
        name: 'navigation',
        components: {
            menuIcon,
            userIcon,
            adminIcon,
            signOutIcon
        },

        data(){
            return{
                mobile: null,
                mobileNav: null,
                windowWidth: null,
                profileMenu: null
            }
        },

        created(){
            window.addEventListener("resize", this.checkScreen)
            this.checkScreen()
        },

        methods: {
            // to check the width of the screen
            checkScreen(){
                this.windowWidth = window.innerWidth
                if(this.windowWidth <= 750){
                    this.mobile = true
                    return
                }
                this.mobile = false
                this.mobileNav = false
                return
            },

            toggleMobileNav(){
                this.mobileNav = !this.mobileNav
            },

            // To show or close profileMenu on click of profle.
            ShowOrClose_profileMenu(e){
                // checking that if the user clicks on the user profile logo or else where
                if(e.target === this.$refs.profile){
                    this.profileMenu = !this.profileMenu
                }
            },

            signOut(){
                firebase.auth().signOut()
                // to reload the application when a user signs Out.
                window.location.reload()
            }
        },

        // To return the current user.
        computed: {
            user(){
                return this.$store.state.user
            }
        }
        
    }
</script>

<style scoped>

header{
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 99;
}

.link{
    font-weight: 500;
    padding: 0 8px;
    transition: .3s color ease;
}
.link:hover{
    color: #1eb8b8;
}

nav{
    display: flex;
    padding: 25px 0;
}

.branding{
    display: flex;
    align-items: center;
}

.header{
    font-weight: 600px;
    font-size: 24px;
    color: black;
    text-decoration: none;
}

.nav-links{
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
}

.nav-links ul{
    margin-right: 32px;
}

.nav-links ul .link{
    margin-right: 32px;
}

.nav-links ul .link:last-child{
    margin-right: 0;
}

.menu-icon{
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
}

.mobile-nav{
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
}

.mobile-nav .link{
    padding: 15px 0;
    color: #fff;
}

/* it will take 1 sec for the navigation bar to come and leave */
.mobile-nav-enter-active, .mobile-nav-leave-active{
    transition: all 1s ease;   
}

/* the nav bar will come smoothly */
.mobile-nav-enter{
    transform: translateX(-250px);
}

.mobile-nav-enter-to{
    transform: translateX(0);
}

/* the nav bar will leave smoothly */
.mobile-nav-leave-to{
    transform: translateX(-250px);
}



/* styling of profile section of loggedIn user */

.profile{
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background-color: #303030;
}

.profile span{
    pointer-events: none;
}

.profile-menu{
    position: absolute;
    top: 60px;
    right: 0;
    width: 270px;
    background-color: #303030;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.info{
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #fff;
}

.initials{
    position: initial;
    width: 40px;
    height: 40px;
    background-color: #fff;
    color: #303030;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.right{
    flex: 1;
    margin-left: 24px;
}
p:nth-child(){
    font-size: 14px;
}
p:nth-child(2), p:nth-child(3){
    font-size: 12px;
}

.options{
    padding: 15px;
    
}

.option{
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.icon{
    width: 18px;
    height: auto;
}

.options p{
    font-size: 14px;
    margin-left: 12px;
}

.option:last-child{
    margin-bottom: 0;
}

</style>
import Vue from 'vue'
import Vuex from 'vuex'

import firebase from "firebase/app"
import "firebase/auth"
import db from "../firebase/firebaseInit"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts: [],    // to store all our blogs
    postLoaded: null,

    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: false,

    editPost: null,

    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null
  },

  getters: {
    blogPostsFeed(state){
      return state.blogPosts.slice(0, 2)
    },

    blogPostsCards(state){
      return state.blogPosts.slice(2, 6)
    }
  },

  mutations: {
    newBlogPost(state, payload){
      state.blogHTML = payload
    },

    updateBlogTitle(state, payload){
      state.blogTitle = payload
    },

    fileNameChange(state, payload){
      state.blogPhotoName = payload
    },

    createFileURL(state, payload){
      state.blogPhotoFileURL = payload
    },

    openPhotoPreview(state){
      state.blogPhotoPreview = !state.blogPhotoPreview
    },

    toggleEditPost(state, payload){
      state.editPost = payload
    },

    updateUser(state, payload){
      state.user = payload
    },

    setProfileInfo(state, doc){
      state.profileId = doc.id 
      state.profileEmail = doc.data().email 
      state.profileFirstName = doc.data().firstName 
      state.profileLastName = doc.data().lastName 
      state.profileUsername = doc.data().username
    },

    setProfileInitials(state){
      state.profileInitials = 
        state.profileFirstName.match(/(\b\w)?/g || []).join("") +
        state.profileLastName.match(/(\b\w)?/g || []).join("")
    },

    filterBlogPost(state, payload){
      state.blogPosts = state.blogPosts.filter((post) => {
        post.blogID !== payload
      })
    },

    // To update first Name of the user in account settings
    changedFirstName(state, payload){
      state.profileFirstName = payload
    },

    // To update last Name of the user in account settings
    changedLastName(state, payload){
      state.profileLastName = payload
    },

    // To update username of the user in account settings
    changedUsername(state, payload){
      state.profileUsername = payload
    },
  },
  actions: {
    async getCurrentUser({commit}){
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get()
      commit("setProfileInfo", dbResults)
      commit("setProfileInitials")
    },

    async deletePost({commit}, payload){
      // reference to the post that we want to delete
      const getPost = await db.collection("blogPosts").doc(payload)
      await getPost.delete()

      commit('filterBlogPost', payload)
    },

    async updateUserSettings({commit, state}){
      const dataBase = await db.collection('users').doc(state.profileId)
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername
      })
      commit("setProfileInitials")
    },

    async getPost({state}){
      // reference to our database
      const dataBase = await db.collection('blogPosts').orderBy('date', 'desc')
      const dbResults = await dataBase.get()
      dbResults.forEach((doc) => {
        if(!state.blogPosts.some(post => post.blogID === doc.id)){
          // getting data from firestore collection
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date
          }

          // pushing data into the blogPosts Array
          state.blogPosts.push(data)
        }
      })

      state.postLoaded = true
      console.log(state.blogPosts)
    },
  },
  modules: {
  }
})

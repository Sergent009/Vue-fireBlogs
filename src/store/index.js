import Vue from 'vue'
import Vuex from 'vuex'

import firebase from "firebase/app"
import "firebase/auth"
import db from "../firebase/firebaseInit"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      {blogTitle: "Blog Card # 1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2021"},
      {blogTitle: "Blog Card # 2", blogCoverPhoto: "stock-2", blogDate: "May 1, 2021"},
      {blogTitle: "Blog Card # 3", blogCoverPhoto: "stock-3", blogDate: "May 1, 2021"},
      {blogTitle: "Blog Card # 4", blogCoverPhoto: "stock-4", blogDate: "May 1, 2021"},
    ],
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

    async updateUserSettings({commit, state}){
      const dataBase = await db.collection('users').doc(state.profileId)
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername
      })
      commit("setProfileInitials")
    }
  },
  modules: {
  }
})

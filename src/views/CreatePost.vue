<template>

<div class="create-post">
    <blogCoverPreview v-show="$store.state.blogPhotoPreview"  />
    <Loading v-show="loading" />
    <div class="container">
        <div :class="{invisible: !error}" class="err-message">
            <p><span>Error:</span>{{errorMsg}}</p>
        </div>
        <div class="blog-info">
            <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
            <div class="upload-file">
                <label for="blog-photo">Upload Cover Photo</label>
                <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpeg" />
                <button @click="openPreview" class="preview" :class="{'button-inactive': !this.$store.state.blogPhotoFileURL}">Preview Photo</button>
                <span>File chosen: {{this.$store.state.blogPhotoName}}</span>
            </div>
        </div>
        <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler" />
        </div>
        <div class="blog-actions">
            <button @click="uploadBlog">Publish Blog</button>
            <router-link class="router-button" :to="{name: 'BlogPreview'}">Post Preview</router-link>
        </div>
    </div>
</div>

</template>

<script>
import blogCoverPreview from "../components/blogCoverPrivew.vue"
import Loading from "../components/Loading.vue"
import firebase from "firebase/app"
import "firebase/storage"
import db from "../firebase/firebaseInit"
import Quill from "quill"
window.Quill = Quill
const ImageResize = require("quill-image-resize-module").default
Quill.register("modules/imageResize", ImageResize)

    export default {
        name: 'CreatePost',

        components: {
            blogCoverPreview,
            Loading
        },

        data(){
            return{
                file: null,
                error: null,
                errorMsg: null,
                loading: null,
                editorSettings: {
                    modules: {
                        imageResize: {},
                    }
                }
            }
            },

    computed: {
    profileId(){
        return this.$store.state.profileId
        },
    blogCoverPhotoName(){
        return this.$store.state.blogPhotoName
        },
    blogTitle: {
        get(){
            return this.$store.state.blogTitle
            },
        set(payload){
            return this.$store.commit("updateBlogTitle", payload)
            }
        },
    blogHTML: {
        get(){
            return this.$store.state.blogHTML
            },
        set(payload){
                this.$store.commit("newBlogPost", payload)
            }
        }
    },

    methods: {
    fileChange(){
                this.file = this.$refs.blogPhoto.files[0]
                const fileName = this.file.name

                this.$store.commit("fileNameChange", fileName)
                this.$store.commit("createFileURL", URL.createObjectURL(this.file))
            },

    openPreview() {
        this.$store.commit("openPhotoPreview");
    },

    imageHandler(file, Editor, cursorLocation, resetUploader){
        // get reference to firebase storage
        const storageRef = firebase.storage().ref()

        // path and file name to store as
        const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`)

        // upload file to firebase storage && running a callback function
        docRef.put(file).on("state_changed", (snapshot) => {
            console.log(snapshot)
        }, (err) => {
            console.log(err)
        }, async () => {
            // reference to download URL from firebase
            const downloadURL = await docRef.getDownloadURL()

            // inserted the image in the editor
            Editor.insertEmbed(cursorLocation, "image", downloadURL)
            resetUploader()
        })
    },

    uploadBlog(){
        // Adding Validation
        if(this.blogTitle.length !== 0 && this.blogHTML.length !== 0){
            if(this.file){
                this.loading = true
            // Upload the Blog ->
                // uploading blog cover photo to firebase storage
                const storageRef = firebase.storage().ref()

                // giving path and file name
                const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`)
                
                docRef.put(this.file).on("state_changed", (snapshot) => {
                    console.log(snapshot)
                }, (err) => {
                    // 
                    console.log(err)
                    this.loading = false
                }, async () => {
                    const downloadURL = await docRef.getDownloadURL()
                    const timestamp = await Date.now()
                    const dataBase = await db.collection("blogPosts").doc()

                    await dataBase.set({
                        blogID: dataBase.id,
                        blogHTML: this.blogHTML,
                        blogCoverPhoto: downloadURL,
                        blogCoverPhotoName: this.blogCoverPhotoName,
                        blogTitle: this.blogTitle,
                        profileId: this.profileId,
                        date: timestamp
                    })

                    await this.$store.dispatch("getPost")
                    this.loading = false
                    this.$router.push({name: 'ViewBlog', params: {blogid: dataBase.id}})
                })
                
                return
            }

            this.error = true 
        this.errorMsg = "Please make sure you uploaded a Blog Cover Photo"

        setTimeout(() => {
            this.error = false
        }, 5000)
        return
        }

        this.error = true 
        this.errorMsg = "Please ensure that Blog Title and Blog Post is filled"

        setTimeout(() => {
            this.error = false
        }, 5000)
        return
    }
},

    }

    
</script>

<style>

.create-post{
    position: relative;
    height: 100%;
}

button{
    margin-top: 0;
}

.router-button{
    text-decoration: none;
    color: #fff;
}

label, button, .router-button{
    transition: 500ms ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
}

label:hover, button:hover, .router-button:hover{
    background-color: rgba(48, 48, 48, 0.7);
}

.container{
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
}

.invisible{
    opacity: 0 !important;
}

.err-message{
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
}

.err-message p{
    font-size: 14px;
}

.err-message span{
    font-weight: 600;
}

.blog-info{
    display: flex;
    margin-bottom: 32px;
}

.blog-info input:nth-child(1){
    min-width: 300px;
}

.blog-info input{
    width: 300px;
    transition: 0.5s ease-in-out all;
    padding: 10px 4px;
    border: none;
    border-bottom: 1px solid #303030;
}

.blog-info input:focus{
    outline: none;
    box-shadow: 0 1px 0 0 #303030;
}

.upload-file{
    flex: 1;
    margin-left: 16px;
    position: relative;
    display: flex;
}

.upload-file input{
    display: none;
}

.upload-file .preview{
    margin-left: 16px;
    text-transform: initial;
}

.upload-file span{
    font-size: 12px;
    margin-left: 16px;
    align-self: center;
}

.editor{
    height: 60vh;
    display: flex;
    flex-direction: column;
}

.editor .quillWrapper{
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.editor .ql-container{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
}

.editor .ql-editor{
    padding: 20px 16px 30px;
}

.blog-actions{
    margin-block: 32px;
}

.blog-actions button{
    margin-right: 16px;
}

</style>
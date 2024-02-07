<template>
    <div class="blog-card">
        <div v-show="editPost" class="icons">
            <div class="editicon">
                <Edit class="edit" />
            </div>
            <div @click="deletePost" class="icon">
                <Delete class="delete" />
            </div>
        </div>
        <img :src="post.blogCoverPhoto" alt="">
        <div class="info">
            <h4>{{post.blogTitle}}</h4>
            <h6>Posted on: {{new Date(post.blogDate).toLocaleString('en-us', {dateStyle: "long"})}}</h6>
            <router-link class="link" :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}">
                View the Post <Arrow class="arrow" />
            </router-link>
        </div>
    </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg"
import Edit from "../assets/Icons/edit-regular.svg"
import Delete from "../assets/Icons/trash-regular.svg"


    export default {
        name: "blogCard",
        props: ["post"],
        components: {
            Arrow,
            Edit,
            Delete
        },
        computed: {
            editPost(){
                return this.$store.state.editPost
            },
        },

        methods: {
            deletePost(){
                this.$store.dispatch("deletePost", this.post.blogID)
            }
        }
    }
</script>

<style scoped>

h4{
    color: #000;
}

.blog-card{
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 420px;
    transition: .5s ease all;
}

.blog-card:hover{
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0,1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.icons{
    display: flex;
    z-index: 99;
}

.icon{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.5s ease all;
    margin-top: 10px;
    margin-left: 240px;
}

.editicon{
    position: absolute;
    top: 10px;
    right: 60px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.5s ease all;
    margin-left: 240px;
    transition: 0.5s ease all;
}

.icon:hover{
    background-color: #303030;
}
.editicon:hover{
    background-color: #303030;
}

.edit{
    width: 20px;
    width: 20px;
    position: absolute;
    top: 8px;
    left: 10px;
}
.delete{
    width: 15px;
    width: 15px;
}


img{
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
}

.info{
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 0px 16px;
    color: #000;
}

h4{
    padding-bottom: 0px;
    font-size: 20px;
    font-weight: 300;
}

h6{
    font-weight: 400;
    font-size: 12px;
    padding-bottom: 0px;
}

.link{
    display: inline-flex;
    align-items: center;
    margin-top: auto;
    font-weight: 500;
    padding-top: 0px;
    font-size: 12px;
    padding-bottom: 4px;
    transition: 0.5s ease-in all;
}
.link:hover{
    color: rgba(48, 48, 48, 0.8);
}

.arrow{
    width: 10px;
}

</style>
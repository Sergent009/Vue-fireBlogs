<template>

<div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
        <h2>{{currentBlog[0].blogTitle}}</h2>
        <h4>Posted on : {{new Date(currentBlog[0].blogDate).toLocaleString("en-us", {dateStyle: "long"})}}</h4>
        <img :src="currentBlog[0].blogCoverPhoto" alt="">
        <div class="post-content ql-editor" v-html="currentBlog[0].blogHTML"></div>
    </div>
</div>

</template>

<script>
export default {
    name: 'ViewBlog',

    data(){
        return{
            currentBlog: null,
        }
    },

    async mounted(){
        this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
            // that will return us the given blog
            return post.blogID === this.$route.params.blogid
        })
            console.log(this.currentBlog)
    },
    }
</script>

<style>

h4{
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
}

</style>
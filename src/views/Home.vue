<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
        </div>
      </div>
    </div>

    <div v-if="!user" class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today</h2>
        <router-link class="router-button" :to="{name: 'Register'}">
          Register for fireBlogs <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg"
import BlogPost from '../components/BlogPost.vue'
import BlogCard from '../components/BlogCard.vue'

export default {
  name: "Home",
  components: {
    BlogPost,
    BlogCard,
    Arrow
  },

  data(){
    return{
      welcomeScreen: {
        title: "Welcome!",
        blogPost: 
        "Weekly blog articles with all things programming including HTML, CSS and JAVASCRIPT and more, Register today",
        welcomeScreen: true,
        photo: "coding"
      },

      
    }
  },
  computed: {
    blogPostsCards(){
      // accessing blogCards from state in store.
      return this.$store.getters.blogPostsCards
    },

     blogPostsFeed(){
      // accessing blogCards from state in store.
      return this.$store.getters.blogPostsFeed
    },

    user(){
      return this.$store.state.user
    }
  }
};
</script>

<style scoped>

.blog-cards{
  position: relative;
  min-width: 1100px;
  right: 70px;
}

h3{
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
  position: absolute;
  top: 0px;
  left: 40%;
}

.container{
  padding: 100px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (min-width: 800px){
  .container{
    padding: 125px 25px;
    flex-direction: row;
  }
}

.router-button{
  display: flex;
  font-size: 14px;
  text-decoration: none;
}
@media (min-width: 800px){
  .router-button{
    margin-left: auto;
  }
}

h2{
  font-weight: 300;
  font-size: 32px;
  max-width: 425px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
}
@media (min-width: 800px){
  h2{
    text-align: initial;
    font-size: 40px;
  }
}

</style>
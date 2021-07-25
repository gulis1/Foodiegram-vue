<template>
  <div id="bg">
    <!-- <meta name='viewport' content='width=device-width, initial-scale=0.4, maximum-scale=0.4, user-scalable=no' > -->
    <Navbar :user="user" />
    <UserImages @onPostClick="onPostClick"/>
    <PostModal v-if="selectedImage && !$mq.phone" :postID="selectedImage"/>
    <MobileBar v-if="$mq.phone" :user="user"/>
  </div>
    

</template>

<script>
import Navbar from './components/Navbar.vue';
import UserImages from './components/UserImages.vue';
import PostModal from './components/PostModal.vue'
import MobileBar from './components/MobileBar.vue'

import $ from 'jquery';

export default {
  name: 'App',

  props: {
    user: null,
  },

  data() {
    return {
      selectedImage: null,
      window: window
    }
  },

  components: {
    Navbar,
    UserImages,
    PostModal,
    MobileBar
  },

  async mounted() {
    this.user = await $.get("http://192.168.0.115:8080/users/fungus");

    console.log(window.matchMedia('(orientation: portrait)').matches)

    document.addEventListener("click", e => {

      let pageMask = document.getElementById("page-mask");

      if (pageMask.style.display !== "none" && !e.target.closest(".modal-click-box"))
        this.selectedImage = null;

    })

    document.addEventListener("keydown", e => {

      if (e.key === "Escape") {
        let pageMask = document.getElementById("page-mask");

        if (pageMask.style.display !== "none")
          this.selectedImage = null;
      }


    })

  },

  methods: {
    onPostClick(postID) {
 
      if (!window.matchMedia('(orientation: portrait)').matches)
        this.selectedImage = postID;

      else
        window.location.href = "/pruebas/posts/" + postID;
    }
  },

  mq: {
    phone: '(orientation: portrait)'
  }

}
</script>


<style scoped>
    * {
      margin: 0;
      padding: 0;
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
    }

    #bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: fixed linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://cdn.discordapp.com/attachments/734750766895595581/848359437122666516/cute-food-icon-doodle-background_57490-171.jpg);
      box-sizing: border-box;
      overflow-y: scroll;
    }

    @media screen and (max-width: 1100px) {
      
      #bg {
        background: none;
        background-color: #343a40;
      }

    }
</style>
<template>
  <div id="bg">
    <Navbar :user="user" />
    <UserImages @onPostClick="onPostClick"/>
    <PageMask v-if="selectedImage && !$mq.phone" :postID="selectedImage"/>
    <MobileBar v-if="$mq.phone" :user="user"/>
  </div>
    

</template>

<script>
import Navbar from './Navbar.vue';
import UserImages from './UserImages.vue';
import PageMask from './PageMask.vue'
import MobileBar from './MobileBar.vue'

import $ from 'jquery';

export default {
  name: 'UserPage',

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
    PageMask,
    MobileBar
  },

  async mounted() {
 
    this.user = await $.get(`http://localhost:8080/users/${this.$route.params.name}`);

    // document.addEventListener("click", e => {

    //   let pageMask = document.getElementById("page-mask");

    //   if (pageMask && !e.target.closest(".modal-click-box"))
    //     this.selectedImage = null;

    // })

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
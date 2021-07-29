<template>
  <div id="bg">
    <Navbar v-if="user" :user="user" />
    <UserImages v-if="user" @onPostClick="onPostClick" :userName="this.user.name"/>
    <PageMask v-if="selectedImage && !$mq.phone" :postID="selectedImage" @exit="closeModal"/>
    <MobileBar v-if="user && $mq.phone" :user="user"/>
  </div>
    

</template>

<script>
import Navbar from './Navbar.vue';
import UserImages from './UserImages.vue';
import PageMask from './PageMask.vue'
import MobileBar from './MobileBar.vue'

import  { NoAuth } from '../AxiosProfiles.js'

export default {
  name: 'UserPage',

  data() {
    return {
      selectedImage: null,
      window: window,
      user: null
    }
  },

  components: {
    Navbar,
    UserImages,
    PageMask,
    MobileBar
  },

  mounted() {
    
    NoAuth.get(`/users/${this.$route.params.name}`)
    .then( response => this.user = response.data)
    .catch(() => {});

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") 
        this.closeModal();  
    })

  },

  methods: {
    onPostClick(postID) {
      if (!window.matchMedia('screen and (max-width: 1100px)').matches)
        this.selectedImage = postID;

      else
        window.location.href = "/posts/" + postID;
    },

    closeModal() {
      this.selectedImage = null;
    }
  },

  mq: {
    phone: 'screen and (max-width: 1100px)'
  }

}
</script>
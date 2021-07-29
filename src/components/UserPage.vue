<template>
  <div id="bg">
    <Navbar :user="user" />
    <UserImages @onPostClick="onPostClick" :userName="this.user.name"/>
    <PageMask v-if="selectedImage && !$mq.phone" :postID="selectedImage" @exit="closeModal"/>
    <MobileBar v-if="$mq.phone" :user="user"/>
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

  async mounted() {
    
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
        window.location.href = "/pruebas/posts/" + postID;
    },

    closeModal() {
      this.selectedImage = null;
    }
  },

  mq: {
    phone: '(orientation: portrait)'
  }

}
</script>
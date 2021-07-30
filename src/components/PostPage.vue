<template>
    <div id="bg">
        <Navbar v-if="this.user" :user="this.user"/>
        <PostModal v-if="this.postID" :postID="this.postID" @postLoaded='loadUser'/>
        <MobileBar v-if="this.user && $mq.phone" :user="this.user"/>
        
    </div>
</template>


<script>
    import PostModal from './PostModal.vue';
    import MobileBar from './MobileBar.vue';
    import Navbar from './Navbar.vue';
    import { NoAuth } from '../AxiosProfiles.js';

    export default {
        name: "PostPage",
        components: {
            PostModal,
            Navbar,
            MobileBar,
        },

        data: function() {
            return {
                postID: null,
                user: null
            };
        },

        mq: {
            phone: 'screen and (max-width: 800px)'
        },

        mounted() {
            this.postID = this.$route.params.postID;
        },

        methods: {
            async loadUser(user) {
                let response = await NoAuth.get(`/users/${user}`);
                this.user = response.data;
            }
        }
    }
</script>
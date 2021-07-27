<template>
    <div id="bg">
        <Navbar :user="user"/>
        <PostModal :postID="selectedImage"/>
        <MobileBar v-if="$mq.phone" :user="user"/>
    </div>
</template>


<script>
    import PostModal from './PostModal.vue';
    import MobileBar from './MobileBar.vue';

    export default {
        name: "PostPage",
        components: {
            PostModal,
            Navbar,
            MobileBar,
        },

        props: {
            postID: null
        },

        async mounted() {
            this.postID = this.$route.params.id;
        }
    }
</script>
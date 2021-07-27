<template>
    
    <div class="container" style="position: relative;">
        <div class="user-images">           
            <PostCard @onPostClick="onPostClick" :key="image.id" class="post-card" v-for="image in images" :postData="image"/>
        </div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import PostCard from "./PostCard.vue";

    const data = {
        images: [],
        selectedPost: null
    }

    export default {
        
        name: "UserImages",

        data() {
            return data;
        },

        components: {
            PostCard,
        },

        async mounted() {
            this.images = await $.get("http://localhost:8080/users/fungus/posts");
        },

        methods: {
            
            onPostClick(postID) {
                this.$emit("onPostClick", postID);
            }
        }
    }

</script>



<style scoped>

    .user-images {
        width: 60%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        justify-items: center;
        grid-gap: 20px;
        margin-top: 6rem;
        margin-bottom: 5rem;

    }

    @media screen and (max-width: 1100px) {

        .user-images {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 5px;
            margin-top: 3rem;

            user-select: none;
            -webkit-touch-callout: none;
        }

    }
</style>
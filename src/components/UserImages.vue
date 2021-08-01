<template>
    
    <div class="container" style="position: relative;">
        <div class="user-images">           
            <PostCard @onPostClick="onPostClick" :key="image.id" class="post-card" v-for="image in images" :postData="image"/>
        </div>
    </div>

</template>

<script>
    import { NoAuth } from '../AxiosProfiles.js'
    import PostCard from "./PostCard.vue";

    const data = {
        images: [],
    }

    export default {
        
        name: "UserImages",

        data() {
            return data;
        },

        props: {
            userName: undefined
        },

        components: {
            PostCard,
        },

        async mounted() {
            NoAuth.get(`/users/${this.userName}/posts`)
            .then( res => this.images = res.data);
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

    @media screen and (max-width: 800px) {

        .user-images {
   
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 5px;
            margin: 3rem 5px 7rem 3px;
 

            user-select: none;
            -webkit-touch-callout: none;
        }
    }
</style>
<template>
    <div id="post-modals-stars" class="post-modal-ratings-quarter" >

        <BIconStar @click="setRating(1)" class="star" v-if="!this.score || this.score < 1"/>
        <BIconStarFill @click="setRating(1)" class="star" v-else/>

        <BIconStar @click="setRating(2)" class="star" v-if="!this.score || this.score < 2"/>
        <BIconStarFill @click="setRating(2)" class="star" v-else/>

        <BIconStar @click="setRating(3)" class="star" v-if="!this.score || this.score < 3"/>
        <BIconStarFill @click="setRating(3)" class="star" v-else/>

        <BIconStar @click="setRating(4)" class="star" v-if="!this.score || this.score < 4"/>
        <BIconStarFill @click="setRating(4)" class="star" v-else/>
        
        <BIconStar @click="setRating(5)" class="star" v-if="!this.score || this.score < 5"/>
        <BIconStarFill @click="setRating(5)" class="star" v-else/>
    </div>
</template>


<script>
    import { BIconStar, BIconStarFill } from 'bootstrap-vue'
    import { WithAuth } from '../AxiosProfiles.js'

    export default {
        name: "RatingStars",

        props: {
            postID: null
        },

        data() {
            return {
                score: null
            }
        },

        components: {
            BIconStarFill,
            BIconStar         
        },

        async mounted() {
            WithAuth.get(`http://localhost:8080/posts/${this.postID}/ratings/me`)
            .then(res => this.score = res.data.punt)
        },

        methods: {
            setRating(score) {   
                let form = new FormData();
                form.append('score', score);
                WithAuth.post(`/posts/${this.postID}/ratings`, form);

                this.score = score;
            }   
        }

    }
</script>

<style scoped>
    .star {
        cursor: pointer;
        z-index: 1;
    }
</style>
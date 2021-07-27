<template>
    <div id="post-modals-stars" class="post-modal-ratings-quarter" >

        <BIconStar @click="setRating($event.target.dataset.score)" class="star" v-if="!this.score || this.score < 1" data-score="1"/>
        <BIconStarFill @click="setRating($event.target.dataset.score)" class="star" v-else data-score="1"/>

        <BIconStar @click="setRating($event.target.dataset.score)" class="star" v-if="!this.score || this.score < 2" data-score="2"/>
        <BIconStarFill @click="setRating($event.target.dataset.score)" class="star" v-else data-score="2"/>

        <BIconStar @click="setRating($event.target.dataset.score)" class="star" v-if="!this.score || this.score < 3" data-score="3"/>
        <BIconStarFill @click="setRating($event.target.dataset.score)" class="star" v-else data-score="3"/>

        <BIconStar @click="setRating($event.target.dataset.score)" class="star" v-if="!this.score || this.score < 4" data-score="4"/>
        <BIconStarFill @click="setRating($event.target.dataset.score)" class="star" v-else data-score="4"/>
        
        <BIconStar @click="setRating($event.target.dataset.score)" class="star" v-if="!this.score || this.score < 5" data-score="5"/>
        <BIconStarFill @click="setRating($event.target.dataset.score)" class="star" v-else data-score="5"/>
    </div>
</template>


<script>
    import { BIconStar, BIconStarFill } from 'bootstrap-vue'
    import $ from 'jquery';

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
            this.score = await $.get(`http://localhost:8080/posts/${this.postID}/ratings/me`).punt;
        },

        methods: {
            setRating(score) {
                console.log("aqui");
                this.score = parseInt(score);
                let xx = $.post(`http://localhost:8080/posts/${this.postID}/ratings`, {score: this.score})
                console.log(xx);
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
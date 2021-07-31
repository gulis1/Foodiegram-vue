<template>
    <div id="post-modals-stars" class="post-modal-ratings-quarter" >

        <font-awesome-icon :icon="['far', 'star']" @click="setRating(1)" class="star" v-if="!this.score || this.score < 1"/>
        <font-awesome-icon :icon="['fas', 'star']"  @click="setRating(1)" class="star" v-else/>

        <font-awesome-icon :icon="['far', 'star']" @click="setRating(2)" class="star" v-if="!this.score || this.score < 2"/>
        <font-awesome-icon :icon="['fas', 'star']" @click="setRating(2)" class="star" v-else/>

        <font-awesome-icon :icon="['far', 'star']" @click="setRating(3)" class="star" v-if="!this.score || this.score < 3"/>
        <font-awesome-icon :icon="['fas', 'star']" @click="setRating(3)" class="star" v-else/>

        <font-awesome-icon :icon="['far', 'star']" @click="setRating(4)" class="star" v-if="!this.score || this.score < 4"/>
        <font-awesome-icon :icon="['fas', 'star']" @click="setRating(4)" class="star" v-else/>
        
        <font-awesome-icon :icon="['far', 'star']" @click="setRating(5)" class="star" v-if="!this.score || this.score < 5"/>
        <font-awesome-icon :icon="['fas', 'star']" @click="setRating(5)" class="star" v-else/>
    </div>
</template>


<script>
    import { WithAuth } from '../AxiosProfiles.js'

    export default {
        name: "RatingStars",

        props: {
            postID: undefined
        },

        data() {
            return {
                score: undefined
            }
        },

        async mounted() {
            WithAuth.get(`http://localhost:8080/posts/${this.postID}/ratings/me`)
            .then(res => this.score = res.data.punt)
        },

        methods: {
            setRating(score) {   
                let form = new FormData();
                form.append('score', score);
                WithAuth.post(`/posts/${this.postID}/ratings`, form)
                .then (() => this.$emit('scoreChanged'))
                .catch(() => window.location.href = '/login');

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
<template>
    <div id="post-modal" v-if="post">

        <div v-show="!$mq.phone || !this.showComments" v class="modal-click-box" id="post-modal-image-container">
            <img id="post-modal-image" :src="post.image"/>
        </div>

        <div class="modal-click-box" id="post-modal-right">

            <div v-show="!$mq.phone || !this.showComments" id="post-modal-details">

                <div id="post-modal-footer">

                    <div id="post-modal-title-div">
                        <p id="post-modal-title"> {{ post.title }} </p>
                    </div>

                    <div id="post-modal-text-div">
                        <p id="post-modal-text"> {{ post.text }}</p>
                    </div>

                </div>

                <div id="post-modal-ratings-container">

                    <div class="post-modal-ratings-half">

                        <div class="post-modal-ratings-quarter">
                            <p id="post-modal-ratings"> {{ post.media }} <font-awesome-icon :icon="['far', 'star']"/> </p>
                            <p id="post-modal-ratings"> {{ post.numerototalval }} <font-awesome-icon :icon="['far', 'user']"/> </p>
                        </div>

                        <RatingStars :postID="this.postID" @scoreChanged='scoreChanged'/>
                    </div>

                    <div class="post-modal-ratings-half">

                        <div class="post-modal-ratings-quarter" style="justify-content: flex-end;">
                            <p id="post-modal-date"> {{ post.fecha }} </p>
                        </div>

                        <div class="post-modal-ratings-quarter" style="justify-content: flex-end;">
                            <p id="post-modal-loc"> {{post.ciudad }}, {{ post.pais }}</p>
                        </div>

                    </div>
                </div>

            </div >

            <Comments v-show="!$mq.phone || this.showComments" :postID="this.postID" :key="refreshComments"/>

            <div v-if="!$mq.phone || this.showComments" id="post-modal-comment-input">

                <div style="width: 80%; height: 100%;">
                    <textarea v-model="myComment" id="post-modal-comment-input-field" placeholder="Write something nice." autocomplete="off"></textarea>
                </div>

                <div id="post-modal-send-button-container">
                    <font-awesome-icon :icon="['far', 'arrow-alt-circle-right']" id="post-modal-send-button" @click="sendComment"/>
                </div>

            </div>

            <a v-if="$mq.phone && !this.showComments" id="view-comments-button" @click="showComments = !showComments"> Show comments </a>

            <font-awesome-icon icon="chevron-left" v-if="$mq.phone && this.showComments" id='chevron' @click="showComments = !showComments"/>

        </div>
    </div>
   
</template>


<script>
    import { NoAuth, WithAuth } from '../AxiosProfiles.js';
    import RatingStars from './RatingStars.vue';
    import Comments from './Comments.vue';

    export default {

        name: "PostModal",
        
        props: {
            postID: undefined
        },

        data() {
            return {
                post: undefined,
                myRating: undefined,
                myComment: undefined,
                refreshComments: 0,
                showComments: false
            }
        },  

        mounted() {
            NoAuth.get("/posts/" + this.postID)
            .then(res => {
                this.post = res.data;
                this.$emit('postLoaded', this.post.user);
              });
        },

        components: {
            RatingStars,
            Comments,
        },

        methods: {
            scoreChanged() {
                NoAuth.get("/posts/" + this.postID)
                .then(res => {
                    this.post.media = res.data.media;
                    this.post.numerototalval = res.data.numerototalval;
                });
            },

            sendComment() {
                let form = new FormData();
                form.append('text', this.myComment);
                WithAuth.post(`/posts/${this.postID}/comments`, form)
                .then(() => {
                    this.refreshComments++;
                    this.myComment = "";
                    })
                .catch(() => window.location.href = '/login');
            }
        }
    }
</script>

<style scoped>
    #post-modal {
        position: absolute;
        width: auto;
        height: 70vh;
        top: 12.5%;
        display: flex;
        justify-content: center;
    }


    #post-modal-image-container {
        max-height: 100%;
        max-width: 70%;
        background-color: #343a40;
        display: flex;
        align-items: center;
    }

    #post-modal-image {
        max-width: 100%;
        max-height: 100%;

        display: block;
        object-fit: contain;
        flex-grow: 0;
    }


    #post-modal-right {
        width: 15%;
        background-color: rgb(255,255,255);
        border-left: 1px solid lightgray;
        min-width: 230px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-family: Arial,serif;

    }

    #post-modal-details {
        width: 100%;
        height:30%;
        border-bottom: 1px solid lightgray;
        position: relative;
        padding: 5px;
        box-sizing: border-box;
    }

    #post-modal-footer {
        width: 100%;
        height: calc(100% - 2rem);
        display: flex;
        flex-direction: column;
    }

    #post-modal{
        width: 100%;
        overflow-y: scroll;
    }

    #post-modal-title-div {
        width: 100%;
        height: 1.2rem;
    }
    #post-modal-title {
        font-size: 1.1rem;
        font-weight: bold;
    }
    #post-modal-text-div {
        width: 100%;
        overflow-y: scroll;
        margin-top: 0.5rem;
        margin-bottom: 0.7rem;
    }

    #post-modal-ratings-container {
        width: 100%;
        height: 2rem;
        bottom: 0;
        display: flex;
    }

    .post-modal-ratings-half {
        height: 100%;
        flex: 1;
    }

    .post-modal-ratings-quarter {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: flex-end;
        font-size: smaller;
    }

    .username {
        color: black;
    }

    .comment {
        color: gray;
    }

    #post-modal-comment-input {
        width: 100%;
        display: flex;
        border-top: lightgray 1px solid;
        padding: 5px;
        box-sizing: border-box;
        min-height: 3rem;
    }

    #post-modal-comment-input-field {
        width: 100%;
        height: 100%;
        border: none;
        font-size: 1rem;
        font-family: Arial, serif;
        resize: none;

    }

    #post-modal-comment-input-field:focus {
        outline: none;
    }

    #post-modal-send-button-container {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #post-modal-send-button {
        font-size: 1.5rem ;
        cursor: pointer;
        z-index: 3;
    }

    #post-modal-send-button:hover {
        color: cornflowerblue;
    }

    .form-control:focus {

        box-shadow: none;
    }

    #scrollSeparator {
        width: 100%;
        height: 5rem;
    }

    #view-comments-button {
        color: cornflowerblue;
        font-size: 2rem;
        margin-top: 70px;
        margin-bottom: 5px;
        display: block;
        text-align: center;
    }

    #chevron {
        font-size: 2rem;
        position: fixed;
        top: 0;
        left:0;
        z-index: 15;
        color: white;
        margin-top: 0.5rem;
    }

    #chevron:hover {
        color: cornflowerblue;
    }

   @media screen and (max-width: 800px) {

        #post-modal {
            position: absolute;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            top: 3rem;
            width: 100%;
            bottom: 7rem;
            padding-bottom: 0;
            height: unset;
            overflow-y: scroll;
        }

        #post-modal-details {
            font-size: 1.2rem;
            height: 100%;
            border-bottom: none;
            display: flex;
            flex-direction: column;
        }

        #post-modal-footer {
            flex-grow: 1;
        }

        #post-modal-title-div {
            width: 100%;
            height: auto;
        }

        #post-modal-title{
            font-size: 2rem;
        }

        #post-modal-right {
            min-width: unset;
            width: 100%;
            padding: 5px;
            box-sizing: border-box;
            flex-grow: 1;
        }

        #post-modal-image {
            width: 100%;
            max-height: 100%;
            height: auto;
            display: block;
            object-fit: contain;
            object-position: 50% 50%;
        }

        #post-modal-image-container {
            max-height: 75%;
            height: auto;
            display: block;
            width: 100%;
            max-width: unset;
        }

         #post-modal-comment-input {
            border: 1px solid black;
            border-left: none;
            background-color: white;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 50;
            height: 7rem;
        }
        
        #post-modal-send-button  {
            font-size: 3rem;
        }
    }
</style>
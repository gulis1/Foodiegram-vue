<template>
    <div id="post-modal">

        <div class="modal-click-box" id="post-modal-image-container">
            <img id="post-modal-image" :src="post.image"/>
        </div>

        <div class="modal-click-box" id="post-modal-right">

            <div id="post-modal-details">

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
                            <p id="post-modal-ratings"> {{ post.media }} <BIconStar/> </p>
                            <p id="post-modal-ratings"> {{ post.numerototalval }} <BIconPerson/> </p>
                        </div>

                        <RatingStars :postID="this.postID" @scoreChanged='scoreChanged'/>
                    </div>

                    <div class="post-modal-ratings-half">

                        <div class="post-modal-ratings-quarter" style="Pustify-content: flex-end;">
                            <p id="post-modal-date"> {{ post.fecha }} </p>
                        </div>

                        <div class="post-modal-ratings-quarter" style="justify-content: flex-end;">
                            <p id="post-modal-loc"> {{post.ciudad }}, {{ post.pais }}</p>
                        </div>

                    </div>
                </div>

            </div >

            <Comments :postID="this.postID"/>

            <div id="post-modal-comment-input">

                <div style="width: 80%; height: 100%;">
                    <textarea onkeydown="sendComment(event)" id="post-modal-comment-input-field" placeholder="Write something nice." autocomplete="off"></textarea>
                </div>

                <div id="post-modal-send-button-container">
                    <BIconArrowRightCircle onclick="sendComment(event)" id="post-modal-send-button"/>
                </div>

            </div>
        </div>
    </div>
   
</template>


<script>
    import { NoAuth } from '../AxiosProfiles.js';
    import RatingStars from './RatingStars.vue';
    import Comments from './Comments.vue';
    import { BIconArrowRightCircle, BIconPerson, BIconStar } from 'bootstrap-vue';

    export default {

        name: "PostModal",
        
        props: {
            postID: null
        },

        data() {
            return {
                post: null,
                myRating: null,
            }
        },    

        async mounted() {
            NoAuth.get("/posts/" + this.postID)
            .then(res => this.post = res.data);
        },

        components: {
            BIconArrowRightCircle,
            RatingStars,
            Comments,
            BIconStar,
            BIconPerson
        },

        methods: {
            scoreChanged() {
                NoAuth.get("/posts/" + this.postID)
                .then(res => {
                    console.log(res.data.media)
                    this.post.media = res.data.media;
                    this.post.numerototalval = res.data.numerototalval;
                });
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
        border-bottom: 1px solid lightcyan;
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
        font-size: 2.2rem ;
        cursor: pointer;
        z-index: 3;
    }

    #post-modal-send-button:hover {
        color: cornflowerblue;
    }



    .form-control:focus {

        box-shadow: none;
    }
</style>
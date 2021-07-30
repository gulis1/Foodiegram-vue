<template>
    <ul id="post-modal-comments">
        <li :key="comment.id" v-for="comment in comments" style="border:none; width: 100%; display: flex; padding-bottom: 5px;">

            <div style="margin-right: 5px; display: flex; justify-content: center;">
                <img class="comment-pfp" alt="pfp" :src="comment.pfp" />
            </div>

            <div class="comment-text">
                <p> {{comment.user + ':&nbsp;'}} <span style='color: gray;'> {{comment.text}}</span> </p>   
            </div>
        </li>
    </ul>
</template>

<script>
    import { NoAuth } from '../AxiosProfiles.js';

    export default {
        name: 'Comments',
        data: function() {
            return {
                comments: []
            };
        },
        props: {
            postID: null
        },
        async mounted() {
            let comments = await NoAuth.get(`posts/${this.postID}/comments`);
            this.comments = comments.data;
        }
    }
</script>

<style scoped>
    #post-modal-comments {
        list-style: none;
        overflow-y: scroll;
        width: 100%;
        flex-grow: 1;
        padding: 5px 5px 0 5px;
        box-sizing: border-box;
        margin-bottom:  5px;
    }

    .comment-pfp {

        width: 2rem;
        height: 2rem;
        border-radius: 50%;
    }

    .comment-text {
        flex-grow: 1;
        display: flex;
        word-break: break-word;
        padding-top: 0.5rem;
        font-size: 1rem;
    }
</style>
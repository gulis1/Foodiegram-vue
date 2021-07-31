<template>
    <div class="post-card" th:each="image : ${postList}">

        <div class="post-card-top">
            <img class="post-card-image" v-on:click="onClick($event.target.dataset.postid)" :src="postData.image" alt="AN ERROR TOOK PLACE LOADING THE PHOTO" :data-postid="postData.id"/>
        </div>


        <div class="post-card-bottom">
            <div style="width: 100%; height: 80%;">
                <p class="card-text"> {{ postData.title }}</p>
            </div>

            <div style="width: 100%; height: 20%;">
                <p style="text-align: right; height: 100%; font-size: 1rem;">
                    {{ postData.media }}
                     <font-awesome-icon icon="star"/>
                </p>
            </div>


        </div>
	</div>
</template>

<script>

	export default {
		name: "PostCard",		
        props: {
            postData: undefined
        },

        methods: {
            onClick(postID) {
                this.$emit("onPostClick", postID);
            }
        }
	}
</script>

<style scoped>
    .post-card {
        width: 200px;
        height: 350px;
        border-radius: 10px;
        border: none;
        background-color: #343a40;
        color: white;
    }

    .post-card-top {
        width: 100%;
        height: 60%;
    }

    .post-card-image {
        padding:0;
        width:100%;
        height:100%;
        object-fit: cover;
        object-position: 0, 0;

        border-radius: 10px;
        cursor: pointer;
        user-select: none;
        z-index: 1;
    }

    .post-card-bottom {
        box-sizing: border-box;
        padding: 10px;
        height: 40%;
        font-size: 1.5rem;
        font-family: Arial, monospace;
    }

    .card-text {
        overflow: hidden;
        font-size: 1rem;
    }

    @media screen and (max-width: 800px) {

        .post-card {
            height: 250px;
            width: calc(33.333vw - 5px);
            border-radius: 0;
        }

        .post-card-image{
            border-radius: 0;
        }

        .post-card-top {
            height: 65%;
        }

        .post-card-bottom {
            height: 35%;
            padding: 5px;
            background-color: #888888;
        }
    }

</style>
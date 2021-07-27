<template>
    <div id="page-mask" v-on:click="exit($event)">
        <PostModal :postID='postID'/>
    </div>
</template>

<script>
    import PostModal from './PostModal.vue';

    export default {
        name: 'PageMask',
        components: {
            PostModal
        },

        props: {
            postID: null
        },
        
        methods: {
            exit(e) {
                if (!e.target.closest(".modal-click-box"))
                    this.$emit("exit");
            }
        }


    }

</script>


<style scoped>
    #page-mask {
        background: rgba(0, 0, 0, 0.85);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;

        display: flex;
        justify-content: center;
    }
</style>
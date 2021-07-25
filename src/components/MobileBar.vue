<template>
        <!-- La barra que sale arriba cuando estás en el movil. La meto aquí porque no se donde ponerla. -->
    <nav id="mobileUser">
        <img class="userPic" :src="user.image"/>
        <a class="user-link" :href="'/pruebas/' + user.name"> {{ user.name }}</a>
    </nav>
</template>


<script>
    export default {
        name: "MobileBar",

        props: {
            user: null
        },   
    }
</script>


<style scoped>
    #mobileUser {
        width: 100%;
        top: 0;
        left: 0;
        position: fixed;
        font-size: 2rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #343a40;
        color: white;
        z-index: 10;
    }

    .userPic {
        aspect-ratio: 1/1;
        height: 2rem;
        border-radius: 50%;
        margin-right: 10px;
    }
</style>
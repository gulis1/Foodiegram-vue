<template>
    <nav class="navbar">

    <ul class="navbar-nav">

        <li class="nav-item">
            <h1 class="brand">Foodiegram.</h1>
        </li>

        <li id="primaryUser" class="userInfo nav-item">
            <img class="userPic" :src="user.image"/>
            <a class="user-link" :href="'/pruebas/' + user.name"> {{ user.name }} </a>
        </li>

        <li class="nav-item">

            <a class="nav-icon" id="searchButton" onclick="buscar(this)">
                <BIconSearch/>
            </a>

            <a class="nav-icon" href="@{/pruebas/upload}">
                <BIconUpload/>
            </a>

            <a class="nav-icon" href="@{/pruebas/friends}">
                <BIconPeople/>
            </a>

            <a class="nav-icon" onclick="deleteCookies()" th:href="@{/pruebas}">
                <BIconGearWideConnected/>
            </a>

        </li>


    </ul>

</nav>
</template>

<script>
    import { BIconSearch, BIconUpload, BIconPeople, BIconGearWideConnected } from 'bootstrap-vue';

    export default {
        name: 'Navbar',

        components: {
            BIconSearch,
            BIconUpload,
            BIconPeople,
            BIconGearWideConnected
        },

        props: {
            user: null
        },
    }

</script>


<style>

    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

    .navbar {
        background-color: #343a40;
        position: fixed;
        width: 100%;
        height: 4rem;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        font-size: 2rem;
        z-index: 10;
    }

    .navbar-nav {

        width: 60%;
        height: 100%;
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-item {
        height: 100%;
        display: flex;
        color: white;
        justify-content: center;
        align-items: center;
        -webkit-tap-highlight-color: transparent;
    }

    .userPic {
        aspect-ratio: 1/1;
        height: 3rem;
        border-radius: 50%;
        margin-right: 10px;
        user-select: none;
    }

    .nav-item:first-child {
        justify-content: flex-start;
    }

    .nav-item:last-child {

        justify-content: flex-end;
    }

    .nav-icon {
        margin-left: 10px;
        margin-right: 10px;
        transition: 200ms ease;
        color: white;
    }

    .nav-icon:hover {
        color: cornflowerblue;
        font-size: 3rem;
    }

    .brand {
        color: white;
        font-family: Pacifico, monospace;
        font-size: 1.5rem;
        user-select: none;
    }

    .user-link {
        color: white;
        text-decoration: none;
        cursor: pointer;
        user-select: none;
    }

    @media screen and (max-width: 1100px) {

        #primaryUser {
            display: none;
        }

        .navbar {
            top: unset;
            bottom: 0;
            height: 4rem;
            font-size: 2rem;
            padding-bottom: 3rem;
        }
        
        .nav-icon {
            margin-left: 5px;
            margin-right: 5px;
         }
         
        .navbar-nav {
            width: 95%;
        }

        #primaryUser {
            display: none;
        }

    }
</style>
<template>
    <div id="bg">  
        <article>
            <img id="logo" src="@/assets/logo.png" alt="Foodiegram">

            <div id="inputs">
                <h3 style="margin-bottom: 2rem;">Log in to Foodiegram</h3>
                <input v-model="user" type="text" placeholder="Username"/>
                <input v-model="password" type="password" placeholder="Password"/> 
                <button @click="login" > <h1>Login</h1> </button>
            </div>

            <h3 id="registerPrompt">Don't have an account? <router-link to="/Register">Register</router-link></h3>
        </article>
    </div>
</template>

<script>

    import { NoAuth } from '../AxiosProfiles.js';

    export default {
       name: 'LoginPage',

       data: function() {
           return {
               user: undefined,
               password: undefined
           };
       },

       methods: {
           login() {  
                if (this.user && this.password) {
                    
                    let form = new FormData();
                    form.append('username', this.user);
                    form.append('password', this.password);

                    NoAuth.post('/users/login', form)
                    .then(res => {
                        
                        window.localStorage.setItem('foodiegramAuth', res.data.authToken);
                        window.localStorage.setItem('foodiegramRefresh', res.data.refreshToken)
                        window.location.href = `/users/${this.user}`
                    })
                    .catch(() => {
                        alert("Invalid credentials");
                    });
                }

                else
                    alert("Please input your username and password.")
              
           }
       }

    }   
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    #bg {
        display: grid;
        place-items: center;
    }

    article {
        position: absolute;
        border-radius: 30px;
        background-color: white;
        height: 80vh;
        aspect-ratio: 6/7;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Roboto;
    }

    #logo {
        margin-top: 2.5rem;
        width: 80%;
    }

    #registerPrompt {
        position: absolute;
        bottom: 2rem;
    }

    #inputs {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 500px;
    }

    input {
        margin-bottom: 1rem;
        height: 2rem;
        border-radius: 5px;
        border: 1px solid gray;
        width: 40%;
        padding-left: 0.5rem;
    }

    button {
        background-color: #e9ac8d;
        border: none;
        border-radius: 5px;
    }

    button:hover {
        background-color: coral;
    }

    h1 {
        margin: 0.5rem;
    }

    @media screen and (max-width: 800px) {
        
        #logo {
            width: 60%;
        }

        article {
            width: 100%;
            height: 100%;
            border-radius: 0;
            aspect-ratio: unset;
        }
    }

</style>
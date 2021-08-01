<template>
    <div id="bg">
        <article id="card">
            
            <div id="searchTools">


                <input v-model="searchText" type="text" id="searchBar" placeholder="Search" @input="isTyping = true;">
                
                
                <div style="display: flex; justify-content: flex-end; min-width: 6rem;">
                    <font-awesome-icon class="search-option" :icon="['fas', 'user']" v-bind:class="{ 'selected': selectedOption === 'user' }" @click="selectedOption = 'user'"/>
                    <font-awesome-icon class="search-option" icon="image" v-bind:class="{ 'selected': selectedOption === 'post' }" @click="selectedOption = 'post'"/>
                    <font-awesome-icon class="search-option" icon="utensils" v-bind:class="{ 'selected': selectedOption === 'restaurant' }" @click="selectedOption = 'restaurant'"/>
                </div>               
            </div>
            
            <ul v-if="this.selectedOption === 'user' || this.selectedOption === 'restaurant'" class="results">
                <li class="result" :key="result.id" v-for="result in this.results">          
                    <img :src="result.image" alt="><" style="border-radius: 50%; height: 100%; aspect-ratio: 1/1;">
                    <p> {{ result.name }} </p>             
                </li>
            </ul>

            <ul v-else class="results">


            </ul>
        </article>


    </div>
</template>

<script>

    import { NoAuth } from '../AxiosProfiles.js';
    import debounce from 'lodash.debounce';
    

    export default {
        name: 'SearchPage',
        data: function() {
            return {
                searchText: "",
                selectedOption: 'user',
                results: [],
                isTyping: false,
                isLoading: false
            }
        },

        watch: {
            searchText: debounce(function() {
                this.isTyping = false
            }, 1000),

            isTyping: function(value) {
                        if (!value) 
                            this.search(this.searchText);            
                        }
        },

        methods: {

            async search(text) {
                
                if (!text)
                    this.results = [];

                else {

                   try {
                        this.isLoading = true;
                        let response = await NoAuth.get(`/search/users/name/${text}`);
                        this.results = response.data;
                    }
                
                    catch (err) {
                        console.log(err);
                    }

                    finally {
                        this.isLoading = false;
                    } 
                }
            }        
        }
}
</script>



<style scoped>

    #bg {
        display: grid;   
        place-items: center;
    }

    #card {
        background: white;
        border-radius: 30px;
        height: 80vh;
        aspect-ratio: 6/7;
        display: flex;
        flex-direction: column;
        justify-items: center;
        padding: 1rem;
        box-sizing: border-box;
        font-size: 2rem;
    }

    #searchBar {
        flex-grow: 1;
        max-width: 600px;
        padding-left: 5px;
        margin-right: 1rem;
    }

    #searchTools {
        width: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }

    .search-option {
        margin-left: 0.5rem;
    }

    .selected {
        color: cornflowerblue
    }

    .results {
        flex-grow: 1;
        list-style: none;
        border: 1px solid gray;
        margin-top: 1rem;
        border-radius: 30px;
        padding: 1rem
    }

    .result {
        display: flex;
        align-items: center;
        width: 100%;
        height: 4rem;
    }

    @media screen and (max-width: 800px) {

        #card {
            aspect-ratio: unser;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 0;
            background: none;
            color: white;
        }

    }
</style>
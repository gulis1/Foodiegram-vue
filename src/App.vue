<template>
    <div id="app">
        <p>
            <router-link to="/users">User</router-link>
        </p>
  <router-view></router-view>
</div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

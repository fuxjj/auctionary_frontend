<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
  import Login from "./pages/Login.vue";

  export default {
    components: {
      // Login,
    },

    data() {
      return {
        
      }
    }
}
</script>

<style>

</style>
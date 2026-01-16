<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login" v-if="!isLoggedIn">Login</router-link> |
      <router-link to="/item" v-if="!isLoggedIn">Create Item</router-link>
      <button v-if="!isLoggedIn" @click="handleLogout">Logout</button>
    </nav>

    <router-view />
  </div>
</template>

<script>
import {coreService} from "../services/core.service";

  export default {
    data() {
      return {
        isLoggedIn: false
      }
    }, created() {
      this.isLoggedIn = !!localStorage.getItem("session_token");
    },
    methods: {
      async handleLogout() {
        try{ 
          await coreService.logout();
        } catch(e) {
          return;
        } finally {
          localStorage.removeItem("user_id");
          localStorage.removeItem("session_token");
          this.isLoggedIn = false;
          this.$router.push("/login")
        }
      }
    }
}
</script>

<style>

</style>
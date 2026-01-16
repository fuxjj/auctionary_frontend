<template>
    <h1>Login </h1>
    <form @submit.prevent="handleSubmit">
        <label for="email">Email: </label>
        <input type="email" name="email" v-model="email">
        <div v-show="submitted && !email">Email is required</div>

        <label for="password">Password: </label>
        <input type="password" name="password" v-model="password">
        <div v-show="submitted && !password">Password is required</div>

        <p>{{email + " " + password}}</p>

        <button>login</button>
    </form>

    <div v-if="error" style="color: red">{{ error }}</div>
</template>

<script>
    import { coreService } from "../../services/core.service"

    export default {
        data() {
            return {
                email: "",
                password: "",
                submitted: false,
                error: ""
            }
        },

        methods: {
            async handleSubmit() {
                this.submitted = true;
                this.error = "";

                if(!this.email || !this.password) return;

                const email = this.email.trim();

                try {
                    const res = await coreService.login(this.email, this.password);

                    localStorage.setItem("user_id", res.user_id);
                    localStorage.setItem("session_token", res.session_token);

                    this.$router.push("/")
                } catch (err) {
                this.error = err;
            }

            } 
        }
    }
</script>

<style></style>
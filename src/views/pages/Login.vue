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
            handleSubmit(e) {
                this.submitted = true;
                this.error = "";

                const {email, password} = this

                if(!(email && password)) {
                    return;
                }

                if (!email.includes("@")) {
                    this.error = "Email must be valid.";
                    return;
                }

                const passwordPattern = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/;
                if (!passwordPattern.test(password)) {
                    this.error("Password not strong enough!");
                    return;
                }
            }
        }
    }
</script>

<style></style>
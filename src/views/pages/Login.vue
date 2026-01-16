<template>
 <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Login</h1>
      <p class="auth-subtitle">Sign in to access your auctions.</p>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Email -->
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            v-model="email"
            class="form-input"
            :class="{ 'has-error': submitted && !email }"
            placeholder="you@example.com"
          />
          <div v-show="submitted && !email" class="field-error">
            Email is required.
          </div>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            v-model="password"
            class="form-input"
            :class="{ 'has-error': submitted && !password }"
            placeholder="••••••••"
          />
          <div v-show="submitted && !password" class="field-error">
            Password is required.
          </div>
        </div>

        <!-- Backend error -->
        <div v-if="error" class="form-error">
          {{ error }}
        </div>

        <button type="submit" class="submit-button">
          Login
        </button>
      </form>
    </div>
  </div>
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

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: #f5f7fb;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem 2.2rem 2.4rem;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
  border: 1px solid #e4e7ee;
}

.auth-title {
  margin: 0;
  font-size: 1.7rem;
  color: #111827;
}

.auth-subtitle {
  margin: 0.4rem 0 1.5rem;
  font-size: 0.95rem;
  color: #6b7280;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
  color: #374151;
}

.form-input {
  padding: 0.55rem 0.7rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.12s ease, box-shadow 0.12s ease,
    background-color 0.12s ease;
}

.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.12);
  background-color: #f9fafb;
}

.form-input.has-error {
  border-color: #dc2626;
  background-color: #fef2f2;
}

.field-error {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #b91c1c;
}

.form-error {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #b91c1c;
  background: #fef2f2;
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  border: 1px solid #fecaca;
}

.submit-button {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.12s ease, transform 0.05s ease,
    box-shadow 0.12s ease;
}

.submit-button:hover {
  background: #1d4ed8;
  box-shadow: 0 7px 18px rgba(37, 99, 235, 0.25);
  transform: translateY(-1px);
}

.submit-button:active {
  transform: translateY(0);
  box-shadow: none;
}
</style>
<template>
    <div class="home-page">
    <header class="home-header">
      <h1 class="title">Browse Auctions</h1>
      <p class="subtitle">Find something you like and place a bid.</p>
    </header>

    <main>
      <!-- Loading state -->
      <div v-if="loading" class="state-message">
        <em>Loading items...</em>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="state-message error">
        {{ error }}
      </div>

      <!-- Items list -->
      <section v-else>
        <div v-if="items.length" class="items-grid">
          <article
            v-for="item in items"
            :key="item.item_id"
            class="item-card"
          >
            <h2 class="item-title">
              <router-link :to="`/item/${item.item_id}`">
                {{ item.name }}
              </router-link>
            </h2>

            <p class="item-meta">
              Listed by
              <span class="item-author">
                {{ item.first_name }} {{ item.last_name || "" }}
              </span>
            </p>

            <router-link
              class="view-button"
              :to="`/item/${item.item_id}`"
            >
              View details
            </router-link>
          </article>
        </div>

        <!-- Empty state -->
        <div v-else class="state-message">
          <p>No items are currently available.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
    import { coreService } from "../../services/core.service";

    export default {
        data() {
            return {
                items: [],
                error: "",
                loading: true
            };
        },
        mounted() {
            coreService.searchItems()
            .then((items) => {
                this.items = items;
                this.loading = false;
            })
            .catch((error) => {
                this.error = error;
                this.loading = false;
            })
        }
    }
</script>

<style scoped>
.home-page {
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1.5rem 3rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

.home-header {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 1rem;
}

.title {
  font-size: 2rem;
  margin: 0;
  color: #222;
}

.subtitle {
  margin: 0.4rem 0 0;
  color: #666;
  font-size: 0.95rem;
}

.state-message {
  margin-top: 2rem;
  text-align: center;
  color: #555;
}

.state-message.error {
  color: #b00020;
}

.items-grid {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.item-card {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  padding: 1rem 1.25rem 1.1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-title {
  font-size: 1.05rem;
  margin: 0 0 0.3rem;
}

.item-title a {
  text-decoration: none;
  color: #1a73e8;
}

.item-title a:hover {
  text-decoration: underline;
}

.item-meta {
  margin: 0 0 0.8rem;
  font-size: 0.85rem;
  color: #777;
}

.item-author {
  font-weight: 500;
}

.view-button {
  align-self: flex-start;
  display: inline-block;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid #1a73e8;
  background: #1a73e8;
  color: #fff;
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease,
    transform 0.05s ease;
}

.view-button:hover {
  background: #1558af;
  border-color: #1558af;
  transform: translateY(-1px);
}
</style>
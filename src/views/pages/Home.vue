<template>
    <div>
        <h1>Search</h1>

        <em v-if="loading">Loading items..</em>

        <ul v-if="items.length">
            <li v-for="item in items" :key="item.item_id">
                <router-link :to="`/item/${item.item_id}`">
                    {{ item.name }} by {{ item.first_name }}
                </router-link>
            </li>
        </ul>

        <div v-if="error">
            {{ error }}
        </div>
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

<style></style>
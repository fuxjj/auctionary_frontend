<template>
    <div>
        <h1>Item Details</h1>

        <em v-if="loading">Loading item..</em>

        <div v-if="error" style="color:red">{{ error }}</div>

        <div v-if="item">
            <h2>{{ item.name }}</h2>
            <p>{{ item.description }}</p>
            <p>Starting bid: {{ item.starting_bid }}</p>
            <p>Start date: {{ item.start_date }}</p>
            <p>End date: {{ item.end_date }}</p>
        </div>
    </div>
</template>

<script>
    import { coreService } from "../../services/core.service";

    export default {
        data() {
            return {
                item: null,
                loading: true,
                error: ""
            }
        },
        mounted() {
            const id = this.$route.params.id;

            coreService.getItem(id)
            .then((item) => {
                this.item = item;
                this.loading = false;
            }).catch((err) => {
                this.error = err;
                this.loading = false
            })
        }
    }
</script>
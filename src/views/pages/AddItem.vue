<template>
    <div>
        <h1>Add item</h1>

        <form @submit.prevent="handleSubmit">
            <div>
                <label>Name:</label>
                <input v-model="name" type="text" />
                <div v-show="submitted && !name">Name is required</div>
            </div>

            <div>
                <label>Description:</label>
                <input v-model="description" type="text" />
                <div v-show="submitted && !description">Description is required</div>
            </div>

            <div>
                <label>Starting bid:</label>
                <input v-model.number="starting_bid" type="number" />
                <div v-show="submitted && !starting_bid">Starting bid is required</div>
            </div>

            <div>
                <label>End date:</label>
                <input v-model.number="end_date" type="number" />
                <div v-show="submitted && !end_date">End date is required</div>
            </div>

            <button type="submit">Create item</button>
        </form>

        <em v-if="loading">Submitting...</em>
        <div v-if="error">{{error}}</div>
        <div v-if="success">Item created: {{createdItemId}}</div>
    </div>
</template>

<script>
    import { coreService } from "../../services/core.service";

    export default {
        data() {
            return {
                name: "",
                description: "",
                starting_bid: null,
                end_date: null,
                submitted: false,
                loading: false,
                error: "",
                success: false,
                createdItemId: null,
            }
        },
        methods: {
            async handleSubmit() {
                this.submitted = true;
                this.error = "";
                this.success = false;

                if(!this.name || !this.description || !this.starting_bid || !this.end_date) {
                    return;
                }

                this.loading = true;

                try {
                    const res = await coreService.createItem({
                        name: this.name,
                        description: this.description,
                        starting_bid: this.starting_bid,
                        end_date: this.end_date
                    })

                    this.createdItemId = res.item_id;
                    this.success = true;
                } catch (err) {
                    this.error = err;
                } finally {
                    this.loading = false;
                }
            }

        }
    }
</script>
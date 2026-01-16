import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import SingleItem from "../views/pages/SingleItem.vue"

const routes = [
    { path: "/", component: Home},
    { path: "/login", component: Login},
    { path: "/item/:id", component: SingleItem}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import SingleItem from "../views/pages/SingleItem.vue";
import AddItem from "../views/pages/AddItem.vue";

const routes = [
    { path: "/", component: Home},
    { path: "/login", component: Login},
    { path: "/item/:id", component: SingleItem},
    { path: "/item", component: AddItem, meta: {requiresAuth: true}}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("session_token");

    if(to.meta.requiresAuth && !token) {
        next({ path: "/login"});
    } else {
        next();
    }
})

export default router;
import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import HomeView from "../components/Home.vue";
import UsersView from "../components/Users.vue";
import LoginView from "../components/Login.vue";
import RegisterView from "../components/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../components/Dashboard.vue')
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    }
  ],
});

export default router;

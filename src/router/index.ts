import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import HomeView from "../views/HomeView.vue";
import LoginView from "../api/Login.vue";
import PostView from "../api/Post.vue";
import SignupView from "../api/Signup.vue";
import NotFound from "../api/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/post",
      name: "post",
      component: PostView,
    },
    {
      path: "/post/:id",
      name: "post_show",
      //動的インポート
      component: () => {
        return import("../api/Showpost.vue");
      },
      props: (routes) => {
        const idNum = Number(routes.params.id);
        return {
          id: idNum,
        };
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.name !== "login" && !authStore.isauthencated())
    next({ name: "login" });
  else next();
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (
    to.name == "post_show" &&
    from.name !== "post" &&
    authStore.isauthencated()
  )
    next({ name: "post" });
  else next();
});

export default router;

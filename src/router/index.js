import { createRouter, createWebHistory } from "vue-router";
import home from "/src/views/home.vue";
import movie from "/src/views/movie.vue";
import category from "/src/views/category.vue";

const routes = [
  { path: "/", component: home, name: "Home" },
  { path: "/movie/:id", component: movie, name: "Movie" },
  { path: "/category/:slug", component: category, name: "Category", params: true },

  
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;
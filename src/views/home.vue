<template>
  <Hero />
  <Carousel
    class="container"
    v-for="(movie, index) in movies"
    :key="index"
    :name="movie.name"
    :url="movie.url"
    :slug="movie.slug"
  />
</template>

<script>
import Hero from "../components/Hero.vue";
import Carousel from "../components/Carousel.vue";

export default {
  components: { Carousel, Hero },
  data() {
    return {
      movies: [
        { name: "Now Playing", slug: "now_playing" },
        { name: "Top Rated", slug: "top_rated" },
        { name: "Most Popular", slug: "popular" },
        { name: "Upcoming", slug: "upcoming" },
      ],
    };
  },
};
</script>
<template>
  <span v-for="(actor, index) in actorsReduce" :key="index">
    <span>{{ actor.name }}</span>
    <span v-if="index + 1 < actorsReduce.length">, </span>
    <span v-else>.</span>
  </span>
</template>

<script>
import axios from "axios";
export default {
  props: {
    id: String,
  },
  data() {
    return {
      actors: [],
    };
  },
  methods: {
    async getActors() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=1510eab5b0a144b26756002238a49bc8&language=en-US`
      );
      const res = await data;
      this.actors = res.data.cast;
    },
  },
  mounted() {
    this.getActors();
  },
  computed: {
    actorsReduce() {
      return this.actors.slice(0, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  opacity: 0.9;
}
</style>
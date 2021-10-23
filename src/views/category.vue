<template>
  <div class="container navbarspace">
    <h2>{{ $route.params.slug.split("_").join(" ") }}</h2>
    <Loading v-if="loading" />
    <div v-else class="cards">
      <div class="card" v-for="(movie, index) in movies" :key="index">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          :alt="movie.title"
        />
        <div class="title">
          {{ movie.title }}
        </div>
        <div class="rate">
          {{ movie.vote_average }}
        </div>
        <div class="details">
          <router-link
            :to="{
              name: 'Movie',
              params: { id: movie.id },
            }"
            ><img src="../assets/play.svg" alt="play"
          /></router-link>
        </div>
      </div>
    </div>
    <div class="navigation">
      <router-link
        :to="{ name: 'Category', query: { page: this.page - 1 } }"
        class="nav"
        :class="{ disabled: this.page == 1 }"
        >back</router-link
      >
      <router-link
        :to="{ name: 'Category', query: { page: this.page } }"
        class="page"
        >{{ this.page }}</router-link
      >
      <router-link
        :to="{ name: 'Category', query: { page: +this.page + +1 } }"
        class="nav"
        :class="{ disabled: this.page == 40 }"
        >next</router-link
      >
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import axios from "axios";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      loading: true,
      movies: [],
      page: this.$route.query.page || 1,
    };
  },
  methods: {
    async getMovies() {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.$route.params.slug}?api_key=1510eab5b0a144b26756002238a49bc8&language=en-US&page=${this.page}`
        )
        .then((res) => (this.movies = res.data.results))
        .then(
          setTimeout(() => {
            this.loading = false;
          }, 1000)
        )
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getMovies();
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 3em;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1em;
  text-transform: capitalize;
  @media (max-width: 620px) {
    font-size: 2em;
  }
}
.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2em;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 920px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 620px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
  }
  .card {
    position: relative;
    overflow: hidden;
    &:hover .details {
      visibility: visible;
    }
    &:hover .details a {
      animation: pulsate-fwd 0.5s ease-in-out both;
      @keyframes pulsate-fwd {
        0% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
        50% {
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
        100% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      }
    }
    img {
      position: relative;
      width: 100%;
      display: block;
    }
    .title {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 08) 100%
      );
      padding: 0.6em;
      color: #fff;
      font-weight: 700;
      font-size: 1.5em;
      z-index: 11;
      @media (max-width: 400px) {
        font-size: 1.2em;
      }
    }
    .rate {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      background: #000;
      padding: 1em;
      font-weight: 700;
      border-bottom-left-radius: 50%;
      transform: translate(10%, -10%);
      z-index: 11;
    }
    .details {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      visibility: hidden;
      a {
        transition: 0.2s transform ease;
        width: 50%;
        text-decoration: none;
        img {
          filter: invert(1);
          width: 100%;
        }
      }
    }
  }
}
.navigation {
  margin: 1em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
    background: #c71e12;
    color: #fff;
    &.nav {
      padding: 0.3em 1em;
      border-radius: 5px;
      &.disabled {
        background: rgb(88, 81, 81);
        cursor: default;
        pointer-events: none;
      }
    }
    &.page {
      padding: 0.6em;
      border-radius: 5px;
      margin: 0 1em;
    }
  }
}
</style>
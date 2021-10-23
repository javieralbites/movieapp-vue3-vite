<template>
  <div class="container navbarspace">
    <Loading v-if="loading" />
    <div v-else class="grid">
      <div class="text">
        <h1>{{ movie.title }}</h1>
        <span>{{ movie.release_date.substring(0, 4) }}</span>
        <span class="star">
          <img src="../assets/star.svg" alt="movie.title" />
          {{ movie.vote_average }}
        </span>
        <p>{{ movie.overview }}</p>
        <h4>Genres:</h4>
        <span v-for="(genre, index) in movie.genres" :key="index">
          <span>{{ genre.name }}</span>
          <span v-if="index + 1 < movie.genres.length"> , </span>
          <span v-else>.</span>
        </span>
        <h4>Cast:</h4>
        <Actors :id="id" />
        <button @click="switchModal">
          <img src="../assets/play.svg" alt="play" /> Watch Trailer
        </button>
      </div>
      <div class="image">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          :alt="movie.title"
        />
      </div>
    </div>
    <SimilarMovies :id="id" />
    <keep-alive>
      <ModalTrailer :id="id" v-if="modal" @cerrarModal="switchModal" />
    </keep-alive>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue";
import Actors from "../components/Actors.vue";
import SimilarMovies from "../components/SimilarMovies.vue";
import ModalTrailer from "../components/ModalTrailer.vue";
import axios from "axios";

export default {
  components: { Loading, SimilarMovies, Actors, ModalTrailer },
  data() {
    return {
      id: this.$route.params.id,
      movie: [],
      loading: true,
      modal: false,
    };
  },
  methods: {
    switchModal() {
      this.modal = !this.modal;
    },
    async getMovie() {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.id}?api_key=1510eab5b0a144b26756002238a49bc8`
        )
        .then((res) => (this.movie = res.data))
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
    this.getMovie();
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 4em;
  margin-bottom: 2em;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  .text {
    margin-top: 1em;
    color: #fff;
    h1 {
      font-weight: 900;
      font-size: 5em;
      margin-bottom: 10px;
      transition: 0.2s all ease;
      line-height: 68px;
      @media (max-width: 680px) {
        font-size: 3em;
        line-height: 50px;
      }
    }
    p {
      opacity: 0.9;
      margin-top: 1em;
      line-height: 22px;
    }
    h4 {
      margin-top: 1em;
    }
    span {
      font-size: 1em;
      opacity: 0.9;
      &.star {
        border: 1px solid #fff;
        padding: 2px 4px;
        border-radius: 5px;
        display: inline-flex;
        align-items: center;
        margin-left: 1em;
        img {
          height: 12px;
          margin-right: 5px;
        }
      }
    }
    button {
      display: block;
      padding: 0.5em 1.5em;
      margin-top: 1em;
      background: #c71e12;
      border: none;
      outline: none;
      color: #fff;
      font-size: 1em;
      cursor: pointer;
      font-weight: bolder;
      border-radius: 5px;
      transition: 0.2s transform ease;
      display: flex;
      align-items: center;
      &:hover {
        animation: jelly 0.5s;
        @keyframes jelly {
          0%,
          100% {
            transform: scale(1, 1);
          }
          25% {
            transform: scale(0.9, 1.1);
          }
          50% {
            transform: scale(1.1, 0.9);
          }
          75% {
            transform: scale(0.95, 1.05);
          }
        }
      }
      img {
        filter: invert(1);
        margin-right: 1em;
      }
    }
  }
  .image {
    img {
      height: 500px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      @media (max-width:380px) {
        height: auto;
        width: 100%;
      }
    }
  }
}
</style>
<template>
  <div>
    <h2>Similar Movies</h2>
    <swiper
      class="carousel"
      :slidesPerView="'auto'"
      :spaceBetween="10"
      :mousewheel="true"
    >
      <swiper-slide
        class="card-movie"
        v-for="(movie, index) in movies"
        :key="index"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          :alt="movie.title"
        />
        <div class="card-hover">
          <div class="text">
            <h3>{{ movie.title }}</h3>
            <p class="overviewDesktop">
              {{ movie.overview.substring(0, 200) }}...
            </p>
            <p class="overviewMobile">
              {{ movie.overview.substring(0, 50) }}...
            </p>
          </div>
          <router-link
            :to="{
              name: 'Movie',
              params: { id: movie.id },
            }"
            >More Details</router-link
          >
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import SwiperCore, { Mousewheel } from "swiper";
SwiperCore.use([Mousewheel]);
import axios from "axios";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      movies: [],
    };
  },
  props: {
    id: String,
  },
  methods: {
    async getSimilarMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/${this.id}/similar?api_key=1510eab5b0a144b26756002238a49bc8&language=en-US&page=1`
      );
      const res = await data;
      this.movies = res.data.results;
    },
  },
  mounted() {
    this.getSimilarMovies();
  },
};
</script>

<style lang="scss" scoped>
h2 {
  color: #fff;
}
.carousel {
  width: 100%;
  padding: 1.5em 0.5em;
}
.card-movie {
  position: relative;
  height: 300px;
  width: 200px;
  transition: 0.5s all ease;
  z-index: 10;
  @media (max-width: 680px) {
    height: 200px;
    width: 130px;
  }
  img {
    height: 100%;
    width: 100%;
    transition: 0.5s all ease;
    object-fit: cover;
    display: block;
  }
  &:hover {
    transform: scale(1.07);
    z-index: 100;
    .card-hover {
      visibility: visible;
    }
  }
  .card-hover {
    position: absolute;
    top: 0;
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
    width: 100%;
    height: 100%;
    background: rgba(160, 39, 39, 0.8);
    visibility: hidden;
    h3 {
      margin-bottom: 0.5em;
    }
    p {
      opacity: 0.8;
      font-size: 0.9em;
      font-weight: 300;
      &.overviewDesktop {
        @media (max-width: 680px) {
          display: none;
        }
      }
      &.overviewMobile {
        display: none;
        @media (max-width: 680px) {
          display: block;
        }
      }
    }
    a {
      text-decoration: none;
      color: #fff;
      border: 1px #fff solid;
      padding: 0.5em 1em;
      border-radius: 5px;
      text-align: center;
      width: 100%;
      @media (max-width: 680px) {
        font-size: 0.9em;
      }
    }
  }
}
</style>
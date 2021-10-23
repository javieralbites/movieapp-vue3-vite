<template>
  <nav>
    <router-link to="/" class="logo">Movie <span>App</span></router-link>
    <div class="nav-search" :class="{ searchActive: searchActive }">
      <img
        class="search-btn-back-mobile"
        :class="{ searchActive: searchActive }"
        src="../assets/arrow-back.svg"
        alt="arrowback"
        @click="searchActive = false"
      />
      <div class="myInput" :class="{ searchActive: searchActive }">
        <input
          @keyup.enter="searchMovies"
          type="text"
          placeholder="Search your movie.. (Press 'Enter')"
          v-model="search"
        />
        <img
          v-show="search !== ''"
          @click="cancelSearch"
          src="../assets/close.svg"
          alt="delete"
        />
        <img @click="searchMovies" src="../assets/search.svg" alt="search" />
      </div>
      <div v-show="searchedMovies.length && search !== ''" class="options">
        <router-link
          :to="{
            name: 'Movie',
            params: { id: list.id },
          }"
          tag="div"
          class="option"
          v-for="(list, index) in searchedMovies"
          :key="index"
          @click.prevent="cancelSearch"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500/${list.poster_path}`"
            :alt="list.title"
          />
          <div class="option-title">
            {{ list.title }}
          </div>
        </router-link>
      </div>
    </div>
    <ul class="categories-desktop">
      <li v-for="(category, index) in categories" :key="index">
        <router-link
          :to="{
            name: 'Category',
            params: { slug: category.slug, title: category.name },
          }"
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
    <div class="nav-mobile">
      <img
        class="search-btn-mobile"
        :class="{ searchActive: searchActive }"
        @click="(searchActive = true), (categoryActive = false)"
        src="../assets/search.svg"
        alt="search"
      />
      <div
        class="categories-btn-mobile"
        @click="categoryActive = !categoryActive"
      >
        Categories
        <img
          :class="{ categoryActive: categoryActive }"
          src="../assets/close.svg"
          alt="close"
        /><img
          :class="{ categoryActive: !categoryActive }"
          src="../assets/menu.svg"
          alt="menu"
        />
      </div>
    </div>
    <div class="categories-mobile" :class="{ categoryActive: categoryActive }">
      <router-link
        v-for="(category, index) in categories"
        :key="index"
        :to="{
          name: 'Category',
          params: { slug: category.slug, title: category.name },
        }"
        @click.prevent="categoryActive = !categoryActive"
        >{{ category.name }}</router-link
      >
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      searchedMovies: [],
      categoryActive: false,
      searchActive: false,
      categories: [
        { name: "Now Playing", slug: "now_playing" },
        { name: "Top Rated", slug: "top_rated" },
        { name: "Most Popular", slug: "popular" },
        { name: "Upcoming", slug: "upcoming" },
      ],
    };
  },
  methods: {
    async searchMovies() {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=1510eab5b0a144b26756002238a49bc8&language=en-US&page=1&query=${this.search}`
        )
        .then((res) => (this.searchedMovies = res.data.results))
        .catch((e) => console.log(e));
    },
    cancelSearch() {
      this.search = "";
      this.searchedMovies = [];
    },
    updateScroll() {
      const header = document.querySelector("nav");
      header.classList.toggle("sticky", window.scrollY > 0);
    },
  },
  watch: {
    search(newValue) {
      if (newValue == "") {
        this.searchedMovies = [];
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>

<style lang="scss" scoped>
nav {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 08) 100%
  );
  padding: 1em 5em;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  height: 70px;
  transition: 0.2s ease-in-out background-color;
  &.sticky {
    background-color: #000;
  }
  @media (max-width: 680px) {
    padding: 1em 0.5em;
    flex-wrap: wrap;
    height: 65px;
  }
  .logo {
    color: #fff;
    font-size: 1.5em;
    font-weight: 900;
    text-decoration: none;
    span {
      color: #c71e12;
    }
    @media (max-width: 680px) {
      font-size: 1.5em;
    }
  }
  .nav-search {
    position: relative;
    width: 35%;
    padding: 0px 5px;
    z-index: 1000;
    &.searchActive {
      display: flex;
      align-items: center;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: #000;
    }
    @media (max-width: 620px) {
      width: 100%;
      display: none;
    }
    .search-btn-back-mobile {
      filter: invert(1);
      display: none;
      padding: 0 10px;
      height: 1.5em;
      &.searchActive {
        display: block;
      }
    }
  }
  .myInput {
    border: 3px #c71e12 solid;
    display: flex;
    align-items: center;
    border-radius: 5px;
    position: relative;
    background-color: rgba(0, 0, 0, 0.4);
    &.searchActive {
      display: flex;
    }
    @media (max-width: 620px) {
      display: none;
      width: 100%;
      order: 1;
      margin-top: 5px;
      border: 1px #c71e12 solid;
    }
    &:hover {
      border: 3px rgb(255, 255, 255) solid;
      @media (max-width: 620px) {
        border: 1px #fff solid;
      }
    }
    input {
      caret-color: #c71e12;
      background-color: transparent;
      color: #fff;
      padding: 10px;
      font-size: 17px;
      border: none;
      width: 100%;
      border-radius: 15px;
      @media (max-width: 620px) {
        font-size: 15px;
      }
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
    & > img {
      filter: invert(1);
      padding: 0 10px;
      border: none;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .options {
    position: absolute;
    top: 120%;
    left: 0;
    width: 100%;
    height: 400px;
    overflow-y: scroll;
    background: #000;
    @media (max-width: 620px) {
      top: 100%;
      height: calc(100vh - 65px);
    }
    .option {
      padding: 5px;
      display: flex;
      align-items: center;
      border-bottom: 1px #fff solid;
      text-decoration: none;
      cursor: pointer;
      &:last-child {
        border: none;
      }
      &:hover {
        background: rgb(46, 44, 44);
      }
      & > img {
        height: 40px;
        margin-right: 1em;
      }
      .option-title {
        color: #fff;
      }
    }
  }
  ul.categories-desktop {
    display: flex;
    align-items: center;
    list-style: none;
    @media (max-width: 992px) {
      display: none;
    }
    li {
      a {
        text-decoration: none;
        color: #fff;
        padding: 0.3em 0.6em;
        font-size: 0.9em;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #c71e12;
          transform-origin: bottom right;
          transform: scaleX(0);
          transition: transform 0.5s ease;
          @media (max-width: 680px) {
            display: none;
          }
        }
        &:hover::before {
          transform-origin: bottom left;
          transform: scaleX(1);
        }
      }
    }
  }
  .nav-mobile {
    display: none;
    @media (max-width: 620px) {
      display: flex;
    }
    .search-btn-mobile {
      filter: invert(1);
      padding: 0.4em;
      cursor: pointer;
      &.searchActive {
        display: none;
      }
    }
    .categories-btn-mobile {
      background: #c71e12;
      border-radius: 5px;
      padding: 0.4em;
      color: #fff;
      display: flex;
      align-items: center;
      img {
        filter: invert(1);
        display: none;
        margin-left: 5px;
        &.categoryActive {
          display: block;
        }
      }
    }
  }
  .categories-mobile {
    border-radius: 5px;
    margin-top: 0.5em;
    background: #c71e12;
    display: none;
    width: 100%;
    order: 10;
    &.categoryActive {
      display: block;
    }
    a {
      display: block;
      text-decoration: none;
      color: #fff;
      border-bottom: #fff 1px solid;
      padding: 1em;
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
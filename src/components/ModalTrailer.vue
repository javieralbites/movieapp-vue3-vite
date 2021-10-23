<template>
  <div class="modal" @click="cerrarModal">
    <div class="containerVideo">
      <div class="iframe-container">
        <iframe
          :src="`https://www.youtube.com/embed/${key.key}?modestbranding=1&rel=0`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      videos: [],
      key: "",
    };
  },
  props: {
    id: String,
  },
  methods: {
    async getVideos() {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=1510eab5b0a144b26756002238a49bc8&language=en-US&page=1`
        )
        .then((res) => (this.videos = res.data.results))
        .then(() => {
          this.key = this.videos.find((video) => video.type === "Trailer");
        })
        .catch((e) => console.log("Error: ", e));
    },
    cerrarModal() {
      this.$emit("cerrarModal");
    },
  },
  mounted() {
    this.getVideos();
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .containerVideo {
    width: 560px;
    @media (max-width: 559px) {
      width: 95%;
    }
    .iframe-container {
      position: relative;
      background: #000;
      height: 0;
      padding-bottom: 56.25%;
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
<template>
  <div class="hero">
    <div class="container hero-content">
      <img
        src="https://res.cloudinary.com/ddzblkqfa/image/upload/v1634991796/Dune_2021_transparent_logo_ixeapz.png"
        alt="banner"
      />
      <p>
        A mythic and emotionally charged hero's journey, "Dune" tells the story
        of Paul Atreides, a brilliant and gifted young man born into a great
        destiny beyond his ...
      </p>
      <router-link to="/movie/438631">
        <img src="../assets/play.svg" alt="play" />
        Play
      </router-link>
    </div>
    <div class="adult">+16</div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 90vh;
  background: url(https://i.blogs.es/2af678/dune-cartel/1366_2000.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  display: flex;
  align-items: center;
  @media (max-width: 620px) {
    height: 50vh;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 08) 100%
    );
    @media (max-width: 620px) {
      height: 100px;
    }
  }
  .hero-content {
    width: 100%;
    margin-top: 3em;
    z-index: 10;
    img {
      width: 50%;
      filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
      @media (max-width: 620px) {
        width: 60%;
      }
    }
    p {
      color: #fff;
      width: 45%;
      text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.6);
      font-size: larger;
      margin: 1em 0;
      @media (max-width: 620px) {
        font-size: small;
        width: 55%;
      }
    }
    a {
      background: #c71e12;
      border-radius: 5px;
      color: #fff;
      padding: 1em 1.5em;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      @media (max-width: 620px) {
        padding: 0.7em 1.5em;
      }
      &:hover {
        opacity: 0.9;
      }
      img {
        margin-right: 0.5em;
        height: 20px;
        filter: invert(1);
      }
    }
  }
  .adult {
    padding: 0.8em 2em 0.8em 1em;
    background: rgba(0, 0, 0, 0.5);
    border-left: #fff 3px solid;
    color: #fff;
    position: absolute;
    right: 0;
    bottom: 30%;
  }
}
</style>
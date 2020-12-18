<template>
  <ul>
    <li v-for="movie in upComingMovies" :key="movie.original_title">
      {{ movie.release_date }}
      {{ movie.title }}
      <img :src="baseImage + movie.poster_path" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "upcomingmovies",
  data() {
    return {
      data: null,
      upComingMovies: null,
      baseImage: "",
      id: "",
    };
  },
  beforeMount() {
    this.getName();
  },
  methods: {
    async getName() {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=57d264ad6b69204de8c87c1935fdf93b"
      );
      const data = await res.json();
      this.upComingMovies = data.results;
      console.log(this.upComingMovies);
      this.id = this.upComingMovies.id;
      this.baseImage = "http://image.tmdb.org/t/p/w200";
      console.log(this.poster);
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
li {
  display: flex;
  flex-direction: column;
  margin: 1em;
  justify-content: center;
  align-items: center;
}

img {
  max-width: 80%;
}
</style>
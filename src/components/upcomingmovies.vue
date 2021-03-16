<template>
   <div class="containerMovie">
    <div class="wrapMovie"  v-for="movie in upComingMovies" :key="movie.original_title" >
    <RouterLink  :to="{
         name:'movieInformation',
         params:{
            id: movie.id
         }
        }" class="upCommingMovie"  >
      <img :src="baseImage + movie.poster_path" />
      <div> {{ movie.title }}</div>
      <div>{{ movie.release_date }}</div>
    </RouterLink>
      </div>
      </div>
</template>

<script>
export default {
  name: "upcomingmovies",
  data() {
    return {
      data: null,
      upComingMovies: null,
      baseImage: "http://image.tmdb.org/t/p/w200",
      id: "",
    };
  },
  beforeMount() {
    this.getName();
  },
  methods: {
    async getName() {
      const res = await fetch(
/* "https://api.themoviedb.org/3/movie/now_playing?api_key=57d264ad6b69204de8c87c1935fdf93b&language=fr&region=fr" */

"https://api.themoviedb.org/3/movie/popular?api_key=57d264ad6b69204de8c87c1935fdf93b&language=fr&region=fr"
 
);
      const data = await res.json();
      this.upComingMovies = data.results;
      this.upComingMovies.sort((a, b) => (a.release_date > b.release_date) ? -1 : 1)
      console.log(this.upComingMovies);
    },
  },
};
</script>

<style scoped>
.containerMovie{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.wrapMovie {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.upCommingMovie {
  display: flex;
  flex-direction: column;
  margin: 1em;
  justify-content: center;
  align-items: center;
}

img {
  width: 225px;
}
</style>
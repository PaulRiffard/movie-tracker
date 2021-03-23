<template>
  <div class="search-wrapper">
    <input type="text"  v-model="inputValue" v-on:keyup="searchMovie()" />

<!-- 

    <h3>{{ idMovie }}</h3>
    <h2>{{ title }}</h2>
    <h2>{{popularity}}</h2>
 -->
    <div v-for="movie in movies" :key='movie' >
      {{movie.title}} {{movie.popularity}}
    </div>
  </div>
</template>
<script>


export default {
  data() {
    return {
      data: null,
      inputValue: "",
      idMovie: "",
      title: "",
      popularity:"",
      movies: [],
    };
  },

  components:{
  },

  methods: {
    getInfoMovie(id) {
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "?api_key=57d264ad6b69204de8c87c1935fdf93b"
      )
        .then((res) => res.json())
        .then((data) => {
          this.title = data.original_title;
          this.popularity = data.popularity
        });
    },

    searchMovie() {
      fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=57d264ad6b69204de8c87c1935fdf93b&query=" +
          this.inputValue +"&language=fr&region=fr"
      )
        .then((res) => res.json())
        .then((data) => {
  
          this.movies = data.results
          this.movies.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1)
          this.idMovie = this.movies[0].id;
          this.getInfoMovie(this.idMovie);
        });
    },
  },
};
</script>

<style >



</style>

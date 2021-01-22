<template>
  <div class="search-wrapper">
    <input type="text"  v-model="inputValue" v-on:keyup="searchMovie()" />

    <h3>{{ idMovie }}</h3>
    <h2>{{ title }}</h2>
    <h2>{{popularity}}</h2>

<vue-single-select
        v-model="inputValue"
        :options="movies"
        v-on:keyup="searchMovie()"
        :required="true"
></vue-single-select>

  </div>
</template>
<script>

import VueSingleSelect from "vue-single-select";

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
    VueSingleSelect
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
          /*console.log(data);*/
          this.title = data.original_title;
          this.popularity = data.popularity
        });
    },

    searchMovie() {

      console.log(this.inputValue)

      fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=57d264ad6b69204de8c87c1935fdf93b&query=" +
          this.inputValue
      )
        .then((res) => res.json())
        .then((data) => {
  
          this.movies = data.results
          this.movies.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1)
          console.log(this.movies)
          this.idMovie = this.movies[0].id;
          this.getInfoMovie(this.idMovie);
        });
    },
  },
};
</script>

<style >



</style>

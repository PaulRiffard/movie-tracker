<template>
  <div class="search-wrapper">
    <input type="text" v-model="inputValue" v-on:change="searchMovie()" />
    <h3>{{ idMovie }}</h3>
    <h2>{{ title }}</h2>
    <h4>{{ poster }}</h4>
    <p></p>
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
    };
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
        });
    },

    searchMovie() {
      fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=57d264ad6b69204de8c87c1935fdf93b&query=" +
          this.inputValue
      )
        .then((res) => res.json())
        .then((data) => {
          this.idMovie = data.results[0].id;
          this.getInfoMovie(this.idMovie);
        });
    },
  },
};
</script>
<style scoped>
</style>
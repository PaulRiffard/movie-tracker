<template>
  <div id="app">
    <SearchMovies />
    <UpComingMovies />
  </div>
</template>

<script>
import UpComingMovies from "./components/upcomingmovies";
import SearchMovies from "./components/searchMovie";

export default {
  name: "App",
  components: {
    UpComingMovies,
    SearchMovies,
  },
};
</script>

<style>
</style>

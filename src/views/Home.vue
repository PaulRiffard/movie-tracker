<template>
  <div class="home">
    <Login />
    <Search />
    <Upcomingmovies />
  </div>
</template>

<script>
import Search from "../components/searchMovie";
import Upcomingmovies from "../components/upcomingmovies.vue";
import Login from "../components/login";

export default {
  name: "Home",
  components: {
    Search,
    Upcomingmovies,
    Login,
  },
};
</script>

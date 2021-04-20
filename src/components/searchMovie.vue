<template>
  <div class="search-wrapper">
    <input type="text"  v-model="inputValue" v-on:keyup="searchMovie()" />

<!-- 

    <h3>{{ idMovie }}</h3>
    <h2>{{ title }}</h2>
    <h2>{{popularity}}</h2>
 -->
    <div v-for="movie in movies" :key='movie._id' >
       
     <RouterLink  :to="{
         name:'movieInformation',
         params:{
            id: movie.id
         }
        }">  
      {{movie.title}} 
       <img :src="baseImage + movie.poster_path" />
       {{movie.vote_average}}
     </RouterLink>
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
      baseImage: "http://image.tmdb.org/t/p/w200",

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
          this.movies = []
  
          data.results.map(item =>{
            if (this.movies.length < 20) this.movies.push(item)
           
           }) 
           this.movies.sort((a, b) => (a.vote_average > b.vote_average) ? -1 : 1)
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

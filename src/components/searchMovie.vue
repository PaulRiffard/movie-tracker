<template>
  <div>
    <input v-if="mobile" type="text" placeholder="Entrer le nom d'un film ..." class="border-b" v-model="inputValue" v-on:keyup="searchMovie()" />
    <div class="flex flex-wrap justify-around">
     <RouterLink  class="flex flex-col items-center m-2 max-w-sm " v-for="movie in movies" :key='movie._id'  :to="{
         name:'movieInformation',
         params:{
            id: movie.id
         }
        }"   >
        <div>
      {{movie.title}} 
        </div>
       <img class="w-64 h-96 " :src="movie.poster_path" />
       <div>
       {{movie.vote_average}}
       </div>
     </RouterLink>
    </div>
  </div>
</template>
<script>

import moment from 'moment'

export default {

 filters: {
  moment: function (date) {
    return moment(date).locale('fr').format('DD MMMM YYYY');
  }
    },

  data() {
    return {
      data: null,
      inputValue: "",
      title: "",
      popularity:"",
      movies: [],
      baseImage: "http://image.tmdb.org/t/p/w200",
      mobile: false,

    };
  },

  components:{
  },
  created(){
      if(window.screen.width <= 600){
      this.mobile = true
    }
  },

  methods: {
    searchMovie() {

      if(this.inputValue != ''){

      
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
           this.movies.map(movie =>{ if(movie.poster_path == null){
        movie.poster_path = "https://i.ibb.co/whjm12r/Group-35.png"
      }else{
        movie.poster_path = this.baseImage + movie.poster_path
      }
      console.log(this.movies)
      })
          this.$emit('activeUpcoming', false)
        });
      }else{
         this.movies = []
         this.$emit('activeUpcoming', true)
       
      }
    },
  },
};
</script>

<style >

</style>

<template>
   <div class="containerMovie">
    <div class="wrapMovie"  v-for="movie in upComingMovies" :key="movie.original_title" >
    <RouterLink  :to="{
         name:'movieInformation',
         params:{
            id: movie.id
         }
        }" class="upCommingMovie max-w-xs"   >
      <img class="w-64 h-84 "    :src="movie.poster_path" />
      <div> {{ movie.title }}</div>
      <div class="text-title flex flex-wrap  w-full " >
        <div class="w-8" >
        <img src="../assets/icons/clap.svg"  />
        </div>
        <div class="ml-5" >
      {{ movie.release_date | moment }}
        </div>
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
"https://api.themoviedb.org/3/movie/popular?api_key=57d264ad6b69204de8c87c1935fdf93b&language=fr&region=fr"
 
);
      const data = await res.json();
      this.upComingMovies = data.results;
      this.upComingMovies.sort((a, b) => (a.popularity < b.popularity) ? -1 : 1)
       this.upComingMovies = this.upComingMovies.splice(14 )
      this.upComingMovies.sort((a,b) => (a.release_date > b.release_date) ?-1 :1  )
      this.upComingMovies.map(movie =>{ if(movie.poster_path == null){
        movie.poster_path = "https://i.ibb.co/whjm12r/Group-35.png"
      }else{
        movie.poster_path = this.baseImage + movie.poster_path
      }
      
      })
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
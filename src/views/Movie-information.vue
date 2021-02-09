<template>
  <div v-if="director">
<div class="title" >
      {{movie.title}}
      {{movie.tagline}}
       {{movie.release_date}}
       <img :src="movie.poster_path"/>
</div>
     

  <div class="castRow">    
 <div class="cast" >{{director.name}}  <img :src="director.profile_path"/></div>

            <div class="cast" v-for="(cast, i ) in movieCast.slice(0,5) " :key="cast + i" >{{cast.name}} / {{cast.character}} <img :src="cast.profile_path"/> </div> 

</div>
     
  </div>

</template>

<script>
export default {
    data(){
        return {
id: this.$route.params.id,
movie :{},
moviePerson: {},
director: {},
baseImage: "http://image.tmdb.org/t/p/w200",
i : 0
}
    },

    methods:{

        async getMovieById(){
      const res = await fetch(
       "https://api.themoviedb.org/3/movie/"+this.id+"?api_key=57d264ad6b69204de8c87c1935fdf93b&language=fr"
      );
      this.movie = await res.json();
      this.movie.poster_path = this.baseImage + this.movie.poster_path
        },

  async getMovieCastById(){
      const res = await fetch(
      "https://api.themoviedb.org/3/movie/"+this.id +"/credits?api_key=57d264ad6b69204de8c87c1935fdf93b"

      );
      this.moviePerson = await res.json();
      this.movieCast = this.moviePerson.cast
      this.movieCast.forEach(element => {
          element.profile_path = this.baseImage + element.profile_path
          
      });
      this.getDirector()
        },
    
    getDirector(){
        this.moviePerson.crew.forEach(element => {
            if(element.job == "Director") 
            this.director = element
            element.profile_path = this.baseImage + element.profile_path
        });
    }
     
    },
    created(){
        this.getMovieById(),
        this.getMovieCastById()
    }
}
</script>

<style>
.title{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title img{
    max-width: 20%;
}

.castRow{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.cast{
    display: flex;
    flex-direction: column;
    margin: 20px;
    align-items: center;
    justify-content: center;
}

.cast img{
    width: 10em;
}
</style>